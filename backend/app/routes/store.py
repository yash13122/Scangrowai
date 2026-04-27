from fastapi import APIRouter
import uuid

router = APIRouter()

STORES = {}

@router.post("/store/create")
def create_store(data: dict):
    sid = str(uuid.uuid4())
    STORES[sid] = data
    return {"store_id": sid}