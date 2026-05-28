from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.services.relationship_service import RelationshipService
from app.db.database import get_db
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import ChatService
from app.services.memory_service import MemoryService

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
async def chat(request: ChatRequest, db: Session = Depends(get_db)):
    try:
        service = ChatService()

        answer = await service.generate_response(
            db=db,
            telegram_id=request.telegram_id,
            character_slug=request.character_slug,
            message=request.message,
        )

        if request.character_slug:
            relationship_service = RelationshipService()
            relationship_service.add_message_progress(
                db=db,
                telegram_id=request.telegram_id,
                character_slug=request.character_slug,
            )

        return ChatResponse(answer=answer)

    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))

@router.get("/history")
async def get_chat_history(
    telegram_id: str = "demo-user",
    character_slug: str | None = None,
    db: Session = Depends(get_db),
):
    try:
        memory = MemoryService()

        messages = memory.get_recent_messages(
            db=db,
            telegram_id=telegram_id,
            character_slug=character_slug,
            limit=30,
        )

        messages = list(reversed(messages))

        return {
            "items": [
                {
                    "id": message.id,
                    "role": message.role,
                    "content": message.content,
                    "character_slug": message.character_slug,
                    "created_at": str(message.created_at),
                }
                for message in messages
            ]
        }

    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))


@router.delete("/history")
async def clear_chat_history(
    telegram_id: str = "demo-user",
    character_slug: str | None = None,
    db: Session = Depends(get_db),
):
    try:
        memory = MemoryService()

        deleted_count = memory.clear_history(
            db=db,
            telegram_id=telegram_id,
            character_slug=character_slug,
        )

        return {
            "ok": True,
            "deleted_count": deleted_count,
        }

    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))