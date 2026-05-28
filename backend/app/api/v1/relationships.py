from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.relationship import RelationshipResponse
from app.services.relationship_service import RelationshipService

router = APIRouter(prefix="/relationships", tags=["relationships"])


@router.get("/{character_slug}", response_model=RelationshipResponse)
async def get_relationship(
    character_slug: str,
    telegram_id: str,
    db: Session = Depends(get_db),
):
    service = RelationshipService()

    return service.get_or_create(
        db=db,
        telegram_id=telegram_id,
        character_slug=character_slug,
    )