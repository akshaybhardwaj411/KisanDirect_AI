from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
import os
import gzip
from scipy import sparse

router = APIRouter(
    prefix="/api/predictions",
    tags=["Demand Predictions"]
)

# --------------------------------------------------
# MODEL PATHS
# --------------------------------------------------

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.path.join(BASE_DIR, "ml", "models")

MODEL_PATH = os.path.join(
    MODEL_DIR,
    "demand_model.joblib.gz"
)

ENCODER_PATH = os.path.join(
    MODEL_DIR,
    "demand_encoder.joblib"
)

# --------------------------------------------------
# LOAD MODEL
# --------------------------------------------------

try:
    with gzip.open(MODEL_PATH, "rb") as f:
        demand_model = joblib.load(f)

    demand_encoder = joblib.load(ENCODER_PATH)

    MODEL_LOADED = True
    MODEL_ERROR = None

except Exception as e:
    demand_model = None
    demand_encoder = None
    MODEL_LOADED = False
    MODEL_ERROR = str(e)


# --------------------------------------------------
# REQUEST SCHEMA
# --------------------------------------------------

class DemandPredictionRequest(BaseModel):
    state: str
    district: str
    market: str
    commodity_group: str
    commodity: str
    arrival_unit: str

    year: int
    month: int
    day: int
    day_of_week: int
    week_of_year: int

    month_sin: float
    month_cos: float

    lag_1: float
    lag_7: float
    lag_30: float

    rolling_7: float
    rolling_30: float


# --------------------------------------------------
# DEMAND PREDICTION
# --------------------------------------------------

@router.post("/demand")
def predict_demand(data: DemandPredictionRequest):

    if not MODEL_LOADED:
        raise HTTPException(
            status_code=500,
            detail=(
                "Demand model could not be loaded: "
                f"{MODEL_ERROR}"
            )
        )

    try:

        # ------------------------------------------
        # CATEGORICAL FEATURES
        # ------------------------------------------

        categorical_data = pd.DataFrame([{
            "State": data.state,
            "District": data.district,
            "Market": data.market,
            "Commodity_Group": data.commodity_group,
            "Commodity": data.commodity,
            "Arrival_Unit": data.arrival_unit
        }])

        # ------------------------------------------
        # NUMERICAL FEATURES
        # ------------------------------------------

        numerical_data = np.array([[
            data.year,
            data.month,
            data.day,
            data.day_of_week,
            data.week_of_year,
            data.month_sin,
            data.month_cos,
            data.lag_1,
            data.lag_7,
            data.lag_30,
            data.rolling_7,
            data.rolling_30
        ]])

        # ------------------------------------------
        # ENCODE CATEGORICAL DATA
        # ------------------------------------------

        encoded_categorical = demand_encoder.transform(
            categorical_data
        )

        # ------------------------------------------
        # COMBINE FEATURES
        # ------------------------------------------

        numerical_sparse = sparse.csr_matrix(
            numerical_data
        )

        final_features = sparse.hstack(
            [
                encoded_categorical,
                numerical_sparse
            ],
            format="csr"
        )

        # ------------------------------------------
        # MODEL PREDICTION
        # ------------------------------------------

        prediction = demand_model.predict(
            final_features
        )

        predicted_arrival = float(
            prediction[0]
        )

        # Prevent negative prediction
        predicted_arrival = max(
            0,
            predicted_arrival
        )

        return {
            "success": True,
            "crop": data.commodity,
            "market": data.market,
            "estimated_market_demand": round(
                predicted_arrival,
                2
            ),
            "unit": "Metric Tonnes",
            "model": "Random Forest",
            "interpretation": (
                "Estimated market requirement based "
                "on historical mandi arrival patterns."
            )
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Demand prediction failed: {str(e)}"
        )
