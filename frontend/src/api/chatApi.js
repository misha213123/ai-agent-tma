const API_URL = import.meta.env.VITE_API_URL || "https://ai-agent-backend-ptl5.onrender.com";

export async function sendChatMessage(message) {
  const response = await fetch(`${API_URL}/api/v1/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  if (!response.ok) {
    throw new Error("AI не смог ответить");
  }

  return response.json();
}