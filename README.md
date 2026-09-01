<h1 align="center">From Task Success to Recoverable Operation</h1>
<h3 align="center">A Systematic Review of Deep Reinforcement Learning for Construction Robotics</h3>

<p align="center">
<strong>Zekai Jin<sup>1</sup>, Huiguang Wang<sup>1</sup>, Yihong Tang<sup>1,2</sup>, Zhen Dong<sup>3,4</sup>, Chen Feng<sup>5</sup>, and Yi Shao<sup>1,6,*</sup></strong><br>
<sup>1</sup>Department of Civil Engineering, McGill University, Canada<br>
<sup>2</sup>Mila – Quebec AI Institute, Canada<br>
<sup>3</sup>Department of Computer Science, University of California, Santa Barbara, United States<br>
<sup>4</sup>NVIDIA Corporation, United States<br>
<sup>5</sup>Department of Mechanical and Aerospace Engineering, New York University, United States<br>
<sup>6</sup>Department of Civil Engineering, University of British Columbia, Canada<br>
<sup>*</sup>Corresponding author: <a href="mailto:yi.shao@ubc.ca">yi.shao@ubc.ca</a>
</p>

<div align="center">
<a href="#"><img src="https://img.shields.io/badge/Target-Automation_in_Construction-1f6f8b" alt="Automation in Construction"/></a>
<a href="#"><img src="https://img.shields.io/badge/Status-manuscript_in_revision-6b6f76" alt="Manuscript in revision"/></a>
<a href="#"><img src="https://img.shields.io/badge/Eligible_reports-136-315d6a" alt="136 eligible reports"/></a>
<a href="#"><img src="https://img.shields.io/badge/Quantitative_configurations-101-48c7f3" alt="101 quantitative configurations"/></a>
<a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-e6b23f" alt="MIT License"/></a>
</div>

<p align="center"><a href="https://raw.githack.com/ZekaiJ/DRL4CONBOTS/v2/docs/index.html"><strong>Open the revised project page</strong></a></p>

> Construction robots do not merely act in the world. Excavation, assembly, lifting, deposition, and site navigation change the material, geometric, and dynamic state that governs what the robot can do next. This review asks when a successful learned action leaves a machine and work process from which operation can continue.

This `v2` branch accompanies a manuscript in revision for **Automation in Construction**. It replaces the earlier readiness-centred presentation with a system-level account of failure physics, learned proposals, physical execution, active protection, validation exposure, and recovery.

## Review question

A task score does not identify the complete system that produced it. A learned component may issue an actuator command, a bounded reference, a skill proposal, or a high-level plan. Classical controllers, runtime constraints, supervisory logic, or an operator may then modify, reject, or execute that output.

The review therefore compares the complete **robot–task–learning–control configuration** and asks:

1. Which physical state drives failure in the task?
2. What does the learned component observe and propose?
3. How does that proposal reach the machine?
4. What can monitor, alter, reject, or stop the command during execution?
5. Which disturbances, operating conditions, and recovery transitions were actually tested?

The central criterion is operational continuity: whether the evaluated system preserves or regains a state from which the next action remains possible.

## Evidence base

| Stage | Current manuscript |
|:--|--:|
| Database records identified | 6,255 |
| Records screened after deduplication | 3,138 |
| Eligible reports | 136 |
| Reports supporting structured comparison | 102 |
| Quantitative robot–task–learning–control configurations | 101 |
| Contextual reports | 34 |
| Publication lineages | 115 |

The searches covered **Scopus, Web of Science Core Collection, IEEE Xplore, and Engineering Village–Compendex** from 1 January 2013 through 28 August 2026. One companion-report pair was consolidated for configuration-level analysis. The resulting 101 units are analytical report configurations, not 101 distinct robots, experiments, or deployments.

## Five construction regimes

