from pydantic import BaseModel


class CharacterResponse(BaseModel):
    id: int
    slug: str
    name: str
    role: str
    tag: str | None = None
    mood: str | None = None
    status: str | None = None
    prompt: str
    is_premium: bool = False

    class Config:
        from_attributes = True