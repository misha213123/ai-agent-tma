from pydantic import BaseModel


class RelationshipResponse(BaseModel):
    telegram_id: str
    character_slug: str
    xp: int
    level: int
    trust: int
    mood: str
    messages_count: int

    class Config:
        from_attributes = True