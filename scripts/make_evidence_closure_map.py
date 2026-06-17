#!/usr/bin/env python3
"""Generate a Nature-style evidence closure map for the primary synthesis set."""

from __future__ import annotations

import csv
from collections import Counter, defaultdict
from pathlib import Path

import matplotlib as mpl
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import Rectangle


ROOT = Path(__file__).resolve().parents[1]
MATRIX_PATH = ROOT / "Assets" / "evidence_matrix.csv"
OUT_STEM = ROOT / "Assets" / "evidence_closure_map_nature"

A4_ORDER = ["AM0", "AM1", "AM2", "AM3"]
EVL_ORDER = ["L0", "L1", "L2", "L3", "L4", "L5"]
REGIME_ORDER = [
    "Earthwork and Material Processing",
    "Structural Assembly and Installation",
    "Material Placement and Lifting",
    "Additive Manufacturing and Surface Processing",
    "Navigation, Layout, and Logistics Support",
]
REGIME_LABELS = {
    "Earthwork and Material Processing": "Earthwork and\nmaterial processing",
    "Structural Assembly and Installation": "Structural assembly\nand installation",
    "Material Placement and Lifting": "Material placement\nand lifting",
    "Additive Manufacturing and Surface Processing": "Additive manufacturing\nand surface processing",
    "Navigation, Layout, and Logistics Support": "Navigation, layout\nand logistics support",
}
EVL_COLORS = {
    "L0": "#5f6db1",
    "L1": "#b9dfe8",
    "L2": "#e7d677",
    "L3": "#d47b6f",
    "L4": "#b24f5a",
    "L5": "#8f2638",
}
COUNT_CMAP = mpl.colors.LinearSegmentedColormap.from_list(
    "closure_counts",
    ["#3f5fa7", "#91cbd8", "#f2ec9a", "#f2a162", "#b32636"],
)


def read_primary_rows() -> list[dict[str, str]]:
    with MATRIX_PATH.open("r", encoding="utf-8-sig", newline="") as handle:
        rows = list(csv.DictReader(handle))
    primary = [row for row in rows if row.get("synthesis_set") == "Primary"]
    if len(primary) != 75:
        raise ValueError(f"Expected 75 primary rows, found {len(primary)}")
    return primary


def a4_evl_matrix(rows: list[dict[str, str]]) -> np.ndarray:
    counts = np.zeros((len(A4_ORDER), len(EVL_ORDER)), dtype=int)
    a4_index = {name: i for i, name in enumerate(A4_ORDER)}
    evl_index = {name: i for i, name in enumerate(EVL_ORDER)}
    for row in rows:
        a4 = row["A4_assurance_mode"]
        evl = row["A5_EVL"]
        if a4 in a4_index and evl in evl_index:
            counts[a4_index[a4], evl_index[evl]] += 1
    return counts


def regime_evl_counts(rows: list[dict[str, str]]) -> dict[str, Counter[str]]:
    grouped: dict[str, Counter[str]] = defaultdict(Counter)
    for row in rows:
        grouped[row["A1_competency_regime"]][row["A5_EVL"]] += 1
    return grouped


