# DRL4CONBOTS: Deep Reinforcement Learning for Construction Robotics

<div align="center">
<a href="https://github.com/David-Kingsman/DRL4CONBOTS/stargazers"><img src="https://img.shields.io/github/stars/David-Kingsman/DRL4CONBOTS" alt="Stars Badge"/></a>
<a href="#"><img src="https://img.shields.io/badge/Status-pre--submission-6b6f76" alt="Pre-submission status"/></a>
<a href="#"><img src="https://img.shields.io/badge/Papers-152_coded_instances-315d6a" alt="152 coded instances"/></a>
<a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-e6b23f" alt="MIT License"/></a>
</div>

<p align="center">
<img src="Assets/Fig3.png" width="700"/>
</p>
<h5 align=center>The DRL4CONBOTS framework for interpreting claim scope in DRL-enabled construction robotics.</h5>

> A curated collection of papers, evidence trends, and resources related to **Deep Reinforcement Learning for Construction Robotics (DRL4CONBOTS)**.
>
> This repository serves as the online companion to our pre-submission survey **"Deep Reinforcement Learning for Construction Robotics: A System-Level Taxonomy and Evidence Map toward Real-World Readiness"**.
>
> 📢 The rapid growth of DRL-enabled construction robotics is creating a shift from isolated task demonstrations toward system-level questions about authority, runtime assurance, validation exposure, and real-world readiness. This repository tracks high-quality papers and evidence patterns in this field, serving as a lightweight hub for researchers, practitioners, and students. Stay tuned!
>
> Feel free to contact us if you have any suggestions or would like to discuss with us by e-mail: zekai.jin@mail.mcgill.ca

