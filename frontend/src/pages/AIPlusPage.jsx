import {
  Bot,
  BrainCircuit,
  FileText,
  Search,
  Sparkles,
} from "lucide-react";

export default function AIPlusPage({ openAgent, openHistory }) {
  return (
    <section className="ai-plus-section">
      <div className="section-title">
        <h3>AI+ Workspace</h3>
        <p>Мощные инструменты поверх персонажей и памяти</p>
      </div>

      <div className="ai-tools-grid">
        <button className="ai-tool-card" type="button" onClick={openAgent}>
          <Bot size={24} />
          <h3>AI Agent</h3>
          <p>Планирование, reasoning, задачи и web research</p>
        </button>

        <button className="ai-tool-card" type="button">
          <Search size={24} />
          <h3>Web Research</h3>
          <p>Поиск и анализ актуальной информации</p>
        </button>

        <button className="ai-tool-card" type="button">
          <FileText size={24} />
          <h3>PDF AI</h3>
          <p>Будущий анализ документов, CV и ТЗ</p>
        </button>

        <button className="ai-tool-card" type="button" onClick={openHistory}>
          <BrainCircuit size={24} />
          <h3>Memory</h3>
          <p>История, контекст и персональная память</p>
        </button>
      </div>

      <section className="ai-plus-banner glow">
        <div className="ai-plus-icon">
          <Sparkles size={24} />
        </div>

        <div>
          <p className="eyebrow">SMART LAYER</p>
          <h3>AI+ не заменяет персонажей</h3>
          <span>
            Это скрытый мощный слой: агент, память, поиск, файлы и automation.
          </span>
        </div>
      </section>
    </section>
  );
}