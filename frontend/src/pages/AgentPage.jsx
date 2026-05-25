import { useState } from "react";
import { ArrowLeft, Bot, Loader2, Send, Sparkles, CheckCircle2 } from "lucide-react";
import { runAgentTask } from "../api/agentApi";

export default function AgentPage({ onBack }) {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState("");

  async function handleRun() {
    const text = task.trim();
    if (!text || loading) return;

    setLoading(true);
    setSteps([]);
    setResult("");

    try {
      const data = await runAgentTask(text);
      setSteps(data.steps || []);
      setResult(data.final_result || "");
    } catch (error) {
      setResult("Ошибка Agent Mode. Проверь backend и endpoint /api/v1/agent/run.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="phone agent-screen">
      <header className="chat-header">
        <button className="icon-btn" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>

        <div className="chat-title">
          <div className="bot-avatar">
            <Bot size={20} />
          </div>
          <div>
            <h2>AI Agent</h2>
            <p>{loading ? "выполняет задачу..." : "готов к работе"}</p>
          </div>
        </div>
      </header>

      <section className="agent-hero glow">
        <Sparkles size={30} />
        <div>
          <p className="eyebrow">AGENT MODE</p>
          <h1>Дай задачу — агент разложит её по шагам</h1>
          <span>Анализ → План → Выполнение → Итог</span>
        </div>
      </section>

      <section className="agent-input-panel">
        <textarea
          value={task}
          onChange={(event) => setTask(event.target.value)}
          placeholder="Например: найди 5 идей для AI Mini App, оцени спрос, сложность и выбери лучшую..."
        />

        <button className="main-btn" onClick={handleRun}>
          {loading ? <Loader2 className="spin" size={20} /> : <Send size={20} />}
          Запустить агента
        </button>
      </section>

      <section className="agent-steps">
        {loading && (
          <div className="agent-loading">
            <Loader2 className="spin" size={22} />
            <span>AI агент думает и строит план...</span>
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
    </main>
  );
}