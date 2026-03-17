import numpy as np

def normalize(value, min_val, max_val):
    """Normalize a value to 0-1 scale."""
    if max_val == min_val:
        return 0.5
    return (value - min_val) / (max_val - min_val)


def safe_encode(encoder, value: str):
    """Encode categorical value safely; unknown mapped to first class."""
    value = value.strip().lower()
    classes = [cls.lower() for cls in encoder.classes_]
    if value in classes:
        idx = classes.index(value)
        return encoder.transform([encoder.classes_[idx]])[0]
    return encoder.transform([encoder.classes_[0]])[0]


def preprocess_input(data: dict, encoders: dict, features: list):
    """Encode categorical columns, keep numeric as is."""
    processed = []
    for feature in features:
        value = data.get(feature)
        if feature in encoders:
            processed.append(safe_encode(encoders[feature], str(value)))
        else:
            processed.append(float(value))
    return np.array(processed).reshape(1, -1)
