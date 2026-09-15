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


# =========================================================
# PATHS
# =========================================================

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

PROJECT_DIR = os.path.dirname(
    BASE_DIR
)

MODEL_DIR = os.path.join(
    BASE_DIR,
    "ml",
    "models"
)

DATA_DIR = os.path.join(
    PROJECT_DIR,
    "data"
)

MODEL_PATH = os.path.join(
    MODEL_DIR,
    "demand_model.joblib.gz"
)

ENCODER_PATH = os.path.join(
    MODEL_DIR,
    "demand_encoder.joblib"
)

DATA_PATH = os.path.join(
    DATA_DIR,
    "demand_arrivals.csv"
)


# =========================================================
# LOAD ML MODEL
# =========================================================

try:

    with gzip.open(MODEL_PATH, "rb") as f:
        demand_model = joblib.load(f)

    demand_encoder = joblib.load(
        ENCODER_PATH
    )

    MODEL_LOADED = True
    MODEL_ERROR = None

except Exception as e:

    demand_model = None
    demand_encoder = None

    MODEL_LOADED = False
    MODEL_ERROR = str(e)


# =========================================================
# LOAD REAL ARRIVAL DATA
# =========================================================

try:

    if not os.path.exists(DATA_PATH):
        raise FileNotFoundError(
            f"Demand dataset not found: {DATA_PATH}"
        )

    # The original government report contains
    # a report-title row before the actual header.
    demand_df = pd.read_csv(
        DATA_PATH,
        header=1
    )

    demand_df = demand_df.rename(
        columns={
            "State/UT": "State",
            "Commodity Group": "Commodity_Group",
            "Arrival Quantity": "Arrival_Quantity",
            "Arrival Unit": "Arrival_Unit",
            "Arrival Date": "Arrival_Date"
        }
    )

    required_columns = [
        "State",
        "District",
        "Market",
        "Commodity_Group",
        "Commodity",
        "Arrival_Quantity",
        "Arrival_Unit",
        "Arrival_Date"
    ]

    missing_columns = [
        col
        for col in required_columns
        if col not in demand_df.columns
    ]

    if missing_columns:
        raise ValueError(
            "Missing dataset columns: "
            + ", ".join(missing_columns)
        )

    demand_df = demand_df[
        required_columns
    ].copy()

    # Clean strings
    string_columns = [
        "State",
        "District",
        "Market",
        "Commodity_Group",
        "Commodity",
        "Arrival_Unit"
    ]

    for column in string_columns:
        demand_df[column] = (
            demand_df[column]
            .astype(str)
            .str.strip()
        )

    # Numeric quantity
    demand_df["Arrival_Quantity"] = pd.to_numeric(
        demand_df["Arrival_Quantity"],
        errors="coerce"
    )

    # Date
    demand_df["Arrival_Date"] = pd.to_datetime(
        demand_df["Arrival_Date"],
        dayfirst=True,
        errors="coerce"
    )

    # Remove invalid records
    demand_df = demand_df.dropna(
        subset=[
            "Market",
            "Commodity",
            "Arrival_Quantity",
            "Arrival_Date"
        ]
    )

    # Only positive arrival quantities
    demand_df = demand_df[
        demand_df["Arrival_Quantity"] > 0
    ]

    # Sort exactly according to model feature logic
    demand_df = demand_df.sort_values(
        [
            "Market",
            "Arrival_Date"
        ]
    ).reset_index(drop=True)

    DATA_LOADED = True
    DATA_ERROR = None

except Exception as e:

    demand_df = None
    DATA_LOADED = False
    DATA_ERROR = str(e)


# =========================================================
# REQUEST SCHEMA
# =========================================================

class DemandPredictionRequest(BaseModel):

    state: str
    district: str
    market: str
    commodity: str = "Potato"


# =========================================================
# FEATURE CALCULATION
# =========================================================

def build_market_features(
    history: pd.DataFrame
):

    history = history.sort_values(
        "Arrival_Date"
    ).copy()

    # -----------------------------------------------------
    # Date features
    # -----------------------------------------------------

    history["year"] = (
        history["Arrival_Date"].dt.year
    )

    history["month"] = (
        history["Arrival_Date"].dt.month
    )

    history["day"] = (
        history["Arrival_Date"].dt.day
    )

    history["day_of_week"] = (
        history["Arrival_Date"].dt.dayofweek
    )

    history["week_of_year"] = (
        history["Arrival_Date"].dt.isocalendar().week
        .astype(int)
    )

    history["month_sin"] = np.sin(
        2 * np.pi * history["month"] / 12
    )

    history["month_cos"] = np.cos(
        2 * np.pi * history["month"] / 12
    )

    # -----------------------------------------------------
    # Historical arrival features
    #
    # IMPORTANT:
    # These are calculated from REAL historical data.
    # No hardcoded values.
    # -----------------------------------------------------

    history["lag_1"] = (
        history["Arrival_Quantity"]
        .shift(1)
    )

    history["lag_7"] = (
        history["Arrival_Quantity"]
        .shift(7)
    )

    history["lag_30"] = (
        history["Arrival_Quantity"]
        .shift(30)
    )

    history["rolling_7"] = (
        history["Arrival_Quantity"]
        .shift(1)
        .rolling(
            window=7,
            min_periods=3
        )
        .mean()
    )

    history["rolling_30"] = (
        history["Arrival_Quantity"]
        .shift(1)
        .rolling(
            window=30,
            min_periods=7
        )
        .mean()
    )

    return history


