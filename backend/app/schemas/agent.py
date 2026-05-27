from pydantic import BaseModel, Field


class AgentRequest(BaseModel):
    task: str = Field(..., min_length=3, max_length=4000)
    telegram_id: str = "demo-user"
    mode: str = "fast"


class AgentStep(BaseModel):
    title: str
    description: str
    status: str = "done"


class AgentResponse(BaseModel):
    steps: list[AgentStep]
    final_result: str


class AgentHistoryItem(BaseModel):
    id: int
    task: str
    steps: list[AgentStep]
    final_result: str
    created_at: str


class AgentHistoryResponse(BaseModel):
    items: list[AgentHistoryItem]