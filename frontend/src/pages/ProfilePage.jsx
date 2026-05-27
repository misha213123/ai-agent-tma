import { useEffect, useState } from "react";
import { ArrowLeft, User, BadgeCheck, Database } from "lucide-react";
import { getTelegramUser } from "../utils/telegram";
import { getOrCreateUser } from "../api/userApi";

export default function ProfilePage({ onBack }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      const tgUser = getTelegramUser();
      const data = await getOrCreateUser(tgUser);
      setProfile(data);
    }

    loadProfile();
  }, []);

  return (
    <main className="phone fade-in">
      <header className="chat-header">
        <button className="icon-btn" type="button" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>

        <div className="chat-title">
          <div className="bot-avatar pulse">
            <User size={20} />
          </div>

          <div>
            <h2>Профиль</h2>
            <p>Telegram клиент</p>
          </div>
        </div>
      </header>

      <section className="chat-status-card glow">
        <BadgeCheck size={22} />
        <div>
          <p className="eyebrow">CLIENT PROFILE</p>
          <h3>{profile?.first_name || "Загрузка..."}</h3>
          <span>@{profile?.username || "без username"}</span>
        </div>
      </section>

      <section className="profile-list">
        <div className="profile-item">
          <span>Telegram ID</span>
          <strong>{profile?.telegram_id || "..."}</strong>
        </div>

        <div className="profile-item">
          <span>Имя</span>
          <strong>{profile?.first_name || "..."}</strong>
        </div>

        <div className="profile-item">
          <span>Username</span>
          <strong>{profile?.username || "..."}</strong>
        </div>

        <div className="profile-item">
          <span>Память</span>
          <strong>Персональная</strong>
        </div>
      </section>

      <section className="bottom-panel">
        <div>
          <Database size={22} />
          <div>
            <h4>Отдельная память</h4>
            <p>История чата будет привязана к Telegram ID клиента.</p>
          </div>
        </div>
      </section>
    </main>
  );
}