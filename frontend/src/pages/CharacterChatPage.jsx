import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Send, Sparkles } from "lucide-react";

import { getChatHistory, sendChatMessage } from "../api/chatApi";
import { getRelationship } from "../api/relationshipApi";
import { getTelegramUser } from "../utils/telegram";

export default function CharacterChatPage({ character, onBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [relationship, setRelationship] = useState(null);
  const [historyLoading, setHistoryLoading] = useState(true);

  const bottomRef = useRef(null);

  useEffect(() => {
    loadInitialData();
  }, [character.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function loadInitialData() {
    setHistoryLoading(true);

    await Promise.all([
      loadRelationship(),
      loadCharacterHistory(),
    ]);

    setHistoryLoading(false);
  }

  async function loadRelationship() {
    try {
      const data = await getRelationship(character.id);
      setRelationship(data);
    } catch {
      setRelationship(null);
    }
  }

  async function loadCharacterHistory() {
    try {
      const tgUser = getTelegramUser();
      const data = await getChatHistory(tgUser.telegram_id, character.id);

      const historyItems = data.items || [];

      if (historyItems.length === 0) {
        setMessages([
          {
            role: "assistant",
            text: `Привет 💫 Я ${character.name}. ${character.role}. Чем займёмся?`,
          },
        ]);

        return;
      }

      setMessages(
        historyItems.map((item) => ({
          role: item.role,
          text: cleanCharacterPrompt(item.content),
        }))
      );
    } catch {
      setMessages([
        {
          role: "assistant",
          text: `Привет 💫 Я ${character.name}. ${character.role}. Чем займёмся?`,
        },
      ]);
    }
  }

  function cleanCharacterPrompt(text) {
    const marker = `Пользователь пишет персонажу ${character.name}:`;

    if (text.includes(marker)) {
      return text.split(marker).pop().trim();
    }

    return text;
  }

  async function handleSend() {
    const text = input.trim();

    if (!text || loading) return;

    const tgUser = getTelegramUser();

    const characterMessage = `
${character.prompt}

Пользователь пишет персонажу ${character.name}: ${text}
`;

    setInput("");

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text,
      },
    ]);

    setLoading(true);

    try {
      const data = await sendChatMessage(
        characterMessage,
        tgUser.telegram_id,
        character.id
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.answer,
        },
      ]);

      await loadRelationship();
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
        <button
          className="icon-btn"
          type="button"
          onClick={onBack}
        >
          <ArrowLeft size={20} />
        </button>

        <div className="character-chat-avatar">
          {character.mood}
        </div>

        <div>
          <h2>{character.name}</h2>

          <p>
            {loading
              ? "печатает..."
              : `${character.status} • ${character.role}`}
          </p>
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

      {relationship && (
        <section className="relationship-card">
          <div>
            <span>Уровень</span>
            <strong>{relationship.level}</strong>
          </div>

          <div>
            <span>Доверие</span>
            <strong>{relationship.trust}%</strong>
          </div>

          <div>
            <span>Настроение</span>
            <strong>{relationship.mood}</strong>
          </div>
        </section>
      )}

      <section className="messages character-messages">
        {historyLoading && (
          <div className="message assistant">
            Загружаю историю общения...
          </div>
        )}

        {!historyLoading &&
          messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`message ${message.role} fade-in`}
            >
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
            if (event.key === "Enter") {
              handleSend();
            }
          }}
          placeholder={`Написать ${character.name}...`}
        />

        <button
          type="button"
          onClick={handleSend}
        >
          <Send size={20} />
        </button>
      </div>
    </main>
  );
}