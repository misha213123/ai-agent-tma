const API_URL = import.meta.env.VITE_API_URL || "https://ai-agent-backend-ptl5.onrender.com";

export async function getOrCreateUser(user) {
  const response = await fetch(`${API_URL}/api/v1/users/me`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Не удалось загрузить профиль");
  }

  return response.json();
}