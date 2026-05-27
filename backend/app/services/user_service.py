from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate


class UserService:
    def get_or_create_user(self, db: Session, payload: UserCreate) -> User:
        user = (
            db.query(User)
            .filter(User.telegram_id == payload.telegram_id)
            .first()
        )

        if user:
            user.first_name = payload.first_name
            user.username = payload.username
            db.commit()
            db.refresh(user)
            return user

        user = User(
            telegram_id=payload.telegram_id,
            first_name=payload.first_name,
            username=payload.username,
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return user