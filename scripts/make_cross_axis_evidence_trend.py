#!/usr/bin/env python3
"""Generate a reference-style cross-axis evidence trend figure.

The layout is optimized for README/project-page viewing: compact margins,
large labels, and enough whitespace for scanning without shrinking the panels.
"""

from __future__ import annotations

import csv
from collections import Counter, defaultdict
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import Patch
from matplotlib import patheffects as pe
from matplotlib.colors import LinearSegmentedColormap


ROOT = Path(__file__).resolve().parents[1]
MATRIX_PATH = ROOT / "Assets" / "evidence_matrix.csv"
OUT_PNG = ROOT / "Assets" / "cross_axis_evidence_trend.png"
OUT_PDF = ROOT / "Assets" / "cross_axis_evidence_trend.pdf"

A4_ORDER = ["AM0", "AM1", "AM2", "AM3"]
A5_ORDER = ["L0", "L1", "L2", "L3", "L4", "L5"]
REGIME_ORDER = [
    "Earthwork and Material Processing",
    "Structural Assembly and Installation",
    "Material Placement and Lifting",
    "Additive Manufacturing and Surface Processing",
    "Navigation, Layout, and Logistics Support",
]
REGIME_SHORT = {
    "Earthwork and Material Processing": "Earthwork",
    "Structural Assembly and Installation": "Assembly",
    "Material Placement and Lifting": "Lifting",
    "Additive Manufacturing and Surface Processing": "Additive / surface",
    "Navigation, Layout, and Logistics Support": "Navigation\nlogistics",
}

EVL_COLORS = {
    "L0": "#4C78A8",
    "L1": "#72B7B2",
    "L2": "#F2CF5B",
    "L3": "#D65F5F",
    "L4": "#59A14F",
    "L5": "#B9B9B9",
}

BUBBLE_CMAP = LinearSegmentedColormap.from_list(
    "evidence_counts",
    ["#F4F6F7", "#D7E8EC", "#8CBEC2", "#D8906F", "#9C2F43"],
)


def read_primary_rows() -> list[dict[str, str]]:
    with MATRIX_PATH.open("r", encoding="utf-8-sig", newline="") as handle:
        rows = list(csv.DictReader(handle))
    return [row for row in rows if row.get("synthesis_set") == "Primary"]


def count_matrix(rows: list[dict[str, str]]) -> np.ndarray:
    counts = np.zeros((len(A4_ORDER), len(A5_ORDER)), dtype=int)
    a4_index = {name: i for i, name in enumerate(A4_ORDER)}
    a5_index = {name: i for i, name in enumerate(A5_ORDER)}
    for row in rows:
        a4 = row["A4_assurance_mode"]
        a5 = row["A5_EVL"]
        if a4 in a4_index and a5 in a5_index:
            counts[a4_index[a4], a5_index[a5]] += 1
    return counts


def regime_evl_counts(rows: list[dict[str, str]]) -> dict[str, Counter[str]]:
    grouped: dict[str, Counter[str]] = defaultdict(Counter)
    for row in rows:
        grouped[row["A1_competency_regime"]][row["A5_EVL"]] += 1
    return grouped


def draw_bubble_heatmap(ax: plt.Axes, counts: np.ndarray) -> None:
    max_count = max(int(counts.max()), 1)
    norm = plt.Normalize(vmin=0, vmax=max_count)

    for y, a4 in enumerate(A4_ORDER):
        for x, a5 in enumerate(A5_ORDER):
            count = int(counts[y, x])
            size = 55 + 980 * (count / max_count) if count else 0
            ax.scatter(
                x,
                y,
                s=size,
                c=[BUBBLE_CMAP(norm(count))],
                edgecolors="white",
                linewidths=1.0,
                zorder=3,
            )
            if count:
                text = ax.text(
                    x,
                    y,
                    str(count),
                    ha="center",
                    va="center",
                    fontsize=11.2,
                    fontweight="bold",
                    color="#202020" if count < 20 else "white",
                    zorder=4,
                )
                text.set_path_effects([pe.withStroke(linewidth=1.7, foreground="white", alpha=0.45)])

    ax.set_xticks(range(len(A5_ORDER)))
    ax.set_xticklabels(A5_ORDER, fontsize=13.2, fontweight="bold")
    ax.set_yticks(range(len(A4_ORDER)))
    ax.set_yticklabels(A4_ORDER, fontsize=13.2, fontweight="bold")
    ax.tick_params(axis="x", bottom=False, top=True, labelbottom=False, labeltop=True, pad=7, length=0)
    ax.tick_params(axis="y", length=0, pad=8)
    ax.set_xlim(-0.55, len(A5_ORDER) - 0.45)
    ax.set_ylim(len(A4_ORDER) - 0.5, -0.5)
    ax.set_facecolor("#F4F4F2")
    ax.set_axisbelow(True)
    ax.grid(color="white", linewidth=1.6)
    ax.set_aspect("auto")
    ax.set_box_aspect(0.80)
    for spine in ax.spines.values():
        spine.set_visible(True)
        spine.set_linewidth(0.8)
        spine.set_edgecolor("#C9C9C9")


