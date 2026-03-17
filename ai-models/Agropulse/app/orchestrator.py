from fastapi import APIRouter, HTTPException
from .utils.model_loader import load_all_models
from .utils.helpers import safe_encode, preprocess_input, normalize
from .services.predict_service import predict_next_7_days, predict_next_months
from .services.predict_yield import predict_yield_service, init_yield_model
import os
import pandas as pd
import numpy as np
import json

router = APIRouter()

# Paths
MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")
MONTHLY_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "notebooks", "data", "processed", "crop_monthly_avg")
DAILY_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "notebooks", "data", "processed", "crop_daily_avg")
models = load_all_models(MODEL_DIR)

# Initialize yield model
init_yield_model(
    model_path=os.path.join(MODEL_DIR,"yield_model_rf.pkl"),
    encoder_path=os.path.join(MODEL_DIR,"label_encoders.pkl")
)
