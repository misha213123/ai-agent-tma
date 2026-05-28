import {
  Heart,
  MessageCircleMore,
  Crown,
  Flame,
} from "lucide-react";

import { characters } from "../data/characters";

export default function CharactersPage({ onOpenCharacter }) {
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
            key={character.id}
            onClick={() => onOpenCharacter(character)}
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