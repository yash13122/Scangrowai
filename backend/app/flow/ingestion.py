EVENT_STREAM = []

def ingest(event):
    EVENT_STREAM.append(event)
    return event