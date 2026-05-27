from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000)
    telegram_id: str = "demo-user"


class ChatResponse(BaseModel):
    answer: str