# =========================================================
# DEMAND PREDICTION API
# =========================================================

@router.post("/demand")
def predict_demand(
    data: DemandPredictionRequest
):

    # -----------------------------------------------------
    # Model check
    # -----------------------------------------------------

    if not MODEL_LOADED:

        raise HTTPException(
            status_code=500,
            detail=(
                "Demand model could not be loaded: "
                f"{MODEL_ERROR}"
            )
        )

    # -----------------------------------------------------
    # Dataset check
    # -----------------------------------------------------

    if not DATA_LOADED:

        raise HTTPException(
            status_code=500,
            detail=(
                "Demand dataset could not be loaded: "
                f"{DATA_ERROR}"
            )
        )

    try:

        # =================================================
        # FILTER REAL MARKET HISTORY
        # =================================================

        market_history = demand_df[
            (
                demand_df["State"].str.lower()
                == data.state.strip().lower()
            )
            &
            (
                demand_df["District"].str.lower()
                == data.district.strip().lower()
            )
            &
            (
                demand_df["Market"].str.lower()
                == data.market.strip().lower()
            )
            &
            (
                demand_df["Commodity"].str.lower()
                == data.commodity.strip().lower()
            )
        ].copy()

        # -------------------------------------------------
        # Market not found
        # -------------------------------------------------

        if market_history.empty:

            raise HTTPException(
                status_code=404,
                detail=(
                    "No historical arrival data found for "
                    f"{data.market}, {data.district}, "
                    f"{data.state}, {data.commodity}."
                )
            )

        # =================================================
        # BUILD REAL FEATURES
        # =================================================

        market_history = build_market_features(
            market_history
        )

        # Latest available observation
        latest = market_history.iloc[-1]

        # -------------------------------------------------
        # Check enough historical observations
        # -------------------------------------------------

        required_features = [
            "lag_1",
            "lag_7",
            "lag_30",
            "rolling_7",
            "rolling_30"
        ]

        missing_features = [
            feature
            for feature in required_features
            if pd.isna(latest[feature])
        ]

        if missing_features:

            raise HTTPException(
                status_code=422,
                detail=(
                    "Not enough historical data to generate "
                    "a reliable demand estimate for this "
                    f"market. Missing features: "
                    f"{', '.join(missing_features)}"
                )
            )

        # =================================================
        # CATEGORICAL FEATURES
        # =================================================

        categorical_data = pd.DataFrame([{
            "State": latest["State"],
            "District": latest["District"],
            "Market": latest["Market"],
            "Commodity_Group": latest["Commodity_Group"],
            "Commodity": latest["Commodity"],
            "Arrival_Unit": latest["Arrival_Unit"]
        }])

        # =================================================
        # NUMERICAL FEATURES
        # =================================================

        numerical_data = np.array([[
            latest["year"],
            latest["month"],
            latest["day"],
            latest["day_of_week"],
            latest["week_of_year"],
            latest["month_sin"],
            latest["month_cos"],
            latest["lag_1"],
            latest["lag_7"],
            latest["lag_30"],
            latest["rolling_7"],
            latest["rolling_30"]
        ]], dtype=float)

        # =================================================
        # ENCODE
        # =================================================

        encoded_categorical = (
            demand_encoder.transform(
                categorical_data
            )
        )

        numerical_sparse = sparse.csr_matrix(
            numerical_data
        )

        # =================================================
        # FINAL FEATURES
        # =================================================

        final_features = sparse.hstack(
            [
                encoded_categorical,
                numerical_sparse
            ],
            format="csr"
        )

        # =================================================
        # PREDICTION
        # =================================================

        prediction = demand_model.predict(
            final_features
        )

        predicted_arrival = float(
            prediction[0]
        )

        predicted_arrival = max(
            0,
            predicted_arrival
        )

        # =================================================
        # RESPONSE
        # =================================================

        latest_date = latest[
            "Arrival_Date"
        ].strftime("%Y-%m-%d")

        return {
            "success": True,

            "state": latest["State"],
            "district": latest["District"],
            "market": latest["Market"],
            "crop": latest["Commodity"],

            "estimated_market_demand": round(
                predicted_arrival,
                2
            ),

            "unit": latest["Arrival_Unit"],

            "model": "Random Forest",

            "based_on_latest_data": latest_date,

            "historical_observations": int(
                len(market_history)
            ),

            "interpretation": (
                "Estimated next market arrival "
                "requirement based on real historical "
                "mandi arrival patterns."
            )
        }

    except HTTPException:
        raise

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=(
                "Demand prediction failed: "
                f"{str(e)}"
            )
        )
