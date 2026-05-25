from fastapi import APIRouter, HTTPException

from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import ChatService

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        service = ChatService()
        answer = await service.generate_response(request.message)
        return ChatResponse(answer=answer)
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))