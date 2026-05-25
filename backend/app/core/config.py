from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "AI Agent TMA"
    env: str = "production"

    telegram_bot_token: str | None = None
    frontend_url: str = "https://ai-agent-tma.vercel.app"
    backend_url: str = "https://ai-agent-backend-ptl5.onrender.com"

    openai_api_key: str | None = None
    database_url: str | None = None

    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()