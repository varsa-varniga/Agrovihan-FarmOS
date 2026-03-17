import os
import joblib
import numpy as np
import pandas as pd
import json
from fastapi import HTTPException
from .predict_service import predict_next_7_days, predict_next_months
from .predict_yield import predict_yield_service
from ..utils.model_loader import load_all_models

# -----------------------------
# Normalization helper
# -----------------------------
def normalize(value, min_val, max_val):
    if max_val == min_val:
        return 0.5
    return (value - min_val) / (max_val - min_val)

# -----------------------------
# Soil Score
# -----------------------------
MODEL_PATH = r"C:\Users\varsa\Agropulse\app\models\random_forest_crop_model.pkl"
ENCODER_PATH = r"C:\Users\varsa\Agropulse\app\models\crop_recommendation.pkl"

try:
    crop_model = joblib.load(MODEL_PATH)
    label_encoders = joblib.load(ENCODER_PATH)
except Exception as e:
    raise RuntimeError(f"Error loading model or encoders: {e}")

def safe_encode(encoder, value: str):
    value = value.strip().lower()
    classes = [cls.lower() for cls in encoder.classes_]
    if value in classes:
        idx = classes.index(value)
        return encoder.transform([encoder.classes_[idx]])[0]
    else:
        return encoder.transform([encoder.classes_[0]])[0]

def preprocess_input(data, encoders):
    processed = []
    for feature in [
        "soil_type", "soil_moisture", "soil_ph", "N", "P", "K",
        "organic_carbon", "texture", "drainage",
        "soil_health_index", "previous_crop", "acres"
    ]:
        value = data[feature]
        if feature in encoders:
            processed.append(safe_encode(encoders[feature], str(value)))
        else:
            processed.append(float(value))
    return np.array(processed).reshape(1, -1)

def get_soil_score(input_data: dict):
    X = preprocess_input(input_data, label_encoders)
    probabilities = crop_model.predict_proba(X)[0]
    encoded_labels = crop_model.classes_
    crop_names = label_encoders["recommended_crop"].inverse_transform(encoded_labels)
    crop_scores = list(zip(crop_names, probabilities))
    sorted_crops = sorted(crop_scores, key=lambda x: x[1], reverse=True)
    top_3 = sorted_crops[:3]
    result = [{"crop": crop, "score": round(float(score), 3)} for crop, score in top_3]
    return {"recommended_crops": result, "status": "success"}

# -----------------------------
# Climate Score
# -----------------------------
MODEL_DIR = r"C:\Users\varsa\Agropulse\app\models"

try:
    gbr_model = joblib.load(os.path.join(MODEL_DIR, "gbr_crop_suitability.pkl"))
    scaler = joblib.load(os.path.join(MODEL_DIR, "feature_scaler.pkl"))
    ohe_season = joblib.load(os.path.join(MODEL_DIR, "season_ohe.pkl"))
    le_season = joblib.load(os.path.join(MODEL_DIR, "season_encoder.pkl"))
except Exception as e:
    raise RuntimeError(f"Error loading climate model or encoders: {e}")

target_crops = [
    'paddy', 'maize', 'tur dal', 'green gram', 'tomato',
    'onion', 'sugarcane', 'banana', 'coconut', 'groundnut'
]

crop_season_map = {
    'paddy': 'kharif', 'maize': 'kharif', 'tur dal': 'rabi', 'green gram': 'rabi',
    'tomato': 'summer', 'onion': 'rabi', 'sugarcane': 'year-round',
    'banana': 'year-round', 'coconut': 'year-round', 'groundnut': 'kharif'
}

