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

const LANG_KEY = "ea-lang";

const PAGE_COPY = {
  zh: {
    home: "首页",
    archive: "物种档案",
    hero: "重点案例",
    detail: "物种详情",
    archiveTitle: "物种档案浏览",
    archiveLead: "这里汇总本项目收录的灭绝物种，可按类别和资料完整度筛选，并进入单个物种档案查看来源与说明。",
    heroTitle: "重点案例",
    heroLead: "以猛犸象和袋狼为例，展示如何把科学资料、历史记录和沉浸式叙事结合起来。",
    speciesTitle: "物种详情",
    speciesLead: "查看物种基本信息、灭绝原因、资料来源和可继续核对的开放档案入口。",
    searchPlaceholder: "按俗名 / 学名搜索...",
    allCategories: "全部类别",
    allAvailability: "全部数据级别",
    showing: n => `显示 ${n} 个物种`,
    openDetail: "打开详情",
    imageSource: "图片来源",
    chineseName: "中文名",
    category: "类别",
    extinction: "灭绝时间",
    region: "区域",
    data: "资料完整度",
    sensory: "感官资料",
    music: "声音资料",
    drivers: "灭绝原因",
    notes: "补充说明",
    verification: "验证说明",
    exhibitBlocks: "展览说明",
    portals: "档案入口",
    curated: "策展线索",
    protocol: "研究协议",
    notFound: slug => `找不到物种 slug：${slug || "（空）"}`,
    ethics: "伦理思考",
    budget: "去灭绝研究投入优先级：",
    risk: "生态不确定性的接受程度：",
    reflection: "反思日志",
    save: "保存反思",
    load: "载入上次反思",
    reflectionPlaceholder: "当一个物种从地球上消失，我们应该如何记住它、解释它，并避免新的消失？",
    saved: "已保存到本地浏览器。",
    loaded: "已载入上次记录。",
    balanced: "平衡路径：既讨论技术可能性，也要清楚说明证据边界、生态风险和公众参与方式。",
    high: "高投入、高风险接受度：若推进去灭绝研究，必须明确技术安全、生态评估和原住民/当地社群的知情参与。",
    low: "保护优先路径：即使不尝试复活，灭绝物种仍需要被记录、解释，并转化为今天的保护行动。"
  },
  en: {
    home: "Home",
    archive: "Archive Cards",
    hero: "Hero Dossiers",
    detail: "Species Detail",
    archiveTitle: "Archive Browse (54 Species Card Layer)",
    archiveLead: "Current data source is local JSON; every species card now uses an independent real-image marker.",
    heroTitle: "Hero Dossiers (Depth Layer)",
    heroLead: "Immersive narrative prototypes for Mammoth and Thylacine",
    speciesTitle: "Single Species Detail",
    speciesLead: "Detail page with archival portals, curation metadata, and image sources.",
    searchPlaceholder: "Search by common/scientific name...",
    allCategories: "All Categories",
    allAvailability: "All Availability",
    showing: n => `Showing ${n} species`,
    openDetail: "Open detail",
    imageSource: "Image source",
    chineseName: "Chinese name",
    category: "Category",
    extinction: "Extinction",
    region: "Region",
    data: "Data",
    sensory: "Sensory score",
    music: "Music score",
    drivers: "Extinction drivers",
    notes: "Project notes",
    verification: "Verification",
    exhibitBlocks: "Exhibit Content Blocks",
    portals: "Archival Portals",
    curated: "Curated Archive Hints",
    protocol: "Research Protocol",
    notFound: slug => `Species not found for slug: ${slug || "(empty)"}`,
    ethics: "Ethics Fork",
    budget: "De-extinction budget priority: ",
    risk: "Risk tolerance for ecological uncertainty: ",
    reflection: "Reflection Log",
    save: "Save reflection",
    load: "Load last reflection",
    reflectionPlaceholder: "What does irreversible loss of biological memory mean to you?",
    saved: "Reflection saved locally.",
    loaded: "Last reflection loaded.",
    balanced: "Balanced strategy. Reflection prompt: where should uncertainty be communicated to the public?",
    high: "High de-extinction investment + high risk tolerance. What safeguards and sovereignty commitments are non-negotiable?",
    low: "Conservation-first strategy. What extinct memory work is still ethically required even without revival?"
  }
};

