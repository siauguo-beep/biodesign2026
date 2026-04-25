import { loadDataset, slugify, getSpeciesLink } from "./xr-data.js";

const FIELD_ORDER = [
  "row_id",
  "list_source",
  "category",
  "common_name_zh",
  "common_name_en",
  "common_name_raw",
  "scientific_name",
  "extinction_summary",
  "region",
  "model_3d_ref",
  "extinction_drivers",
  "notes",
  "pharm_human_hook",
  "verification_note"
];

const LABELS = {
  zh: {
    row_id: "行",
    list_source: "来源",
    category: "类别",
    common_name_zh: "中文名",
    common_name_en: "英文名",
    common_name_raw: "原始名称",
    scientific_name: "学名",
    extinction_summary: "灭绝时间",
    region: "区域",
    model_3d_ref: "三维参考",
    extinction_drivers: "原因",
    notes: "备注",
    pharm_human_hook: "与人类活动的关联",
    verification_note: "验证"
  },
  en: {
    row_id: "Row",
    list_source: "Source",
    category: "Category",
    common_name_zh: "Chinese",
    common_name_en: "English",
    common_name_raw: "Raw name",
    scientific_name: "Scientific",
    extinction_summary: "Extinction",
    region: "Region",
    model_3d_ref: "3D ref",
    extinction_drivers: "Drivers",
    notes: "Notes",
    pharm_human_hook: "Pharm / human hook",
    verification_note: "Verification"
  }
};

