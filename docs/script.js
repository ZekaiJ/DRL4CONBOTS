const axes = {
  a1: {
    title: "A1. Competency regime",
    body: "Groups systems by the construction task regime that shapes the evidence burden.",
    bullets: [
      "Earthwork and material processing",
      "Structural assembly and installation",
      "Material placement and lifting",
      "Additive manufacturing and surface processing",
      "Navigation, layout, and logistics support"
    ]
  },
  a2: {
    title: "A2. Learning formulation",
    body: "Tracks how the policy is represented, trained, evaluated, and linked to construction task constraints.",
    bullets: [
      "Observation interface",
      "Action abstraction",
      "Decision formalism",
      "Objective specification",
      "Training pathway"
    ]
  },
  a3: {
    title: "A3. Runtime authority",
    body: "Separates sensing, proposing, arbitrating, and executing behavior instead of treating autonomy as a single label.",
    bullets: [
      "Who senses the environment",
      "Who proposes action",
      "Who arbitrates authority",
      "Who executes robot behavior"
    ]
  },
  a4: {
    title: "A4. Runtime assurance",
    body: "Identifies whether safeguards, constraints, monitors, fallback layers, or intervention logic are disclosed.",
    bullets: [
      "Execution-time constraints",
      "Safety monitors",
      "Fallback behavior",
      "Human intervention reporting"
    ]
  },
  a5: {
    title: "A5. Validation exposure",
    body: "Places evidence on an exposure ladder from simulation-only evaluation to sustained workflow-integrated deployment.",
    bullets: [
      "Simulation-only evaluation",
      "Physical trials",
      "Field-like or task-scale validation",
      "Workflow-integrated deployment"
    ]
  }
};

const insights = {
  "am0-l0": {
    title: "Simulation-heavy evidence cluster",
    body: "Thirty-five primary DRL instances are simultaneously AM0 and EVL L0. This is the clearest readiness gap: the policy may work in an isolated training or simulation setting, but the paper does not yet disclose runtime authority transfer or validation exposure sufficient for deployment claims.",
    papers: [
      "Use this cluster as the negative control for readiness language.",
      "Avoid inferring deployment readiness from algorithm choice alone."
    ]
  },
  evl3: {
    title: "Physical exposure is not enough by itself",
    body: "Twenty primary instances reach EVL L3 or higher, but exposure alone does not guarantee runtime assurance. The atlas separates whether the robot was tested in a physical or field-like setting from whether safeguards and intervention logic were disclosed.",
    papers: [
      "Physical validation should be read together with A3 and A4.",
      "Field-like demonstrations still need authority and assurance evidence."
    ]
  },
  evl4: {
    title: "Near-operational anchor",
    body: "Only one primary instance reaches EVL L4 in the current synthesis. It functions as an anchor for what stronger readiness evidence can look like when learning, planning, real-machine behavior, and disclosed runtime constraints are combined.",
    papers: [
      "Spinelli et al., IEEE TFR 2026",
      "Large-scale robotic material handling with learning, planning, and control"
    ]
  },
  evl5: {
    title: "Deployment remains an open frontier",
    body: "No primary DRL instance reaches sustained workflow-integrated deployment. This is the main strategic claim of the atlas: construction robotics DRL has advanced, but routine site-governed deployment evidence remains scarce.",
    papers: [
      "Use EVL L5 as the future-work boundary.",
      "Do not describe field-like tests as sustained deployment."
    ]
  }
};

