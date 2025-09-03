import os
from pathlib import Path
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

HERE = Path(__file__).parent
DATASET_DIR = HERE / "dataset"

def load_training_dataframe():
    # Prefer Kaggle Training.csv if present; else use fallback symptoms.csv
    train_csv = DATASET_DIR / "Training.csv"
    fallback_csv = DATASET_DIR / "symptoms.csv"
    if train_csv.exists():
        df = pd.read_csv(train_csv)
        if "prognosis" not in df.columns:
            raise ValueError("Expected 'prognosis' column in Training.csv")
        return df, "prognosis"
    elif fallback_csv.exists():
        df = pd.read_csv(fallback_csv)
        target_col = df.columns[-1]  # last col is label
        return df, target_col
    else:
        raise FileNotFoundError("Place Training.csv or symptoms.csv in backend/dataset")

def main():
    df, target_col = load_training_dataframe()
    X = df.drop(columns=[target_col])
    y = df[target_col]

    model = RandomForestClassifier(
        n_estimators=300,
        n_jobs=-1,
        random_state=42
    )
    model.fit(X, y)

    joblib.dump(model, str(HERE / "disease_model.pkl"))
    joblib.dump(list(X.columns), str(HERE / "symptoms_list.pkl"))
    print("✅ Model trained and saved to:", HERE)

if __name__ == "__main__":
    main()

