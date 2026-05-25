from aiogram import Bot, Dispatcher, Router
from aiogram.filters import CommandStart
from aiogram.types import Message

from app.bot.keyboards import main_menu_keyboard
from app.core.config import settings

router = Router()


@router.message(CommandStart())
async def start_handler(message: Message) -> None:
    await message.answer(
        "Привет 👋\n\n"
        "Это AI Agent внутри Telegram Mini App.\n"
        "Нажми кнопку ниже, чтобы открыть приложение.",
        reply_markup=main_menu_keyboard(),
    )


def create_bot() -> Bot:
    if not settings.telegram_bot_token:
        raise RuntimeError("TELEGRAM_BOT_TOKEN is not set")

    return Bot(token=settings.telegram_bot_token)


def create_dispatcher() -> Dispatcher:
    dp = Dispatcher()
    dp.include_router(router)
    return dp