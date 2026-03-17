import numpy as np

def predict_next_months(model, scaler, last_sequence, forecast_horizon=3):
    """
    Predict the next `forecast_horizon` months using the trained LSTM model.
    
    Args:
        model: Trained LSTM model
        scaler: Scaler used for training
        last_sequence: numpy array of shape (window_size, 1)
        forecast_horizon: number of months to predict
    
    Returns:
        List of predicted prices (inverse-transformed)
    """
    predictions = []
    last_seq_scaled = scaler.transform(last_sequence.reshape(-1, 1))
    
    window_size = len(last_sequence)
    
    for _ in range(forecast_horizon):
        X_pred = np.reshape(last_seq_scaled, (1, window_size, 1))
        next_price_scaled = model.predict(X_pred, verbose=0)
        predictions.append(next_price_scaled[0, 0])
        last_seq_scaled = np.append(last_seq_scaled[1:], next_price_scaled)[-window_size:]
    
    predicted_prices = scaler.inverse_transform(np.array(predictions).reshape(-1, 1))
    return predicted_prices.flatten()