function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function initDestinations() {
  const metaEl = document.getElementById("xr-dest-meta");
  const thead = document.querySelector("#xr-dest-table thead tr");
  const tbody = document.getElementById("xr-dest-body");
  const search = document.getElementById("xr-d-search");
  const cat = document.getElementById("xr-d-cat");
  const av = document.getElementById("xr-d-avail");

  const { species, meta } = await loadDataset();
  const lang = () => localStorage.getItem("ea-lang") || "zh";
  const catLabel = value => {
    if (lang() !== "zh") return value;
    const c = String(value).toLowerCase();
    if (c.includes("megafauna")) return "更新世巨型动物";
    if (c.includes("mammal")) return "哺乳动物";
    if (c.includes("bird")) return "鸟类";
    if (c.includes("reptile")) return "爬行动物";
    if (c.includes("amphib")) return "两栖动物";
    if (c.includes("fish")) return "鱼类";
    if (c.includes("invertebrate")) return "无脊椎动物";
    if (c.includes("insect")) return "昆虫";
    return value;
  };
  const listSourceLabel = value => {
    if (lang() !== "zh") return value;
    const v = String(value || "").toLowerCase();
    if (v.includes("research")) return "研究补充";
    if (v.includes("unified")) return "统一优先级数据表";
    return value || "暂无";
  };
  const regionLabel = value => {
    if (lang() !== "zh") return value;
    return String(value || "暂无")
      .replace(/Yangtze River, China/gi, "中国长江")
      .replace(/Western Colombia/gi, "哥伦比亚西部")
      .replace(/North America/gi, "北美")
      .replace(/South America/gi, "南美")
      .replace(/Europe/gi, "欧洲")
      .replace(/Eurasia/gi, "欧亚")
      .replace(/Australia/gi, "澳大利亚")
      .replace(/Hawaii/gi, "夏威夷")
      .replace(/Madeira/gi, "马德拉")
      .replace(/Cape Verde \(marine\)/gi, "佛得角海域")
      .replace(/China/gi, "中国");
  };
  const extinctionLabel = value => {
    if (lang() !== "zh") return value;
    return String(value || "暂无")
      .replace(/Critically Endangered \(Possibly Extinct\)/gi, "极危（可能灭绝）")
      .replace(/Possibly Extinct/gi, "可能灭绝")
      .replace(/last robust survey/gi, "最后一次可靠调查")
      .replace(/verify/gi, "待核验")
      .replace(/Extinct/gi, "灭绝")
      .replace(/Endangered/gi, "濒危");
  };
  const driversLabel = value => {
    if (lang() !== "zh") return value;
    return String(value || "暂无")
      .replace(/Bycatch/gi, "误捕")
      .replace(/vessel traffic/gi, "船舶交通")
      .replace(/damming/gi, "筑坝")
      .replace(/pollution/gi, "污染")
      .replace(/human activity/gi, "人类活动")
      .replace(/hunting/gi, "狩猎")
      .replace(/climate change/gi, "气候变化")
      .replace(/habitat loss/gi, "栖息地丧失")
      .replace(/invasive species/gi, "入侵物种")
      .replace(/,\s*/g, "、");
  };
  const cellValue = (key, value, row) => {
    if (lang() !== "zh") return value;
    if (key === "list_source") return listSourceLabel(value);
    if (key === "category") return catLabel(value);
    if (key === "common_name_en") return String(value || "").trim() || "暂无";
    if (key === "common_name_raw") return row.common_name_zh || "暂无";
    if (key === "scientific_name") return String(value || "").trim() || "暂无";
    if (key === "extinction_summary") return extinctionLabel(value);
    if (key === "region") return regionLabel(value);
    if (key === "model_3d_ref")
      return String(value || "").trim() || "可在开放档案入口中进一步检索；暂无单独编号。";
    if (key === "extinction_drivers") return driversLabel(value);
    if (key === "notes") return String(value || "").trim() || "暂无策展备注。";
    if (key === "pharm_human_hook")
      return String(value || "").trim() || "暂无直接药用关联；可作为生态变化与人类活动关系的案例理解。";
    if (key === "verification_note")
      return String(value || "").trim() || "需以红色名录或一手文献核对状态与年代。";
    return value || "暂无";
  };

  if (metaEl && meta) {
    metaEl.textContent = lang() === "zh"
      ? `共 ${meta.counts?.total_rows ?? species.length} 条物种记录`
      : `Dataset: ${meta.counts?.total_rows ?? species.length} taxa · ${meta.disclaimer || ""}`;
  }

  const categories = [...new Set(species.map(s => s.category))].sort();
  categories.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = catLabel(c);
    cat.appendChild(opt);
  });

  function renderHeader() {
    const labels = LABELS[lang()] || LABELS.en;
    const detail = lang() === "zh" ? "详情" : "Detail";
    thead.innerHTML = `<th>${detail}</th>${FIELD_ORDER.map(
      k => `<th title="${esc(labels[k] || k)}">${esc(labels[k] || k)}</th>`
    ).join("")}`;
  }

  function render(rows) {
    renderHeader();
    tbody.innerHTML = rows
      .map(r => {
        const slug = slugify(r.scientific_name);
        const cells = FIELD_ORDER.map(k => {
          let v = r[k];
          v = cellValue(k, v, r);
          const long = k === "notes" || k === "verification_note" || k === "extinction_drivers";
          return `<td class="${long ? "long" : ""}">${esc(v)}</td>`;
        }).join("");
        return `<tr><td><a href="${getSpeciesLink(slug)}">${lang() === "zh" ? "打开" : "Open"}</a></td>${cells}</tr>`;
      })
      .join("");
  }

  function apply() {
    const q = search.value.trim().toLowerCase();
    const filtered = species.filter(s => {
      const matchQ =
        !q ||
        String(s.scientific_name).toLowerCase().includes(q) ||
        String(s.common_name_en || "").toLowerCase().includes(q) ||
        String(s.common_name_zh || "").includes(q);
      const matchCat = !cat.value || s.category === cat.value;
      const matchAv = !av.value || s.data_availability === av.value;
      return matchQ && matchCat && matchAv;
    });
    render(filtered);
    document.getElementById("xr-d-count").textContent = lang() === "zh"
      ? `当前显示 ${filtered.length} / ${species.length} 个物种`
      : `${filtered.length} / ${species.length} destinations`;
  }

  [search, cat, av].forEach(el => el.addEventListener("input", apply));
  window.addEventListener("dest:languagechange", apply);
  apply();
}
