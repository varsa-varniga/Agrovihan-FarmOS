import os

MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")

for root, dirs, files in os.walk(MODEL_DIR):
    for f in files:
        print(os.path.join(root, f))
