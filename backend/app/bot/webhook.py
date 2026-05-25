from fastapi import APIRouter, Request
from aiogram.types import Update

from app.bot.bot import create_bot, create_dispatcher
from app.core.config import settings

router = APIRouter(prefix="/telegram", tags=["telegram"])

bot = create_bot()
dp = create_dispatcher()


@router.post("/webhook")
async def telegram_webhook(request: Request):
    data = await request.json()
    update = Update.model_validate(data)
    await dp.feed_update(bot, update)
    return {"ok": True}


@router.post("/set-webhook")
async def set_webhook():
    webhook_url = f"{settings.backend_url}/telegram/webhook"
    await bot.set_webhook(webhook_url)
    return {
        "ok": True,
        "webhook_url": webhook_url,
    }


@router.post("/delete-webhook")
async def delete_webhook():
    await bot.delete_webhook()
    return {"ok": True}