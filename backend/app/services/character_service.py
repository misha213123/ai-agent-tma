from sqlalchemy.orm import Session

from app.models.character import Character


class CharacterService:
    def get_characters(self, db: Session) -> list[Character]:
        return db.query(Character).order_by(Character.id.asc()).all()

    def get_character_by_slug(self, db: Session, slug: str) -> Character | None:
        return db.query(Character).filter(Character.slug == slug).first()