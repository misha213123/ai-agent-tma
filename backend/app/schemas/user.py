from pydantic import BaseModel


class UserCreate(BaseModel):
    telegram_id: str
    first_name: str | None = None
    username: str | None = None


class UserResponse(BaseModel):
    telegram_id: str
    first_name: str | None = None
    username: str | None = None

    class Config:
        from_attributes = True