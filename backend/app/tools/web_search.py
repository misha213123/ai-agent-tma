from duckduckgo_search import DDGS


class WebSearchTool:
    def search(self, query: str, limit: int = 5) -> list[dict]:
        results = []

        with DDGS() as ddgs:
            items = ddgs.text(query, max_results=limit)

            for item in items:
                results.append(
                    {
                        "title": item.get("title", ""),
                        "body": item.get("body", ""),
                        "link": item.get("href", ""),
                    }
                )

        return results