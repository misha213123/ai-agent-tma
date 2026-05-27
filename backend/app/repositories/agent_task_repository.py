import json

from sqlalchemy.orm import Session

from app.models.agent_task import AgentTask


class AgentTaskRepository:
    def create_task(
        self,
        db: Session,
        telegram_id: str,
        task: str,
        steps: list[dict],
        final_result: str,
    ) -> AgentTask:
        item = AgentTask(
            telegram_id=telegram_id,
            task=task,
            steps_json=json.dumps(steps, ensure_ascii=False),
            final_result=final_result,
        )

        db.add(item)
        db.commit()
        db.refresh(item)

        return item

    def get_tasks(self, db: Session, telegram_id: str, limit: int = 20) -> list[AgentTask]:
        return (
            db.query(AgentTask)
            .filter(AgentTask.telegram_id == telegram_id)
            .order_by(AgentTask.id.desc())
            .limit(limit)
            .all()
        )