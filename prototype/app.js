const HERO_CONTENT = {
  mammoth: {
    title: "Woolly Mammoth - Temporal Niche Dossier",
    summary: "Arctic photoperiod adaptation, cold sensation, and long-range acoustic hypotheses.",
    lines: [
      { tier: "cited", text: "Circadian-related genetic changes are reported in mammoth genomics literature." },
      { tier: "interp", text: "Infrasound communication is modeled from elephant relatives and body-scale priors." },
      { tier: "spec", text: "Immersive dawn-to-polar-night scene dynamics are design hypotheses." }
    ]
  },
  thylacine: {
    title: "Thylacine - Dusk Vision Dossier",
    summary: "Orbit-informed diel behavior reconstruction and colonial extinction context.",
    lines: [
      { tier: "cited", text: "Historical records and morphology support crepuscular/nocturnal behavior hypotheses." },
      { tier: "interp", text: "RGC-like motion/contrast POV is an inferred visual interface, not direct thylacine measurement." },
      { tier: "spec", text: "First-person Umwelt rendering remains speculative and explicitly labeled." }
    ]
  }
};

const PORTAL_LABELS = {
  iucn_red_list_search: "IUCN",
  gbif_species_search: "GBIF Species",
  gbif_occurrence_search: "GBIF Occurrence",
  morphosource_search: "MorphoSource",
  pbdb_taxon_api: "PBDB API",
  pbdb_classic_ui: "PBDB UI",
  bhl_literature_search: "BHL",
  eol_search: "EOL",
  smithsonian_3d_search: "Smithsonian 3D",
  sketchfab_search: "Sketchfab",
  wikipedia: "Wikipedia",
  xeno_canto_search: "Xeno-canto",
  macaulay_library_search: "Macaulay Library"
};

async function loadData() {
  try {
    const [speciesRes, archivalRes] = await Promise.all([
      fetch("../data/research_extinct_animals_list.json"),
      fetch("../data/archival_media_research.json")
    ]);
    if (!speciesRes.ok || !archivalRes.ok) throw new Error("Data fetch failed");
    const speciesData = await speciesRes.json();
    const archivalData = await archivalRes.json();
    return { species: speciesData.species, archival: archivalData.species };
  } catch (e) {
    const mount = document.getElementById("archive-list");
    mount.innerHTML = `<div class="species-row">Data load failed. Start local server:<br><code>python3 -m http.server 4173</code><br>Then open <code>http://localhost:4173/prototype/</code></div>`;
    throw e;
  }
}

function heroTemplate(heroKey) {
  const h = HERO_CONTENT[heroKey];
  return `
    <article class="hero-card">
      <h3>${h.title}</h3>
      <p>${h.summary}</p>
      <ul>
        ${h.lines.map(l => `<li><span class="tag ${l.tier}">${l.tier}</span> ${l.text}</li>`).join("")}
      </ul>
    </article>`;
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function buildArchivalMap(archivalRows) {
  const map = new Map();
  archivalRows.forEach(row => map.set(row.scientific_name, row));
  return map;
}

function getSpeciesLink(r) {
  return `./species.html?slug=${encodeURIComponent(slugify(r.scientific_name))}`;
}

function renderArchive(rows, archivalMap) {
  const list = document.getElementById("archive-list");
  const stats = document.getElementById("archive-stats");
  stats.textContent = `Showing ${rows.length} species`;
  list.innerHTML = rows.map(r => {
    const a = archivalMap.get(r.scientific_name);
    const iucn = a?.portal_urls?.iucn_red_list_search || "#";
    const gbif = a?.portal_urls?.gbif_species_search || "#";
    return `
      <div class="species-row" id="${slugify(r.scientific_name)}">
        <strong>${r.common_name_en || r.scientific_name}</strong> <span class="meta">(${r.scientific_name})</span><br>
        <span class="meta">${r.category} | Extinction: ${r.extinction_summary} | Data: ${r.data_availability}</span><br>
        <span class="meta">${r.extinction_drivers}</span><br>
        <a href="${getSpeciesLink(r)}">Open detail</a>
        <a href="${iucn}" target="_blank" rel="noopener noreferrer">IUCN</a>
        <a href="${gbif}" target="_blank" rel="noopener noreferrer">GBIF</a>
      </div>`;
  }).join("");
}

function wireEthics() {
  const budget = document.getElementById("budget");
  const risk = document.getElementById("risk");
  const bv = document.getElementById("budget-value");
  const rv = document.getElementById("risk-value");
  const out = document.getElementById("ethics-output");

  const update = () => {
    bv.textContent = budget.value;
    rv.textContent = risk.value;
    const b = Number(budget.value);
    const r = Number(risk.value);
    if (b > 65 && r > 55) {
      out.textContent = "High de-extinction investment + high risk tolerance. Reflection prompt: what safeguards and sovereignty commitments are non-negotiable?";
    } else if (b < 35 && r < 40) {
      out.textContent = "Conservation-first strategy. Reflection prompt: what extinct memory work is still ethically required even without revival?";
    } else {
      out.textContent = "Balanced strategy. Reflection prompt: where should uncertainty be communicated to the public?";
    }
  };
  budget.addEventListener("input", update);
  risk.addEventListener("input", update);
  update();
}

function wireReflection() {
  const input = document.getElementById("reflection-input");
  const save = document.getElementById("save-reflection");
  const load = document.getElementById("load-reflection");
  const status = document.getElementById("reflection-status");
  const key = "umwelt_archive_reflection";

  save.addEventListener("click", () => {
    localStorage.setItem(key, input.value || "");
    status.textContent = "Reflection saved locally.";
  });
  load.addEventListener("click", () => {
    input.value = localStorage.getItem(key) || "";
    status.textContent = "Last reflection loaded.";
  });
}

function wireHeroTabs() {
  const heroMount = document.getElementById("hero-content");
  heroMount.innerHTML = heroTemplate("mammoth");
  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      heroMount.innerHTML = heroTemplate(btn.dataset.hero);
    });
  });
}

