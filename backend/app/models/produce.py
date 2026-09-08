from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database import Base


class Produce(Base):
    __tablename__ = "produce"

    id = Column(Integer, primary_key=True, index=True)

    farmer_id = Column(
        Integer,
        ForeignKey("farmers.id"),
        nullable=False,
        index=True,
    )

    crop = Column(String(100), nullable=False)

    quantity = Column(Float, nullable=False)

    price = Column(Float, nullable=False)

    location = Column(String(200), nullable=False)

    quality = Column(
        String(50),
        default="Grade A",
        nullable=False,
    )

    harvest_date = Column(String(20), nullable=False)

    status = Column(
        String(30),
        default="Active",
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
