from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.db.database import Base


class AgentTask(Base):
    __tablename__ = "agent_tasks"

    id = Column(Integer, primary_key=True, index=True)
    telegram_id = Column(String, index=True, nullable=False)

    task = Column(Text, nullable=False)
    steps_json = Column(Text, nullable=False)
    final_result = Column(Text, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())