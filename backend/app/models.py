from sqlalchemy import Column, String, Float, DateTime
from sqlalchemy.orm import declarative_base
import datetime

Base = declarative_base()

class Store(Base):
    __tablename__ = "stores"
    id = Column(String, primary_key=True)
    name = Column(String)
    upi = Column(String)

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(String, primary_key=True)
    store_id = Column(String)
    amount = Column(Float)
    status = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)