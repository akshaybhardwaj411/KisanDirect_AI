from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)

    order_number = Column(
        String(30),
        unique=True,
        nullable=False,
        index=True,
    )

    produce_id = Column(
        Integer,
        ForeignKey("produce.id"),
        nullable=False,
        index=True,
    )

    buyer_name = Column(String(100), nullable=False)

    buyer_phone = Column(String(20), nullable=False)

    buyer_location = Column(String(200), nullable=False)

    quantity = Column(Float, nullable=False)

    price_per_kg = Column(Float, nullable=False)

    total_amount = Column(Float, nullable=False)

    status = Column(
        String(30),
        default="Pending",
        nullable=False,
    )

    logistics_status = Column(
        String(50),
        default="Not Scheduled",
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
  )
