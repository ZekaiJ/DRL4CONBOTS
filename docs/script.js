const axes = {
  failure: {
    title: "Construction-specific failure regime",
    body: "The comparison begins with the physical mechanism that makes execution fail or become difficult to recover.",
    bullets: ["History-dependent material resistance", "Tolerance-sensitive contact", "Underactuated suspended-load dynamics", "Accumulating process-state transformation", "Mixed-agent and workflow uncertainty"]
  },
  learning: {
    title: "Learning formulation",
    body: "Observation, action, objective, and training pathway are interpreted relative to the failure state exercised by the task.",
    bullets: ["Failure-relevant observation and history", "Physical meaning and rate of the learned action", "Objective and training-time constraints", "Simulation, offline data, demonstration, and transfer pathway"]
  },
  authority: {
    title: "Command responsibility",
    body: "The learned output is located within the planner, controller, human-supervision, and actuator pathway of the complete system.",
    bullets: ["Task- or planner-level proposal", "Bounded skill, supervisory, or shared-control role", "Residual learning within classical control", "Downstream arbitration and executable command"]
  },
  safeguards: {
    title: "Execution-time safeguards and recovery",
    body: "Learning-time penalties are distinguished from mechanisms that can monitor, reshape, stop, reject, or recover motion during execution.",
    bullets: ["Monitored operating boundaries", "Active command mediation", "Formalized runtime enforcement", "Abort, intervention, fallback, withdrawal, and restart"]
  },
  validation: {
    title: "Validation conditions and supported conclusion",
    body: "Test conditions describe what the complete robot--learning--control configuration actually exercised.",
    bullets: ["Simulation and conditioned hardware", "Variable laboratory testing", "Construction-representative controlled testing", "Near-operational field demonstration", "Sustained workflow integration"]
  }
};

const contrasts = {
  physics: {
    title: "Failure physics shapes technical relevance",
    body: "The usefulness of observations, action abstractions, objectives, training pathways, and recovery strategies varies with the governing failure physics.",
    papers: ["Soil resistance requires evidence different from contact insertion.", "Suspended loads require delayed-dynamics and swept-volume interpretation.", "Process tasks require attention to cumulative defects and workpiece-state change."]
  },
  system: {
    title: "Performance belongs to the complete configuration",
    body: "Learned outputs recur within planners, controllers, operator actions, and supervisory logic; outcomes cannot generally be attributed to the policy alone.",
    papers: ["Classical control often remains downstream of learning.", "Operators and rule gates can retain execution authority.", "Component-level ablations are uncommon, so attribution must remain bounded."]
  },
  validation: {
    title: "Hardware realism is not safeguard completeness",
    body: "Representative equipment or field exposure strengthens only the claims exercised in that setting. It does not automatically establish protection, intervention, recovery, or workflow integration.",
    papers: ["Full-scale path execution can omit swing dynamics.", "Laboratory systems can disclose stronger runtime mediation than field trials.", "Validation conditions and execution-time response must be reported together."]
  }
};

