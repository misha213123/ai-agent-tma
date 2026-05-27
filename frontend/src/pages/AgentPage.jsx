import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  Clock3,
  Loader2,
  Send,
  Sparkles,
} from "lucide-react";
import { getAgentHistory, runAgentTask } from "../api/agentApi";

export default function AgentPage({ onBack }) {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [mode, setMode] = useState("fast");

  async function loadHistory() {
    try {
      const data = await getAgentHistory();
      setHistory(data.items || []);
    } catch {
      setHistory([]);
    }
  }

  async function handleRun() {
    const text = task.trim();
    if (!text || loading) return;

    setLoading(true);
    setSteps([]);
    setResult("");

    try {
      const data = await runAgentTask(text, mode);
      setSteps(data.steps || []);
      setResult(data.final_result || "");
      setTask("");
      await loadHistory();
    } catch {
      setResult("Ошибка Agent Mode. Проверь backend и endpoint /api/v1/agent/run.");
    } finally {
      setLoading(false);
    }
  }

  function openHistoryItem(item) {
    setTask(item.task);
    setSteps(item.steps || []);
    setResult(item.final_result || "");
  }

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <main className="phone agent-screen fade-in">
      <header className="chat-header">
        <button className="icon-btn" type="button" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>

        <div className="chat-title">
          <div className="bot-avatar pulse">
            <Bot size={20} />
          </div>

          <div>
            <h2>AI Агент</h2>
            <p>{loading ? "выполняет задачу..." : "workspace онлайн"}</p>
          </div>
        </div>
      </header>

      <section className="agent-hero glow">
        <Sparkles size={28} />

        <div>
          <p className="eyebrow">AGENT WORKSPACE</p>
          <h1>Задача → шаги → результат</h1>
          <span>Агент сохраняет задачи и историю выполнения.</span>
        </div>
      </section>

<div className="agent-mode-switch">
  <button
    type="button"
    className={mode === "fast" ? "active" : ""}
    onClick={() => setMode("fast")}
  >
    ⚡ Fast
  </button>

  <button
    type="button"
    className={mode === "smart" ? "active" : ""}
    onClick={() => setMode("smart")}
  >
    🧠 Smart
  </button>
</div>


      <section className="agent-input-panel">
        <textarea
          value={task}
          onChange={(event) => setTask(event.target.value)}
          placeholder="Например: проанализируй 3 идеи для AI Mini App и выбери лучшую..."
        />

        <button className="main-btn" type="button" onClick={handleRun}>
          {loading ? <Loader2 className="spin" size={20} /> : <Send size={20} />}
          Запустить агента
        </button>
      </section>

      <section className="agent-steps">
        {loading && (
          <div className="agent-loading">
            <Loader2 className="spin" size={22} />
            <span>AI агент строит план и выполняет задачу...</span>
          </div>
        )}

        {steps.map((step, index) => (
          <div className="agent-step fade-in" key={`${step.title}-${index}`}>
            <div className="step-index">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}

        {result && (
          <div className="agent-result fade-in">
            <p className="eyebrow">FINAL RESULT</p>
            <h3>Результат</h3>
            <p>{result}</p>
          </div>
        )}
      </section>

      <section className="agent-history">
        <div className="section-title">
          <h3>История агента</h3>
          <p>Последние выполненные задачи</p>
        </div>

        {history.length === 0 && (
          <p className="empty-text">История агента пока пустая</p>
        )}

        {history.map((item) => (
          <button
            className="agent-history-card"
            type="button"
            key={item.id}
            onClick={() => openHistoryItem(item)}
          >
            <div className="agent-history-icon">
              <Clock3 size={18} />
            </div>

            <div>
              <h4>{item.task}</h4>
              <p>{item.steps?.length || 0} шагов • сохранённый результат</p>
            </div>
          </button>
        ))}
      </section>
    </main>
  );
}