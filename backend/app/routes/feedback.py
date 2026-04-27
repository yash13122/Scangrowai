from fastapi import APIRouter

router = APIRouter()

FEEDBACK = []

@router.post("/feedback")
def feedback(data: dict):
    FEEDBACK.append(data)
    return {"status": "stored"}