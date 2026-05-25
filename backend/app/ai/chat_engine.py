from app.ai.openai_client import get_openai_client


class ChatService:
    def __init__(self):
        self.client = get_openai_client()

    async def generate_response(self, message: str) -> str:
        response = await self.client.responses.create(
            model="gpt-4.1-mini",
            input=[
                {
                    "role": "system",
                    "content": (
                        "Ты умный AI ассистент внутри Telegram Mini App. "
                        "Отвечай кратко, полезно и по делу. "
                        "Если пользователь просит план — давай структурированный план."
                    ),
                },
                {
                    "role": "user",
                    "content": message,
                },
            ],
        )

        return response.output_text