from fastapi import APIRouter
from app.flow.ingestion import ingest

router = APIRouter()

TRANSACTIONS = []

@router.get("/pay/{store_id}")
def pay(store_id: str, amount: float):
    return {
        "upi": f"upi://pay?pa=test@upi&am={amount}&cu=INR"
    }

@router.post("/confirm")
def confirm(data: dict):

    event = {
        "store_id": data["store_id"],
        "amount": data["amount"]
    }

    ingest(event)
    TRANSACTIONS.append(event)

    return {"status": "saved"}