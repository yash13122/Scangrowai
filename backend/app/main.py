from fastapi import FastAPI
from backend.app.routes import store, payment, dashboard, feedback

app = FastAPI(title="ScanGrow AI Platform")

app.include_router(store.router)
app.include_router(payment.router)
app.include_router(dashboard.router)
app.include_router(feedback.router)

@app.get("/")
def root():
    return {"status": "ScanGrow AI running"}