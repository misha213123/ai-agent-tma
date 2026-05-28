import { getTelegramUser } from "../utils/telegram";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://ai-agent-backend-ptl5.onrender.com";

export async function getRelationship(characterSlug) {
  const tgUser = getTelegramUser();

  const response = await fetch(
    `${API_URL}/api/v1/relationships/${characterSlug}?telegram_id=${tgUser.telegram_id}`
  );

  if (!response.ok) {
    throw new Error("Не удалось загрузить отношения");
  }

  return response.json();
}