const ZH_NAME_OVERRIDES = {
  "Psittirostra psittacea": "夏威夷鹦嘴雀",
  "Melamprosops phaeosoma": "波奥吸蜜鸟",
  "Perameles papillon": "纳拉伯兔耳袋狸",
  "Perameles myosuros": "东南袋狸",
  "Perameles notina": "沙漠袋狸",
  "Chaeropus ecaudatus": "猪足袋狸",
  "Chaeropus yirratji": "北方猪足袋狸",
  "Zalophus japonicus": "日本海狮",
  "Dusicyon australis": "福克兰群岛狼",
  "Numenius tenuirostris": "细嘴杓鹬",
  "Camptorhynchus labradorius": "拉布拉多鸭",
  "Tachybaptus rufolavatus": "阿劳特拉䴙䴘",
  "Corvus hawaiiensis": "夏威夷乌鸦",
  "Conuropsis carolinensis": "卡罗莱纳长尾鹦鹉",
  "Campephilus imperialis": "帝王啄木鸟",
  "Vermivora bachmanii": "巴赫曼林莺",
  "Psephotellus pulcherrimus": "天堂鹦鹉",
  "Ninox albifacies": "笑鸮",
  "Tympanuchus cupido cupido": "荒原松鸡",
  "Chelonoidis abingdonii": "平塔岛象龟",
  "Cylindraspis indica": "留尼汪巨龟",
  "Cylindraspis triserrata": "圆顶毛里求斯巨龟",
  "Cylindraspis peltastes": "罗德里格斯巨龟",
  "Bolyeria multocarinata": "圆岛穴居蟒",
  "Hoplodactylus delcourti": "德尔库尔巨壁虎",
  "Incilius periglenes": "金蟾蜍",
  "Cynops wolterstorffi": "滇池蝾螈",
  "Litoria nyakalensis": "山雾蛙",
  "Psephurus gladius": "白鲟",
  "Sympterichthys unipennis": "光滑手鱼",
  "Glaucopsyche xerces": "泽西斯蓝蝶",
  "Conus lugubris": "暗锥螺",
  "Pieris wollastoni": "马德拉大白蝶",
  "Lipotes vexillifer": "白鱀豚",
  "Oophaga speciosa": "华丽箭毒蛙"
};

function hasChinese(text = "") {
  return /[\u3400-\u9fff]/.test(String(text));
}

function currentPrototypeLang() {
  return localStorage.getItem(LANG_KEY)
    || localStorage.getItem("prototype-lang")
    || localStorage.getItem("xr-lang")
    || localStorage.getItem("ethics-lang")
    || (document.documentElement.lang?.startsWith("en") ? "en" : "zh");
}

function setGlobalLanguage(lang) {
  const selected = lang === "en" ? "en" : "zh";
  localStorage.setItem(LANG_KEY, selected);
  localStorage.setItem("prototype-lang", selected);
  localStorage.setItem("xr-lang", selected);
  localStorage.setItem("ethics-lang", selected);
  document.documentElement.lang = selected === "zh" ? "zh-Hans" : "en";
  document.querySelectorAll("[data-lang], [data-xr-lang], [data-ethics-lang]").forEach((button) => {
    const value = button.dataset.lang || button.dataset.xrLang || button.dataset.ethicsLang;
    button.setAttribute("aria-pressed", String(value === selected));
  });
  window.dispatchEvent(new CustomEvent("ea:languagechange", { detail: { lang: selected } }));
}

function t(key, ...args) {
  const value = PAGE_COPY[currentPrototypeLang()]?.[key] ?? PAGE_COPY.en[key];
  return typeof value === "function" ? value(...args) : value;
}

function localizedCategoryText(category = "") {
  if (currentPrototypeLang() !== "zh") return category;
  const c = String(category).toLowerCase();
  if (c.includes("megafauna")) return "更新世巨型动物";
  if (c.includes("mammal")) return "哺乳动物";
  if (c.includes("bird")) return "鸟类";
  if (c.includes("reptile")) return "爬行动物";
  if (c.includes("amphib")) return "两栖动物";
  if (c.includes("fish")) return "鱼类";
  if (c.includes("invertebrate")) return "无脊椎动物";
  if (c.includes("insect")) return "昆虫";
  return category || "物种";
}

