from sqlalchemy.orm import Session

from app.ai.openai_client import get_openai_client
from app.services.memory_service import MemoryService


class ChatService:
    def __init__(self):
        self.client = get_openai_client()
        self.memory = MemoryService()

    async def generate_response(self, db: Session, telegram_id: str, message: str) -> str:
        recent_messages = self.memory.get_recent_messages(
            db=db,
            telegram_id=telegram_id,
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
                    "Ты умный AI ассистент внутри Telegram Mini App. "
                    "Отвечай на русском, кратко, полезно и по делу. "
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
            role="user",
            content=message,
        )

        response = await self.client.responses.create(
            model="gpt-4.1-mini",
            input=messages,
        )

        answer = response.output_text

        self.memory.save_message(
            db=db,
            telegram_id=telegram_id,
            role="assistant",
            content=answer,
        )

        return answer