import { useEffect, useRef, useState } from "react";
import { Send, Bot, ArrowLeft, Sparkles } from "lucide-react";
import { sendChatMessage } from "../api/chatApi";
import { getTelegramUser } from "../utils/telegram";

const quickPrompts = [
  "Сделай план на день",
  "Придумай идею для AI Mini App",
  "Объясни простыми словами",
];

export default function ChatPage({ onBack }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Привет 👋 Я твой AI ассистент. Чем помочь?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef(null);

  useEffect(() => {
    messagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend(customText) {
    const text = (customText || input).trim();
    if (!text || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);

    try {
      const tgUser = getTelegramUser();
      const data = await sendChatMessage(text, tgUser.telegram_id);
      setMessages((prev) => [...prev, { role: "assistant", text: data.answer }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Ошибка AI. Проверь backend/OpenAI API.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="phone chat-screen fade-in">
      <header className="chat-header">
        <button className="icon-btn" type="button" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>

        <div className="chat-title">
          <div className="bot-avatar pulse">
            <Bot size={20} />
          </div>

          <div>
            <h2>AI Чат</h2>
            <p>{loading ? "печатает..." : "онлайн"}</p>
          </div>
        </div>
      </header>

      <section className="chat-status-card glow">
        <Sparkles size={22} />
        <div>
          <p className="eyebrow">БЫСТРЫЙ РЕЖИМ</p>
          <h3>GPT-4.1 mini + память</h3>
          <span>Ассистент помнит контекст диалога</span>
        </div>
      </section>

      <section className="quick-prompts">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => handleSend(prompt)}
          >
            {prompt}
          </button>
        ))}
      </section>

      <section className="messages">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`message ${message.role} fade-in`}>
            {formatMessage(message.text)}
          </div>
        ))}

        {loading && (
          <div className="message assistant typing-bubble">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}

        <div ref={messagesRef} />
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

        <button type="button" onClick={() => handleSend()}>
          <Send size={20} />
        </button>
      </div>
    </main>
  );
}

function formatMessage(text) {
  return text.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
}