const papers = [
  {
    regime: "earthwork",
    tag: "Earthwork",
    title: "Large-Scale Robotic Material Handling: Learning, Planning, and Control",
    venue: "IEEE TFR 2026",
    note: "Near-operational material-handling anchor and the current EVL L4 instance.",
    doi: "https://doi.org/10.1109/TFR.2026.3662619"
  },
  {
    regime: "earthwork",
    tag: "Earthwork",
    title: "Reinforcement Learning-Based Bucket Filling for Autonomous Excavation",
    venue: "IEEE TFR 2024",
    note: "Connects randomized simulation with full-size excavation and bucket-filling evidence.",
    doi: "https://doi.org/10.1109/TFR.2024.3432508"
  },
  {
    regime: "assembly",
    tag: "Assembly",
    title: "Robotic assembly of timber joints using reinforcement learning",
    venue: "Automation in Construction 2021",
    note: "Combines simulation training, force or torque sensing, and physical lap-joint validation.",
    doi: "https://doi.org/10.1016/j.autcon.2021.103569"
  },
  {
    regime: "assembly",
    tag: "Assembly",
    title: "Visual-tactile learning of robotic cable-in-duct installation skills",
    venue: "Automation in Construction 2025",
    note: "Links tactile sim-to-real alignment with physical cable-in-duct trials.",
    doi: "https://doi.org/10.1016/j.autcon.2024.105905"
  },
  {
    regime: "lifting",
    tag: "Lifting",
    title: "Autonomous construction framework for crane control with enhanced soft actor-critic algorithm",
    venue: "Computer-Aided Civil and Infrastructure Engineering 2025",
    note: "Strong lifting-regime validation anchor with real-time progress monitoring.",
    doi: "https://doi.org/10.1111/mice.13427"
  },
  {
    regime: "lifting",
    tag: "Lifting",
    title: "Reinforcement learning-based simulation and automation for tower crane 3D lift planning",
    venue: "Automation in Construction 2022",
    note: "Evaluates tower-crane lift planning in a real-scale virtual site.",
    doi: "https://doi.org/10.1016/j.autcon.2022.104620"
  },
  {
    regime: "additive",
    tag: "Additive",
    title: "Autonomous robotic additive manufacturing through distributed model-free deep reinforcement learning",
    venue: "Construction Robotics 2022",
    note: "Applies distributed model-free DRL to robotic additive manufacturing.",
    doi: "https://doi.org/10.1007/s41693-022-00069-0"
  },
  {
    regime: "additive",
    tag: "Additive",
    title: "Reinforcement learning-based continuous path planning and automated concrete 3D printing",
    venue: "Automation in Construction 2025",
    note: "Optimizes continuous fill-path sequencing for concrete 3D printing.",
    doi: "https://doi.org/10.1016/j.autcon.2025.106290"
  },
  {
    regime: "navigation",
    tag: "Navigation",
    title: "Safety-constrained Deep Reinforcement Learning control for human-robot collaboration in construction",
    venue: "Automation in Construction 2025",
    note: "Navigation and HRC instance with explicit safety-constrained runtime evidence.",
    doi: "https://doi.org/10.1016/j.autcon.2025.106130"
  },
  {
    regime: "navigation",
    tag: "Navigation",
    title: "Deep reinforcement learning coupled with topological scene graph for dynamic path planning of autonomous bulldozer",
    venue: "Automation in Construction 2026",
    note: "Combines topological scene graphs and DRL for dynamic bulldozer path planning.",
    doi: "https://doi.org/10.1016/j.autcon.2025.106617"
  }
];

const axisCard = document.querySelector("#axis-card");
const axisTabs = document.querySelectorAll(".axis-tab");
const insightCard = document.querySelector("#insight-card");
const matrixCells = document.querySelectorAll(".matrix-cell");
const paperGrid = document.querySelector("#paper-grid");
const filters = document.querySelectorAll(".filter");

function renderAxis(axisKey) {
  const axis = axes[axisKey];
  axisCard.innerHTML = `
    <h3>${axis.title}</h3>
    <p>${axis.body}</p>
    <ul>${axis.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>
  `;
}

function renderInsight(insightKey) {
  const insight = insights[insightKey];
  insightCard.innerHTML = `
    <h3>${insight.title}</h3>
    <p>${insight.body}</p>
    <ul>${insight.papers.map((item) => `<li>${item}</li>`).join("")}</ul>
  `;
}

function renderPapers(filter) {
  const visible = filter === "all" ? papers : papers.filter((paper) => paper.regime === filter);
  paperGrid.innerHTML = visible.map((paper) => `
    <article class="paper-card">
      <span>${paper.tag} | ${paper.venue}</span>
      <strong>${paper.title}</strong>
      <p>${paper.note}</p>
      <a href="${paper.doi}">Open DOI</a>
    </article>
  `).join("");
}

axisTabs.forEach((button) => {
  button.addEventListener("click", () => {
    axisTabs.forEach((tab) => tab.classList.remove("active"));
    button.classList.add("active");
    renderAxis(button.dataset.axis);
  });
});

matrixCells.forEach((button) => {
  button.addEventListener("click", () => {
    matrixCells.forEach((cell) => cell.classList.remove("active"));
    button.classList.add("active");
    renderInsight(button.dataset.insight);
  });
});

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((filter) => filter.classList.remove("active"));
    button.classList.add("active");
    renderPapers(button.dataset.filter);
  });
});

document.querySelector("#copy-bibtex").addEventListener("click", async () => {
  const text = document.querySelector("#bibtex").innerText;
  try {
    await navigator.clipboard.writeText(text);
    document.querySelector("#copy-bibtex").textContent = "Copied";
    window.setTimeout(() => {
      document.querySelector("#copy-bibtex").textContent = "Copy BibTeX";
    }, 1400);
  } catch {
    document.querySelector("#copy-bibtex").textContent = "Select text above";
  }
});

renderAxis("a1");
renderInsight("am0-l0");
renderPapers("all");
