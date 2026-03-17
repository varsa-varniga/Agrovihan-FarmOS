import requests

response = requests.post("http://127.0.0.1:8000/market_score_monthly",
                         params={"commodity": "turmeric", "months": 6})

data = response.json()
market_score = data["market_score"]

print("Turmeric Market Score:", market_score)