def autopct_for(values: list[int]):
    total = sum(values)

    def _format(percent: float) -> str:
        count = int(round(percent * total / 100))
        if count == 0 or percent < 7:
            return ""
        return f"{percent:.0f}%"

    return _format


def draw_regime_pies(axes: list[plt.Axes], legend_ax: plt.Axes, rows: list[dict[str, str]]) -> None:
    grouped = regime_evl_counts(rows)

    for ax, regime in zip(axes, REGIME_ORDER):
        values = [grouped[regime].get(level, 0) for level in A5_ORDER]
        total = sum(values)
        wedges, _, autotexts = ax.pie(
            values,
            colors=[EVL_COLORS[level] for level in A5_ORDER],
            startangle=90,
            counterclock=False,
            radius=1.0,
            wedgeprops={"edgecolor": "white", "linewidth": 2.3},
            autopct=autopct_for(values),
            pctdistance=0.67,
        )
        for level, text in zip(A5_ORDER, autotexts):
            uses_dark_slice = level in {"L0", "L3"}
            text.set_fontsize(10.6)
            text.set_fontweight("bold")
            text.set_color("white" if uses_dark_slice else "#202020")
            stroke_color = "#333333" if uses_dark_slice else "white"
            text.set_path_effects([pe.withStroke(linewidth=1.5, foreground=stroke_color, alpha=0.78)])

        centre = plt.Circle((0, 0), 0.33, facecolor="white", edgecolor="none", zorder=5)
        ax.add_artist(centre)
        ax.text(0, 0, f"n={total}", ha="center", va="center", fontsize=10.2, fontweight="bold", color="#333333")
        ax.set_title(REGIME_SHORT[regime], fontsize=13.2, fontweight="bold", pad=3)
        ax.set_aspect("equal")
        ax.set_axis_off()

    legend_items = [Patch(facecolor=EVL_COLORS[level], edgecolor="white", label=level) for level in A5_ORDER]
    legend_ax.axis("off")
    legend_ax.legend(
        handles=legend_items,
        title="Validation\nexposure",
        loc="center left",
        frameon=False,
        fontsize=10.6,
        title_fontsize=11.0,
        handlelength=1.3,
        labelspacing=0.72,
    )


def main() -> None:
    rows = read_primary_rows()
    if len(rows) != 75:
        raise ValueError(f"Expected 75 primary rows, found {len(rows)}")

    counts = count_matrix(rows)

    plt.rcParams.update(
        {
            "font.family": "DejaVu Sans",
            "font.size": 10.8,
            "figure.dpi": 300,
            "savefig.dpi": 300,
            "axes.spines.top": False,
            "axes.spines.right": False,
        }
    )

    fig = plt.figure(figsize=(11.2, 5.15), facecolor="white")
    gs = fig.add_gridspec(
        2,
        2,
        width_ratios=[1.08, 1.25],
        wspace=0.13,
    )
    fig.subplots_adjust(left=0.045, right=0.992, bottom=0.04, top=0.88)

    left_gs = gs[:, 0].subgridspec(1, 2, width_ratios=[1.0, 0.06], wspace=0.075)
    heat_ax = fig.add_subplot(left_gs[0, 0])
    cbar_ax = fig.add_subplot(left_gs[0, 1])

    draw_bubble_heatmap(heat_ax, counts)
    heat_ax.set_title("A4 x A5 Evidence Heatmap", fontsize=17.2, fontweight="bold", pad=18, color="#151515")
    norm = plt.Normalize(vmin=0, vmax=max(int(counts.max()), 1))
    sm = plt.cm.ScalarMappable(norm=norm, cmap=BUBBLE_CMAP)
    sm.set_array([])
    cbar = fig.colorbar(sm, cax=cbar_ax)
    cbar.set_label("Primary instance count", rotation=270, labelpad=16, fontsize=11.4)
    cbar.ax.tick_params(labelsize=10.4, length=0)
    cbar.outline.set_linewidth(0.8)

    fig.text(
        0.70,
        0.935,
        "Validation Exposure by Competency Regime",
        ha="center",
        va="top",
        fontsize=17.2,
        fontweight="bold",
        color="#151515",
    )

    right_gs = gs[:, 1].subgridspec(
        2,
        3,
        width_ratios=[1.0, 1.0, 1.0],
        wspace=0.12,
        hspace=0.22,
    )
    pie_axes = [
        fig.add_subplot(right_gs[0, 0]),
        fig.add_subplot(right_gs[0, 1]),
        fig.add_subplot(right_gs[1, 0]),
        fig.add_subplot(right_gs[1, 1]),
        fig.add_subplot(right_gs[1, 2]),
    ]
    legend_ax = fig.add_subplot(right_gs[0, 2])
    draw_regime_pies(pie_axes, legend_ax, rows)

    fig.savefig(OUT_PNG, bbox_inches="tight", pad_inches=0.035)
    fig.savefig(OUT_PDF, bbox_inches="tight", pad_inches=0.035)
    print(f"Saved {OUT_PNG}")
    print(f"Saved {OUT_PDF}")
    print("A4 x A5 counts:")
    print(counts)


if __name__ == "__main__":
    main()
