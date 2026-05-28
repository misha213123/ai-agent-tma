const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://ai-agent-backend-ptl5.onrender.com";

export async function sendChatMessage(
  message,
  telegramId = "demo-user",
  characterSlug = null
) {
  const response = await fetch(`${API_URL}/api/v1/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      telegram_id: telegramId,
      character_slug: characterSlug,
    }),
  });

  if (!response.ok) {
    throw new Error("AI не смог ответить");
  }

  return response.json();
}

export async function getChatHistory(telegramId = "demo-user", characterSlug = null) {
  const params = new URLSearchParams({
    telegram_id: telegramId,
  });

  if (characterSlug) {
    params.append("character_slug", characterSlug);
  }

  const response = await fetch(`${API_URL}/api/v1/chat/history?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Не удалось загрузить историю");
  }

  return response.json();
}

export async function clearChatHistory(telegramId = "demo-user", characterSlug = null) {
  const params = new URLSearchParams({
    telegram_id: telegramId,
  });

  if (characterSlug) {
    params.append("character_slug", characterSlug);
  }

  const response = await fetch(`${API_URL}/api/v1/chat/history?${params.toString()}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Не удалось очистить историю");
  }

  return response.json();
}