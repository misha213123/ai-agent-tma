from fastapi import FastAPI

app = FastAPI(
    title="AI Agent TMA",
    version="1.0.0"
)

@app.get("/")
async def root():
    return {
        "status": "ok",
        "message": "AI Agent Backend Running"
    }

@app.get("/health")
async def health():
    return {
        "health": "healthy"
    }