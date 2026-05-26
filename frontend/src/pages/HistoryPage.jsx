import { useEffect, useState } from "react";
import { ArrowLeft, Trash2, Clock3 } from "lucide-react";
import { clearChatHistory, getChatHistory } from "../api/chatApi";

export default function HistoryPage({ onBack }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadHistory() {
    setLoading(true);

    try {
      const data = await getChatHistory();
      setItems(data.items || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleClear() {
    await clearChatHistory();
    setItems([]);
  }

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <main className="phone fade-in">
      <header className="chat-header">
        <button className="icon-btn" type="button" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>

        <div className="chat-title">
          <div className="bot-avatar pulse">
            <Clock3 size={20} />
          </div>

          <div>
            <h2>История</h2>
            <p>Память AI чата</p>
          </div>
        </div>
      </header>

      <section className="chat-status-card glow">
        <Clock3 size={22} />
        <div>
          <p className="eyebrow">MEMORY LOG</p>
          <h3>Сохранённые сообщения</h3>
          <span>Здесь видно, что AI реально хранит контекст</span>
        </div>
      </section>

      <button className="danger-btn" type="button" onClick={handleClear}>
        <Trash2 size={18} />
        Очистить память
      </button>

      <section className="history-list">
        {loading && <p className="empty-text">Загрузка истории...</p>}

        {!loading && items.length === 0 && (
          <p className="empty-text">История пока пустая</p>
        )}

        {items.map((item) => (
          <div key={item.id} className={`history-item ${item.role}`}>
            <span>{item.role === "user" ? "Вы" : "AI"}</span>
            <p>{item.content}</p>
          </div>
        ))}
      </section>
    </main>
  );
}