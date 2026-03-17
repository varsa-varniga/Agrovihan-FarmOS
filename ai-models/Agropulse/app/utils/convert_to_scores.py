import numpy as np

# -----------------------------
# 1️⃣ Example: Predicted monthly prices for crops
# -----------------------------
predicted_prices_dict = {
    "banana": [3135.98, 3135.37, 3134.53, 3133.57, 3132.59, 3131.63, 3130.73],
    "onion": [2919.57, 2901.85, 2887.85],
    "tomato": [2000, 1985, 1970, 1960]
}

# -----------------------------
# 2️⃣ Normalize monthly prices (min-max)
# -----------------------------
def normalize_prices(prices):
    min_price = min(prices)
    max_price = max(prices)
    if max_price == min_price:  # avoid division by zero
        return [1.0 for _ in prices]
    return [(p - min_price) / (max_price - min_price) for p in prices]

# -----------------------------
# 3️⃣ Aggregate into a single price score per crop
# -----------------------------
def price_score(predicted_prices):
    normalized = normalize_prices(predicted_prices)
    return np.mean(normalized)  # average across months

# -----------------------------
# 4️⃣ Compute scores for all crops
# -----------------------------
crop_scores = {}
for crop, prices in predicted_prices_dict.items():
    crop_scores[crop] = price_score(prices)

# -----------------------------
# 5️⃣ Print results
# -----------------------------
print("Crop price scores (0-1):")
for crop, score in crop_scores.items():
    print(f"{crop}: {score:.3f}")

# -----------------------------
# Optional: combine with soil & climate scores
# -----------------------------
def final_crop_score(price_score, soil_score, climate_score, weights=(0.5, 0.25, 0.25)):
    w_price, w_soil, w_climate = weights
    return w_price*price_score + w_soil*soil_score + w_climate*climate_score

# Example soil & climate scores
soil_scores = {"banana": 0.8, "onion": 0.7, "tomato": 0.6}
climate_scores = {"banana": 0.7, "onion": 0.8, "tomato": 0.9}

final_scores = {}
for crop in crop_scores.keys():
    final_scores[crop] = final_crop_score(crop_scores[crop], soil_scores[crop], climate_scores[crop])

print("\nFinal combined crop scores (price + soil + climate):")
for crop, score in final_scores.items():
    print(f"{crop}: {score:.3f}")
