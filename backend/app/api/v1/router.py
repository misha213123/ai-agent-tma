from fastapi import APIRouter

from app.api.v1.chat import router as chat_router
from app.api.v1.agents import router as agent_router
from app.api.v1.users import router as users_router
from app.api.v1.characters import router as characters_router

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(chat_router)
api_router.include_router(agent_router)
api_router.include_router(users_router)
api_router.include_router(characters_router)