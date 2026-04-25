import {
  loadDataset,
  buildArchivalMap,
  slugify,
  PORTAL_LABELS
} from "./xr-data.js";
import { getHabitatForSpeciesPage, getWhatIfQuestionForPage } from "./xr-whatif.js";

function parseQuery() {
  return Object.fromEntries(new URLSearchParams(window.location.search).entries());
}

function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

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

function currentLang() {
  return localStorage.getItem("ea-lang") || localStorage.getItem("xr-lang") || "zh";
}

function hasChinese(text = "") {
  return /[\u3400-\u9fff]/.test(String(text));
}

function localizedSpeciesName(sp) {
  if (currentLang() !== "zh") return sp.common_name_en || sp.scientific_name;
  if (ZH_NAME_OVERRIDES[sp.scientific_name]) return ZH_NAME_OVERRIDES[sp.scientific_name];
  if (hasChinese(sp.common_name_zh)) return sp.common_name_zh;
  return `${localizedCategory(sp.category)}物种`;
}

function localizedCategory(category = "") {
  if (currentLang() !== "zh") return category;
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

function localizedListSource(value = "") {
  if (currentLang() !== "zh") return value;
  const v = String(value).toLowerCase();
  if (v.includes("research")) return "研究补充";
  if (v.includes("unified")) return "统一优先级数据表";
  return value || "暂无";
}

function localizedRegion(value = "") {
  if (currentLang() !== "zh") return value;
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
}

function localizedExtinction(value = "") {
  if (currentLang() !== "zh") return value;
  let text = String(value || "暂无");
  text = text
    .replace(/Critically Endangered \(Possibly Extinct\)/gi, "极危（可能灭绝）")
    .replace(/Possibly Extinct/gi, "可能灭绝")
    .replace(/last robust survey/gi, "最后一次可靠调查")
    .replace(/verify/gi, "待核验")
    .replace(/Extinct/gi, "灭绝")
    .replace(/Endangered/gi, "濒危");
  return text;
}

function localizedDrivers(value = "") {
  if (currentLang() !== "zh") return value;
  const text = String(value || "");
  if (!text) return "暂无";
  return text
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
}

/** 与 data/archival_media_research.json 中标准英文行一一对应 */
const RESEARCH_PROTOCOL_ZH = {
  "Confirm IUCN category and dates on species page before citing.":
    "引用前在 IUCN 物种专页上核对受威胁等级与年代。",
  "Prefer institution catalog numbers + DOIs (MorphoSource) over unlicensed uploads.":
    "优先使用馆藏号与正式 DOI（如 MorphoSource），避免无授权的二次上传。",
  "For film/audio, verify rights before web embed.": "用于网页嵌入的影片与声音，发布前需核实权利。"
};

const CURATED_TYPE_ZH = {
  "3d_portal": "三维档案门户",
  aggregator: "聚合检索",
  museum: "博物馆",
  moving_image: "活动影像",
  historical_record: "历史记录",
  specimen: "标本",
  audio: "声音资料",
  specimen_literature: "标本与文献",
  type_specimen: "模式标本",
  literature_media: "文献与影像"
};

/** notable_archives_curated 当前数据集中 19 条 label 的固定译文 */
const CURATED_LABEL_ZH = {
  "BHL — Steller and expedition-era descriptions": "BHL — 斯特勒与考察时代记述",
  "Galápagos institutions + global NH collections (Lonesome George)":
    "加拉帕戈斯机构 + 全球自然史馆藏（孤独乔治）",
  "Historic laughing owl accounts + any archived recordings (verify)":
    "笑鸮历史文献与可能留存的录音（需核权）",
  "IUCN account + references for survey imagery (open species page from search)":
    "IUCN 物种说明与调查影像参考文献（自检索进入物种专页）",
  "Ichthyology collections — GBIF + institutional catalogs":
    "鱼类学馆藏 — GBIF 与机构目录",
  "La Brea Tar Pits / NHMLAC (public + research programs)":
    "拉布雷亚沥青坑 / 洛杉矶县自然史博物馆（公众与研究项目）",
  "Lepidoptera collections — California Academy / AMNH (search catalogs)":
    "鳞翅目馆藏 — 加州科学院 / 美国自然史博物馆（查目录）",
  "Macaulay Library / institutional recordings (verify license)":
    "康奈尔 Macaulay 声音影像库 / 机构录音（需核授权）",
  "Monteverde herpetology literature + museum vouchers (GBIF)":
    "蒙特维德两栖爬行类文献 + 馆凭证（GBIF）",
  "MorphoSource / museums — woolly rhino CTs and meshes":
    "MorphoSource / 博物馆 — 披毛犀 CT 与网格模型",
  "MorphoSource — CT/mesh for comparative mammoth material":
    "MorphoSource — 象类比较材料的 CT/网格",
  "National Film and Sound Archive of Australia — search thylacine (rights vary)":
    "澳大利亚国家影音档案馆 — 检索袋狼（权利因条目而异）",
  "Skins & eggs — European natural history collections (GBIF)":
    "皮制标本与鸟卵 — 欧洲自然史馆藏（GBIF）",
  "Smithsonian 3D — search mammoth / proboscidean entries":
    "史密森三维 — 检索猛犸/长鼻目条目",
  "Study skins via GBIF-linked institutions": "经 GBIF 关联机构检索剥制标本",
  "Subfossil bone — query GBIF + NHM London collections portal":
    "亚化石骨骼 — 在 GBIF 与伦敦自然史博物馆门户检索",
  "Tasmanian Museum and Art Gallery": "塔斯马尼亚博物艺术馆",
  "Xeno-canto — check for recordings / related columbids":
    "Xeno-canto — 查录音/近缘鸽类"
};

function localizedResearchProtocolLine(line) {
  if (currentLang() !== "zh") return String(line);
  const s = String(line);
  if (hasChinese(s)) return s;
  return RESEARCH_PROTOCOL_ZH[s] || s;
}

function localizedCuratedType(type) {
  if (currentLang() !== "zh") return String(type);
  return CURATED_TYPE_ZH[type] || type;
}

function localizedCuratedLabel(label) {
  if (currentLang() !== "zh") return String(label);
  const s = String(label);
  if (hasChinese(s)) return s;
  return CURATED_LABEL_ZH[s] || s;
}

const FIELD_LABELS_ZH = {
  row_id: "编号",
  list_source: "数据来源",
  category: "类别",
  common_name_zh: "中文名",
  common_name_en: "英文名",
  common_name_raw: "原始名称",
  scientific_name: "学名",
  extinction_summary: "灭绝状态",
  region: "区域",
  model_3d_ref: "三维参考",
  extinction_drivers: "灭绝原因",
  notes: "备注",
  pharm_human_hook: "与人类活动的关联",
  verification_note: "验证说明"
};

function fieldLabel(key) {
  if (currentLang() !== "zh") return key;
  return FIELD_LABELS_ZH[key] || key;
}

function fieldValue(key, value, hit) {
  if (currentLang() !== "zh") return value || "";
  if (key === "list_source") return localizedListSource(value);
  if (key === "category") return localizedCategory(value);
  if (key === "common_name_en") return String(value || "").trim() || "暂无";
  if (key === "common_name_raw") return localizedSpeciesName(hit);
  if (key === "scientific_name") return String(value || "").trim() || "暂无";
  if (key === "extinction_summary") return localizedExtinction(value);
  if (key === "region") return localizedRegion(value);
  if (key === "model_3d_ref") {
    const t3 = String(value || "").trim();
    if (t3) return t3;
    return "暂无独立编号；可通过下方开放档案入口继续检索。";
  }
  if (key === "extinction_drivers") return localizedDrivers(value);
  if (key === "notes")
    return String(value || "").trim() || "暂无。";
  if (key === "pharm_human_hook")
    return String(value || "").trim() || "暂无单独说明；可结合灭绝原因与历史背景理解。";
  if (key === "verification_note")
    return String(value || "").trim() || "建议与红色名录、博物馆记录或一手文献交叉核对。";
  return value || "暂无";
}

const SUMMARY_OVERRIDES = {
  zh: {
    "Ectopistes migratorius":
      "旅鸽曾形成历史上最庞大的鸟群之一，但在数十年内因工业化猎捕与栖息地丧失而崩溃。",
    "Mammuthus columbi": "哥伦比亚猛犸象生活于冰期后北美的开阔地带；人类与气候变化共同改写了其草原网络。",
    "Raphus cucullatus": "渡渡鸟依赖毛里求斯近岸森林；在引入物种与直接捕杀等因素叠加下迅速消失。",
    "Mammuthus primigenius": "真猛犸象与寒冷苔原—草原相联系；在末次冰期后，气候与人类压力共同收束了适宜生境窗口。"
  },
  en: {
    "Ectopistes migratorius":
      "Passenger pigeons once formed some of the largest bird flocks on record, yet collapsed within decades to industrial harvest and forest loss.",
    "Mammuthus columbi":
      "Columbian mammoths roamed post-glacial North American plains; people and climate both reshaped their grassland networks.",
    "Raphus cucullatus": "Dodos depended on Mauritian lowland forest; invasions and direct take compounded its loss.",
    "Mammuthus primigenius": "Woolly mammoths tracked cold steppe; post-glacial climate and human pressure both narrowed their viable range."
  }
};

function buildSummaryParagraph(sp) {
  const zh = currentLang() === "zh";
  const key = sp.scientific_name;
  const o = SUMMARY_OVERRIDES[zh ? "zh" : "en"]?.[key];
  if (o) return o;
  if (zh) {
    return `${localizedSpeciesName(sp)} 的消失与其分布地区、记录时间和已知压力因素相互对应。以下为面向公众的简要说明，帮助理解这份档案中的关键信息。`;
  }
  return `Decline and loss of ${sp.common_name_en || sp.scientific_name} lines up with drivers, range, and dates in the archive—an interpretive one-paragraph lead, not a final verdict.`;
}

function driverTagsFromField(drivers) {
  const raw = String(drivers || "").trim();
  if (!raw) return currentLang() === "zh" ? ["见上面灭绝原因"] : ["See drivers above"];
  const parts = raw.split(/[,，、+/]/).map(s => s.trim()).filter(Boolean);
  if (parts.length >= 2) return parts;
  return [raw];
}

function humanFactorContext() {
  if (currentLang() === "zh") {
    return "道路、贸易和土地开发会放大人类活动的影响：局部的狩猎、采伐、栖息地改变，可能迅速扩展到整个区域或岛屿。下方标签来自档案中的「灭绝原因」，用于提示主要压力，并不代表全部因素。";
  }
  return "Roads, trade, and markets can spread local hunting, logging, and land take across whole regions or islands. The tags below are short slices from the “drivers” line for discussion, not a full list.";
}

function humanFactorTitle() {
  return currentLang() === "zh" ? "与人类活动相关的原因" : "People-related causes";
}

function sectionSummaryTitle() {
  return currentLang() === "zh" ? "摘要" : "Summary";
}

function sectionCompareTitle() {
  return currentLang() === "zh" ? "人类影响较强 vs 较弱（示意图）" : "More vs less human footprint (look)";
}

function compareHint() {
  return currentLang() === "zh"
    ? "向右拖动滑块，可叠加一张「人类干扰较弱、栖息地更连通」的示意图。两张图均为图库示例，并非同一地点的前后对比，用于帮助理解景观差异。"
    : "Drag right: we add a stock photo that imagines less human pressure. The two images are examples, not the same place before/after. For vibe only, not a forecast.";
}

function compareFoot() {
  return currentLang() === "zh"
    ? "若图片无法加载，页面会以色块代替。该模块用于解释概念，不代表测量数据或精确预测。"
    : "If photos don’t load, you’ll see a color block instead. This isn’t measured data.";
}

function compareLabelL() {
  return currentLang() === "zh" ? "左：人类使用更强，栖息地更破碎" : "Left: more like today";
}

function compareLabelR() {
  return currentLang() === "zh" ? "右：人类干扰较弱，栖息地更连通" : "Right: more like “what if”";
}

function sectionReflectTitle() {
  return currentLang() === "zh" ? "延伸思考" : "Something to wonder";
}

function reflectCta() {
  return currentLang() === "zh" ? "进入反思页" : "Go write a note";
}

function renderPortalLinks(portalUrls = {}) {
  const keys = Object.keys(portalUrls);
  if (!keys.length) return "<p class=\"xr-muted\">暂无外部档案入口。</p>";
  const labels = {
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
  return `<div class="xr-portals">${keys
    .map(k => {
      const label = labels[k] || PORTAL_LABELS[k] || "外部资料";
      const url = String(portalUrls[k] || "#").replace(/"/g, "%22");
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
    })
    .join("")}</div>`;
}

export async function initSpeciesPage() {
  const mount = document.getElementById("xr-species-mount");
  const query = parseQuery();
  const slug = query.slug || "";

  const { species, archival } = await loadDataset();
  const archivalMap = buildArchivalMap(archival);
  const hit = species.find(s => slugify(s.scientific_name) === slug);

  if (!hit) {
    mount.innerHTML = `<p>未找到物种档案（slug: <code>${esc(slug || "(empty)")}</code>）</p>`;
    return;
  }

  document.title =
    currentLang() === "zh"
      ? `${localizedSpeciesName(hit)} · 地球之殇 | 数字档案`
      : `${localizedSpeciesName(hit)} | Earth's Sorrow dossier`;

  const arch = archivalMap.get(hit.scientific_name);
  const curated = arch?.notable_archives_curated || [];

  const hab = getHabitatForSpeciesPage(hit, localizedRegion(hit.region));
  const habBody = hab.paragraphs
    .map(p => `<p class="xr-habitat-copy">${esc(p)}</p>`)
    .join("");

  const rows = [
    ["row_id", hit.row_id],
    ["list_source", hit.list_source],
    ["category", hit.category],
    ["common_name_zh", hit.common_name_zh],
    ["common_name_en", hit.common_name_en],
    ["common_name_raw", hit.common_name_raw],
    ["scientific_name", hit.scientific_name],
    ["extinction_summary", hit.extinction_summary],
    ["region", hit.region],
    ["model_3d_ref", hit.model_3d_ref],
    ["extinction_drivers", hit.extinction_drivers],
    ["notes", hit.notes],
    ["pharm_human_hook", hit.pharm_human_hook],
    ["verification_note", hit.verification_note]
  ];

  const tagItems = driverTagsFromField(hit.extinction_drivers).map(f => localizedDrivers(f));

  mount.innerHTML = `
    <article class="xr-dossier xr-dossier--archive">
      <header class="xr-dossier-hero">
        <p class="xr-dossier-eyebrow">${esc(currentLang() === "zh" ? "地球之殇 · 数字档案" : "Earth's Sorrow · digital dossier")}</p>
        <h1 class="xr-dossier-title">${esc(localizedSpeciesName(hit))} <span class="xr-sci">${esc(hit.scientific_name)}</span></h1>
        <p class="xr-dossier-meta">${esc(localizedExtinction(hit.extinction_summary))} · ${esc(localizedRegion(hit.region))}</p>
      </header>

      <section class="xr-archive-card">
        <h2 class="xr-section-title xr-section-title--accent">${esc(sectionSummaryTitle())}</h2>
        <p class="xr-archive-lead">${esc(buildSummaryParagraph(hit))}</p>
      </section>

      <section class="xr-archive-card">
        <h2 class="xr-section-title xr-section-title--accent">${esc(humanFactorTitle())}</h2>
        <div class="xr-tag-list">${tagItems.map(t => `<span class="xr-tag">${esc(t)}</span>`).join("")}</div>
        <p class="xr-archive-prose">${esc(humanFactorContext())}</p>
      </section>

      <section class="xr-archive-card xr-habitat-block" id="habitat" aria-label="${esc(hab.title)}">
        <h2 class="xr-section-title xr-section-title--accent">${esc(sectionCompareTitle())} <span class="xr-section-pill">${esc(
          currentLang() === "zh" ? "示意图" : "schematic"
        )}</span></h2>
        <div class="xr-habitat-compare" id="xr-habitat-compare">
          <div class="xr-habitat-compare-viewport xr-habitat-compare-viewport--photo" aria-hidden="true">
            ${hab.compareSceneHtml}
          </div>
          <p class="xr-habitat-compare-idea">${esc(compareHint())}</p>
          <div class="xr-compare-rail" role="group" aria-label="${esc(sectionCompareTitle())}">
            <div class="xr-compare-labels">
              <span>${esc(compareLabelL())}</span>
              <span>${esc(compareLabelR())}</span>
            </div>
            <div class="xr-compare-track-wrap">
              <div class="xr-compare-fill" id="xr-compare-fill" style="width:22%"></div>
              <input type="range" id="xr-compare-range" class="xr-compare-range" min="0" max="100" value="22" />
            </div>
          </div>
          <p class="xr-habitat-compare-foot">${esc(compareFoot())}</p>
          <div class="xr-habitat-readout">
            <h3 class="xr-habitat-subhead">${esc(hab.title)}</h3>
            ${habBody}
          </div>
        </div>
      </section>

      <section class="xr-archive-card xr-reflect-card">
        <h2 class="xr-section-title xr-section-title--accent">${esc(sectionReflectTitle())}</h2>
        <p class="xr-reflect-q">${esc(getWhatIfQuestionForPage(hit))}</p>
        <a class="xr-reflect-cta" href="./ethics.html">${esc(reflectCta())}</a>
      </section>

      <section class="xr-archive-card">
        <h2 class="xr-section-title">${esc(currentLang() === "zh" ? "关键信息" : "Key information")}</h2>
        <dl class="xr-kv">
          ${rows
            .map(
              ([k, v]) => `
            <dt>${esc(fieldLabel(k))}</dt>
            <dd>${esc(fieldValue(k, v, hit))}</dd>`
            )
            .join("")}
        </dl>
      </section>

      <section class="xr-archive-card">
        <h2 class="xr-section-title">${esc(currentLang() === "zh" ? "开放档案入口" : "Open archives")}</h2>
        ${renderPortalLinks(arch?.portal_urls)}
      </section>

      <section class="xr-archive-card">
        <h2 class="xr-section-title">${esc(currentLang() === "zh" ? "策展线索" : "Curated")}</h2>
        ${
          curated.length
            ? `<ul class="xr-archive-ul">${curated
                .map(c => {
                  const u = String(c.url || "#").replace(/"/g, "%22");
                  return `<li><strong>${esc(localizedCuratedType(c.type))}</strong>：${esc(
                    localizedCuratedLabel(c.label)
                  )} — <a href="${u}" target="_blank" rel="noopener">打开</a></li>`;
                })
                .join("")}</ul>`
            : "<p class=\"xr-muted\">暂无策展线索。</p>"
        }
      </section>

      <section class="xr-archive-card">
        <h2 class="xr-section-title">${esc(currentLang() === "zh" ? "研究协议" : "Research protocol")}</h2>
        <ul class="xr-archive-ul">
          ${(arch?.research_protocol || [currentLang() === "zh" ? "暂无协议备注" : "No protocol notes yet"]).map(
            x => `<li>${esc(localizedResearchProtocolLine(x))}</li>`
          ).join("")}
        </ul>
      </section>
    </article>
  `;

  const range = document.getElementById("xr-compare-range");
  const ifLayer = document.getElementById("xr-habitat-if-layer");
  const fill = document.getElementById("xr-compare-fill");
  const syncCompare = () => {
    if (!range || !ifLayer || !fill) return;
    const v = Number(range.value) / 100;
    ifLayer.style.opacity = String(v);
    fill.style.width = `${v * 100}%`;
  };
  range?.addEventListener("input", syncCompare);
  range?.addEventListener("change", syncCompare);
  syncCompare();

  if (query.view === "habitat" || (location.hash || "").replace(/^#/, "") === "habitat") {
    requestAnimationFrame(() => {
      document.getElementById("habitat")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}
