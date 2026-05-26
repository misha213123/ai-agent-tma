from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import ChatService

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
async def chat(request: ChatRequest, db: Session = Depends(get_db)):
    try:
        service = ChatService()

        telegram_id = "demo-user"

        answer = await service.generate_response(
            db=db,
            telegram_id=telegram_id,
            message=request.message,
        )

        return ChatResponse(answer=answer)

    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))