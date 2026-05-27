from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.user import UserCreate, UserResponse
from app.services.user_service import UserService

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/me", response_model=UserResponse)
async def get_me(payload: UserCreate, db: Session = Depends(get_db)):
    service = UserService()
    user = service.get_or_create_user(db=db, payload=payload)
    return user