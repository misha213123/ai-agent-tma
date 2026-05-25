from fastapi import APIRouter, Request
from aiogram.types import Update

from app.bot.bot import create_bot, create_dispatcher
from app.core.config import settings

router = APIRouter(prefix="/telegram", tags=["telegram"])


@router.post("/webhook")
async def telegram_webhook(request: Request):
    bot = create_bot()
    dp = create_dispatcher()

    data = await request.json()
    update = Update.model_validate(data)
    await dp.feed_update(bot, update)

    return {"ok": True}


@router.get("/set-webhook")
async def set_webhook_get():
    bot = create_bot()
    webhook_url = f"{settings.backend_url}/telegram/webhook"
    await bot.set_webhook(webhook_url)

    return {"ok": True, "webhook_url": webhook_url}


@router.get("/delete-webhook")
async def delete_webhook_get():
    bot = create_bot()
    await bot.delete_webhook()

    return {"ok": True}