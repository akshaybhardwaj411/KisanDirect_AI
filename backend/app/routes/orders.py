from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.order import Order
from app.models.produce import Produce

router = APIRouter(
    prefix="/api/orders",
    tags=["Orders"],
)


@router.get("/")
def get_orders(db: Session = Depends(get_db)):
    return db.query(Order).order_by(
        Order.created_at.desc()
    ).all()


@router.get("/{order_id}")
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
):
    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found",
        )

    return order


@router.post("/")
def create_order(
    produce_id: int,
    buyer_name: str,
    buyer_phone: str,
    buyer_location: str,
    quantity: float,
    db: Session = Depends(get_db),
):
    produce = db.query(Produce).filter(
        Produce.id == produce_id
    ).first()

    if not produce:
        raise HTTPException(
            status_code=404,
            detail="Produce not found",
        )

    if produce.status != "Active":
        raise HTTPException(
            status_code=400,
            detail="This produce is no longer available",
        )

    if quantity <= 0:
        raise HTTPException(
            status_code=400,
            detail="Quantity must be greater than zero",
        )

    if quantity > produce.quantity:
        raise HTTPException(
            status_code=400,
            detail="Requested quantity exceeds available produce",
        )

    total_amount = quantity * produce.price

    order_count = db.query(Order).count() + 1
    order_number = f"KD-{1000 + order_count}"

    order = Order(
        order_number=order_number,
        produce_id=produce.id,
        buyer_name=buyer_name,
        buyer_phone=buyer_phone,
        buyer_location=buyer_location,
        quantity=quantity,
        price_per_kg=produce.price,
        total_amount=total_amount,
        status="Pending",
        logistics_status="Not Scheduled",
    )

    produce.quantity -= quantity

    if produce.quantity == 0:
        produce.status = "Sold"

    db.add(order)
    db.commit()
    db.refresh(order)

    return {
        "message": "Order created successfully",
        "order": order,
    }


@router.patch("/{order_id}/status")
def update_order_status(
    order_id: int,
    status: str,
    db: Session = Depends(get_db),
):
    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found",
        )

    allowed_statuses = {
        "Pending",
        "Confirmed",
        "In Transit",
        "Delivered",
        "Cancelled",
    }

    if status not in allowed_statuses:
        raise HTTPException(
            status_code=400,
            detail="Invalid order status",
        )

    order.status = status

    db.commit()
    db.refresh(order)

    return {
        "message": "Order status updated successfully",
        "order": order,
    }
