import { useEffect, useState } from "react";
import {
  Heart,
  MessageCircleMore,
  Crown,
  Flame,
} from "lucide-react";

import { getCharacters } from "../api/characterApi";

export default function CharactersPage({ onOpenCharacter }) {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function loadCharacters() {
      try {
        const data = await getCharacters();
        setCharacters(data);
      } catch {
        setCharacters([]);
      }
    }

    loadCharacters();
  }, []);

  return (
    <section className="characters-preview">
      <div className="section-title">
        <h3>AI Персонажи</h3>
        <p>Компаньоны с памятью, характером и AI возможностями</p>
      </div>

      <div className="characters-scroll">
        {characters.map((character) => (
          <button
            className="character-preview-card"
            type="button"
            key={character.slug}
            onClick={() =>
              onOpenCharacter({
                id: character.slug,
                name: character.name,
                role: character.role,
                tag: character.tag,
                mood: character.mood,
                status: character.status,
                prompt: character.prompt,
              })
            }
          >
            <div className="character-card-top">
              <div className="character-preview-avatar">{character.mood}</div>
              <div className="character-mini-badge">{character.tag}</div>
            </div>

            <h4>{character.name}</h4>
            <span>{character.role}</span>

            <div className="character-mini-footer">
              <div>
                <Heart size={14} />
                98%
              </div>
              <div>
                <MessageCircleMore size={14} />
                Online
              </div>
            </div>
          </button>
        ))}
      </div>

      {characters.length === 0 && (
        <p className="empty-text">Персонажи загружаются...</p>
      )}

      <section className="premium-character-banner glow">
        <div className="premium-icon">
          <Crown size={24} />
        </div>

        <div>
          <p className="eyebrow">AI COMPANION</p>
          <h3>Персонажи + агентный мозг</h3>
          <span>
            Общение, память, эмоции, задачи, web research и AI+ инструменты.
          </span>
        </div>
      </section>

      <section className="characters-categories">
        <div className="category-pill active">
          <Flame size={15} />
          Популярные
        </div>
        <div className="category-pill">💕 Романтика</div>
        <div className="category-pill">🧠 Наставники</div>
        <div className="category-pill">🎮 Аниме</div>
      </section>
    </section>
  );
}