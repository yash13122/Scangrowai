def process(events):
    return [
        {"store_id": e["store_id"], "amount": e["amount"]}
        for e in events
    ]