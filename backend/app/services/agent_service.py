import json
import re

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
                        "Отвечай строго валидным JSON. "
                        "Не используй markdown. "
                        "Не добавляй ```json. "
                        "Структура ответа должна быть такой: "
                        "{"
                        "\"steps\":["
                        "{\"title\":\"Анализ задачи\",\"description\":\"краткое описание\",\"status\":\"done\"},"
                        "{\"title\":\"План действий\",\"description\":\"краткое описание\",\"status\":\"done\"},"
                        "{\"title\":\"Выполнение\",\"description\":\"краткое описание\",\"status\":\"done\"},"
                        "{\"title\":\"Итог\",\"description\":\"краткое описание\",\"status\":\"done\"}"
                        "],"
                        "\"final_result\":\"финальный подробный ответ\""
                        "}"
                    ),
                },
                {
                    "role": "user",
                    "content": task,
                },
            ],
        )

        raw_text = response.output_text.strip()
        raw_text = re.sub(r"^```json\s*", "", raw_text)
        raw_text = re.sub(r"^```\s*", "", raw_text)
        raw_text = re.sub(r"\s*```$", "", raw_text)

        try:
            result = json.loads(raw_text)
            return {
                "steps": result.get("steps", []),
                "final_result": result.get("final_result", raw_text),
            }
        except Exception:
            return {
                "steps": [
                    {
                        "title": "Анализ задачи",
                        "description": "Агент обработал запрос.",
                        "status": "done",
                    },
                    {
                        "title": "Выполнение",
                        "description": "Ответ получен от AI модели.",
                        "status": "done",
                    },
                ],
                "final_result": raw_text,
            }