from fastapi import APIRouter
from app.flow import processor, inference, bi_layer, ai_agents, rag_engine, recommendation

router = APIRouter()

@router.get("/dashboard/{store_id}")
def dashboard(store_id: str):

    events = []  # replace with DB fetch

    processed = processor.process(events)
    inf = inference.inference(processed)
    bi = bi_layer.build_bi(inf)
    agents = ai_agents.run_agents(bi)
    rag = rag_engine.rag(agents)
    final = recommendation.recommend(rag)

    return {
        "bi": bi,
        "ai": agents,
        "final": final
    }