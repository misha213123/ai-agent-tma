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
import ProfilePage from "./pages/ProfilePage";
import CharactersPage from "./pages/CharactersPage";
import AIPlusPage from "./pages/AIPlusPage";
import CharacterChatPage from "./pages/CharacterChatPage";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedCharacter, setSelectedCharacter] = useState(null);

function openCharacter(character) {
  setSelectedCharacter(character);
  setScreen("character-chat");
}

  if (screen === "chat") {
    return (
      <div className="app">
        <ChatPage onBack={() => setScreen("home")} />
      </div>
    );
  }

  if (screen === "profile") {
    return (
      <div className="app">
        <ProfilePage onBack={() => setScreen("home")} />
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

  if (screen === "ai-plus") {
    return (
      <div className="app">
        <main className="phone fade-in">
          <AIPlusPage
            openAgent={() => setScreen("agent")}
            openHistory={() => setScreen("history")}
          />

          <nav className="bottom-nav">
            <button className="nav-item" type="button" onClick={() => setScreen("home")}>
              <Sparkles size={18} />
              <span>Главная</span>
            </button>

            <button className="nav-item" type="button" onClick={() => setScreen("chat")}>
              <MessageCircle size={18} />
              <span>Чат</span>
            </button>

            <button className="nav-item active" type="button">
              <Bot size={18} />
              <span>AI+</span>
            </button>

            <button className="nav-item" type="button" onClick={() => setScreen("profile")}>
              <User size={18} />
              <span>Профиль</span>
            </button>
          </nav>
        </main>
      </div>
    );
  }


if (screen === "character-chat" && selectedCharacter) {
  return (
    <div className="app">
      <CharacterChatPage
        character={selectedCharacter}
        onBack={() => setScreen("home")}
      />
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
            <p className="eyebrow">AI COMPANION TMA</p>
            <h1>AI персонажи и агентный мозг</h1>
            <span>Общение, память, задачи и AI+ инструменты в Telegram</span>
          </div>

          <div className="avatar pulse">M</div>
        </header>

        <section className="premium-hero glow">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={15} />
              Companion + Agent
            </div>

            <h2>Живые AI персонажи с полезным мозгом</h2>
            <p>
              Не просто чат: персонажи помнят пользователя, общаются с характером
              и могут использовать AI Agent для задач.
            </p>

            <div className="hero-actions">
              <button type="button" onClick={() => setScreen("chat")}>
                <MessageCircle size={19} />
                Открыть чат
              </button>

              <button type="button" onClick={() => setScreen("ai-plus")}>
                <Bot size={19} />
                AI+
              </button>
            </div>
          </div>
        </section>

        <section className="stats-row">
          <div>
            <strong>AI</strong>
            <span>Characters</span>
          </div>
          <div>
            <strong>DB</strong>
            <span>Memory</span>
          </div>
          <div>
            <strong>LIVE</strong>
            <span>TMA</span>
          </div>
        </section>

        <section className="main-grid">
          <button className="big-card chat-card" type="button" onClick={() => setScreen("chat")}>
            <div className="card-icon">
              <MessageCircle />
            </div>
            <h3>AI Чат</h3>
            <p>Общение, память, тексты, идеи, планы и быстрые ответы.</p>
            <span>
              Перейти <ChevronRight size={16} />
            </span>
          </button>

          <button className="big-card agent-card-ui" type="button" onClick={() => setScreen("agent")}>
            <div className="card-icon">
              <Bot />
            </div>
            <h3>AI Агент</h3>
            <p>Задачи, reasoning, web research, шаги и результат.</p>
            <span>
              Запустить <ChevronRight size={16} />
            </span>
          </button>
        </section>

        <CharactersPage onOpenCharacter={openCharacter} />

        <section className="tools-section">
          <div className="section-title">
            <h3>Модули системы</h3>
            <p>Основа для AI Companion + AI OS</p>
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
              <p>Character chat, voice, images, files, subscriptions и tool calling.</p>
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

          <button className="nav-item" type="button" onClick={() => setScreen("ai-plus")}>
            <Bot size={18} />
            <span>AI+</span>
          </button>

          <button className="nav-item" type="button" onClick={() => setScreen("profile")}>
            <User size={18} />
            <span>Профиль</span>
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