## Table of Contents
- [🔥 News & Updates](#-news--updates)
- [📝 Cite Our Work](#-cite-our-work)
- [📖 Framework and Taxonomy](#-framework-and-taxonomy)
- [📚 Papers by Category](#-papers-by-category)
  - [Earthwork and Material Processing](#earthwork-and-material-processing)
  - [Structural Assembly and Installation](#structural-assembly-and-installation)
  - [Material Placement and Lifting](#material-placement-and-lifting)
  - [Additive Manufacturing and Surface Processing](#additive-manufacturing-and-surface-processing)
  - [Navigation, Layout, and Logistics Support](#navigation-layout-and-logistics-support)
- [📈 Research Trend](#-research-trend)
- [⭐ Overview of Primary Evidence Regimes](#-overview-of-primary-evidence-regimes)
- [💡 Foundational Robotics RL Techniques](#-foundational-robotics-rl-techniques)
- [📋 Construction Robotics Testbeds and Data Sources](#-construction-robotics-testbeds-and-data-sources)
- [🛠️ Popular Open-Source Libraries for Robot Learning](#️-popular-open-source-libraries-for-robot-learning)
- [🖥️ Hardware and Deployment Notes](#️-hardware-and-deployment-notes)
- [License](#license)

## 🔥 News & Updates
- ✅ **[June 2026] Repository launch:** `DRL4CONBOTS` is prepared as the public companion page for the pre-submission survey.
- ✅ **[June 2026] Evidence map released:** The current repository tracks **152 coded construction-robotics instances**, including **75 primary DRL instances**.
- ✅ **[June 2026] Core finding:** Across the **75** primary DRL instances, **35** are simultaneously **AM0** and **EVL L0**, while **0** reach sustained workflow-integrated deployment.

## 📝 Cite Our Work
This manuscript has not yet been submitted and has no journal DOI. If you find this repository useful, please cite the pre-submission companion repository and the original papers behind row-level technical claims.

```bibtex
@misc{jin2026drl4conbots,
  title        = {DRL4CONBOTS: Deep Reinforcement Learning for Construction Robotics Evidence Map},
  author       = {Jin, Zekai and Wang, Huiguang and Tang, Yihong and Guo, Zhanyu and Sun, Lijun and Dong, Zhen and Feng, Chen and Shao, Yi},
  year         = {2026},
  howpublished = {Pre-submission manuscript companion repository},
  note         = {Repository and manuscript metadata to be updated after submission or archival release}
}
```

## 📖 Framework and Taxonomy
*Definition*: **DRL4CONBOTS** refers to a system-level evidence map for deep reinforcement learning in construction robotics. Instead of ranking algorithms by task success alone, it interprets what each reported robot system can credibly claim based on its task regime, learning formulation, runtime authority, runtime assurance, and validation exposure.

The review uses five coupled dimensions:

- **A1. Competency regime**: earthwork, assembly, lifting, additive/surface processing, or navigation/logistics.
- **A2. Learning formulation**: observation, action abstraction, decision formalism, and training pathway.
- **A3. Runtime authority**: who senses, proposes, arbitrates, and executes robot behavior.
- **A4. Runtime assurance**: whether execution-time safeguards, constraints, monitors, or fallback layers are disclosed.
- **A5. Validation exposure**: where behavior is tested, from simulation-only evidence to sustained field deployment.

---

## 📚 Papers by Category
Here, we list representative high-quality papers according to the five competency regimes used in the DRL4CONBOTS framework.

#### **Earthwork and Material Processing**
*Function: Learn excavation, grading, loading, material handling, and machine-level interaction where soil, rock, traction, tool load, and material-state evolution dominate claim scope.*

- **Near-operational material handling**
    - **[Large-Scale Robotic Material Handling: Learning, Planning, and Control](https://doi.org/10.1109/TFR.2026.3662619)**. *Spinelli, F. A. et al.* **[IEEE TFR 2026]**.
        - *Highlight: The only primary instance reaching EVL L4 in the current synthesis; combines learning, planning, real-machine material handling, and disclosed runtime constraints.*
- **Full-scale excavation and loading**
    - **[Reinforcement Learning-Based Bucket Filling for Autonomous Excavation](https://doi.org/10.1109/TFR.2024.3432508)**. *Egli, P. et al.* **[IEEE TFR 2024]**.
        - *Highlight: Connects randomized simulation with full-size excavation and bucket-filling evidence.*
    - **[Automatic Loading of Unknown Material with a Wheel Loader Using Reinforcement Learning](https://doi.org/10.1109/ICRA57147.2024.10610221)**. *Eriksson, D. et al.* **[ICRA 2024]**.
        - *Highlight: Studies online material adaptation on a 24-tonne wheel loader under real-machine loading conditions.*
- **Safety-aware excavation control**
    - **[Safe reinforcement learning for tracking control of uncertain hydraulic excavators](https://doi.org/10.1007/s11071-025-11500-w)**. *Chen, K. et al.* **[Nonlinear Dynamics 2025]**.
        - *Highlight: Uses safe-RL tracking logic for uncertain hydraulic excavator control and is one of the few AM3-coded primary instances.*

#### **Structural Assembly and Installation**
*Function: Learn tolerance-sensitive placement, insertion, joining, tactile correction, and installation where small pose errors can become jamming, wedging, surface damage, or contact-mode failures.*

- **Contact-rich timber and architectural assembly**
    - **[Robotic assembly of timber joints using reinforcement learning](https://doi.org/10.1016/j.autcon.2021.103569)**. *Apolinarska, A. A. et al.* **[Automation in Construction 2021]**.
        - *Highlight: Combines simulation training, force/torque sensing, and physical lap-joint validation.*
    - **[Robotic architectural assembly with tactile skills: Simulation and optimization](https://doi.org/10.1016/j.autcon.2021.104006)**. *Belousov, B. et al.* **[Automation in Construction 2022]**.
        - *Highlight: Shows why tactile simulation fidelity matters for modular assembly and contact-rich construction tasks.*
- **Installation and tactile transfer**
    - **[Visual-tactile learning of robotic cable-in-duct installation skills](https://doi.org/10.1016/j.autcon.2024.105905)**. *Duan, B. et al.* **[Automation in Construction 2025]**.
        - *Highlight: Connects SAC control, tactile sim-to-real alignment, and physical cable-in-duct trials.*
    - **[Training of construction robots using imitation learning and environmental rewards](https://doi.org/10.1111/mice.13394)**. *Duan, K. et al.* **[Computer-Aided Civil and Infrastructure Engineering 2025]**.
        - *Highlight: Combines imitation learning and environmental rewards for installation-oriented construction robot training.*

#### **Material Placement and Lifting**
*Function: Learn crane, hoist, lift-planning, and suspended-payload behavior where delayed oscillatory dynamics, swept-volume risk, payload variability, and site governance shape readiness claims.*

- **Construction-representative crane control**
    - **[Autonomous construction framework for crane control with enhanced soft actor-critic algorithm and real-time progress monitoring](https://doi.org/10.1111/mice.13427)**. *Xiao, Y. et al.* **[Computer-Aided Civil and Infrastructure Engineering 2025]**.
        - *Highlight: The strongest disclosed lifting-regime validation anchor in the primary set.*
- **Crane dynamics and stabilization**
    - **[Controlling a double-pendulum crane by combining reinforcement learning and conventional control](https://doi.org/10.23919/ACC55779.2023.10156044)**. *Eaglin, G. et al.* **[ACC 2023]**.
        - *Highlight: Demonstrates why hybrid conventional-control-plus-RL structures can outperform RL-only control in crane dynamics.*
    - **[Online reinforcement learning with passivity-based stabilizing term for real time overhead crane control without knowledge of the system model](https://doi.org/10.1016/j.ymssp.2021.108372)**. *Zhang, M. et al.* **[MSSP 2022]**.
        - *Highlight: Uses passivity-based stabilization to structure online RL for overhead crane control.*
- **Lift planning**
    - **[Reinforcement learning-based simulation and automation for tower crane 3D lift planning](https://doi.org/10.1016/j.autcon.2022.104620)**. *Cho, S. et al.* **[Automation in Construction 2022]**.
        - *Highlight: Evaluates tower-crane lift planning in a real-scale virtual site and compares simulated planning behavior with field-related traces.*

#### **Additive Manufacturing and Surface Processing**
*Function: Learn process control and path planning where material rheology, tool wear, cumulative geometry deviation, and irreversible process defects shape the validation burden.*

- **Robotic additive manufacturing**
    - **[Autonomous robotic additive manufacturing through distributed model-free deep reinforcement learning in computational design environments](https://doi.org/10.1007/s41693-022-00069-0)**. *Felbrich, B. et al.* **[Construction Robotics 2022]**.
        - *Highlight: Uses distributed model-free DRL for robotic additive manufacturing in computational design environments.*
- **Concrete 3D printing**
    - **[Reinforcement learning-based continuous path planning and automated concrete 3D printing of complex hollow components](https://doi.org/10.1016/j.autcon.2025.106290)**. *Wang, X. et al.* **[Automation in Construction 2025]**.
        - *Highlight: Optimizes continuous fill-path sequencing for concrete 3D printing of complex hollow components.*

#### **Navigation, Layout, and Logistics Support**
*Function: Learn mobility, routing, worker-aware planning, layout support, and logistics decisions where human co-presence, congestion, occlusion, handover, and governance determine claim scope.*

- **Safety-constrained construction HRC**
    - **[Safety-constrained Deep Reinforcement Learning control for human-robot collaboration in construction](https://doi.org/10.1016/j.autcon.2025.106130)**. *Duan, K. et al.* **[Automation in Construction 2025]**.
        - *Highlight: One of the few navigation/HRC instances with explicit safety-constrained runtime evidence.*
- **Scene-graph and bulldozer navigation**
    - **[Deep reinforcement learning coupled with topological scene graph for dynamic path planning of autonomous bulldozer in complex earthwork construction](https://doi.org/10.1016/j.autcon.2025.106617)**. *Gao, H. et al.* **[Automation in Construction 2026]**.
        - *Highlight: Combines topological scene graphs and DRL for dynamic bulldozer path planning in complex earthwork settings.*
- **Worker-aware planning**
    - **[Prediction-based path planning for safe and efficient human-robot collaboration in construction via deep reinforcement learning](https://doi.org/10.1061/(ASCE)CP.1943-5487.0001056)**. *Cai, J. et al.* **[Journal of Computing in Civil Engineering 2023]**.
        - *Highlight: Combines worker-location prediction with DQN path planning for construction HRC scenarios.*

---

## 📈 Research Trend
The current evidence base shows that real-world readiness cannot be inferred from algorithm labels, hardware presence, or field-like demonstrations alone.

<p align="center">
<img src="Assets/Fig11.png" width="720"/>
</p>
<h5 align=center>Evidence-closure map for deployment-relevant claims in construction robotics.</h5>

Key findings from the primary synthesis set:

- **Authority-assurance decoupling:** **45/75** primary instances are AM0, and **60/75** remain within AM0-AM1.
- **Simulation without safeguards:** **35/75** primary instances are simultaneously AM0 and EVL L0.
- **Exposure-assurance divergence:** **20/75** primary instances reach EVL L3 or higher, but only **1** reaches EVL L4 and **0** reach EVL L5.

<p align="center">
<img src="Assets/cross_axis_evidence_trend.png" width="820"/>
</p>
<h5 align=center>Cross-axis primary evidence trend: runtime assurance against validation exposure.</h5>

---

## ⭐ Overview of Primary Evidence Regimes

| **Regime** | **Primary instances** | **Main bottleneck** |
|:--|:--:|:--|
| Earthwork and Material Processing | 36/75 | Long-horizon exposure to soil variability, muck, resistance discontinuities, and intervention histories |
| Structural Assembly and Installation | 18/75 | Tolerance variation, contact-rich disturbances, access constraints, and intervention reporting |
| Material Placement and Lifting | 8/75 | Workflow-coupled lift validation, swing handling, disturbance coverage, and governance |
| Additive Manufacturing and Surface Processing | 2/75 | Scale-dependent process physics, material rheology, and end-to-end process assurance |
| Navigation, Layout, and Logistics Support | 11/75 | Mixed-traffic exposure, handover, communication stress, recovery, and site governance |

---

## 💡 Foundational Robotics RL Techniques

| **Technique** | **Use in construction robotics** |
|:--|:--|
| Deep reinforcement learning | Learning continuous control, planning, routing, placement, and manipulation policies from interaction |
| Imitation learning and demonstrations | Initializing policies from expert operators, VR demonstrations, or teleoperation traces |
| Safe RL and constrained RL | Encoding limits, intervention logic, constraint penalties, or safety filters for execution-time behavior |
| Sim-to-real transfer | Moving policies from simulators to hardware through domain randomization, model learning, tactile transfer, or calibration |
| Offline and data-driven RL | Learning from logged machine operation, operator traces, or project data where online exploration is costly |
| Hybrid control and residual learning | Combining learned modules with MPC, impedance control, passivity terms, trajectory tracking, or rule-based supervisors |

---

## 📋 Construction Robotics Testbeds and Data Sources

| **Source type** | **Examples in the current field** | **Why it matters** |
|:--|:--|:--|
| Physics simulation | MuJoCo, PyBullet, Isaac Gym, RaiSim, Webots, Unity, Simulink | Enables repeated training and disturbance sampling before hardware exposure |
| Digital twins and project simulators | BIM-linked crane planning, earthmoving dispatch simulation, tunnel boring machine process models | Connects learning policies to site-scale operations and project constraints |
| Hardware prototypes | UR5/xArm assembly setups, tactile grippers, scaled hydraulic arms, wheel-loader and excavator platforms | Tests whether learned behavior survives sensing, actuation, and contact realities |
| Field and machine logs | Bucket-filling cycles, hydraulic signals, wheel-loader operation traces, TBM time series | Supports offline learning, model identification, and deployment-relevant validation |

---

## 🛠️ Popular Open-Source Libraries for Robot Learning

| **Library** | **Basic function** | **Use case** |
|:--|:--|:--|
| [Stable-Baselines3](https://github.com/DLR-RM/stable-baselines3) | PyTorch implementations of PPO, SAC, TD3, DQN, and related algorithms | Baseline DRL training for control and planning tasks |
| [RLlib](https://github.com/ray-project/ray/tree/master/rllib) | Scalable reinforcement learning library | Distributed training and multi-agent construction logistics experiments |
| [Gymnasium](https://github.com/Farama-Foundation/Gymnasium) | Standard RL environment interface | Custom construction-robotics task environments |
| [MuJoCo](https://github.com/google-deepmind/mujoco) | Physics engine for robot simulation | Manipulation, contact-rich installation, and locomotion-style control |
| [PyBullet](https://github.com/bulletphysics/bullet3) | Physics simulation and robotics API | Rapid prototyping of robot control and planning tasks |
| [ROS 2](https://github.com/ros2/ros2) | Robotics middleware | Connecting learned policies to sensors, controllers, and real robots |
| [Isaac Lab](https://github.com/isaac-sim/IsaacLab) | GPU-accelerated robot learning environments | Large-scale simulation and sim-to-real research |

---

## 🖥️ Hardware and Deployment Notes

| **Stage** | **Typical setup** | **Main constraint** |
|:--|:--|:--|
| Simulation training | Desktop GPU or workstation GPU | Sample throughput, simulator fidelity, and domain randomization coverage |
| Prototype validation | Lab robot, scaled construction mechanism, or instrumented end-effector | Sensing reliability, controller integration, contact physics, and reset protocol |
| Full-scale machine testing | Excavator, loader, crane, material handler, or mobile construction robot | Safety envelope, site governance, human supervision, intervention logging, and operating permissions |
| Workflow integration | Repeated exposure in real or near-operational construction workflows | Long-duration reliability, disturbance diversity, handover, recovery, maintenance, and accountability |

## License
This repository is released under the [MIT LICENSE](LICENSE).
