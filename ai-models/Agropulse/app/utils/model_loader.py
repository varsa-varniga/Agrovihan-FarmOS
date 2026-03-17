import os
import joblib
from tensorflow.keras.models import load_model


def load_all_models(model_dir):
    """
    Load all LSTM models (.h5) and their corresponding scalers (.pkl) from model_dir.
    Handles daily and monthly models separately.
    Returns dict: { crop_key: { "model": model, "scaler": scaler } }
    """
    models = {}


    for file in os.listdir(model_dir):
        if not file.endswith(".h5"):
            continue


        crop_key = file.replace(".h5", "").lower()  # e.g., banana_lstm or banana_monthly_lstm
        model_path = os.path.join(model_dir, file)


        # Determine scaler path
        if crop_key.endswith("_monthly_lstm"):
            scaler_file = crop_key.replace("_lstm", "_scaler") + ".pkl"  # banana_monthly_scaler.pkl
        else:
            scaler_file = crop_key.replace("_lstm", "_scaler") + ".pkl"  # banana_scaler.pkl


        scaler_path = os.path.join(model_dir, scaler_file)


        if not os.path.exists(scaler_path):
            print(f"⚠️ Scaler not found for {crop_key}, skipping.")
            continue


        try:
            models[crop_key] = {
                "model": load_model(model_path),
                "scaler": joblib.load(scaler_path)
            }
            print(f"✅ Loaded model for: {crop_key}")
        except Exception as e:
            print(f"❌ Failed to load model or scaler for {crop_key}: {e}")
            continue


    return models