const papers = [
  {regime:"earthwork",tag:"Earthwork",title:"Large-Scale Robotic Material Handling: Learning, Planning, and Control",venue:"IEEE TFR 2026",note:"Near-operational material handling inside a layered planning-and-control architecture.",doi:"https://doi.org/10.1109/TFR.2026.3662619"},
  {regime:"earthwork",tag:"Earthwork",title:"Reinforcement Learning-Based Bucket Filling for Autonomous Excavation",venue:"IEEE TFR 2024",note:"Full-scale soil interaction with learned joint-velocity references above hydraulic control.",doi:"https://doi.org/10.1109/TFR.2024.3432508"},
  {regime:"assembly",tag:"Assembly",title:"Robotic assembly of timber joints using reinforcement learning",venue:"Automation in Construction 2021",note:"Contact-rich timber insertion with force/torque-triggered abort and bounded recovery evidence.",doi:"https://doi.org/10.1016/j.autcon.2021.103569"},
  {regime:"assembly",tag:"Assembly",title:"Visual-tactile learning of robotic cable-in-duct installation skills",venue:"Automation in Construction 2025",note:"Tactile state supports insertion transfer; physical wall sliding bounds autonomous recovery claims.",doi:"https://doi.org/10.1016/j.autcon.2024.105905"},
  {regime:"lifting",tag:"Lifting",title:"Autonomous construction framework for crane control with enhanced soft actor-critic algorithm",venue:"Computer-Aided Civil and Infrastructure Engineering 2025",note:"Construction-representative supervised path execution with rope swing omitted from the learned state.",doi:"https://doi.org/10.1111/mice.13427"},
  {regime:"lifting",tag:"Lifting",title:"Deep reinforcement learning-based trajectory planning for double pendulum cranes",venue:"MSSP 2025",note:"Physical crane evidence with stabilizing control retained in the execution loop.",doi:"https://doi.org/10.1016/j.ymssp.2025.112780"},
  {regime:"process",tag:"Process",title:"Autonomous robotic additive manufacturing through distributed model-free deep reinforcement learning",venue:"Construction Robotics 2022",note:"Simulation-only learned printing-policy evidence; physical block stacking is a separate case.",doi:"https://doi.org/10.1007/s41693-022-00069-0"},
  {regime:"process",tag:"Process",title:"Reinforcement learning-based continuous path planning and automated concrete 3D printing",venue:"Automation in Construction 2025",note:"Physical ten-layer path execution without closed-loop material-state adaptation.",doi:"https://doi.org/10.1016/j.autcon.2025.106290"},
  {regime:"navigation",tag:"Navigation",title:"Safety-constrained Deep Reinforcement Learning control for human-robot collaboration in construction",venue:"Automation in Construction 2025",note:"Learned proposals are reshaped by a fast reference governor during physical HRC tests.",doi:"https://doi.org/10.1016/j.autcon.2025.106130"},
  {regime:"navigation",tag:"Navigation",title:"Deep reinforcement learning coupled with topological scene graph for dynamic path planning of autonomous bulldozer",venue:"Automation in Construction 2026",note:"Low-speed routing with downstream control, alert braking, and site rules.",doi:"https://doi.org/10.1016/j.autcon.2025.106617"}
];

const axisCard = document.querySelector("#axis-card");
const axisTabs = document.querySelectorAll(".axis-tab");
const contrastCard = document.querySelector("#contrast-card");
const contrastCells = document.querySelectorAll(".contrast-cell");
const paperGrid = document.querySelector("#paper-grid");
const filters = document.querySelectorAll(".filter");

function renderAxis(key) {
  const axis = axes[key];
  axisCard.innerHTML = `<h3>${axis.title}</h3><p>${axis.body}</p><ul>${axis.bullets.map(item => `<li>${item}</li>`).join("")}</ul>`;
}

function renderContrast(key) {
  const item = contrasts[key];
  contrastCard.innerHTML = `<h3>${item.title}</h3><p>${item.body}</p><ul>${item.papers.map(text => `<li>${text}</li>`).join("")}</ul>`;
}

function renderPapers(filter) {
  const visible = filter === "all" ? papers : papers.filter(paper => paper.regime === filter);
  paperGrid.innerHTML = visible.map(paper => `<article class="paper-card"><span>${paper.tag} | ${paper.venue}</span><strong>${paper.title}</strong><p>${paper.note}</p><a href="${paper.doi}">Open DOI</a></article>`).join("");
}

axisTabs.forEach(button => button.addEventListener("click", () => {
  axisTabs.forEach(tab => tab.classList.remove("active")); button.classList.add("active"); renderAxis(button.dataset.axis);
}));

contrastCells.forEach(button => button.addEventListener("click", () => {
  contrastCells.forEach(cell => cell.classList.remove("active")); button.classList.add("active"); renderContrast(button.dataset.contrast);
}));

filters.forEach(button => button.addEventListener("click", () => {
  filters.forEach(item => item.classList.remove("active")); button.classList.add("active"); renderPapers(button.dataset.filter);
}));

document.querySelector("#copy-bibtex").addEventListener("click", async event => {
  try { await navigator.clipboard.writeText(document.querySelector("#bibtex").innerText); event.currentTarget.textContent = "Copied"; }
  catch { event.currentTarget.textContent = "Select text above"; }
});

renderAxis("failure");
renderContrast("physics");
renderPapers("all");
