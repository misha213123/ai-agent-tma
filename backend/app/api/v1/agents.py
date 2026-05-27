import json

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.repositories.agent_task_repository import AgentTaskRepository
from app.schemas.agent import AgentHistoryResponse, AgentRequest, AgentResponse
from app.services.agent_service import AgentService

router = APIRouter(prefix="/agent", tags=["agent"])


@router.post("/run", response_model=AgentResponse)
async def run_agent(request: AgentRequest, db: Session = Depends(get_db)):
    try:
        service = AgentService()
        result = await service.run_agent(
    task=request.task,
    mode=request.mode,
)

        repository = AgentTaskRepository()
        repository.create_task(
            db=db,
            telegram_id=request.telegram_id,
            task=request.task,
            steps=result.get("steps", []),
            final_result=result.get("final_result", ""),
        )

        return AgentResponse(**result)

    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))


@router.get("/history", response_model=AgentHistoryResponse)
async def get_agent_history(
    telegram_id: str = "demo-user",
    db: Session = Depends(get_db),
):
    try:
        repository = AgentTaskRepository()
        tasks = repository.get_tasks(
            db=db,
            telegram_id=telegram_id,
            limit=20,
        )

        return {
            "items": [
                {
                    "id": item.id,
                    "task": item.task,
                    "steps": json.loads(item.steps_json),
                    "final_result": item.final_result,
                    "created_at": str(item.created_at),
                }
                for item in tasks
            ]
        }

    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))