from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.farmer import Farmer

router = APIRouter(
    prefix="/api/farmers",
    tags=["Farmers"],
)


@router.get("/")
def get_farmers(db: Session = Depends(get_db)):
    farmers = db.query(Farmer).all()

    return farmers


@router.get("/{farmer_id}")
def get_farmer(
    farmer_id: int,
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

    return farmer


@router.post("/")
def create_farmer(
    name: str,
    phone: str,
    location: str,
    farmer_type: str = "Individual Farmer",
    db: Session = Depends(get_db),
):
    existing_farmer = db.query(Farmer).filter(
        Farmer.phone == phone
    ).first()

    if existing_farmer:
        raise HTTPException(
            status_code=400,
            detail="Farmer with this phone number already exists",
        )

    farmer = Farmer(
        name=name,
        phone=phone,
        location=location,
        farmer_type=farmer_type,
    )

    db.add(farmer)
    db.commit()
    db.refresh(farmer)

    return {
        "message": "Farmer created successfully",
        "farmer": farmer,
    }