function fillCategoryFilter(species) {
  const select = document.getElementById("category-filter");
  const categories = [...new Set(species.map(s => s.category))];
  categories.sort().forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    select.appendChild(opt);
  });
}

function wireFilters(species, archivalMap) {
  const search = document.getElementById("search");
  const cat = document.getElementById("category-filter");
  const av = document.getElementById("availability-filter");
  const apply = () => {
    const q = search.value.trim().toLowerCase();
    const filtered = species.filter(s => {
      const matchQ = !q ||
        s.scientific_name.toLowerCase().includes(q) ||
        (s.common_name_en || "").toLowerCase().includes(q) ||
        (s.common_name_zh || "").includes(q);
      const matchCat = !cat.value || s.category === cat.value;
      const matchAv = !av.value || s.data_availability === av.value;
      return matchQ && matchCat && matchAv;
    });
    renderArchive(filtered, archivalMap);
  };
  [search, cat, av].forEach(el => el.addEventListener("input", apply));
  apply();
}

function renderPortalLinks(portalUrls = {}) {
  const keys = Object.keys(portalUrls);
  if (!keys.length) return "<p>No portal links available.</p>";
  return `<div class="portal-list">${keys.map(k => {
    const label = PORTAL_LABELS[k] || k;
    const url = portalUrls[k];
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  }).join("")}</div>`;
}

function parseQuery() {
  const p = new URLSearchParams(window.location.search);
  return Object.fromEntries(p.entries());
}

function renderSpeciesDetail(species, archivalMap, slug) {
  const mount = document.getElementById("species-detail");
  const hit = species.find(s => slugify(s.scientific_name) === slug);
  if (!hit) {
    mount.innerHTML = `<p>Species not found for slug: <code>${slug || "(empty)"}</code></p>`;
    return;
  }
  const arch = archivalMap.get(hit.scientific_name);
  const curated = arch?.notable_archives_curated || [];
  const exhibitBlocks = [
    { title: "Extinction Context", content: hit.extinction_drivers || "-" },
    { title: "Temporal/Sensory Cue", content: hit.notes || "Pending literature-backed sensory cue summary." },
    { title: "Data Reliability", content: hit.verification_note || "Validate status via IUCN and primary sources." }
  ];
  mount.innerHTML = `
    <h2>${hit.common_name_en} <span class="meta">(${hit.scientific_name})</span></h2>
    <p><strong>Chinese name:</strong> ${hit.common_name_zh || "-"}</p>
    <p><strong>Category:</strong> ${hit.category} | <strong>Extinction:</strong> ${hit.extinction_summary} | <strong>Region:</strong> ${hit.region}</p>
    <p><strong>Data availability:</strong> ${hit.data_availability} | <strong>Sensory score:</strong> ${hit.sensory_reconstruction_score} | <strong>Music score:</strong> ${hit.music_layering_score}</p>
    <p><strong>Extinction drivers:</strong> ${hit.extinction_drivers}</p>
    <p><strong>Project notes:</strong> ${hit.notes || "-"}</p>
    <p><strong>Verification:</strong> ${hit.verification_note || "-"}</p>

    <h3>Exhibit Content Blocks</h3>
    <div class="cards-grid">
      ${exhibitBlocks.map(b => `
        <div class="species-row">
          <strong>${b.title}</strong>
          <p class="meta">${b.content}</p>
        </div>
      `).join("")}
    </div>

    <h3>Archival Portals</h3>
    ${renderPortalLinks(arch?.portal_urls)}

    <h3>Curated Archive Hints</h3>
    <ul>
      ${curated.length ? curated.map(c => `<li><strong>${c.type}</strong>: ${c.label} (<a href="${c.url}" target="_blank" rel="noopener noreferrer">open</a>)</li>`).join("") : "<li>No curated hints yet.</li>"}
    </ul>

    <h3>Research Protocol</h3>
    <ul>
      ${(arch?.research_protocol || ["No protocol notes"]).map(x => `<li>${x}</li>`).join("")}
    </ul>
  `;
}

