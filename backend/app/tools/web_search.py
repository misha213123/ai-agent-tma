import re
from urllib.parse import quote_plus

import httpx


class WebSearchTool:
    def search(self, query: str, limit: int = 5) -> list[dict]:
        url = f"https://duckduckgo.com/html/?q={quote_plus(query)}"

        headers = {
            "User-Agent": "Mozilla/5.0"
        }

        try:
            response = httpx.get(
                url,
                headers=headers,
                timeout=10,
                follow_redirects=True,
            )

            html = response.text

            titles = re.findall(
                r'class="result__a"[^>]*>(.*?)</a>',
                html,
                flags=re.S,
            )

            links = re.findall(
                r'class="result__a" href="(.*?)"',
                html,
                flags=re.S,
            )

            snippets = re.findall(
                r'class="result__snippet"[^>]*>(.*?)</a>',
                html,
                flags=re.S,
            )

            results = []

            for index, title in enumerate(titles[:limit]):
                clean_title = re.sub("<.*?>", "", title).strip()
                clean_body = ""

                if index < len(snippets):
                    clean_body = re.sub("<.*?>", "", snippets[index]).strip()

                link = links[index] if index < len(links) else ""

                results.append(
                    {
                        "title": clean_title,
                        "body": clean_body,
                        "link": link,
                    }
                )

            return results

        except Exception:
            return []