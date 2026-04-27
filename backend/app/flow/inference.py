def inference(events):
    if not events:
        return {"trend": "no data"}

    total = sum(e["amount"] for e in events)
    avg = total / len(events)

    return {
        "total": total,
        "avg": avg,
        "trend": "growth" if avg > 200 else "low demand"
    }