function localizedSpeciesName(row) {
  if (currentPrototypeLang() !== "zh") return row.common_name_en || row.scientific_name;
  if (ZH_NAME_OVERRIDES[row.scientific_name]) return ZH_NAME_OVERRIDES[row.scientific_name];
  if (hasChinese(row.common_name_zh)) return row.common_name_zh;
  return `${localizedCategoryText(row.category)}物种`;
}

function prototypeCopy(key, ...args) {
  const lang = currentPrototypeLang();
  const bundle = window.PROTOTYPE_COPY?.[lang] || window.PROTOTYPE_COPY?.zh;
  const value = bundle?.[key];
  return typeof value === "function" ? value(...args) : value;
}

async function loadImageManifest() {
  try {
    const res = await fetch("./webxr/assets/animal-image-manifest.json");
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.sources) ? data.sources : [];
  } catch {
    return [];
  }
}

function imageSourceForSpecies(row, imageSources = []) {
  const slug = slugify(row.scientific_name || row.common_name_en || row.row_id);
  return imageSources.find(source => source.slug === slug) || null;
}

function attachMarkerImages(points, imageSources = []) {
  points.forEach(point => {
    const source = imageSourceForSpecies(point, imageSources);
    if (!source?.markerPath) return;
    const img = new Image();
    img.src = `./webxr/${source.markerPath.replace("./", "")}`;
    point.markerImage = img;
    point.imageSource = source;
  });
  return points;
}

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

function heroTemplate(heroKey, imageSources = []) {
  const zhHero = {
    mammoth: {
      title: "猛犸象 - 时间生态位档案",
      summary: "北极光周期适应、冷感知，以及长距离低频声假设。",
      lines: [
        { tier: "cited", text: "猛犸基因组研究报告了与昼夜节律相关的遗传变化。" },
        { tier: "interp", text: "次声交流基于近缘象类与体型尺度进行推断建模。" },
        { tier: "spec", text: "从黎明到极夜的沉浸场景动态属于设计假设。" }
      ]
    },
    thylacine: {
      title: "袋狼 - 黄昏视觉档案",
      summary: "基于眼眶形态的昼夜行为重建，以及殖民灭绝语境。",
      lines: [
        { tier: "cited", text: "历史记录与形态学支持黄昏/夜行行为假设。" },
        { tier: "interp", text: "运动与对比度视觉界面是推断结果，并非直接测量。" },
        { tier: "spec", text: "第一人称 Umwelt 渲染仍为推测，并需明确标注。" }
      ]
    }
  };
  const h = currentPrototypeLang() === "zh" ? zhHero[heroKey] : HERO_CONTENT[heroKey];
  const speciesSlug = heroKey === "mammoth" ? "mammuthus-primigenius" : "thylacinus-cynocephalus";
  const source = imageSources.find(s => s.slug === speciesSlug);
  const tierLabel = {
    cited: currentPrototypeLang() === "zh" ? "已引用" : "cited",
    interp: currentPrototypeLang() === "zh" ? "推断" : "interp",
    spec: currentPrototypeLang() === "zh" ? "推测" : "spec"
  };
  return `
    <article class="hero-card">
      ${source ? `<img class="hero-photo" src="./webxr/${source.markerPath.replace("./", "")}" alt="${h.title}" />` : ""}
      <h3>${h.title}</h3>
      <p>${h.summary}</p>
      <ul>
        ${h.lines.map(l => `<li><span class="tag ${l.tier}">${tierLabel[l.tier] || l.tier}</span> ${l.text}</li>`).join("")}
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

function markerImg(source, alt, className = "species-thumb") {
  return source?.markerPath
    ? `<img class="${className}" src="./webxr/${source.markerPath.replace("./", "")}" alt="${alt}" loading="lazy" />`
    : `<div class="${className} thumb-fallback" aria-hidden="true">${String(alt || "?").slice(0, 1)}</div>`;
}

function renderArchive(rows, archivalMap, imageSources = []) {
  const list = document.getElementById("archive-list");
  const stats = document.getElementById("archive-stats");
  stats.textContent = t("showing", rows.length);
  list.innerHTML = rows.map(r => {
    const a = archivalMap.get(r.scientific_name);
    const source = imageSourceForSpecies(r, imageSources);
    const iucn = a?.portal_urls?.iucn_red_list_search || "#";
    const gbif = a?.portal_urls?.gbif_species_search || "#";
    return `
      <div class="species-row" id="${slugify(r.scientific_name)}">
        ${markerImg(source, r.common_name_en || r.scientific_name)}
        <strong>${localizedSpeciesName(r)}</strong>
        <span class="meta">(${r.scientific_name})</span><br>
        <span class="meta">${localizedCategoryText(r.category)} | ${t("extinction")}: ${r.extinction_summary}</span><br>
        <span class="meta">${r.extinction_drivers}</span><br>
        <a href="${getSpeciesLink(r)}">${t("openDetail")}</a>
        ${source?.sourceUrl ? `<a href="${source.sourceUrl}" target="_blank" rel="noopener noreferrer">${t("imageSource")}</a>` : ""}
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
      out.textContent = t("high");
    } else if (b < 35 && r < 40) {
      out.textContent = t("low");
    } else {
      out.textContent = t("balanced");
    }
  };
  budget.addEventListener("input", update);
  risk.addEventListener("input", update);
  window.addEventListener("ea:languagechange", update);
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
    status.textContent = t("saved");
  });
  load.addEventListener("click", () => {
    input.value = localStorage.getItem(key) || "";
    status.textContent = t("loaded");
  });
}

function wireHeroTabs(imageSources = []) {
  const heroMount = document.getElementById("hero-content");
  const render = (key) => {
    heroMount.innerHTML = heroTemplate(key, imageSources);
  };
  render("mammoth");
  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      render(btn.dataset.hero);
    });
  });
  window.addEventListener("ea:languagechange", () => {
    render(document.querySelector(".tab.active")?.dataset.hero || "mammoth");
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

function wireFilters(species, archivalMap, imageSources = []) {
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
    renderArchive(filtered, archivalMap, imageSources);
  };
  [search, cat, av].forEach(el => el.addEventListener("input", apply));
  window.addEventListener("ea:languagechange", apply);
  apply();
}

function renderPortalLinks(portalUrls = {}) {
  const keys = Object.keys(portalUrls);
  if (!keys.length) return `<p>${currentPrototypeLang() === "zh" ? "暂无外部档案入口。" : "No portal links available."}</p>`;
  const zhLabels = {
    iucn_red_list_search: "红色名录",
    gbif_species_search: "物种数据库",
    gbif_occurrence_search: "分布记录",
    morphosource_search: "形态资料",
    pbdb_taxon_api: "古生物数据库",
    pbdb_classic_ui: "古生物资料",
    bhl_literature_search: "生物文献",
    eol_search: "生命百科",
    smithsonian_3d_search: "三维馆藏",
    sketchfab_search: "三维模型",
    wikipedia: "百科资料",
    xeno_canto_search: "鸟声资料",
    macaulay_library_search: "声音影像库"
  };
  return `<div class="portal-list">${keys.map(k => {
    const label = currentPrototypeLang() === "zh" ? (zhLabels[k] || "外部资料") : (PORTAL_LABELS[k] || k);
    const url = portalUrls[k];
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  }).join("")}</div>`;
}

function parseQuery() {
  const p = new URLSearchParams(window.location.search);
  return Object.fromEntries(p.entries());
}

function renderSpeciesDetail(species, archivalMap, slug, imageSources = []) {
  const mount = document.getElementById("species-detail");
  const hit = species.find(s => slugify(s.scientific_name) === slug);
  if (!hit) {
    mount.innerHTML = `<p>${t("notFound", slug)}</p>`;
    return;
  }
  const arch = archivalMap.get(hit.scientific_name);
  const curated = arch?.notable_archives_curated || [];
  const source = imageSourceForSpecies(hit, imageSources);
  const exhibitBlocks = [
    { title: currentPrototypeLang() === "zh" ? "灭绝与原因" : "Extinction context", content: hit.extinction_drivers || "-" },
    { title: currentPrototypeLang() === "zh" ? "背景说明" : "Context notes", content: hit.notes || (currentPrototypeLang() === "zh" ? "暂无" : "—") },
    { title: currentPrototypeLang() === "zh" ? "核实说明" : "Verification", content: hit.verification_note || (currentPrototypeLang() === "zh" ? "建议对照红色名录与一手文献。" : "Validate via IUCN and primary sources.") }
  ];
  mount.innerHTML = `
    <div class="species-detail-head">
      ${markerImg(source, hit.common_name_en || hit.scientific_name, "species-detail-photo")}
      <div>
        <h2>${localizedSpeciesName(hit)} <span class="meta">(${hit.scientific_name})</span></h2>
        <p><strong>${t("chineseName")}:</strong> ${hit.common_name_zh || "-"}</p>
        <p><strong>${t("category")}:</strong> ${localizedCategoryText(hit.category)} | <strong>${t("extinction")}:</strong> ${hit.extinction_summary} | <strong>${t("region")}:</strong> ${hit.region}</p>
        <p><strong>${t("drivers")}:</strong> ${hit.extinction_drivers}</p>
        <p><strong>${t("notes")}:</strong> ${hit.notes || "-"}</p>
        <p><strong>${t("verification")}:</strong> ${hit.verification_note || "-"}</p>
        ${source?.sourceUrl ? `<p><a href="${source.sourceUrl}" target="_blank" rel="noopener noreferrer">${t("imageSource")}</a></p>` : ""}
      </div>
    </div>

    <h3>${t("exhibitBlocks")}</h3>
    <div class="cards-grid">
      ${exhibitBlocks.map(b => `
        <div class="species-row">
          <strong>${b.title}</strong>
          <p class="meta">${b.content}</p>
        </div>
      `).join("")}
    </div>

    <h3>${t("portals")}</h3>
    ${renderPortalLinks(arch?.portal_urls)}

    <h3>${t("curated")}</h3>
    <ul>
      ${curated.length ? curated.map(c => `<li><strong>${c.type}</strong>: ${c.label} (<a href="${c.url}" target="_blank" rel="noopener noreferrer">${currentPrototypeLang() === "zh" ? "打开" : "open"}</a>)</li>`).join("") : `<li>${currentPrototypeLang() === "zh" ? "暂无策展线索。" : "No curated hints yet."}</li>`}
    </ul>

    <h3>${t("protocol")}</h3>
    <ul>
      ${(arch?.research_protocol || [currentPrototypeLang() === "zh" ? "暂无协议备注。" : "No protocol notes"]).map(x => `<li>${x}</li>`).join("")}
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

    if (item.markerImage?.complete) {
      ctx.save();
      ctx.shadowColor = "rgba(125,211,252,0.8)";
      ctx.shadowBlur = 8;
      ctx.drawImage(item.markerImage, x - thumbW * 0.8, y - thumbH * 0.8, thumbW * 2.6, thumbH * 2.6);
      ctx.restore();
    } else {
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
    }

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
    <a href="./species.html?slug=${encodeURIComponent(item.slug)}">${prototypeCopy("open") || (currentPrototypeLang() === "zh" ? "打开物种档案" : "Open species dossier")}</a>
    <a href="${iucn}" target="_blank" rel="noopener noreferrer">IUCN</a>
  `;
}

function ensureLanguageSwitch() {
  const header = document.querySelector(".top");
  if (!header || header.querySelector(".page-lang-switch")) return;
  const switcher = document.createElement("div");
  switcher.className = "page-lang-switch";
  switcher.innerHTML = `
    <button type="button" data-lang="zh">中文</button>
    <button type="button" data-lang="en">EN</button>
  `;
  header.appendChild(switcher);
  switcher.querySelectorAll("[data-lang]").forEach(button => {
    button.addEventListener("click", () => setGlobalLanguage(button.dataset.lang));
  });
}

function updatePageChrome() {
  const page = document.body.dataset.page;
  document.documentElement.lang = currentPrototypeLang() === "zh" ? "zh-Hans" : "en";
  document.querySelectorAll("[data-lang]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.lang === currentPrototypeLang()));
  });

  const title = document.querySelector(".top h1");
  const lead = document.querySelector(".top p");
  const nav = document.querySelectorAll(".main-nav a");
  if (page === "archive") {
    document.title = `${t("archive")} - Umwelt Archive`;
    if (title) title.textContent = t("archiveTitle");
    if (lead) lead.textContent = t("archiveLead");
    const search = document.getElementById("search");
    if (search) search.placeholder = t("searchPlaceholder");
    const cat = document.getElementById("category-filter")?.querySelector("option[value='']");
    const av = document.getElementById("availability-filter")?.querySelector("option[value='']");
    if (cat) cat.textContent = t("allCategories");
    if (av) av.textContent = t("allAvailability");
  }
  if (page === "hero") {
    document.title = `${t("hero")} - Umwelt Archive`;
    if (title) title.textContent = t("heroTitle");
    if (lead) lead.textContent = t("heroLead");
    document.querySelector(".ethics h2") && (document.querySelector(".ethics h2").textContent = t("ethics"));
    document.querySelector(".reflection h2") && (document.querySelector(".reflection h2").textContent = t("reflection"));
    const labels = document.querySelectorAll(".ethics label");
    if (labels[0]) labels[0].childNodes[0].textContent = t("budget");
    if (labels[1]) labels[1].childNodes[0].textContent = t("risk");
    const input = document.getElementById("reflection-input");
    if (input) input.placeholder = t("reflectionPlaceholder");
    document.getElementById("save-reflection") && (document.getElementById("save-reflection").textContent = t("save"));
    document.getElementById("load-reflection") && (document.getElementById("load-reflection").textContent = t("load"));
    const tabs = document.querySelectorAll(".hero-tabs .tab");
    if (tabs[0]) tabs[0].textContent = currentPrototypeLang() === "zh" ? "猛犸象" : "Woolly Mammoth";
    if (tabs[1]) tabs[1].textContent = currentPrototypeLang() === "zh" ? "袋狼" : "Thylacine";
    const legend = document.querySelectorAll(".tier-legend .tag");
    if (legend[0]) legend[0].textContent = currentPrototypeLang() === "zh" ? "已引用" : "Cited";
    if (legend[1]) legend[1].textContent = currentPrototypeLang() === "zh" ? "推断" : "Interpolated";
    if (legend[2]) legend[2].textContent = currentPrototypeLang() === "zh" ? "推测" : "Speculative";
  }
  if (page === "species") {
    document.title = `${t("detail")} - Umwelt Archive`;
    if (title) title.textContent = t("speciesTitle");
    if (lead) lead.textContent = t("speciesLead");
  }
  if (nav[0]) nav[0].textContent = t("home");
  if (nav[1]) nav[1].textContent = page === "archive" ? t("hero") : t("archive");
  if (nav[2]) nav[2].textContent = t("hero");
}

