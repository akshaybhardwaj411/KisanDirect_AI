from fastapi import APIRouter, HTTPException, Query
import pandas as pd
import os

router = APIRouter(
    prefix="/api/locations",
    tags=["Locations"]
)

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

PROJECT_DIR = os.path.dirname(BASE_DIR)

DATA_PATH = os.path.join(
    PROJECT_DIR,
    "data",
    "demand_arrivals.csv"
)

try:
    if not os.path.exists(DATA_PATH):
        raise FileNotFoundError(
            f"Demand dataset not found: {DATA_PATH}"
        )

    df = pd.read_csv(DATA_PATH, header=1)

    df = df.rename(
        columns={
            "State/UT": "State",
            "Arrival Quantity": "Arrival_Quantity",
            "Arrival Unit": "Arrival_Unit",
            "Arrival Date": "Arrival_Date"
        }
    )

    required_columns = [
        "State",
        "District",
        "Market",
        "Commodity"
    ]

    missing = [
        col for col in required_columns
        if col not in df.columns
    ]

    if missing:
        raise ValueError(
            "Missing columns: " + ", ".join(missing)
        )

    df = df[required_columns].copy()

    for column in required_columns:
        df[column] = (
            df[column]
            .astype(str)
            .str.strip()
        )

    DATA_LOADED = True
    DATA_ERROR = None

except Exception as e:
    df = None
    DATA_LOADED = False
    DATA_ERROR = str(e)


@router.get("/districts")
def get_districts():
    """
    Return all districts available in the real
    Uttar Pradesh agricultural dataset.
    """

    if not DATA_LOADED:
        raise HTTPException(
            status_code=500,
            detail=f"Location data unavailable: {DATA_ERROR}"
        )

    districts = sorted(
        df["District"]
        .dropna()
        .unique()
        .tolist()
    )

    return {
        "success": True,
        "state": "Uttar Pradesh",
        "count": len(districts),
        "districts": districts
    }


@router.get("/markets")
def get_markets(
    district: str = Query(..., min_length=1)
):
    """
    Return only markets belonging to the selected district.
    """

    if not DATA_LOADED:
        raise HTTPException(
            status_code=500,
            detail=f"Location data unavailable: {DATA_ERROR}"
        )

    district_clean = district.strip().lower()

    filtered = df[
        df["District"].str.lower() == district_clean
    ]

    if filtered.empty:
        raise HTTPException(
            status_code=404,
            detail=(
                f"No markets found for district: {district}"
            )
        )

    markets = sorted(
        filtered["Market"]
        .dropna()
        .unique()
        .tolist()
    )

    return {
        "success": True,
        "state": "Uttar Pradesh",
        "district": district,
        "count": len(markets),
        "markets": markets
  }
