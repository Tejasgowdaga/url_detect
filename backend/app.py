from pathlib import Path
import json
import joblib
from flask import Flask, jsonify, request
from flask_cors import CORS
from feature_extractor import extract_features

ROOT = Path(__file__).resolve().parents[1]
MODEL_PATH = ROOT / "models" / "phishing_rf.joblib"
METRICS_PATH = ROOT / "models" / "metrics.json"

app = Flask(__name__)
CORS(app)


def load_bundle():
    if not MODEL_PATH.exists():
        raise FileNotFoundError("Model not found. Run: python backend/train_model.py")
    return joblib.load(MODEL_PATH)


def load_metrics():
    if not METRICS_PATH.exists():
        return {}
    return json.loads(METRICS_PATH.read_text())


@app.get("/api/health")
def health():
    return jsonify({"status": "ok", "model_ready": MODEL_PATH.exists()})


@app.get("/api/metrics")
def metrics():
    return jsonify(load_metrics())


@app.post("/api/predict")
def predict():
    body = request.get_json(silent=True) or {}
    url = str(body.get("url", "")).strip()
    if not url:
        return jsonify({"error": "URL is required"}), 400
    if len(url) > 2048:
        return jsonify({"error": "URL is too long"}), 400

    bundle = load_bundle()
    features = extract_features(url)
    vector = [[features[name] for name in bundle["features"]]]
    model = bundle["model"]
    prediction = int(model.predict(vector)[0])
    probabilities = model.predict_proba(vector)[0]
    confidence = float(probabilities[prediction])
    label = "phishing" if prediction == 1 else "legitimate"

    return jsonify({
        "url": url,
        "label": label,
        "confidence": round(confidence * 100, 2),
        "phishing_probability": round(float(probabilities[1]) * 100, 2),
        "legitimate_probability": round(float(probabilities[0]) * 100, 2),
        "features": features,
    })


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
