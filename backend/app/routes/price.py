from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import os


router = APIRouter(
    prefix="/api/predictions",
    tags=["AI Predictions"]
)


# -----------------------------
# Load trained model
# -----------------------------

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.path.join(BASE_DIR, "ml", "models")

MODEL_PATH = os.path.join(MODEL_DIR, "price_model.joblib")
PREPROCESSOR_PATH = os.path.join(
    MODEL_DIR,
    "price_preprocessor.joblib"
)

try:
    price_model = joblib.load(MODEL_PATH)
    price_preprocessor = joblib.load(PREPROCESSOR_PATH)
    MODEL_LOADED = True
except Exception as e:
    price_model = None
    price_preprocessor = None
    MODEL_LOADED = False
    MODEL_ERROR = str(e)


# -----------------------------
# Request schema
# -----------------------------

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


# -----------------------------
# Price prediction API
# -----------------------------

@router.post("/price")
def predict_price(data: PricePredictionRequest):

    if not MODEL_LOADED:
        raise HTTPException(
            status_code=500,
            detail=f"Price model could not be loaded: {MODEL_ERROR}"
        )

    try:

        input_data = pd.DataFrame([{
            "STATE": data.state,
            "District Name": data.district,
            "Market Name": data.market,
            "Variety": data.variety,
            "Grade": data.grade,

            "year": data.year,
            "month": data.month,
            "day": data.day,
            "day_of_week": data.day_of_week,
            "week_of_year": data.week_of_year,

            "month_sin": data.month_sin,
            "month_cos": data.month_cos,

            "lag_1": data.lag_1,
            "lag_7": data.lag_7,
            "lag_30": data.lag_30,

            "rolling_7": data.rolling_7,
            "rolling_30": data.rolling_30
        }])

        transformed_data = price_preprocessor.transform(
            input_data
        )

        prediction = price_model.predict(
            transformed_data
        )

        predicted_price = float(prediction[0])

        return {
            "success": True,
            "crop": "Potato",
            "predicted_price": round(predicted_price, 2),
            "unit": "₹/quintal",
            "model": "XGBoost"
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )
