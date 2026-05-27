import json
import re

from app.ai.openai_client import get_openai_client
from app.tools.web_search import WebSearchTool


class AgentService:
    def __init__(self):
        self.client = get_openai_client()
        self.web_search = WebSearchTool()

    async def run_agent(self, task: str) -> dict:
        search_results = []

        try:
            search_results = self.web_search.search(task, limit=5)
        except Exception:
            search_results = []

        search_context = ""

        if search_results:
            for index, item in enumerate(search_results, start=1):
                search_context += (
                    f"\n[{index}] {item['title']}\n"
                    f"{item['body']}\n"
                    f"{item['link']}\n"
                )

        response = await self.client.responses.create(
            model="gpt-5.2",
            reasoning={
                "effort": "medium",
            },
            input=[
                {
                    "role": "system",
                    "content": (
                        "Ты powerful AI Agent. "
                        "Ты умеешь использовать web search результаты для анализа. "
                        "Строй reasoning пошагово. "
                        "Отвечай строго JSON без markdown.\n\n"

                        "Формат:\n"
                        "{"
                        "\"steps\":["
                        "{\"title\":\"...\",\"description\":\"...\",\"status\":\"done\"}"
                        "],"
                        "\"final_result\":\"...\""
                        "}"
                    ),
                },
                {
                    "role": "user",
                    "content": (
                        f"ЗАДАЧА:\n{task}\n\n"
                        f"WEB SEARCH RESULTS:\n{search_context}"
                    ),
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
                        "title": "Анализ",
                        "description": "AI агент выполнил web research.",
                        "status": "done",
                    }
                ],
                "final_result": raw_text,
            }