import json, os

def calculate_roi_profit(crop_name, acres, predicted_yield_kg_ha, predicted_price_per_kg):
    # Load crop cost data
    costs_path = os.path.join("app", "data","external","crop_costs.json")
    with open(costs_path) as f:
        crop_costs = json.load(f)

    cost_data = crop_costs.get(crop_name)
    if not cost_data:
        raise ValueError(f"Cost data not found for crop: {crop_name}")

    # Total cost (per acre * acres)
    total_cost_per_acre = sum(cost_data.values())
    total_cost = total_cost_per_acre * acres

    # Convert hectares to acres
    yield_per_acre = predicted_yield_kg_ha / 2.471  # 1 ha = 2.471 acres

    # Total yield (kg) = yield per acre * acres
    total_yield = yield_per_acre * acres

    # Revenue = yield * market price
    revenue = total_yield * predicted_price_per_kg

    # Profit and ROI
    profit = revenue - total_cost
    roi = (profit / total_cost) * 100

    return {
        "crop": crop_name,
        "acres": acres,
        "total_cost": round(total_cost, 2),
        "predicted_yield_kg_ha": round(predicted_yield_kg_ha, 2),
        "predicted_price_per_kg": round(predicted_price_per_kg, 2),
        "revenue": round(revenue, 2),
        "profit": round(profit, 2),
        "roi_percent": round(roi, 2)
    }
