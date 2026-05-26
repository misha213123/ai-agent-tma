import { useState } from "react";
import {
  Bot,
  Brain,
  MessageCircle,
  Sparkles,
  User,
  Zap,
  Workflow,
  Database,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

import ChatPage from "./pages/ChatPage";
import AgentPage from "./pages/AgentPage";
import HistoryPage from "./pages/HistoryPage";

export default function App() {
  const [screen, setScreen] = useState("home");

  if (screen === "chat") {
    return (
      <div className="app">
        <ChatPage onBack={() => setScreen("home")} />
      </div>
    );
  }

  if (screen === "agent") {
    return (
      <div className="app">
        <AgentPage onBack={() => setScreen("home")} />
      </div>
    );
  }

if (screen === "history") {
  return (
    <div className="app">
      <HistoryPage onBack={() => setScreen("home")} />
    </div>
  );
}


  return (
    <div className="app">
      <main className="phone fade-in">
        <div className="orb orb-one" />
        <div className="orb orb-two" />

        <header className="home-header">
          <div>
            <p className="eyebrow">AI AGENT TMA</p>
            <h1>Твой личный AI центр</h1>
            <span>Чат, агент, память и задачи в Telegram</span>
          </div>

          <div className="avatar pulse">M</div>
        </header>

        <section className="premium-hero glow">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={15} />
              Premium Neon AI
            </div>

            <h2>Умный ассистент нового уровня</h2>
            <p>
              Быстрые ответы, пошаговый агент, память диалога и будущие
              инструменты автоматизации.
            </p>

            <div className="hero-actions">
              <button type="button" onClick={() => setScreen("chat")}>
                <MessageCircle size={19} />
                Открыть чат
              </button>

              <button type="button" onClick={() => setScreen("agent")}>
                <Bot size={19} />
                Агент
              </button>
            </div>
          </div>
        </section>

        <section className="stats-row">
          <div>
            <strong>GPT</strong>
            <span>4.1 mini</span>
          </div>
          <div>
            <strong>DB</strong>
            <span>Supabase</span>
          </div>
          <div>
            <strong>LIVE</strong>
            <span>24/7</span>
          </div>
        </section>

        <section className="main-grid">
          <button className="big-card chat-card" type="button" onClick={() => setScreen("chat")}>
            <div className="card-icon">
              <MessageCircle />
            </div>
            <h3>AI Чат</h3>
            <p>Задавай вопросы, проси идеи, планы, тексты и объяснения.</p>
            <span>
              Перейти <ChevronRight size={16} />
            </span>
          </button>

          <button className="big-card agent-card-ui" type="button" onClick={() => setScreen("agent")}>
            <div className="card-icon">
              <Bot />
            </div>
            <h3>AI Агент</h3>
            <p>Дай задачу — агент разложит её на шаги и выдаст результат.</p>
            <span>
              Запустить <ChevronRight size={16} />
            </span>
          </button>
        </section>

        <section className="tools-section">
          <div className="section-title">
            <h3>Модули системы</h3>
            <p>Основа для будущего AI SaaS</p>
          </div>

          <div className="tool-list">
            <Tool icon={<Brain />} title="Память" text="AI помнит контекст через PostgreSQL" />
            <Tool icon={<Workflow />} title="Agent Flow" text="Шаги, план и финальный результат" />
            <Tool icon={<Database />} title="База данных" text="Supabase для истории и профиля" />
            <Tool icon={<ShieldCheck />} title="Production" text="Vercel + Render + Telegram WebApp" />
          </div>
        </section>

        <section className="bottom-panel">
          <div>
            <Zap size={22} />
            <div>
              <h4>Следующий уровень</h4>
              <p>Streaming, файлы, web search, voice и tool calling.</p>
            </div>
          </div>
        </section>

        <nav className="bottom-nav">
          <button className="nav-item active" type="button">
            <Sparkles size={18} />
            <span>Главная</span>
          </button>

          <button className="nav-item" type="button" onClick={() => setScreen("chat")}>
            <MessageCircle size={18} />
            <span>Чат</span>
          </button>

          <button className="nav-item" type="button" onClick={() => setScreen("agent")}>
            <Bot size={18} />
            <span>Агент</span>
          </button>

          <button className="nav-item" type="button" onClick={() => setScreen("history")}>
  <User size={18} />
  <span>История</span>
</button>
        </nav>
      </main>
    </div>
  );
}

function Tool({ icon, title, text }) {
  return (
    <div className="tool-item">
      <div className="tool-icon">{icon}</div>
      <div>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
}