| Regime | Configurations | Failure mechanisms emphasized by the review |
|:--|--:|:--|
| Earthwork and Material Processing | 43 (42.6%) | History-dependent resistance, overload, traction loss, terrain instability, and changing material state |
| Structural Assembly and Installation | 22 (21.8%) | Tolerance accumulation, contact transitions, jamming, wedging, and surface damage |
| Material Placement and Lifting | 16 (15.8%) | Delayed oscillation, swept-volume violations, payload variability, and suspended-motion hazards |
| Additive Manufacturing and Surface Processing | 4 (4.0%) | Rheology, tool wear, cumulative geometry error, and process defects that may be difficult to reverse |
| Navigation, Layout, and Logistics Support | 16 (15.8%) | Human co-presence, occlusion, congestion, communication loss, and changing site access |

These regimes organize the physical problem. They are not an autonomy ladder and do not rank one construction task above another.

## Main findings

- **Simulation remains dominant.** Fifty-three of 101 configurations (52.5%) combine simulation-only evaluation with no reported execution-time mechanism able to alter a command.
- **Broader testing exposes more command-changing protection.** Command intervention or formally enforced constraints appear in 8 of 23 construction-representative or near-operational configurations, compared with 12 of 78 configurations evaluated in simulation or controlled laboratories.
- **Protection is not recovery.** Among the 23 more extensively tested configurations, 11 detect or infer a failure-relevant state and seven enact a response.
- **The full recovery chain is not yet demonstrated after a realized failure.** One configuration completes detection, response, viable-state restoration, and continuation through nominal hazard-avoidance replanning. No configuration demonstrates the same sequence after a realized failure.
- **Sustained workflow integration remains absent from the quantitative corpus.** Hardware presence alone does not establish long-duration construction operation.

These are descriptive findings from the retained literature. They do not estimate population prevalence, technology maturity, commercial readiness, certification, or a causal effect of physical testing.

## How to read the framework

The manuscript follows a learned output through five linked questions rather than assigning each paper a composite score:

```text
construction action changes the work state
                 ↓
the learned component proposes an action, reference, or plan
                 ↓
controllers, constraints, supervisors, or people authorize execution
                 ↓
the coupled machine–work state remains viable or is restored
                 ↓
work can continue
```

Validation exposure is reported separately from execution-time protection. A field trial can expose important failure modes without containing a command-changing safeguard; a formally constrained controller can remain tested only in simulation. Keeping these dimensions separate prevents an attractive demonstration from being mistaken for evidence of sustained or recoverable operation.

## Repository status

This branch is the development companion for the revised manuscript.

| Component | `v2` status |
|:--|:--|
| Reader-facing project description | Updated to the 136-report / 101-configuration manuscript |
| Static project page | Updated to the revised narrative |
| Figure gallery | Held for final figure freeze |
| Search strategies and PRISMA-S log | Final consistency check before public release |
| Eligibility and lineage tables | Final consistency check before public release |
| Configuration-level extraction | Final consistency check before public release |
| Analysis scripts and figure-source data | Will be released with the frozen supplementary package |

Internal reviewer worksheets, deliberation logs, and superseded coding snapshots will not be published as scientific outputs. The public package will contain the final methods, decisions, and source-linked data needed to reproduce the reported counts.

## Versioning

- [`v2`](https://github.com/ZekaiJ/DRL4CONBOTS/tree/v2): revised recoverable-operation manuscript and forthcoming reproducibility package.
- [`main`](https://github.com/ZekaiJ/DRL4CONBOTS/tree/main): preserved earlier repository state; it is not the source for the current manuscript counts.

## Citation

The manuscript is in revision. Bibliographic metadata will be replaced with the journal or preprint record when one becomes available.

```bibtex
@misc{jin2026recoverableconstructiondrl,
  title        = {From Task Success to Recoverable Operation: A Systematic Review of Deep Reinforcement Learning for Construction Robotics},
  author       = {Jin, Zekai and Wang, Huiguang and Tang, Yihong and Dong, Zhen and Feng, Chen and Shao, Yi},
  year         = {2026},
  note         = {Manuscript in revision for Automation in Construction},
  url          = {https://github.com/ZekaiJ/DRL4CONBOTS/tree/v2}
}
```

## License and contact

Repository materials are released under the [MIT License](LICENSE) unless a file states otherwise. Questions and corrections may be sent to [zekai.jin@mail.mcgill.ca](mailto:zekai.jin@mail.mcgill.ca).
