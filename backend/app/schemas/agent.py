from pydantic import BaseModel, Field


class AgentRequest(BaseModel):
    task: str = Field(..., min_length=3, max_length=4000)


class AgentStep(BaseModel):
    title: str
    description: str
    status: str = "done"


class AgentResponse(BaseModel):
    steps: list[AgentStep]
    final_result: str