from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
import os
from scipy import sparse


router = APIRouter(
    prefix="/api/predictions",
    tags=["AI Predictions"]
)


# ==========================================
# Load ML Model and Encoder
# ==========================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.path.join(BASE_DIR, "ml", "models")

MODEL_PATH = os.path.join(
    MODEL_DIR,
    "price_model.joblib"
)

ENCODER_PATH = os.path.join(
    MODEL_DIR,
    "price_encoder.joblib"
)


try:
    price_model = joblib.load(MODEL_PATH)
    price_encoder = joblib.load(ENCODER_PATH)

    MODEL_LOADED = True
    MODEL_ERROR = None

except Exception as e:
    price_model = None
    price_encoder = None

    MODEL_LOADED = False
    MODEL_ERROR = str(e)


# ==========================================
# Request Schema
# ==========================================

class PricePredictionRequest(BaseModel):

    state: str
    district: str
    market: str
    variety: str
    grade: str

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


# ==========================================
# Price Prediction
# ==========================================

@router.post("/price")
def predict_price(data: PricePredictionRequest):

    if not MODEL_LOADED:

        raise HTTPException(
            status_code=500,
            detail=(
                "Price model could not be loaded: "
                f"{MODEL_ERROR}"
            )
        )

    try:

        # --------------------------------------
        # Categorical features
        # --------------------------------------

        categorical_data = pd.DataFrame([{
            "STATE": data.state,
            "District Name": data.district,
            "Market Name": data.market,
            "Variety": data.variety,
            "Grade": data.grade
        }])

        # --------------------------------------
        # Numerical features
        # --------------------------------------

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

        # --------------------------------------
        # Encode categorical features
        # --------------------------------------

        encoded_categorical = price_encoder.transform(
            categorical_data
        )

        # --------------------------------------
        # Convert numerical features to sparse
        # --------------------------------------

        numerical_sparse = sparse.csr_matrix(
            numerical_data
        )

        # --------------------------------------
        # Combine features
        # IMPORTANT:
        # Same order as training
        # categorical + numerical
        # --------------------------------------

        final_features = sparse.hstack(
            [
                encoded_categorical,
                numerical_sparse
            ],
            format="csr"
        )

        # --------------------------------------
        # Prediction
        # --------------------------------------

        prediction = price_model.predict(
            final_features
        )

        predicted_price = float(prediction[0])

        # Prevent negative price
        predicted_price = max(
            0,
            predicted_price
        )

        return {
            "success": True,
            "crop": "Potato",
            "predicted_price": round(
                predicted_price,
                2
            ),
            "unit": "₹/quintal",
            "model": "XGBoost"
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )
