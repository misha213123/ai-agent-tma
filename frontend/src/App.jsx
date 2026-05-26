import { useState } from "react";
import {
  Bot,
  Brain,
  BarChart3,
  MessageCircle,
  User,
  Sparkles,
  ShieldCheck,
  Cpu,
  Zap,
  Settings,
} from "lucide-react";

import ChatPage from "./pages/ChatPage";
import AgentPage from "./pages/AgentPage";

export default function App() {
  const [screen, setScreen] = useState("home");

  if (screen === "chat") {
    return (
      <div className="app">
        <div className="background-glow" />
        <ChatPage onBack={() => setScreen("home")} />
      </div>
    );
  }

  if (screen === "agent") {
    return (
      <div className="app">
        <div className="background-glow" />
        <AgentPage onBack={() => setScreen("home")} />
      </div>
    );
  }

  return (
    <div className="app">
      <div className="background-glow" />

      <main className="phone fade-in">
        <header className="topbar">
          <button className="circle-btn" type="button">
            <Settings size={20} />
          </button>

          <div>
            <p className="eyebrow">AI СИСТЕМА</p>
            <h1>Привет, Михаил 👋</h1>
          </div>

          <div className="avatar pulse">M</div>
        </header>

        <section className="hero-card glow">
          <div>
            <p className="eyebrow">ПРЕМИУМ РЕЖИМ</p>
            <h2>AI Агент активен</h2>
            <span>Чат • Агент • Память • Автоматизация</span>
          </div>
          <Sparkles className="float" size={42} />
        </section>

        <section className="quick-actions">
          <button className="primary-action" type="button" onClick={() => setScreen("chat")}>
            <MessageCircle size={20} />
            Открыть AI чат
          </button>

          <button className="secondary-action" type="button" onClick={() => setScreen("agent")}>
            <Bot size={20} />
            Запустить агента
          </button>
        </section>

        <section className="feature-grid">
          <button className="feature-card" type="button" onClick={() => setScreen("chat")}>
            <div className="feature-icon">
              <MessageCircle />
            </div>
            <h3>AI Чат</h3>
            <p>Быстрые ответы, идеи, тексты и помощь</p>
          </button>

          <button className="feature-card" type="button" onClick={() => setScreen("agent")}>
            <div className="feature-icon">
              <Bot />
            </div>
            <h3>AI Агент</h3>
            <p>Разбивает задачу на шаги и выполняет план</p>
          </button>

          <button className="feature-card" type="button">
            <div className="feature-icon">
              <Brain />
            </div>
            <h3>Память</h3>
            <p>Будет помнить контекст и важные детали</p>
          </button>

          <button className="feature-card" type="button">
            <div className="feature-icon">
              <Cpu />
            </div>
            <h3>Автоматизация</h3>
            <p>Будущие инструменты, задачи и действия</p>
          </button>
        </section>

        <section className="panel">
          <div className="section-head">
            <h3>Что умеет MVP</h3>
          </div>

          <div className="task">
            <div className="task-icon">
              <ShieldCheck />
            </div>
            <div>
              <h4>AI анализ</h4>
              <p>Идеи, планы, тексты, сравнения и выводы</p>
            </div>
          </div>

          <div className="task">
            <div className="task-icon">
              <BarChart3 />
            </div>
            <div>
              <h4>Agent Mode</h4>
              <p>Показывает шаги выполнения задачи</p>
            </div>
          </div>

          <div className="task">
            <div className="task-icon">
              <Zap />
            </div>
            <div>
              <h4>Быстрый AI</h4>
              <p>Работает на дешёвой и быстрой модели GPT-4.1 mini</p>
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

          <button className="nav-item" type="button">
            <User size={18} />
            <span>Профиль</span>
          </button>
        </nav>
      </main>
    </div>
  );
}