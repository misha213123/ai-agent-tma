import { getTelegramUser } from "../utils/telegram";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://ai-agent-backend-ptl5.onrender.com";

export async function runAgentTask(task, mode = "fast") {
  const tgUser = getTelegramUser();

  const response = await fetch(`${API_URL}/api/v1/agent/run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
  task,
  telegram_id: tgUser.telegram_id,
  mode,
}),
  });

  if (!response.ok) {
    throw new Error("Agent не смог выполнить задачу");
  }

  return response.json();
}

export async function getAgentHistory() {
  const tgUser = getTelegramUser();

  const response = await fetch(
    `${API_URL}/api/v1/agent/history?telegram_id=${tgUser.telegram_id}`
  );

  if (!response.ok) {
    throw new Error("Не удалось загрузить историю агента");
  }

  return response.json();
}