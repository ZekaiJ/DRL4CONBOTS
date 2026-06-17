const state = {
  summary: {},
  activeField: "A1_competency_regime",
  recordFilter: "All"
};

const fieldLabels = {
  A1_competency_regime: "A1 competency regime",
  A3_authority_pattern: "A3 runtime authority",
  A4_assurance_mode: "A4 runtime assurance",
  A5_EVL: "A5 validation exposure"
};

const fallbackSummary = {
  total_instances: 152,
  primary_instances: 75,
  contextual_instances: 77,
  counts: {
    A1_competency_regime: {
      "Earthwork and Material Processing": 50,
      "Structural Assembly and Installation": 35,
      "Material Placement and Lifting": 33,
      "Navigation, Layout, and Logistics Support": 27,
      "Additive Manufacturing and Surface Processing": 7
    },
    A3_authority_pattern: {
      "Bounded skill or supervisory": 102,
      "Task/planner-level": 30,
      "Residual learning within classical control": 15,
      "Bounded shared control": 2,
      "Non-RL model-based control contextual": 1,
      "Non-RL neural/passivity-based control contextual": 1,
      "Non-RL robotization/data-generation platform": 1
    },
    A4_assurance_mode: {
      "AM0": 97,
      "AM1": 36,
      "AM2": 16,
      "AM3": 3
    },
    A5_EVL: {
      "L0": 90,
      "L1": 4,
      "L2": 37,
      "L3": 20,
      "L4": 1
    }
  },
  featured_records: []
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderDistribution() {
  const container = document.querySelector("#distribution-bars");
  const counts = state.summary.counts[state.activeField] || {};
  const entries = Object.entries(counts);
  const max = Math.max(...entries.map(([, count]) => Number(count)), 1);

  container.innerHTML = entries.map(([label, count]) => {
    const width = Math.max(4, Math.round((Number(count) / max) * 100));
    return `
      <div class="bar-row">
        <div class="bar-label">${escapeHtml(label)}</div>
        <div class="bar-track" role="img" aria-label="${escapeHtml(fieldLabels[state.activeField])}: ${escapeHtml(label)} has ${count} records">
          <div class="bar-fill" style="width: ${width}%"></div>
        </div>
        <div class="bar-count">${count}</div>
      </div>
    `;
  }).join("");
}

function compactNote(note) {
  if (!note) return "Source-coded instance with taxonomy fields available in the evidence matrix.";
  const clean = note.replace(/\s+/g, " ").trim();
  return clean.length > 190 ? `${clean.slice(0, 187)}...` : clean;
}

function renderRecords() {
  const container = document.querySelector("#record-grid");
  const records = (state.summary.featured_records || [])
    .filter((record) => state.recordFilter === "All" || record.synthesis_set === state.recordFilter)
    .slice(0, 9);

  if (!records.length) {
    container.innerHTML = `<p class="lede-small">Open the CSV matrix for the full source-coded record list.</p>`;
    return;
  }

  container.innerHTML = records.map((record) => `
    <article class="record-card">
      <small>${escapeHtml(record.synthesis_set)} / ${escapeHtml(record.year)}</small>
      <h4>${escapeHtml(record.title || record.citation_key)}</h4>
      <div class="record-meta">
        <span>${escapeHtml(record.A1_competency_regime)}</span>
        <span>${escapeHtml(record.A3_SPAE_pattern)}</span>
        <span>${escapeHtml(record.A4_assurance_mode)}</span>
        <span>${escapeHtml(record.A5_EVL)}</span>
      </div>
      <p>${escapeHtml(compactNote(record._alias_note))}</p>
    </article>
  `).join("");
}

function bindControls() {
  document.querySelectorAll("[data-field]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeField = button.dataset.field;
      document.querySelectorAll("[data-field]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderDistribution();
    });
  });

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.recordFilter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderRecords();
    });
  });
}

function bindHeader() {
  const header = document.querySelector(".site-header");
  const updateHeader = () => {
    header.dataset.elevated = window.scrollY > 80 ? "true" : "false";
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

async function init() {
  bindControls();
  bindHeader();

  try {
    const response = await fetch("Assets/evidence_summary.json");
    if (!response.ok) throw new Error(`Failed to load evidence summary: ${response.status}`);
    state.summary = await response.json();
  } catch (error) {
    console.warn(error);
    state.summary = fallbackSummary;
  }

  renderDistribution();
  renderRecords();
}

init();
