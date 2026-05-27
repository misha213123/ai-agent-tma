import json
import re

from app.ai.openai_client import get_openai_client


class AgentService:
    def __init__(self):
        self.client = get_openai_client()

    async def run_agent(self, task: str) -> dict:
        response = await self.client.responses.create(
            model="gpt-5-mini",
            reasoning={
                "effort": "medium",
            },
            input=[
                {
                    "role": "system",
                    "content": (
                        "Ты мощный AI агент внутри Telegram Mini App. "
                        "Работай как Planner + Executor + Critic. "
                        "Сначала анализируй задачу, потом строй план, затем выполняй, "
                        "потом проверяй результат и давай финальный вывод. "
                        "Отвечай строго валидным JSON без markdown и без ```json. "
                        "Структура: "
                        "{"
                        "\"steps\":["
                        "{\"title\":\"Анализ задачи\",\"description\":\"...\",\"status\":\"done\"},"
                        "{\"title\":\"План действий\",\"description\":\"...\",\"status\":\"done\"},"
                        "{\"title\":\"Выполнение\",\"description\":\"...\",\"status\":\"done\"},"
                        "{\"title\":\"Проверка результата\",\"description\":\"...\",\"status\":\"done\"},"
                        "{\"title\":\"Финальный вывод\",\"description\":\"...\",\"status\":\"done\"}"
                        "],"
                        "\"final_result\":\"подробный итоговый ответ\""
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
                        "description": "Агент обработал задачу и подготовил ответ.",
                        "status": "done",
                    },
                    {
                        "title": "Финальный вывод",
                        "description": "Ответ получен от мощной модели агента.",
                        "status": "done",
                    },
                ],
                "final_result": raw_text,
            }