from sqlalchemy import Column, DateTime, Integer, String, UniqueConstraint
from sqlalchemy.sql import func

from app.db.database import Base


class CharacterRelationship(Base):
    __tablename__ = "character_relationships"

    id = Column(Integer, primary_key=True, index=True)
    telegram_id = Column(String, index=True, nullable=False)
    character_slug = Column(String, index=True, nullable=False)

    xp = Column(Integer, default=0)
    level = Column(Integer, default=1)
    trust = Column(Integer, default=5)
    mood = Column(String, default="тёплое")
    messages_count = Column(Integer, default=0)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    __table_args__ = (
        UniqueConstraint("telegram_id", "character_slug", name="uq_user_character_relationship"),
    )