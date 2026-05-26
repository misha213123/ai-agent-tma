from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router
from app.bot.webhook import router as telegram_router
from app.core.config import settings
from app.db.database import Base, engine
from app.models import Message, User

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.frontend_url,
        "https://ai-agent-tma.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
app.include_router(telegram_router)


@app.get("/")
async def root():
    return {
        "status": "ok",
        "message": "AI Agent Backend Running",
    }


@app.get("/health")
async def health():
    return {
        "health": "healthy",
    }