def get_climate_suitability(input_features: dict):
    results = {}
    for crop in target_crops:
        try:
            season_int = le_season.transform([crop_season_map[crop]])[0]
            season_ohe_vec = ohe_season.transform([[season_int]])
        except Exception:
            continue
        temp_array = np.hstack([
            np.array([[input_features["temperature"], input_features["humidity"],
                       input_features["ph"], input_features["rainfall"]]]),
            season_ohe_vec
        ])
        temp_scaled = scaler.transform(temp_array)
        score = gbr_model.predict(temp_scaled)[0]
        results[crop] = max(0, score)
    total = sum(results.values())
    normalized_scores = {c: (s / total if total > 0 else 0) for c, s in results.items()}
    top_3 = sorted(normalized_scores.items(), key=lambda x: x[1], reverse=True)[:3]
    return {"recommended_crops": [{"crop": c, "score": round(float(s),3)} for c,s in top_3], "status": "success"}

# -----------------------------
# Market Score (3-month)
# -----------------------------
PROJECT_ROOT = os.path.dirname(os.path.dirname(__file__))
MONTHLY_DIR = os.path.join(PROJECT_ROOT, "notebooks", "data", "processed", "crop_monthly_avg")

models = load_all_models(MODEL_DIR)

def market_score_monthly_internal(crop: str, months: int = 3):
    crop = crop.lower()
    model_key = f"{crop}_monthly_lstm"
    csv_file = os.path.join(MONTHLY_DIR, f"{crop}_monthly.csv")
    if model_key not in models or not os.path.exists(csv_file):
        return 0
    df = pd.read_csv(csv_file)
    df['month'] = pd.to_datetime(df['month'], errors='coerce')
    df = df.sort_values('month')
    model_info = models[model_key]
    model = model_info['model']
    scaler = model_info['scaler']
    window_size = model.input_shape[1]
    last_sequence = df['price_modal'].values[-window_size:]
    predicted_prices = predict_next_months(model, scaler, last_sequence, forecast_horizon=months)
    avg_price = float(np.mean(predicted_prices))
    volatility = float(np.std(predicted_prices))
    price_norm = normalize(avg_price, 10, 200)
    volatility_norm = 1 - normalize(volatility, 0, 30)
    market_score = round((0.7 * price_norm + 0.3 * volatility_norm),3)
    return market_score

# -----------------------------
# Yield Score
# -----------------------------
def predict_yield_internal(input_data: dict):
    predicted_yield = predict_yield_service(input_data)
    yield_score = round(normalize(predicted_yield, 500, 8000),3)
    return yield_score

# -----------------------------
# ROI Score
# -----------------------------
def calculate_financials_internal(input_data: dict):
    crop = input_data["crop"].capitalize()
    acres = input_data.get("acres", 2.5)
    COST_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "app", "data", "crop_costs.json")
    if not os.path.exists(COST_FILE):
        raise HTTPException(status_code=404, detail="Crop cost file not found")
    with open(COST_FILE, "r") as f:
        raw_cost_data = json.load(f).get(crop)
    if not raw_cost_data:
        raise HTTPException(status_code=404, detail=f"No cost data found for {crop}")
    total_cost_per_acre = sum(raw_cost_data.values())
    total_cost_field = total_cost_per_acre * acres
    predicted_yield_kg_ha = predict_yield_service(input_data)
    predicted_yield_kg_field = predicted_yield_kg_ha / 2.471 * acres
    # Market price using monthly forecast
    model_key = f"{crop.lower()}_monthly_lstm"
    monthly_csv = os.path.join(MONTHLY_DIR, f"{crop.lower()}_monthly.csv")
    if model_key not in models or not os.path.exists(monthly_csv):
        market_price_per_kg = 100  # fallback
    else:
        df_price = pd.read_csv(monthly_csv)
        df_price['month'] = pd.to_datetime(df_price['month'], errors='coerce')
        df_price = df_price.sort_values('month')
        model_info = models[model_key]
        model = model_info['model']
        scaler = model_info['scaler']
        window_size = model.input_shape[1]
        last_sequence = df_price['price_modal'].values[-window_size:]
        predicted_prices = predict_next_months(model, scaler, last_sequence, forecast_horizon=3)
        market_price_per_kg = sum(predicted_prices)/len(predicted_prices)
    revenue = predicted_yield_kg_field * market_price_per_kg
    profit = revenue - total_cost_field
    roi_percent = (profit/total_cost_field)*100
    return normalize(roi_percent, 0, 100)
