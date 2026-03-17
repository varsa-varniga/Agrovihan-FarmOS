import json
import os

# Path to your TN cost data
COST_FILE_PATH = os.path.join("app", "data","external", "crop_costs.json")

def get_total_cost(crop_name: str, acres: float):
    """
    Fetch cost breakdown and total cost for a given crop and acres.
    """
    with open(COST_FILE_PATH, "r") as file:
        crop_costs = json.load(file)

    crop_name = crop_name.lower().strip()

    if crop_name not in crop_costs:
        raise ValueError(f"Crop '{crop_name}' not found in cost database")

    # Get cost per acre and scale by acres
    cost_per_acre = crop_costs[crop_name]
    breakdown = {k: v * acres for k, v in cost_per_acre.items()}
    total_cost = sum(breakdown.values())

    return total_cost, breakdown
