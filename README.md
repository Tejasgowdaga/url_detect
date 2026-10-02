# Phishing URL Detection System

A full-stack machine-learning project that analyses URL-level characteristics and classifies a URL as **legitimate** or **phishing**.

## Project summary

The system uses the PhiUSIIL Phishing URL Dataset from the UCI Machine Learning Repository as its training source. The dataset contains 235,795 labelled URL records: 134,850 legitimate and 100,945 phishing. The dataset contains additional webpage/source-code features, but this project intentionally uses only the raw `URL` and `label` columns and derives its own URL-level features.

The model is a Random Forest classifier. A Flask REST API exposes predictions, and a React/TypeScript frontend provides an interactive URL analysis screen and a model dashboard.

## Architecture

```text
React + TypeScript frontend
          |
          v
     Flask REST API
          |
          v
   URL feature extraction
          |
          v
   Random Forest model
          |
          v
 Legitimate / Phishing
```

## URL features

The feature extractor derives structural/lexical signals directly from the URL, including:

- URL, host, path and query lengths
- dots, hyphens, slashes, `@`, `?`, `=` and `&`
- digits, letters and special characters
- subdomain count
- IP-address hostname indicator
- HTTPS indicator
- double-slash path indicator
- punycode indicator
- suspicious-word count
- long host-label indicator

No webpage is fetched during prediction.

## Dataset

Source: UCI Machine Learning Repository, PhiUSIIL Phishing URL Dataset (ID 967).

The source defines `label=1` as legitimate and `label=0` as phishing. The training script maps this to the project's API convention of `0=legitimate` and `1=phishing`.

The raw dataset is not required in GitHub for the application to run after the model has been trained. Keep large datasets outside Git when possible and document how to obtain them.

## Training

From the project root:

```bash
python -m venv .venv
# Windows
.venv\\Scripts\\activate
# macOS/Linux
source .venv/bin/activate

pip install -r backend/requirements.txt
python backend/train_model.py
```

The training script:

1. Loads only `URL` and `label`.
2. Removes missing/invalid rows and duplicate URLs.
3. Extracts URL-only features.
4. Performs an 80/20 stratified train/test split using `random_state=42`.
5. Trains a balanced Random Forest.
6. Reports accuracy, precision, recall, F1 and a confusion matrix.
7. Saves the trained model to `models/phishing_rf.joblib`.
8. Saves reproducible evaluation metadata to `models/metrics.json`.

## Run the backend

```bash
python backend/app.py
```

API: `http://127.0.0.1:5000`

Endpoints:

- `GET /api/health`
- `GET /api/metrics`
- `POST /api/predict` with `{ "url": "https://example.com" }`

## Run the frontend

```bash
npm install
npm run dev
```

Set `VITE_API_URL` if the backend is hosted at another URL.

## Important limitation

This is a URL-structure classifier. It does not fetch a webpage, inspect HTML, execute JavaScript, query WHOIS/DNS, or verify whether a domain is currently malicious. A model prediction should therefore be treated as a risk signal, not proof that a URL is safe or malicious.

## Resume alignment

The project supports these resume claims when they are kept accurate:

- Python and Machine Learning
- Data cleaning and URL feature extraction
- Random Forest classification
- End-to-end prediction pipeline
- Flask API
- React/TypeScript interface
- Git/GitHub project workflow
