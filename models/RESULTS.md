# Current model run

Dataset: PhiUSIIL Phishing URL Dataset (UCI), using raw `URL` + `label` only.

Cleaning: 425 duplicate URLs removed; 235,370 rows remained.

Split: 80/20 stratified, `random_state=42`.

Model: Random Forest, 200 trees, `class_weight="balanced"`, `max_features="sqrt"`.

Current holdout results:

- Accuracy: 99.64%
- Precision (phishing): 99.86%
- Recall (phishing): 99.30%
- F1 (phishing): 99.58%

Confusion matrix (rows = actual, columns = predicted; class order legitimate, phishing):

```text
[[26943,    27],
 [  141, 19963]]
```

These are holdout results from this exact training configuration, not a guarantee of real-world performance. The dataset includes URLs collected for the PhiUSIIL study, and the project intentionally ignores the dataset's webpage/source-code features.
