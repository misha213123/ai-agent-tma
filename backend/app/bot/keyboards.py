from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo

from app.core.config import settings


def main_menu_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="🚀 Открыть AI Agent",
                    web_app=WebAppInfo(url=settings.frontend_url),
                )
            ]
        ]
    )