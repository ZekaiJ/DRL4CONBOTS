# Release Checklist

Use this checklist before a public GitHub release, preprint posting, submission-linked repository update, or DOI snapshot.

## Metadata

- [ ] Replace placeholder manuscript status, DOI, and public repository URL in `README.md`.
- [ ] Replace placeholder manuscript status, DOI, and public repository URL in `CITATION.cff`.
- [ ] Confirm author order and names match the manuscript.
- [ ] Confirm `LICENSE` matches the intended repository license.
- [ ] Create a versioned release tag.

## Evidence

- [ ] Confirm denominator: `152` total rows, `75` Primary rows, `77` Contextual rows.
- [ ] Confirm `PRIMARY_EVIDENCE_INDEX.md` covers all Primary citation keys exactly once.
- [ ] Confirm `CODEBOOK.md` and README summary counts match the public CSV.

## Assets

- [ ] Regenerate `Assets/cross_axis_evidence_trend.png` and `.pdf` after any matrix edit.
- [ ] Check that `Assets/Fig1.png` through `Assets/Fig11.png` render in the README.
- [ ] Check that `Assets/figures/Fig1.pdf` through `Assets/figures/Fig11.pdf` are present.
- [ ] Open `index.html` locally or through GitHub Pages and check that figures and data cards load.

## Public Wording

- [ ] Run the denominator check in `REPRODUCIBILITY.md`.
- [ ] Confirm no internal-only paths, draft notes, or private reviewer comments remain in public files.
- [ ] Confirm public wording still says pre-submission until the manuscript is actually submitted or posted.
- [ ] Confirm AM and EVL are not described as safety certification or deployment approval.
