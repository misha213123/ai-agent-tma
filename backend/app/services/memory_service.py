from sqlalchemy.orm import Session

from app.models.message import Message


class MemoryService:
    def save_message(self, db: Session, telegram_id: str, role: str, content: str) -> Message:
        message = Message(
            telegram_id=telegram_id,
            role=role,
            content=content,
        )

        db.add(message)
        db.commit()
        db.refresh(message)

        return message

    def get_recent_messages(self, db: Session, telegram_id: str, limit: int = 20) -> list[Message]:
        return (
            db.query(Message)
            .filter(Message.telegram_id == telegram_id)
            .order_by(Message.id.desc())
            .limit(limit)
            .all()
        )

    def clear_history(self, db: Session, telegram_id: str) -> int:
        deleted_count = (
            db.query(Message)
            .filter(Message.telegram_id == telegram_id)
            .delete()
        )

        db.commit()
        return deleted_count