def draw_closure_heatmap(ax: plt.Axes, counts: np.ndarray) -> None:
    max_count = max(int(counts.max()), 1)
    norm = mpl.colors.Normalize(vmin=0, vmax=1)

    # Subtle evidence zones: weak-assurance block and empty sustained-deployment column.
    ax.add_patch(Rectangle((-0.5, -0.5), 2.0, 2.0, facecolor="#f2f4f4", edgecolor="none", zorder=0))
    ax.add_patch(Rectangle((4.5, -0.5), 1.0, 4.0, facecolor="#f7f7f7", edgecolor="#c7ccce",
                           linestyle=(0, (4, 4)), linewidth=1.0, zorder=0))
    ax.add_patch(Rectangle((2.5, -0.5), 2.0, 4.0, facecolor="#fbf7f5", edgecolor="none", zorder=0))

    for y, a4 in enumerate(A4_ORDER):
        for x, evl in enumerate(EVL_ORDER):
            value = int(counts[y, x])
            if value == 0:
                ax.scatter(x, y, s=28, marker="o", facecolors="white", edgecolors="#c7ccce",
                           linewidths=0.75, zorder=2)
                continue
            size = 72 + 980 * (value / max_count)
            normalized = np.log1p(value) / np.log1p(max_count)
            ax.scatter(
                x,
                y,
                s=size,
                c=[COUNT_CMAP(norm(normalized))],
                edgecolors="white",
                linewidths=1.2,
                zorder=3,
            )
            color = "white" if value >= 12 else "#1e2528"
            ax.text(x, y, str(value), ha="center", va="center", fontsize=7.4,
                    fontweight="bold", color=color, zorder=4)

    # Emphasize the main closure gap.
    ax.scatter(0, 0, s=72 + 980 * (counts[0, 0] / max_count), facecolors="none",
               edgecolors="#1e2528", linewidths=1.15, zorder=5)
    ax.annotate(
        "AM0 + L0\n35/75",
        xy=(0, 0),
        xytext=(1.18, -0.30),
        fontsize=7.0,
        ha="left",
        va="center",
        arrowprops={"arrowstyle": "-", "lw": 0.65, "color": "#1e2528"},
    )
    ax.text(4.98, 3.05, "L5 = 0", fontsize=6.8, ha="center", va="center", color="#737b7e")

    ax.set_xticks(range(len(EVL_ORDER)))
    ax.set_xticklabels(EVL_ORDER, fontsize=8.0, fontweight="bold")
    ax.set_yticks(range(len(A4_ORDER)))
    ax.set_yticklabels(A4_ORDER, fontsize=8.0, fontweight="bold")
    ax.set_xlim(-0.55, len(EVL_ORDER) - 0.45)
    ax.set_ylim(len(A4_ORDER) - 0.5, -0.5)
    ax.grid(color="white", linewidth=1.2)
    ax.tick_params(axis="both", length=0)
    ax.set_xlabel("Validation exposure (A5)", fontsize=8.2, labelpad=7)
    ax.set_ylabel("Runtime assurance (A4)", fontsize=8.2, labelpad=7)
    ax.set_title("a  A4 x A5 evidence closure", loc="left", fontsize=9.8, fontweight="bold", pad=6)
    ax.set_facecolor("#f8f9f9")
    for spine in ax.spines.values():
        spine.set_visible(False)


def draw_count_colorbar(fig: plt.Figure, ax: plt.Axes) -> None:
    sm = mpl.cm.ScalarMappable(cmap=COUNT_CMAP, norm=mpl.colors.Normalize(vmin=0, vmax=1))
    sm.set_array([])
    cbar = fig.colorbar(sm, cax=ax, ticks=[0.0, 0.25, 0.5, 0.75, 1.0])
    cbar.ax.yaxis.set_label_position("left")
    cbar.ax.yaxis.set_ticks_position("right")
    cbar.set_label("Normalized count\n(log scale)", fontsize=7.2, rotation=90, labelpad=8)
    cbar.ax.tick_params(labelsize=7.4, width=0.6, length=2.5, colors="#1e2528")
    cbar.outline.set_linewidth(0.6)


def draw_regime_microbar(ax: plt.Axes, regime: str, counts: Counter[str]) -> None:
    total = sum(counts.values())
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.set_axis_off()

    ax.text(0.0, 0.96, REGIME_LABELS[regime], ha="left", va="top",
            fontsize=7.6, fontweight="bold", linespacing=0.95, transform=ax.transAxes)

    y = 0.28
    height = 0.26
    ax.add_patch(Rectangle((0, y), 1, height, facecolor="#f3f5f5",
                           edgecolor="#d7dcde", linewidth=0.45))
    left = 0.0
    for evl in EVL_ORDER:
        value = counts.get(evl, 0)
        if value == 0 or total == 0:
            continue
        frac = value / total
        ax.add_patch(Rectangle((left, y), frac, height, facecolor=EVL_COLORS[evl],
                               edgecolor="white", linewidth=0.75))
        if frac >= 0.12:
            color = "white" if evl in {"L0", "L3", "L4", "L5"} else "#1e2528"
            ax.text(left + frac / 2, y + height / 2, str(value), ha="center", va="center",
                    fontsize=7.1, fontweight="bold", color=color)
        left += frac
    ax.text(1.03, y + height / 2, f"n={total}", ha="left", va="center",
            fontsize=7.0, color="#5b6468", transform=ax.transAxes, clip_on=False)


