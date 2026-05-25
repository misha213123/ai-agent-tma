const API_URL = import.meta.env.VITE_API_URL || "https://ai-agent-backend-ptl5.onrender.com";

export async function runAgentTask(task) {
  const response = await fetch(`${API_URL}/api/v1/agent/run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ task })
  });

  if (!response.ok) {
    throw new Error("Agent не смог выполнить задачу");
  }

  return response.json();
}