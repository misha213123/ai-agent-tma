from fastapi import APIRouter, HTTPException

from app.schemas.agent import AgentRequest, AgentResponse
from app.services.agent_service import AgentService

router = APIRouter(prefix="/agent", tags=["agent"])


@router.post("/run", response_model=AgentResponse)
async def run_agent(request: AgentRequest):
    try:
        service = AgentService()
        result = await service.run_agent(request.task)
        return AgentResponse(**result)
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))