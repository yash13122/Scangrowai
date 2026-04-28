from fastapi import APIRouter
from backend.app.db import SessionLocal
from backend.app.models import Transaction
from ..flow.ingestion import ingest
import uuid

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

    db = SessionLocal()
    try:
        txn = Transaction(
            id=str(uuid.uuid4()),
            store_id=event["store_id"],
            amount=event["amount"],
            status="confirmed"
        )
        db.add(txn)
        db.commit()
    finally:
        db.close()

    return {"status": "saved", "transaction_id": txn.id}