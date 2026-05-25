import { useState } from "react";
import { Send, Bot, ArrowLeft } from "lucide-react";
import { sendChatMessage } from "../api/chatApi";

export default function ChatPage({ onBack }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Привет 👋 Я твой AI ассистент. Чем помочь?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);

    try {
      const data = await sendChatMessage(text);
      setMessages((prev) => [...prev, { role: "assistant", text: data.answer }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Ошибка AI. Проверь backend/OpenAI API." }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="phone chat-screen">
      <header className="chat-header">
        <button className="icon-btn" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>
        <div className="chat-title">
          <div className="bot-avatar">
            <Bot size={20} />
          </div>
          <div>
            <h2>AI Chat</h2>
            <p>{loading ? "печатает..." : "онлайн"}</p>
          </div>
        </div>
      </header>

      <section className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.text}
          </div>
        ))}

        {loading && <div className="typing">AI думает...</div>}
      </section>

      <div className="chat-input">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleSend();
          }}
          placeholder="Напишите сообщение..."
        />
        <button onClick={handleSend}>
          <Send size={20} />
        </button>
      </div>
    </main>
  );
}