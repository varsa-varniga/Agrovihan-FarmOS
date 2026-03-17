import numpy as np
import pandas as pd


# -----------------------------
# Daily 7-day prediction
# -----------------------------
def predict_next_7_days(model, scaler, df, window_size=30):
    """
    Predict next 7 days using daily LSTM.
    df must have 'price_modal' column.
    scaler: pre-fitted MinMaxScaler used during model training
    """
    prices = df['price_modal'].values.reshape(-1, 1)
    scaled_prices = scaler.transform(prices)


    last_seq = scaled_prices[-window_size:]
    predictions = []


    for _ in range(7):
        X_pred = np.reshape(last_seq, (1, window_size, 1))
        next_price = model.predict(X_pred, verbose=0)
        predictions.append(next_price[0, 0])
        last_seq = np.append(last_seq[1:], next_price)[-window_size:]


    predicted_prices = scaler.inverse_transform(np.array(predictions).reshape(-1, 1))
    return pd.DataFrame({
        "day": range(1, 8),
        "predicted_price": predicted_prices.flatten()
    })


# -----------------------------
# Monthly prediction
# -----------------------------
def predict_next_months(model, scaler, last_sequence, forecast_horizon=3):
    """
    Predict next `forecast_horizon` months using monthly LSTM.
    last_sequence: array of last N months prices (unscaled)
    """
    last_sequence = np.array(last_sequence, dtype=float).reshape(-1, 1)
    scaled_seq = scaler.transform(last_sequence)


    window_size = model.input_shape[1]
    last_seq = scaled_seq[-window_size:]
    predictions = []


    for _ in range(forecast_horizon):
        X_pred = np.reshape(last_seq, (1, window_size, 1))
        next_price = model.predict(X_pred, verbose=0)
        predictions.append(next_price[0, 0])
        last_seq = np.append(last_seq[1:], next_price)[-window_size:]


    predicted_prices = scaler.inverse_transform(np.array(predictions).reshape(-1, 1))
    return predicted_prices.flatten()



