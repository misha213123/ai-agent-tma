from sqlalchemy.orm import Session

from app.models.message import Message


class MemoryService:
    def save_message(
        self,
        db: Session,
        telegram_id: str,
        role: str,
        content: str,
        character_slug: str | None = None,
    ) -> Message:
        message = Message(
            telegram_id=telegram_id,
            character_slug=character_slug,
            role=role,
            content=content,
        )

        db.add(message)
        db.commit()
        db.refresh(message)

        return message

    def get_recent_messages(
        self,
        db: Session,
        telegram_id: str,
        character_slug: str | None = None,
        limit: int = 20,
    ) -> list[Message]:
        query = db.query(Message).filter(Message.telegram_id == telegram_id)

        if character_slug:
            query = query.filter(Message.character_slug == character_slug)
        else:
            query = query.filter(Message.character_slug.is_(None))

        return (
            query
            .order_by(Message.id.desc())
            .limit(limit)
            .all()
        )

    def clear_history(
        self,
        db: Session,
        telegram_id: str,
        character_slug: str | None = None,
    ) -> int:
        query = db.query(Message).filter(Message.telegram_id == telegram_id)

        if character_slug:
            query = query.filter(Message.character_slug == character_slug)
        else:
            query = query.filter(Message.character_slug.is_(None))

        deleted_count = query.delete()
        db.commit()

        return deleted_count