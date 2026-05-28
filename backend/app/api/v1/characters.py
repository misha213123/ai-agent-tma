from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.character import CharacterResponse
from app.services.character_service import CharacterService

router = APIRouter(prefix="/characters", tags=["characters"])


@router.get("", response_model=list[CharacterResponse])
async def get_characters(db: Session = Depends(get_db)):
    service = CharacterService()
    return service.get_characters(db)


@router.get("/{slug}", response_model=CharacterResponse)
async def get_character(slug: str, db: Session = Depends(get_db)):
    service = CharacterService()
    character = service.get_character_by_slug(db, slug)

    if not character:
        raise HTTPException(status_code=404, detail="Character not found")

    return character