function regionToAnchor(region = "") {
  const r = region.toLowerCase();
  const has = (...tokens) => tokens.some(t => r.includes(t));
  if (has("北美", "north america", "canada", "united states", "alaska")) return { lat: 46, lon: -100 };
  if (has("南美", "south america", "brazil", "argentina", "chile")) return { lat: -15, lon: -60 };
  if (has("欧洲", "europe")) return { lat: 51, lon: 10 };
  if (has("亚洲", "asia", "西伯利亚", "china", "japan", "indonesia")) return { lat: 35, lon: 90 };
  if (has("澳大利亚", "tasmania", "australia")) return { lat: -25, lon: 134 };
  if (has("非洲", "africa")) return { lat: 5, lon: 20 };
  if (has("白令", "arctic", "北极")) return { lat: 66, lon: -170 };
  if (has("毛里求斯", "madagascar", "reunion", "加拉帕戈斯", "galapagos")) return { lat: -15, lon: 65 };
  return { lat: 10, lon: 0 };
}

function seededRand(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function speciesToPoints(species) {
  return species.map((s, idx) => {
    const anchor = regionToAnchor(s.region || "");
    const jitterLat = (seededRand(idx + 1) - 0.5) * 10;
    const jitterLon = (seededRand(idx + 91) - 0.5) * 14;
    return {
      ...s,
      slug: slugify(s.scientific_name),
      lat: Math.max(-75, Math.min(75, anchor.lat + jitterLat)),
      lon: anchor.lon + jitterLon
    };
  });
}

function categoryIcon(category = "") {
  const c = category.toLowerCase();
  if (c.includes("bird")) return "B";
  if (c.includes("mammal")) return "M";
  if (c.includes("reptile")) return "R";
  if (c.includes("amphib")) return "A";
  if (c.includes("fish")) return "F";
  if (c.includes("invertebrate")) return "I";
  if (c.includes("insect")) return "N";
  if (c.includes("megafauna")) return "G";
  return "S";
}

function categoryColor(category = "") {
  const c = category.toLowerCase();
  if (c.includes("bird")) return "#f6e7a3";
  if (c.includes("mammal")) return "#f3c8c8";
  if (c.includes("reptile")) return "#c8edbf";
  if (c.includes("amphib")) return "#afe7e8";
  if (c.includes("fish")) return "#b8d8ff";
  if (c.includes("invertebrate")) return "#dfc9f7";
  if (c.includes("insect")) return "#fde3b8";
  if (c.includes("megafauna")) return "#ffd4b1";
  return "#d0def2";
}

function projectPoint(latDeg, lonDeg, rotDeg, cx, cy, radius, zoom = 1) {
  const lat = (latDeg * Math.PI) / 180;
  const lon = ((lonDeg + rotDeg) * Math.PI) / 180;
  const x3 = Math.cos(lat) * Math.sin(lon);
  const y3 = Math.sin(lat);
  const z3 = Math.cos(lat) * Math.cos(lon);
  if (z3 <= 0) return null;
  return {
    x: cx + x3 * radius * zoom,
    y: cy - y3 * radius * zoom,
    z: z3
  };
}

function drawGlobe(ctx, canvas, state) {
  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2 + state.offsetX;
  const cy = h / 2 + state.offsetY;
  const globeR = Math.min(w, h) * 0.31;

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#070c12";
  ctx.fillRect(0, 0, w, h);

  // star field
  for (let i = 0; i < 120; i++) {
    const x = (seededRand(i * 13.3) * w) | 0;
    const y = (seededRand(i * 71.7) * h) | 0;
    const a = 0.12 + seededRand(i * 2.7) * 0.35;
    ctx.fillStyle = `rgba(210,230,255,${a})`;
    ctx.fillRect(x, y, 1.3, 1.3);
  }

  // globe body
  const g = ctx.createRadialGradient(cx - globeR * 0.2, cy - globeR * 0.25, globeR * 0.2, cx, cy, globeR);
  g.addColorStop(0, "#2e3f50");
  g.addColorStop(0.55, "#162330");
  g.addColorStop(1, "#0b1219");
  ctx.beginPath();
  ctx.arc(cx, cy, globeR * state.zoom, 0, Math.PI * 2);
  ctx.fillStyle = g;
  ctx.fill();

  // latitude and longitude lines
  ctx.strokeStyle = "rgba(172,198,230,0.18)";
  ctx.lineWidth = 1;
  for (let lat = -60; lat <= 60; lat += 15) {
    ctx.beginPath();
    for (let lon = -180; lon <= 180; lon += 4) {
      const p = projectPoint(lat, lon, state.rotation, cx, cy, globeR, state.zoom);
      if (!p) continue;
      if (lon === -180) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
  }
  for (let lon = -150; lon <= 180; lon += 15) {
    ctx.beginPath();
    for (let lat = -80; lat <= 80; lat += 3) {
      const p = projectPoint(lat, lon, state.rotation, cx, cy, globeR, state.zoom);
      if (!p) continue;
      if (lat === -80) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
  }

  // continent labels (stylized)
  ctx.fillStyle = "rgba(234,240,248,0.35)";
  // Medium-size baseline; scale with globe zoom for readability.
  ctx.font = `${Math.max(12, 18 * state.zoom)}px Georgia, serif`;
  [
    { text: "NORTH AMERICA", lat: 38, lon: -100 },
    { text: "SOUTH AMERICA", lat: -23, lon: -62 },
    { text: "EUROPE", lat: 51, lon: 12 },
    { text: "ASIA", lat: 33, lon: 90 },
    { text: "AFRICA", lat: 5, lon: 18 }
  ].forEach(lbl => {
    const p = projectPoint(lbl.lat, lbl.lon, state.rotation, cx, cy, globeR, state.zoom);
    if (p) ctx.fillText(lbl.text, p.x - 40, p.y);
  });

  // species points
  state.screenPoints = [];
  for (const item of state.points) {
    const p = projectPoint(item.lat, item.lon, state.rotation, cx, cy, globeR, state.zoom);
    if (!p) continue;
    const thumbW = 10 + p.z * 7;
    const thumbH = 10 + p.z * 7;
    const x = p.x - thumbW / 2;
    const y = p.y - thumbH / 2;
    const bg = categoryColor(item.category);
    const icon = categoryIcon(item.category);

    ctx.fillStyle = bg;
    ctx.strokeStyle = "rgba(20,28,38,0.6)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x, y, thumbW, thumbH, 2.5);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#1d2833";
    ctx.font = `${Math.max(7, thumbH * 0.58)}px Inter, sans-serif`;
    ctx.fillText(icon, x + thumbW * 0.3, y + thumbH * 0.74);

    if (item.slug === state.hoverSlug) {
      ctx.beginPath();
      ctx.roundRect(x - 3, y - 3, thumbW + 6, thumbH + 6, 4);
      ctx.strokeStyle = "rgba(118,210,255,0.95)";
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }
    state.screenPoints.push({ x, y, w: thumbW, h: thumbH, item });
  }
}

function popupHtml(item, archivalMap) {
  const a = archivalMap.get(item.scientific_name);
  const iucn = a?.portal_urls?.iucn_red_list_search || "#";
  return `
    <h3>${item.common_name_zh || item.common_name_en || item.scientific_name}</h3>
    <p>${item.common_name_en || ""}</p>
    <p>${item.scientific_name}</p>
    <p>${item.category} · ${item.extinction_summary}</p>
    <p>${item.region || "-"}</p>
    <a href="./species.html?slug=${encodeURIComponent(item.slug)}">Open species dossier</a>
    <a href="${iucn}" target="_blank" rel="noopener noreferrer">IUCN</a>
  `;
}

async function initHome() {
  const canvas = document.getElementById("globe-canvas");
  const popup = document.getElementById("point-popup");
  const chip = document.getElementById("species-count-chip");
  const toggle = document.getElementById("toggle-autorotate");
  if (!canvas || !popup || !chip || !toggle) return;

  const { species, archival } = await loadData();
  const archivalMap = buildArchivalMap(archival);
  const points = speciesToPoints(species);
  chip.textContent = `${species.length} extinct species mapped`;

  const ctx = canvas.getContext("2d");
  const state = {
    rotation: 0,
    zoom: 1,
    offsetX: 0,
    offsetY: 0,
    points,
    screenPoints: [],
    hoverSlug: null,
    autoRotate: true,
    dragging: false,
    dragStartX: 0,
    dragStartY: 0
  };

  function resize() {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  function frame() {
    if (state.autoRotate && !state.dragging) state.rotation += 0.08;
    drawGlobe(ctx, canvas, state);
    requestAnimationFrame(frame);
  }
  frame();

  toggle.addEventListener("click", () => {
    state.autoRotate = !state.autoRotate;
    toggle.textContent = state.autoRotate ? "Pause Rotate" : "Resume Rotate";
  });

  canvas.addEventListener("wheel", e => {
    e.preventDefault();
    state.zoom += e.deltaY > 0 ? -0.04 : 0.04;
    state.zoom = Math.max(0.72, Math.min(1.38, state.zoom));
  }, { passive: false });

  canvas.addEventListener("mousedown", e => {
    state.dragging = true;
    state.dragStartX = e.clientX;
    state.dragStartY = e.clientY;
  });
  window.addEventListener("mouseup", () => { state.dragging = false; });
  window.addEventListener("mousemove", e => {
    if (!state.dragging) return;
    const dx = e.clientX - state.dragStartX;
    const dy = e.clientY - state.dragStartY;
    state.dragStartX = e.clientX;
    state.dragStartY = e.clientY;

    // Rotation remains the primary horizontal motion cue.
    state.rotation += dx * 0.18;
    // Add globe translation to match "planet moves when dragging".
    state.offsetX += dx * 0.35;
    state.offsetY += dy * 0.35;
    state.offsetX = Math.max(-window.innerWidth * 0.28, Math.min(window.innerWidth * 0.28, state.offsetX));
    state.offsetY = Math.max(-window.innerHeight * 0.22, Math.min(window.innerHeight * 0.22, state.offsetY));
    // Drag up/down subtly zooms to create immersive push/pull feel.
    state.zoom += -dy * 0.0015;
    state.zoom = Math.max(0.72, Math.min(1.38, state.zoom));
  });

  // touch drag support
  canvas.addEventListener("touchstart", e => {
    if (!e.touches.length) return;
    state.dragging = true;
    state.dragStartX = e.touches[0].clientX;
    state.dragStartY = e.touches[0].clientY;
  }, { passive: true });
  canvas.addEventListener("touchmove", e => {
    if (!state.dragging || !e.touches.length) return;
    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;
    const dx = x - state.dragStartX;
    const dy = y - state.dragStartY;
    state.dragStartX = x;
    state.dragStartY = y;
    state.rotation += dx * 0.2;
    state.offsetX += dx * 0.35;
    state.offsetY += dy * 0.35;
    state.offsetX = Math.max(-window.innerWidth * 0.28, Math.min(window.innerWidth * 0.28, state.offsetX));
    state.offsetY = Math.max(-window.innerHeight * 0.22, Math.min(window.innerHeight * 0.22, state.offsetY));
    state.zoom += -dy * 0.0015;
    state.zoom = Math.max(0.72, Math.min(1.38, state.zoom));
  }, { passive: true });
  canvas.addEventListener("touchend", () => { state.dragging = false; }, { passive: true });

  canvas.addEventListener("click", e => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const hit = state.screenPoints.find(p => {
      return x >= p.x && x <= p.x + p.w && y >= p.y && y <= p.y + p.h;
    });
    if (!hit) {
      popup.classList.add("hidden");
      state.hoverSlug = null;
      return;
    }
    state.hoverSlug = hit.item.slug;
    popup.innerHTML = popupHtml(hit.item, archivalMap);
    popup.style.left = `${Math.min(window.innerWidth - 340, x + 18)}px`;
    popup.style.top = `${Math.min(window.innerHeight - 180, y + 18)}px`;
    popup.classList.remove("hidden");
  });
}

async function initHeroPage() {
  wireHeroTabs();
  wireEthics();
  wireReflection();
}

async function initArchivePage() {
  const { species, archival } = await loadData();
  const archivalMap = buildArchivalMap(archival);
  fillCategoryFilter(species);
  wireFilters(species, archivalMap);
}

async function initSpeciesPage() {
  const { species, archival } = await loadData();
  const archivalMap = buildArchivalMap(archival);
  const query = parseQuery();
  renderSpeciesDetail(species, archivalMap, query.slug || "");
}

async function init() {
  const page = document.body.dataset.page;
  if (page === "home") return initHome();
  if (page === "hero") return initHeroPage();
  if (page === "archive") return initArchivePage();
  if (page === "species") return initSpeciesPage();
}

init().catch(console.error);
