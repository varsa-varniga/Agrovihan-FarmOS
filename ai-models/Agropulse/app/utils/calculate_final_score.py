def calculate_final_score(crop_data):
    weights = {
        "soil": 0.3,
        "climate": 0.2,
        "market": 0.2,
        "yield": 0.2,
        "roi": 0.1
    }

    final_score = (
        (crop_data["soil_score"] * weights["soil"]) +
        (crop_data["climate_score"] * weights["climate"]) +
        (crop_data["market_score"] * weights["market"]) +
        (crop_data["yield_score"] * weights["yield"]) +
        (crop_data["roi_score"] * weights["roi"])
    )

    return final_score
