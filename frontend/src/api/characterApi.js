const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://ai-agent-backend-ptl5.onrender.com";

export async function getCharacters() {
  const response = await fetch(`${API_URL}/api/v1/characters`);

  if (!response.ok) {
    throw new Error("Не удалось загрузить персонажей");
  }

  return response.json();
}