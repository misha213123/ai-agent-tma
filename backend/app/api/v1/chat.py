from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import ChatService
from app.services.memory_service import MemoryService

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


@router.get("/history")
async def get_chat_history(db: Session = Depends(get_db)):
    try:
        telegram_id = "demo-user"
        memory = MemoryService()

        messages = memory.get_recent_messages(
            db=db,
            telegram_id=telegram_id,
            limit=30,
        )

        messages = list(reversed(messages))

        return {
            "items": [
                {
                    "id": message.id,
                    "role": message.role,
                    "content": message.content,
                    "created_at": str(message.created_at),
                }
                for message in messages
            ]
        }

    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))


@router.delete("/history")
async def clear_chat_history(db: Session = Depends(get_db)):
    try:
        telegram_id = "demo-user"
        memory = MemoryService()

        deleted_count = memory.clear_history(
            db=db,
            telegram_id=telegram_id,
        )

        return {
            "ok": True,
            "deleted_count": deleted_count,
        }

    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))