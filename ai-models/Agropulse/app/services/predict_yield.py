import pandas as pd
import joblib
import os
from fastapi import HTTPException, APIRouter
from pydantic import BaseModel


# ==============================
# Model & Encoder Load
# ==============================
model_path = r"C:\Users\varsa\Agropulse\app\models\yield_model_rf.pkl"
encoder_path = r"C:\Users\varsa\Agropulse\app\models\label_encoders.pkl"


try:
    yield_model = joblib.load(model_path)
    label_encoders = joblib.load(encoder_path)
except Exception as e:
    raise RuntimeError(f"Error loading model or encoders: {e}")


router = APIRouter()


# ==============================
# Helper: Normalization Function
# ==============================
def normalize(value, min_val, max_val):
    if max_val == min_val:
        return 0.5
    return (value - min_val) / (max_val - min_val)


# ==============================
# Pydantic Request Schema
# ==============================
class YieldRequest(BaseModel):
    location: str
    crop: str
    climate_suitability_score: float
    soil_fitness_score: float
    previous_crop: str
    previous_yield: float
    irrigation_method: str
    planting_density: float
    ndvi: float
    evi: float
    lai: float


# ==============================
# Core Prediction Function
# ==============================
from fastapi import HTTPException
import pandas as pd
from ..utils.helpers import safe_encode  # Make sure to import this

def predict_yield_service(input_data: dict):
    try:
        df = pd.DataFrame([input_data])

        # ✅ Safely encode categorical features
        for col, encoder in label_encoders.items():
            if col in df.columns:
                df[col] = df[col].apply(lambda x: safe_encode(encoder, str(x)))

        # Predict yield
        prediction = yield_model.predict(df)[0]
        return round(float(prediction), 2)

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Yield prediction failed: {e}")
