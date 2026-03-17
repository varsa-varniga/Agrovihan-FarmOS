import joblib
import numpy as np

# ==============================
# Soil Model
# ==============================
MODEL_PATH = r"C:\Users\varsa\Agropulse\app\models\random_forest_crop_model.pkl"
ENCODER_PATH = r"C:\Users\varsa\Agropulse\app\models\crop_recommendation.pkl"

try:
    crop_model = joblib.load(MODEL_PATH)
    label_encoders = joblib.load(ENCODER_PATH)
except Exception as e:
    raise RuntimeError(f"Error loading model or encoders: {e}")

# ==============================
# Preprocessing Functions
# ==============================
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
            encoded_value = safe_encode(encoders[feature], str(value))
            processed.append(encoded_value)
        else:
            processed.append(float(value))
    return np.array(processed).reshape(1, -1)
