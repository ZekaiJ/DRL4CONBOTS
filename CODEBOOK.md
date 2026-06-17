# Evidence Matrix Codebook

This codebook documents the public evidence matrix used by the companion repository. The matrix is an interpretive evidence map: each row records a disclosed robot--task--learning--authority configuration, and the A1--A5 fields describe the strongest claim scope supported by the source disclosure.

Canonical data file: [`Assets/evidence_matrix.csv`](Assets/evidence_matrix.csv)

## Matrix Scope

- **Total system instances:** 152
- **Primary DRL synthesis instances:** 75
- **Contextual or boundary instances:** 77
- **Search window:** January 2013 to 30 April 2026
- **Interpretive unit:** system instance, not necessarily paper identity

The matrix should be read together with the manuscript. It is not a leaderboard, deployment certification, or safety approval list.

## Column Definitions

| Column | Meaning |
|:--|:--|
| `row_id` | Stable row identifier used inside the public matrix. |
| `tsv_seq` | Extraction-sequence identifier retained for traceability to the internal extraction workflow. |
| `citation_key` | Citation key used by the manuscript bibliography and repository indexes. |
| `year` | Publication or manuscript year recorded for the cited source. |
| `title` | Short display title used in the companion repository. |
| `full_name` | Fuller source title when a short title is insufficient or unavailable. |
| `final_tier` | Corpus tier used during synthesis. |
| `A1_competency_regime` | Construction-robotics competency regime and failure-physics grouping. |
| `A2_action_abstraction` | Disclosed action abstraction or control level. |
| `A2_observation_type` | Disclosed observation or state representation used by the learning system. |
| `A2_decision_formalism` | Disclosed decision formalism, such as MDP, POMDP, or related formulation. |
| `A3_SPAE_pattern` | Sense--Propose--Arbitrate--Execute responsibility pattern. |
| `A3_authority_pattern` | Collapsed runtime-authority category used in synthesis tables. |
| `A4_assurance_mode` | Runtime assurance mode, AM0--AM3. |
| `A5_EVL` | Validation Exposure Level, L0--L5. |
| `synthesis_set` | `Primary` for full DRL synthesis rows; `Contextual` for boundary, analog, or positioning rows. |
| `_alias_note` | Short extraction note for disambiguation, coding rationale, or system-instance context. |

## A1 Competency Regimes

| Code Family | Regime | Interpretation |
|:--|:--|:--|
| A1 | Earthwork and Material Processing | Excavation, grading, loading, trenching, tunnel-boring, bulldozing, material handling, and other machine--material interactions dominated by resistance fields, terrain state, tool load, and material evolution. |
| A1 | Structural Assembly and Installation | Placement, insertion, joining, bricklaying, cable or component installation, and manipulation tasks where small pose or contact deviations can become assembly failures. |
| A1 | Material Placement and Lifting | Crane, hoist, tower-crane, suspended-payload, lift-planning, and load-placement problems shaped by oscillatory dynamics and swept-volume risk. |
| A1 | Additive Manufacturing and Surface Processing | Robotic additive manufacturing, concrete printing, surface processing, and process-control problems where material rheology, tool path, cumulative geometry, and process defects shape validation. |
| A1 | Navigation, Layout, and Logistics Support | Site mobility, task allocation, worker-aware planning, routing, layout support, and logistics behaviors shaped by co-presence, occlusion, congestion, handover, and changing site accessibility. |

## A2 Learning Formulation

The A2 fields retain the source-level formulation rather than forcing all systems into one action-space label.

- **Action abstraction:** low-level actuator or joint command, mid-level motion or task primitive, high-level planning or assignment decision, or a source-specific variant.
- **Observation type:** the disclosed state, perception, sensor, geometric, tactile, image, graph, digital-twin, or structured representation used by the learning system.
- **Decision formalism:** the disclosed formalism, such as MDP, POMDP, multi-agent RL, imitation/RL hybrid, offline RL, or related decision model.

## A3 Runtime Authority

The A3 axis uses SPAE: **Sense--Propose--Arbitrate--Execute**. It separates learned recommendation from authorized execution.

| Category | Interpretation |
|:--|:--|
| Task/planner-level | The learned element mainly proposes task ordering, route, assignment, layout, or planning decisions rather than directly commanding low-level execution. |
| Bounded skill or supervisory | The learned element controls a bounded skill, reference, primitive, or supervisory policy within task constraints. |
| Bounded shared control | Authority is shared between learned policy, operator, and/or conventional controller during execution. |
| Residual learning within classical control | A learned residual, adaptation, or auxiliary term operates inside or alongside a classical control structure. |

## A4 Runtime Assurance Modes

Runtime assurance is coded from mechanisms disclosed as active during execution, not from training reward terms alone.

| Code | Interpretation |
|:--|:--|
| AM0 | No disclosed execution-time safeguard beyond ordinary policy output or evaluation setup. |
| AM1 | Heuristic, rule-based, reward-shaped, or post-hoc constraints that influence behavior but do not clearly enforce a runtime safety envelope. |
| AM2 | Disclosed runtime mediation, constraint enforcement, envelope checking, fallback, virtual fixture, stabilizing controller, or intervention logic. |
| AM3 | Stronger formalized or safety-constrained runtime enforcement, such as explicit safe-RL constraint handling or runtime safety filter logic. |

## A5 Validation Exposure Levels

EVL records the validation exposure disclosed by the source. It does not claim that a system is deployment-ready.

| Code | Interpretation |
|:--|:--|
| L0 | Simulation-only, numerical-only, or virtual validation without physical hardware exposure. |
| L1 | Simplified physical validation, benchtop trial, component-level experiment, or limited hardware exposure. |
| L2 | Laboratory or controlled physical validation with a robot or construction-relevant setup, but limited environmental diversity or workflow realism. |
| L3 | Construction-representative hardware, full-scale or near-operational trials, or stronger task-environment realism with disclosed system behavior. |
| L4 | Extended or larger-scale operationally grounded evidence beyond a single controlled demonstration, but still short of sustained routine deployment. |
| L5 | Sustained field deployment with operational integration and repeated exposure. No primary instance currently reaches L5. |

## Synthesis Set

| Value | Use |
|:--|:--|
| `Primary` | Included in the main DRL synthesis across A1--A5. |
| `Contextual` | Used to position regime physics, control analogs, authority mediation, assurance mechanisms, or validation boundaries. |

## Reuse Notes

- Treat the A1--A5 labels as evidence-scope annotations, not universal judgments about the value of a paper.
- Recompute counts from `Assets/evidence_matrix.csv` if the matrix is edited.
- Preserve `citation_key` values when building derivative tables so that links back to the manuscript bibliography remain stable.
- When citing a row-level claim, cite the original source as well as this companion repository.
