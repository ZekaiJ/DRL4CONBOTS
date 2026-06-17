# Reproducibility Notes

This repository is designed for lightweight inspection and figure regeneration. The canonical evidence file is [`Assets/evidence_matrix.csv`](Assets/evidence_matrix.csv).

## Environment

The cross-axis figure script uses the Python standard library plus:

- `matplotlib`
- `numpy`

No database, web service, or private file path is required for the public script.

Install the lightweight plotting dependencies with:

```bash
python -m pip install -r requirements.txt
```

## Regenerate the Cross-Axis Figure

From the repository root:

```bash
cd companion_site
python scripts/make_cross_axis_evidence_trend.py
```

Expected outputs:

- `Assets/cross_axis_evidence_trend.png`
- `Assets/cross_axis_evidence_trend.pdf`

The script checks that the public matrix contains **75** primary rows before writing the figure.

## Minimal Integrity Check

The following command verifies the main public denominator:

```bash
python -c "import csv; rows=list(csv.DictReader(open('Assets/evidence_matrix.csv', encoding='utf-8-sig'))); print(len(rows), sum(r['synthesis_set']=='Primary' for r in rows), sum(r['synthesis_set']=='Contextual' for r in rows))"
```

Expected output:

```text
152 75 77
```

## Public Data Boundary

The public matrix is a source-coded evidence map. It supports transparency for the manuscript synthesis, but it does not replace the underlying papers, peer review, or independent safety assessment of any robotic system.

When using the dataset:

- cite the companion manuscript and repository;
- cite original papers for paper-specific technical claims;
- preserve the distinction between `Primary` and `Contextual` rows;
- avoid treating AM or EVL levels as a deployment-readiness ranking independent of A1--A3 context.
