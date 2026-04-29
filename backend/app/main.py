from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.db import init_db
from backend.app.routes import router as dashboard_router, feedback_router, payment_router, store_router

init_db()

app = FastAPI(title="ScanGrow AI Platform")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(store_router)
app.include_router(payment_router)
app.include_router(dashboard_router)
app.include_router(feedback_router)

@app.get("/")
def root():
    return {"status": "ScanGrow AI running"}