import { useState } from "react";
import {
  Bot,
  Brain,
  BarChart3,
  MessageCircle,
  User,
  Plus,
  Search,
  Sparkles,
  ShieldCheck
} from "lucide-react";

import ChatPage from "./pages/ChatPage";

export default function App() {
  const [screen, setScreen] = useState("home");

  if (screen === "chat") {
    return (
      <div className="app">
        <ChatPage onBack={() => setScreen("home")} />
      </div>
    );
  }

  return (
    <div className="app">
      <main className="phone">
        <header className="topbar">
          <button className="icon-btn">☰</button>
          <div>
            <p className="eyebrow">AI ASSISTANT</p>
            <h1>Привет, Михаил 👋</h1>
          </div>
          <div className="avatar">M</div>
        </header>

        <section className="premium-card glow">
            <button className="main-btn" onClick={() => setScreen("chat")}>
  Открыть AI Chat
</button>
          <div>
            <p className="eyebrow">PREMIUM</p>
            <h2>AI Agent активен</h2>
            <span>GPT + память + задачи</span>
          </div>
          <Sparkles size={34} />
        </section>

        <section className="grid">
         <div className="feature-card" onClick={() => setScreen("chat")} role="button" tabIndex={0}>
  <Feature icon={<MessageCircle />} title="AI Chat" text="Общение с ассистентом" />
</div>

          <Feature icon={<Bot />} title="AI Agent" text="Выполнение задач" />
          <Feature icon={<Brain />} title="Память" text="Запоминает контекст" />
          <Feature icon={<BarChart3 />} title="Аналитика" text="Статистика запросов" />
        </section>

        <section className="panel">
          <div className="section-head">
            <h3>Быстрые задачи</h3>
            <span>Все</span>
          </div>

          <Task icon={<Search />} title="Найти информацию" text="AI агент соберёт данные" />
          <Task icon={<Sparkles />} title="Написать текст" text="Пост, письмо, сценарий" />
          <Task icon={<ShieldCheck />} title="Проанализировать файл" text="PDF, документ, таблица" />
        </section>

        <section className="agent-card">
          <div>
            <p className="eyebrow">AI AGENT</p>
            <h3>Создать новую задачу</h3>
            <span>Опиши цель — агент выполнит шаги</span>
          </div>
          <button className="main-btn">
            <Plus size={20} />
            Новая задача
          </button>
        </section>

        <nav className="bottom-nav">
          <Nav icon={<Sparkles />} label="Главная" active />
          <Nav icon={<MessageCircle />} label="Чат" onClick={() => setScreen("chat")} />
          <Nav icon={<Bot />} label="Агент" />
          <Nav icon={<Brain />} label="Память" />
          <Nav icon={<User />} label="Профиль" />
        </nav>
      </main>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <>
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </>
  );
}

function Task({ icon, title, text }) {
  return (
    <div className="task">
      <div className="task-icon">{icon}</div>
      <div>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
      <span>›</span>
    </div>
  );
}

function Nav({ icon, label, active, onClick }) {
  return (
    <button className={`nav-item ${active ? "active" : ""}`} onClick={onClick}>
      {icon}
      <span>{label}</span>
    </button>
  );
}