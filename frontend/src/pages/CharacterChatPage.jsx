import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Send, Sparkles } from "lucide-react";
import { sendChatMessage } from "../api/chatApi";
import { getTelegramUser } from "../utils/telegram";

export default function CharacterChatPage({ character, onBack }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: `Привет 💫 Я ${character.name}. ${character.role}. Чем займёмся?`,
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const tgUser = getTelegramUser();
    const characterMessage = `${character.prompt}\n\nПользователь пишет персонажу ${character.name}: ${text}`;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);

    try {
      const data = await sendChatMessage(
        characterMessage,
        `${tgUser.telegram_id}:${character.id}`
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.answer,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Я немного зависла... Попробуй ещё раз 💭",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="phone character-chat-screen fade-in">
      <header className="character-chat-header">
        <button className="icon-btn" type="button" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>

        <div className="character-chat-avatar">{character.mood}</div>

        <div>
          <h2>{character.name}</h2>
          <p>{loading ? "печатает..." : `${character.status} • ${character.role}`}</p>
        </div>
      </header>

      <section className="character-chat-hero glow">
        <Sparkles size={22} />
        <div>
          <p className="eyebrow">CHARACTER MODE</p>
          <h3>{character.name}</h3>
          <span>{character.role}</span>
        </div>
      </section>

      <section className="messages character-messages">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`message ${message.role} fade-in`}>
            {message.text}
          </div>
        ))}

        {loading && (
          <div className="message assistant typing-bubble">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}

        <div ref={bottomRef} />
      </section>

      <div className="chat-input">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleSend();
          }}
          placeholder={`Написать ${character.name}...`}
        />

        <button type="button" onClick={handleSend}>
          <Send size={20} />
        </button>
      </div>
    </main>
  );
}