function setupLanguage() {
  ensureLanguageSwitch();
  setGlobalLanguage(currentPrototypeLang());
  updatePageChrome();
  window.addEventListener("ea:languagechange", updatePageChrome);
}

async function initHome() {
  const canvas = document.getElementById("globe-canvas");
  const popup = document.getElementById("point-popup");
  const countLine = document.getElementById("species-count-line");
  const toggle = document.getElementById("toggle-autorotate");
  if (!canvas || !popup || !countLine || !toggle) return;

  const [{ species, archival }, imageSources] = await Promise.all([loadData(), loadImageManifest()]);
  const archivalMap = buildArchivalMap(archival);
  const points = attachMarkerImages(speciesToPoints(species), imageSources);
  const updateChrome = () => {
    countLine.textContent =
      prototypeCopy("count", species.length) ||
      `This globe includes ${species.length} extinct species linked to human activity.`;
    toggle.textContent = state.autoRotate
      ? (prototypeCopy("pause") || "Pause Rotate")
      : (prototypeCopy("resume") || "Resume Rotate");
  };

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
  updateChrome();
  window.addEventListener("prototype:languagechange", updateChrome);

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
    updateChrome();
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
  const imageSources = await loadImageManifest();
  wireHeroTabs(imageSources);
  wireEthics();
  wireReflection();
}

async function initArchivePage() {
  const [{ species, archival }, imageSources] = await Promise.all([loadData(), loadImageManifest()]);
  const archivalMap = buildArchivalMap(archival);
  fillCategoryFilter(species);
  wireFilters(species, archivalMap, imageSources);
}

async function initSpeciesPage() {
  const [{ species, archival }, imageSources] = await Promise.all([loadData(), loadImageManifest()]);
  const archivalMap = buildArchivalMap(archival);
  const query = parseQuery();
  const render = () => renderSpeciesDetail(species, archivalMap, query.slug || "", imageSources);
  render();
  window.addEventListener("ea:languagechange", render);
}

async function init() {
  setupLanguage();
  const page = document.body.dataset.page;
  if (page === "home") return initHome();
  if (page === "hero") return initHeroPage();
  if (page === "archive") return initArchivePage();
  if (page === "species") return initSpeciesPage();
}

init().catch(console.error);
