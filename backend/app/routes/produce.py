from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.farmer import Farmer
from app.models.produce import Produce

router = APIRouter(
    prefix="/api/products",
    tags=["Products"],
)


@router.get("/")
def get_products(db: Session = Depends(get_db)):
    products = db.query(Produce).filter(
        Produce.status == "Active"
    ).all()

    return products


@router.get("/{product_id}")
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Produce).filter(
        Produce.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Produce not found",
        )

    return product


@router.post("/")
def create_product(
    farmer_id: int,
    crop: str,
    quantity: float,
    price: float,
    location: str,
    harvest_date: str,
    quality: str = "Grade A",
    db: Session = Depends(get_db),
):
    farmer = db.query(Farmer).filter(
        Farmer.id == farmer_id
    ).first()

    if not farmer:
        raise HTTPException(
            status_code=404,
            detail="Farmer not found",
        )

    if quantity <= 0:
        raise HTTPException(
            status_code=400,
            detail="Quantity must be greater than zero",
        )

    if price <= 0:
        raise HTTPException(
            status_code=400,
            detail="Price must be greater than zero",
        )

    new_product = Produce(
        farmer_id=farmer_id,
        crop=crop,
        quantity=quantity,
        price=price,
        location=location,
        harvest_date=harvest_date,
        quality=quality,
        status="Active",
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return {
        "message": "Produce listed successfully",
        "product": new_product,
    }
