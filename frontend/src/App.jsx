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
} from "lucide-react";

import ChatPage from "./pages/ChatPage";
import AgentPage from "./pages/AgentPage";

export default function App() {
  const [screen, setScreen] = useState("home");

  if (screen === "chat") {
    return (
      <div className="app">
        <div className="background-glow"></div>
        <ChatPage onBack={() => setScreen("home")} />
      </div>
    );
  }

  if (screen === "agent") {
    return (
      <div className="app">
        <div className="background-glow"></div>
        <AgentPage onBack={() => setScreen("home")} />
      </div>
    );
  }

  return (
    <div className="app">
      <div className="background-glow"></div>

      <main className="phone">
        <header className="topbar">
          <div>
            <p className="eyebrow">NEURAL SYSTEM</p>
            <h1>AI Agent</h1>
          </div>

          <div className="avatar">M</div>
        </header>

        <section className="hero-card glow">
          <div>
            <p className="eyebrow">PREMIUM AI</p>
            <h2>Neon Intelligence</h2>
            <span>GPT + Agent + Memory + Tasks</span>
          </div>

          <Sparkles size={42} />
        </section>

        <section className="feature-grid">
          <div
            className="feature-card"
            onClick={() => setScreen("chat")}
          >
            <div className="feature-icon">
              <MessageCircle />
            </div>

            <h3>AI Chat</h3>
            <p>Быстрый умный ассистент</p>
          </div>

          <div
            className="feature-card"
            onClick={() => setScreen("agent")}
          >
            <div className="feature-icon">
              <Bot />
            </div>

            <h3>AI Agent</h3>
            <p>Выполнение задач по шагам</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Brain />
            </div>

            <h3>Memory</h3>
            <p>Память диалога</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Cpu />
            </div>

            <h3>Automation</h3>
            <p>Автоматические действия</p>
          </div>
        </section>

        <section className="panel">
          <div className="section-head">
            <h3>Возможности</h3>
          </div>

          <div className="task">
            <div className="task-icon">
              <ShieldCheck />
            </div>

            <div>
              <h4>AI Analysis</h4>
              <p>Анализ идей, текста и задач</p>
            </div>
          </div>

          <div className="task">
            <div className="task-icon">
              <BarChart3 />
            </div>

            <div>
              <h4>Agent Planning</h4>
              <p>Планирование шагов выполнения</p>
            </div>
          </div>
        </section>

        <nav className="bottom-nav">
          <button className="nav-item active">
            <Sparkles size={18} />
            <span>Главная</span>
          </button>

          <button
            className="nav-item"
            onClick={() => setScreen("chat")}
          >
            <MessageCircle size={18} />
            <span>Чат</span>
          </button>

          <button
            className="nav-item"
            onClick={() => setScreen("agent")}
          >
            <Bot size={18} />
            <span>Агент</span>
          </button>

          <button className="nav-item">
            <User size={18} />
            <span>Профиль</span>
          </button>
        </nav>
      </main>
    </div>
  );
}