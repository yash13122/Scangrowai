from fastapi import APIRouter
from backend.app.db import SessionLocal
from backend.app.models import Transaction
from ..flow import processor, inference, bi_layer, ai_agents, rag_engine, recommendations

router = APIRouter()

@router.get("/dashboard/{store_id}")
def dashboard(store_id: str):
    db = SessionLocal()
    try:
        transactions = db.query(Transaction).filter(Transaction.store_id == store_id).all()
        events = [{"amount": float(tx.amount), "store_id": tx.store_id} for tx in transactions]
    finally:
        db.close()

    processed = processor.process(events)
    inf = inference.inference(processed)
    bi = bi_layer.build_bi(inf)
    agents = ai_agents.run_agents(bi)
    rag = rag_engine.rag(agents)
    final = recommendations.recommend(rag)

    return {
        "bi": bi,
        "ai": agents,
        "final": final
    }