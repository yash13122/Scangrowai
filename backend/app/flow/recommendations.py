def recommend(rag_output):
    return {
        "actions": rag_output["recommendation"]
    }