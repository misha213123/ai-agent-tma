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
                    "content": "Ты полезный AI ассистент внутри Telegram Mini App. Отвечай кратко и по делу.",
                },
                {
                    "role": "user",
                    "content": message,
                },
            ],
        )

        return response.output_text