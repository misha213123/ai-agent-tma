from sqlalchemy.orm import Session

from app.ai.openai_client import get_openai_client
from app.services.memory_service import MemoryService


class ChatService:
    def __init__(self):
        self.client = get_openai_client()
        self.memory = MemoryService()

    async def generate_response(
        self,
        db: Session,
        telegram_id: str,
        message: str,
        character_slug: str | None = None,
    ) -> str:
        recent_messages = self.memory.get_recent_messages(
            db=db,
            telegram_id=telegram_id,
            character_slug=character_slug,
            limit=10,
        )

        history = []

        for item in reversed(recent_messages):
            history.append(
                {
                    "role": item.role,
                    "content": item.content,
                }
            )

        messages = [
            {
                "role": "system",
                "content": (
                    "Ты AI ассистент внутри Telegram Mini App. "
                    "Отвечай на русском, живо, полезно и по контексту. "
                    "Учитывай историю диалога пользователя."
                ),
            },
            *history,
            {
                "role": "user",
                "content": message,
            },
        ]

        self.memory.save_message(
            db=db,
            telegram_id=telegram_id,
            character_slug=character_slug,
            role="user",
            content=message,
        )

        response = await self.client.responses.create(
            model="gpt-5-mini",
            input=messages,
        )

        answer = response.output_text

        self.memory.save_message(
            db=db,
            telegram_id=telegram_id,
            character_slug=character_slug,
            role="assistant",
            content=answer,
        )

        return answer