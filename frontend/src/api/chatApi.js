const API_URL = import.meta.env.VITE_API_URL || "https://ai-agent-backend-ptl5.onrender.com";

export async function sendChatMessage(message, telegramId = "demo-user") {
  const response = await fetch(`${API_URL}/api/v1/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      telegram_id: telegramId,
    }),
  });

  if (!response.ok) {
    throw new Error("AI не смог ответить");
  }

  return response.json();
}

export async function getChatHistory(telegramId = "demo-user") {
  const response = await fetch(`${API_URL}/api/v1/chat/history?telegram_id=${telegramId}`);

  if (!response.ok) {
    throw new Error("Не удалось загрузить историю");
  }

  return response.json();
}

export async function clearChatHistory(telegramId = "demo-user") {
  const response = await fetch(`${API_URL}/api/v1/chat/history?telegram_id=${telegramId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Не удалось очистить историю");
  }

  return response.json();
}