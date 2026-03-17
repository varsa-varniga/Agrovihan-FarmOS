from fastapi import APIRouter
from .services.internal_services import (
    get_soil_score,
    get_climate_suitability,
    market_score_monthly_internal,
    predict_yield_internal,
    calculate_financials_internal
)

ensemble_router = APIRouter()

WEIGHTS = {
    "soil": 0.25,
    "climate": 0.20,
    "market": 0.15,
    "yield": 0.20,
    "roi": 0.20
}

@ensemble_router.post("/api/final_recommendation/")
def final_recommendation(soil_input: dict, climate_input: dict, yield_input: dict, acres: float = 2.5):
    soil_resp = get_soil_score(soil_input)
    soil_scores = {c["crop"]: c["score"] for c in soil_resp["recommended_crops"]}
    crops = list(soil_scores.keys())

    climate_resp = get_climate_suitability(climate_input)
    climate_scores = {c["crop"]: c["score"] for c in climate_resp["recommended_crops"] if c["crop"] in crops}

    market_scores = {crop: market_score_monthly_internal(crop) for crop in crops}
    yield_scores = {crop: predict_yield_internal({**yield_input, "crop": crop}) for crop in crops}
    roi_scores = {crop: calculate_financials_internal({**yield_input, "crop": crop}) for crop in crops}

    final_results = []
    for crop in crops:
        score = (
            WEIGHTS["soil"]*soil_scores.get(crop,0) +
            WEIGHTS["climate"]*climate_scores.get(crop,0) +
            WEIGHTS["market"]*market_scores.get(crop,0) +
            WEIGHTS["yield"]*yield_scores.get(crop,0) +
            WEIGHTS["roi"]*roi_scores.get(crop,0)
        )
        final_results.append({"crop": crop, "score": round(score,3)})

    final_results = sorted(final_results, key=lambda x: x["score"], reverse=True)
    return {"recommended_crops": final_results, "status": "success"}