def draw_evl_legend(ax: plt.Axes) -> None:
    ax.set_axis_off()
    ax.text(0.0, 0.92, "EVL", fontsize=7.8, fontweight="bold",
            color="#1e2528", transform=ax.transAxes)
    for i, level in enumerate(EVL_ORDER):
        y = 0.78 - i * 0.12
        ax.add_patch(Rectangle((0.0, y - 0.035), 0.22, 0.070, transform=ax.transAxes,
                               facecolor=EVL_COLORS[level], edgecolor="none"))
        ax.text(0.30, y, level, ha="left", va="center", fontsize=7.2,
                color="#1e2528", transform=ax.transAxes)


def draw_regime_small_multiples(fig: plt.Figure, spec, grouped: dict[str, Counter[str]]) -> None:
    sub = spec.subgridspec(3, 3, width_ratios=[1.0, 1.0, 0.40], wspace=0.28, hspace=0.36)
    positions = [(0, 0), (0, 1), (1, 0), (1, 1), (2, 0)]
    for regime, (row, col) in zip(REGIME_ORDER, positions):
        ax = fig.add_subplot(sub[row, col])
        draw_regime_microbar(ax, regime, grouped[regime])

    empty_ax = fig.add_subplot(sub[2, 1])
    empty_ax.set_axis_off()
    legend_ax = fig.add_subplot(sub[:, 2])
    draw_evl_legend(legend_ax)


def main() -> None:
    rows = read_primary_rows()
    counts = a4_evl_matrix(rows)
    grouped = regime_evl_counts(rows)

    mpl.rcParams.update(
        {
            "font.family": "sans-serif",
            "font.sans-serif": ["Arial", "Helvetica", "DejaVu Sans", "sans-serif"],
            "svg.fonttype": "none",
            "pdf.fonttype": 42,
            "axes.linewidth": 0.6,
        }
    )

    fig = plt.figure(figsize=(10.2, 5.0), facecolor="white")
    gs = fig.add_gridspec(1, 3, width_ratios=[1.08, 0.045, 1.08], left=0.060, right=0.984,
                          bottom=0.112, top=0.880, wspace=0.135)
    heat_ax = fig.add_subplot(gs[0, 0])
    cbar_ax = fig.add_subplot(gs[0, 1])

    draw_closure_heatmap(heat_ax, counts)
    draw_count_colorbar(fig, cbar_ax)
    fig.text(0.602, 0.895, "b  Validation exposure by competency regime",
             fontsize=9.8, fontweight="bold", color="#1e2528")
    draw_regime_small_multiples(fig, gs[0, 2], grouped)

    fig.text(
        0.066,
        0.016,
        "Source: evidence matrix. Panel b shows within-regime shares; n denotes primary system instances.",
        fontsize=5.7,
        color="#6b7477",
    )

    fig.savefig(f"{OUT_STEM}.png", dpi=600)
    fig.savefig(f"{OUT_STEM}.pdf")
    fig.savefig(f"{OUT_STEM}.svg")
    print(f"Saved {OUT_STEM}.png")
    print(f"Saved {OUT_STEM}.pdf")
    print(f"Saved {OUT_STEM}.svg")
    print("A4 x EVL counts:")
    print(counts)
    print("A1 x EVL totals:")
    for regime in REGIME_ORDER:
        print(regime, [grouped[regime].get(level, 0) for level in EVL_ORDER])


if __name__ == "__main__":
    main()
