from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from pathlib import Path

HERE = Path(__file__).parent

app = Flask(__name__)
CORS(app)

# Load artifacts (run train_model.py first)
model = joblib.load(str(HERE / "disease_model.pkl"))
symptoms_list = joblib.load(str(HERE / "symptoms_list.pkl"))

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "MedConnect++ Backend Running!"})

@app.route("/symptoms", methods=["GET"])
def get_symptoms():
    return jsonify({"symptoms": symptoms_list})

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json or {}
    vec = [1 if data.get(sym, 0) in (1, True, "1") else 0 for sym in symptoms_list]
    pred = model.predict([vec])[0]

    # Optional class probabilities (if supported)
    probs = None
    try:
        proba = model.predict_proba([vec])[0]
        classes = list(getattr(model, "classes_", []))
        probs = {str(classes[i]): float(proba[i]) for i in range(len(classes))}
    except Exception:
        pass

    return jsonify({"prediction": str(pred), "probabilities": probs})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

