from fastapi import APIRouter
from backend.app.db import SessionLocal
from backend.app.models import Store
import uuid

router = APIRouter()

@router.post("/store/create")
def create_store(data: dict):
    sid = str(uuid.uuid4())
    db = SessionLocal()
    try:
        store = Store(id=sid, name=data.get("name", ""), upi=data.get("upi", ""))
        db.add(store)
        db.commit()
    finally:
        db.close()

    return {"store_id": sid}