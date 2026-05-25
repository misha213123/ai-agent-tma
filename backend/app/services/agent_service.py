import json

from app.ai.openai_client import get_openai_client


class AgentService:
    def __init__(self):
        self.client = get_openai_client()

    async def run_agent(self, task: str) -> dict:
        response = await self.client.responses.create(
            model="gpt-4.1-mini",
            input=[
                {
                    "role": "system",
                    "content": (
                        "Ты AI агент внутри Telegram Mini App. "
                        "Ты выполняешь задачи по шагам. "
                        "Верни JSON без markdown."
                    ),
                },
                {
                    "role": "user",
                    "content": task,
                },
            ],
        )

        try:
            return json.loads(response.output_text)
        except Exception:
            return {
                "steps": [
                    {
                        "title": "Анализ",
                        "description": "AI выполнил задачу.",
                        "status": "done",
                    }
                ],
                "final_result": response.output_text,
            }