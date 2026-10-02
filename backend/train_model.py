"""Train and evaluate the URL-only Random Forest phishing classifier.

The raw URL and label are taken from the PhiUSIIL dataset. The dataset's
precomputed webpage/source-code features are deliberately ignored so the model
matches the resume claim of extracting clues from the URL itself.
"""
from pathlib import Path
import json
import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, precision_score, recall_score, f1_score
from sklearn.model_selection import train_test_split
from feature_extractor import extract_features, feature_names

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "PhiUSIIL_Phishing_URL_Dataset.csv"
MODEL_DIR = ROOT / "models"
MODEL_DIR.mkdir(exist_ok=True)
MODEL = MODEL_DIR / "phishing_rf.joblib"
METRICS = MODEL_DIR / "metrics.json"


def main():
    if not DATA.exists():
        raise FileNotFoundError(f"Dataset not found: {DATA}")

    df = pd.read_csv(DATA, usecols=["URL", "label"])
    df = df.dropna(subset=["URL", "label"]).copy()
    df["URL"] = df["URL"].astype(str).str.strip()
    df = df[df["URL"].str.len() >= 4]
    before = len(df)
    df = df.drop_duplicates(subset=["URL"], keep="first")
    duplicates_removed = before - len(df)

    # PhiUSIIL: 1 = legitimate, 0 = phishing. Our API uses 1 = phishing.
    y = (df["label"].astype(int) == 0).astype(int)
    X = pd.DataFrame([extract_features(u) for u in df["URL"]], columns=feature_names())

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )

    clf = RandomForestClassifier(
        n_estimators=200,
        random_state=42,
        class_weight="balanced",
        n_jobs=-1,
        max_features="sqrt",
    )
    clf.fit(X_train, y_train)
    pred = clf.predict(X_test)
    prob = clf.predict_proba(X_test)[:, 1]

    metrics = {
        "dataset_rows_raw": int(before),
        "duplicates_removed": int(duplicates_removed),
        "dataset_rows_after_cleaning": int(len(df)),
        "train_rows": int(len(X_train)),
        "test_rows": int(len(X_test)),
        "phishing_rows": int(y.sum()),
        "legitimate_rows": int((y == 0).sum()),
        "accuracy": round(float(accuracy_score(y_test, pred)), 4),
        "precision": round(float(precision_score(y_test, pred)), 4),
        "recall": round(float(recall_score(y_test, pred)), 4),
        "f1": round(float(f1_score(y_test, pred)), 4),
        "confusion_matrix": confusion_matrix(y_test, pred).tolist(),
        "features": feature_names(),
        "label_mapping": {"0": "legitimate", "1": "phishing"},
        "random_state": 42,
    }

    joblib.dump({"model": clf, "features": feature_names()}, MODEL)
    METRICS.write_text(json.dumps(metrics, indent=2))

    print(json.dumps(metrics, indent=2))
    print("\nClassification report:")
    print(classification_report(y_test, pred, target_names=["legitimate", "phishing"]))
    print(f"\nSaved model: {MODEL}")
    print(f"Saved metrics: {METRICS}")


if __name__ == "__main__":
    main()
