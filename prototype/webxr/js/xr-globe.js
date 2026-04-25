import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { VRButton } from "three/addons/webxr/VRButton.js";
import { ARButton } from "three/addons/webxr/ARButton.js";
import {
  loadDataset,
  buildArchivalMap,
  speciesToPoints,
  latLonToPosition,
  categoryColorHex,
  getSpeciesLink,
  PORTAL_LABELS
} from "./xr-data.js";
import { buildWhatIfSectionHtml, wireWhatIfSection } from "./xr-whatif.js";

const GLOBE_RADIUS = 1;
const MARKER_RADIUS = 0.022;
const ICON_MARKER_SIZE = 0.17;
let activeAudio = null;

/* dist：相机到地心方向距离，约小则地球在画幅里越大（分栏后右栏加近、贴近参考大地球） */
const REGION_PRESETS = {
  global: { lat: 12, lon: 25, dist: 1.58, polar: 0.52 },
  asia: { lat: 35, lon: 95, dist: 1.22, polar: 0.35 },
  europe: { lat: 52, lon: 18, dist: 1.2, polar: 0.32 },
  africa: { lat: 2, lon: 20, dist: 1.26, polar: 0.38 },
  nam: { lat: 40, lon: -98, dist: 1.2, polar: 0.34 },
  sam: { lat: -18, lon: -62, dist: 1.25, polar: 0.36 },
  arctic: { lat: 72, lon: -40, dist: 1.32, polar: 0.42 },
  antarctic: { lat: -78, lon: 0, dist: 1.38, polar: 0.48 }
};

function makeMeridianParallels(radius, divisionsLat = 12, divisionsLon = 24) {
  const material = new THREE.LineBasicMaterial({
    color: 0xa8b8d0,
    transparent: true,
    opacity: 0.22
  });
  const group = new THREE.Group();

  for (let i = 0; i <= divisionsLon; i++) {
    const lon = -180 + (360 / divisionsLon) * i;
    const pts = [];
    for (let j = 0; j <= 64; j++) {
      const lat = -85 + (170 / 64) * j;
      const v = new THREE.Vector3();
      latLonToPosition(lat, lon, radius, v);
      pts.push(v);
    }
    const geom = new THREE.BufferGeometry().setFromPoints(pts);
    group.add(new THREE.Line(geom, material));
  }

  for (let i = 0; i <= divisionsLat; i++) {
    const lat = -80 + (160 / divisionsLat) * i;
    const pts = [];
    for (let j = 0; j <= 96; j++) {
      const lon = -180 + (360 / 96) * j;
      const v = new THREE.Vector3();
      latLonToPosition(lat, lon, radius, v);
      pts.push(v);
    }
    const geom = new THREE.BufferGeometry().setFromPoints(pts);
    group.add(new THREE.Line(geom, material));
  }
  return group;
}

function continentLabels(radius) {
  const group = new THREE.Group();
  const canvasTex = (text) => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 128;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "rgba(240,245,255,0.55)";
    ctx.font = "bold 44px Georgia, 'Noto Serif SC', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 256, 64);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  };

  const labels = [
    { t: "NORTH AMERICA", lat: 38, lon: -100 },
    { t: "SOUTH AMERICA", lat: -23, lon: -62 },
    { t: "EUROPE", lat: 51, lon: 12 },
    { t: "ASIA", lat: 33, lon: 90 },
    { t: "AFRICA", lat: 5, lon: 18 },
    { t: "ATLANTIC", lat: 10, lon: -35 },
    { t: "PACIFIC", lat: 5, lon: 165 }
  ];

  labels.forEach(({ t, lat, lon }) => {
    const spriteMat = new THREE.SpriteMaterial({
      map: canvasTex(t),
      transparent: true,
      depthWrite: false,
      opacity: 0.85
    });
    const sprite = new THREE.Sprite(spriteMat);
    const p = new THREE.Vector3();
    latLonToPosition(lat, lon, radius * 1.02, p);
    sprite.position.copy(p);
    const s = 0.35;
    sprite.scale.set(s * 2.2, s * 0.55, 1);
    group.add(sprite);
  });
  return group;
}

function greatCircleArc(p1, p2, radius, segments = 32) {
  const v1 = p1.clone().normalize();
  const v2 = p2.clone().normalize();
  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const v = new THREE.Vector3().copy(v1).lerp(v2, t).normalize().multiplyScalar(radius * 1.008);
    pts.push(v);
  }
  const geom = new THREE.BufferGeometry().setFromPoints(pts);
  return new THREE.Line(
    geom,
    new THREE.LineBasicMaterial({ color: 0xc8b070, transparent: true, opacity: 0.35 })
  );
}

function greatCirclePoints(vectors, radius, segments = 96) {
  const pts = [];
  if (vectors.length < 2) return pts;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    pts.push(sampleRoutePosition(vectors, t, radius));
  }
  return pts;
}

function sampleRoutePosition(vectors, t, radius) {
  if (!vectors.length) return new THREE.Vector3();
  if (vectors.length === 1) return vectors[0].clone().normalize().multiplyScalar(radius);
  const scaled = Math.min(0.999, Math.max(0, t)) * (vectors.length - 1);
  const index = Math.floor(scaled);
  const localT = scaled - index;
  return vectors[index]
    .clone()
    .normalize()
    .lerp(vectors[index + 1].clone().normalize(), localT)
    .normalize()
    .multiplyScalar(radius);
}

function routeVectors(route, radius = GLOBE_RADIUS * 1.12) {
  return (route?.waypoints || []).map(point => {
    const v = new THREE.Vector3();
    latLonToPosition(point.lat, point.lon, radius, v);
    return v;
  });
}

function smooth01(t) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

const CLIMATE_VISUALS = {
  glacial: { color: 0x9bd8ff, bg: 0x030814 },
  warming: { color: 0xff9b66, bg: 0x150705 },
  temperate: { color: 0x89d8a8, bg: 0x06100c },
  monsoon: { color: 0x58c7ff, bg: 0x03101a },
  coastal: { color: 0x64d6d2, bg: 0x031015 },
  dry: { color: 0xf2b96b, bg: 0x171006 },
  warm: { color: 0xffc36c, bg: 0x140d05 },
  humid: { color: 0x7be8c4, bg: 0x04120e },
  river: { color: 0x5aa8ff, bg: 0x030b18 },
  ocean: { color: 0x365dff, bg: 0x030615 }
};

function animalProfileForSpecies(sp) {
  const text = `${sp.common_name_en || ""} ${sp.common_name_zh || ""} ${sp.scientific_name || ""} ${sp.category || ""}`.toLowerCase();
  const has = (...tokens) => tokens.some(t => text.includes(t));

  if (has("mammoth", "elephant", "mastodon", "象")) return "mammoth";
  if (has("thylacine", "wolf", "tiger", "fox", "tasmanian", "袋狼", "狼", "虎")) return "canid";
  if (has("dodo", "pigeon", "parrot", "auk", "moa", "bird", "macaw", "duck", "goose", "hen", "鸽", "鸟", "鹦鹉")) return "bird";
  if (has("penguin", "企鹅")) return "penguin";
  if (has("turtle", "tortoise", "龟")) return "turtle";
  if (has("frog", "toad", "amphib", "蛙")) return "frog";
  if (has("fish", "salmon", "trout", "cod", "鱼")) return "fish";
  if (has("shark", "鲨")) return "shark";
  if (has("whale", "dolphin", "seal", "sea lion", "海豹", "鲸")) return "whale";
  if (has("rhino", "rhinoceros", "犀")) return "rhino";
  if (has("horse", "zebra", "quagga", "马", "斑马")) return "horse";
  if (has("deer", "elk", "stag", "goat", "ibex", "羚", "鹿", "羊")) return "deer";
  if (has("bear", "熊")) return "bear";
  if (has("bat", "蝙蝠")) return "bat";
  if (has("rodent", "rat", "mouse", "鼠")) return "rodent";
  if (has("snake", "lizard", "reptile", "蜥", "蛇")) return "lizard";
  if (has("butterfly", "moth", "insect", "bee", "beetle", "昆虫", "蛾", "蝶")) return "insect";
  if (has("snail", "mollusk", "mollusc", "蜗牛", "螺")) return "snail";
  if (has("crab", "蟹")) return "crab";
  if (has("mammal", "哺乳")) return "mammal";
  return "unknown";
}

function drawGlowPath(ctx, draw, fill = "rgba(136, 210, 255, 0.35)") {
  ctx.save();
  ctx.shadowColor = "rgba(125, 211, 252, 0.95)";
  ctx.shadowBlur = 18;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  draw();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.lineWidth = 7;
  ctx.strokeStyle = "rgba(192, 232, 255, 0.88)";
  ctx.stroke();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.92)";
  ctx.stroke();
  ctx.restore();
}

function drawMammoth(ctx) {
  drawGlowPath(ctx, () => {
    ctx.beginPath();
    ctx.ellipse(132, 126, 66, 40, -0.08, 0, Math.PI * 2);
    ctx.ellipse(69, 118, 32, 42, 0.18, 0, Math.PI * 2);
    ctx.ellipse(75, 79, 42, 24, -0.1, 0, Math.PI * 2);
  });
  ctx.save();
  ctx.shadowColor = "rgba(125, 211, 252, 0.95)";
  ctx.shadowBlur = 16;
  ctx.strokeStyle = "rgba(206, 240, 255, 0.95)";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(47, 126);
  ctx.bezierCurveTo(23, 154, 21, 194, 54, 196);
  ctx.bezierCurveTo(70, 196, 70, 178, 57, 178);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(57, 130);
  ctx.bezierCurveTo(35, 162, 40, 185, 67, 186);
  ctx.stroke();
  ctx.lineWidth = 10;
  [[93, 158, 88, 203], [124, 160, 121, 203], [158, 156, 164, 203], [190, 150, 204, 195]].forEach(([x1, y1, x2, y2]) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(192, 116);
  ctx.quadraticCurveTo(228, 106, 235, 132);
  ctx.stroke();
  ctx.restore();
}

function drawBird(ctx) {
  drawGlowPath(ctx, () => {
    ctx.beginPath();
    ctx.ellipse(126, 130, 46, 28, -0.12, 0, Math.PI * 2);
    ctx.moveTo(100, 126);
    ctx.quadraticCurveTo(58, 86, 34, 115);
    ctx.quadraticCurveTo(62, 120, 98, 140);
    ctx.moveTo(154, 124);
    ctx.quadraticCurveTo(198, 82, 228, 112);
    ctx.quadraticCurveTo(200, 121, 157, 142);
    ctx.moveTo(169, 126);
    ctx.lineTo(207, 136);
    ctx.lineTo(169, 145);
  });
}

function drawCanid(ctx) {
  drawGlowPath(ctx, () => {
    ctx.beginPath();
    ctx.ellipse(129, 132, 58, 27, 0, 0, Math.PI * 2);
    ctx.moveTo(82, 121);
    ctx.lineTo(54, 99);
    ctx.lineTo(70, 132);
    ctx.lineTo(52, 144);
    ctx.lineTo(86, 146);
    ctx.moveTo(180, 126);
    ctx.quadraticCurveTo(220, 94, 226, 133);
    ctx.quadraticCurveTo(211, 126, 188, 139);
    [[92, 154, 82, 198], [122, 157, 118, 200], [158, 156, 164, 199], [182, 150, 198, 192]].forEach(([x1, y1, x2, y2]) => {
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
    });
  });
}

function drawGeneric(ctx, profile) {
  if (profile === "mammoth") return drawMammoth(ctx);
  if (profile === "bird" || profile === "penguin" || profile === "bat") return drawBird(ctx);
  if (profile === "canid" || profile === "bear" || profile === "mammal") return drawCanid(ctx);
  if (profile === "fish" || profile === "shark" || profile === "whale") {
    return drawGlowPath(ctx, () => {
      ctx.beginPath();
      ctx.ellipse(124, 130, 64, 28, 0, 0, Math.PI * 2);
      ctx.moveTo(63, 130);
      ctx.lineTo(27, 101);
      ctx.lineTo(35, 130);
      ctx.lineTo(27, 159);
      ctx.closePath();
      ctx.moveTo(180, 130);
      ctx.lineTo(222, 118);
      ctx.lineTo(222, 142);
      ctx.closePath();
    });
  }
  if (profile === "turtle") {
    return drawGlowPath(ctx, () => {
      ctx.beginPath();
      ctx.ellipse(128, 130, 58, 38, 0, 0, Math.PI * 2);
      ctx.ellipse(190, 128, 22, 18, 0, 0, Math.PI * 2);
      [[87, 108], [87, 154], [158, 108], [158, 154]].forEach(([x, y]) => ctx.ellipse(x, y, 18, 10, 0.7, 0, Math.PI * 2));
    });
  }
  return drawGlowPath(ctx, () => {
    ctx.beginPath();
    ctx.ellipse(128, 130, 58, 36, 0, 0, Math.PI * 2);
    ctx.ellipse(184, 118, 24, 20, 0, 0, Math.PI * 2);
    ctx.moveTo(78, 160);
    ctx.lineTo(70, 195);
    ctx.moveTo(116, 164);
    ctx.lineTo(114, 201);
    ctx.moveTo(152, 162);
    ctx.lineTo(162, 198);
  });
}

function textMarkerTextureForSpecies(sp) {
  const color = new THREE.Color(categoryColorHex(sp.category));
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  const label = String(sp.common_name_en || sp.common_name_zh || sp.scientific_name || "?")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 3) || "?";

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(5, 14, 24, 0.18)";
  ctx.beginPath();
  ctx.roundRect(36, 46, 184, 152, 34);
  ctx.fill();

  ctx.save();
  ctx.strokeStyle = "rgba(125, 211, 252, 0.2)";
  ctx.lineWidth = 1.5;
  for (let x = 58; x < 210; x += 24) {
    ctx.beginPath();
    ctx.moveTo(x, 58);
    ctx.lineTo(x, 190);
    ctx.stroke();
  }
  for (let y = 70; y < 186; y += 24) {
    ctx.beginPath();
    ctx.moveTo(48, y);
    ctx.lineTo(208, y);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.shadowColor = "rgba(125, 211, 252, 0.95)";
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.roundRect(56, 70, 144, 104, 28);
  ctx.fillStyle = "rgba(9, 22, 36, 0.72)";
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "rgba(192, 232, 255, 0.86)";
  ctx.stroke();
  ctx.font = "760 46px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color.getStyle();
  ctx.strokeStyle = "rgba(230, 250, 255, 0.42)";
  ctx.lineWidth = 1.5;
  ctx.strokeText(label, 128, 122);
  ctx.fillText(label, 128, 122);
  ctx.restore();

  ctx.beginPath();
  ctx.roundRect(72, 192, 112, 34, 17);
  ctx.fillStyle = "rgba(10, 18, 28, 0.82)";
  ctx.fill();
  ctx.font = "700 18px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color.getStyle();
  ctx.strokeStyle = "rgba(192, 232, 255, 0.55)";
  ctx.lineWidth = 1.5;
  ctx.strokeText(label, 128, 210);
  ctx.fillText(label, 128, 210);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createAnimalMarker(sp) {
  const texture = textMarkerTextureForSpecies(sp);
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: true,
    depthWrite: false,
    sizeAttenuation: true
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(ICON_MARKER_SIZE, ICON_MARKER_SIZE, 1);
  sprite.userData.species = sp;
  sprite.userData.baseScale = ICON_MARKER_SIZE;
  sprite.userData.iconTexture = texture;
  return sprite;
}

async function loadAnimalImageManifest() {
  try {
    const res = await fetch("./assets/animal-image-manifest.json");
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.sources) ? data.sources : [];
  } catch {
    return [];
  }
}

function findAnimalImageSource(sp, sources) {
  return sources.find(source => source.slug === sp.slug) || null;
}

async function loadAnimalAudioManifest() {
  try {
    const res = await fetch("./assets/animal-audio-manifest.json");
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.sources) ? data.sources : [];
  } catch {
    return [];
  }
}

function findAnimalAudioSource(sp, sources) {
  return sources.find(source => source.slug === sp.slug && source.localPath) || null;
}

async function loadAnimalMigrationManifest() {
  try {
    const res = await fetch("./assets/animal-migration-manifest.json");
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.sources) ? data.sources : [];
  } catch {
    return [];
  }
}

function findAnimalMigrationSource(sp, sources) {
  return sources.find(source => source.slug === sp.slug) || null;
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

function hasChinese(text = "") {
  return /[\u3400-\u9fff]/.test(String(text));
}

function currentLang() {
  return localStorage.getItem("ea-lang") || localStorage.getItem("xr-lang") || "zh";
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

function localizedRegion(value = "") {
  if (currentLang() !== "zh") return value;
  return String(value || "")
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
  return String(value || "")
    .replace(/Critically Endangered \(Possibly Extinct\)/gi, "极危（可能灭绝）")
    .replace(/Possibly Extinct/gi, "可能灭绝")
    .replace(/last robust survey/gi, "最后一次可靠调查")
    .replace(/verify/gi, "待核验")
    .replace(/Extinct/gi, "灭绝")
    .replace(/Endangered/gi, "濒危");
}

function localizedDrivers(value = "") {
  if (currentLang() !== "zh") return value;
  return String(value || "")
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

function localizedLabel(key) {
  const zh = {
    dossier: "数字档案",
    image: "图片来源",
    sound: "播放真实录音",
    proxySound: "播放近缘真实录音",
    noSound: "暂无真实录音",
    proxyNote: "近缘真实录音",
    originalNote: "原物种真实录音",
    migration: "迁徙路线",
    climate: "气候变化",
    inferredRoute: "历史分布推定路线"
  };
  const en = {
    dossier: "Digital dossier",
    image: "Image source",
    sound: "Play real recording",
    proxySound: "Play related-species recording",
    noSound: "No real recording yet",
    proxyNote: "Related-species recording",
    originalNote: "Original-species recording",
    migration: "Migration route",
    climate: "Climate shift",
    inferredRoute: "Historical-range inferred route"
  };
  return (currentLang() === "zh" ? zh : en)[key] || key;
}

function localizedClimate(key) {
  const zh = {
    glacial: "冰期",
    warming: "变暖",
    temperate: "温带",
    monsoon: "季风",
    coastal: "海岸",
    dry: "干旱",
    warm: "暖湿",
    humid: "高湿",
    river: "河流",
    ocean: "海洋"
  };
  const en = {
    glacial: "Glacial",
    warming: "Warming",
    temperate: "Temperate",
    monsoon: "Monsoon",
    coastal: "Coastal",
    dry: "Dry",
    warm: "Warm",
    humid: "Humid",
    river: "River",
    ocean: "Ocean"
  };
  return (currentLang() === "zh" ? zh : en)[key] || key;
}

function audioNoteForSource(source) {
  if (!source) return "";
  const animal = currentLang() === "zh"
    ? source.recordedAnimalZh || source.recordedAnimal
    : source.recordedAnimal;
  const label = source.kind === "proxy" ? localizedLabel("proxyNote") : localizedLabel("originalNote");
  return currentLang() === "zh" ? `${label}：${animal}` : `${label}: ${animal}`;
}

function localizedPortalLabel(key) {
  if (currentLang() !== "zh") return PORTAL_LABELS[key] || key;
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
  return labels[key] || "外部资料";
}

function createPhotoMarker(sp, source, textureLoader) {
  const texture = source?.markerPath ? textureLoader.load(source.markerPath) : textMarkerTextureForSpecies(sp);
  if (texture) texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: true,
    depthWrite: false,
    sizeAttenuation: true
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(ICON_MARKER_SIZE * 1.18, ICON_MARKER_SIZE * 1.18, 1);
  sprite.userData.species = sp;
  sprite.userData.baseScale = ICON_MARKER_SIZE * 1.18;
  sprite.userData.imageSource = source || null;
  return sprite;
}

function stopSpeciesCall() {
  if (!activeAudio) return;
  activeAudio.muted = true;
  activeAudio.volume = 0;
  activeAudio.pause();
  activeAudio.currentTime = 0;
  activeAudio.removeAttribute("src");
  activeAudio.load();
  activeAudio = null;
}

function isSoundMuted() {
  return document.getElementById("xr-btn-mute")?.dataset.on === "1";
}

function playSpeciesCall(source) {
  if (!source?.localPath) return;
  stopSpeciesCall();
  if (isSoundMuted()) return;
  activeAudio = new Audio(source.localPath);
  activeAudio.volume = 0.86;
  activeAudio.muted = false;
  activeAudio.play().catch(() => {
    // Some browsers require the replay button after the first gesture.
  });
}

export async function initGlobe() {
  const canvas = document.getElementById("xr-canvas");
  const chipCount = document.getElementById("xr-species-count");
  const card = document.getElementById("xr-species-card");
  const cardBody = document.getElementById("xr-card-body");
  const cardClose = document.getElementById("xr-card-close");
  const tooltip = document.getElementById("xr-tooltip");
  const xrSlot = document.getElementById("xr-webxr-slot");

  const { species, archival } = await loadDataset();
  const [animalImageSources, animalAudioSources, animalMigrationSources] = await Promise.all([
    loadAnimalImageManifest(),
    loadAnimalAudioManifest(),
    loadAnimalMigrationManifest()
  ]);
  const textureLoader = new THREE.TextureLoader();
  const archivalMap = buildArchivalMap(archival);
  const points = speciesToPoints(species);
  const updateChipCount = () => {
    if (!chipCount) return;
    const lang = localStorage.getItem("ea-lang") || localStorage.getItem("xr-lang") || "zh";
    const value = window.XR_COPY?.[lang]?.count;
    chipCount.textContent = typeof value === "function" ? value(species.length) : `${species.length} 灭绝物种 · Destinations`;
  };
  updateChipCount();
  window.addEventListener("xr:languagechange", updateChipCount);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x030508);

  const starsGeom = new THREE.BufferGeometry();
  const starPositions = [];
  for (let i = 0; i < 1600; i++) {
    const r = 12 + Math.random() * 28;
    const θ = Math.random() * Math.PI * 2;
    const φ = Math.acos(2 * Math.random() - 1);
    starPositions.push(
      r * Math.sin(φ) * Math.cos(θ),
      r * Math.sin(φ) * Math.sin(θ),
      r * Math.cos(φ)
    );
  }
  starsGeom.setAttribute("position", new THREE.Float32BufferAttribute(starPositions, 3));
  scene.add(
    new THREE.Points(
      starsGeom,
      new THREE.PointsMaterial({ color: 0xb8c8e8, size: 0.02, transparent: true, opacity: 0.45 })
    )
  );

  const camera = new THREE.PerspectiveCamera(40, 1, 0.05, 200);
  camera.position.set(0, 0.28, 1.68);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.xr.enabled = true;

  const hemi = new THREE.HemisphereLight(0x9db4ff, 0x080a10, 0.55);
  scene.add(hemi);
  const dir = new THREE.DirectionalLight(0xfff2dd, 0.85);
  dir.position.set(3.5, 2.2, 2.5);
  scene.add(dir);

  const earthGroup = new THREE.Group();
  scene.add(earthGroup);

  const globeGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 96, 64);
  const globeMat = new THREE.MeshStandardMaterial({
    color: 0x1a2432,
    roughness: 0.92,
    metalness: 0.08,
    emissive: new THREE.Color(0x05070a),
    emissiveIntensity: 0.4
  });
  const globe = new THREE.Mesh(globeGeo, globeMat);
  earthGroup.add(globe);

  const climateShell = new THREE.Mesh(
    new THREE.SphereGeometry(GLOBE_RADIUS * 1.028, 96, 48),
    new THREE.MeshBasicMaterial({
      color: 0x7eb8ff,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  );
  earthGroup.add(climateShell);

  const gridGroup = makeMeridianParallels(GLOBE_RADIUS * 1.001);
  earthGroup.add(gridGroup);

  const labelGroup = continentLabels(GLOBE_RADIUS * 1.015);
  earthGroup.add(labelGroup);

  const routesGroup = new THREE.Group();
  earthGroup.add(routesGroup);

  const migrationGroup = new THREE.Group();
  earthGroup.add(migrationGroup);

  const markersGroup = new THREE.Group();
  earthGroup.add(markersGroup);

  const markerMeshes = [];
  const tmpVec = new THREE.Vector3();

  points.forEach((sp, i) => {
    latLonToPosition(sp.lat, sp.lon, GLOBE_RADIUS * 1.018, tmpVec);
    const source = findAnimalImageSource(sp, animalImageSources);
    const mesh = source ? createPhotoMarker(sp, source, textureLoader) : createAnimalMarker(sp);
    mesh.position.copy(tmpVec);
    mesh.userData.idx = i;
    markersGroup.add(mesh);
    markerMeshes.push(mesh);
  });

  function rebuildRoutes() {
    while (routesGroup.children.length) routesGroup.remove(routesGroup.children[0]);
    const byCat = new Map();
    points.forEach(p => {
      if (!byCat.has(p.category)) byCat.set(p.category, []);
      byCat.get(p.category).push(p);
    });
    let lines = 0;
    byCat.forEach(arr => {
      if (arr.length < 2) return;
      for (let i = 0; i < arr.length - 1 && lines < 36; i++) {
        const a = new THREE.Vector3();
        const b = new THREE.Vector3();
        latLonToPosition(arr[i].lat, arr[i].lon, GLOBE_RADIUS * 1.012, a);
        latLonToPosition(arr[i + 1].lat, arr[i + 1].lon, GLOBE_RADIUS * 1.012, b);
        routesGroup.add(greatCircleArc(a, b, GLOBE_RADIUS * 1.012));
        lines++;
      }
    });
  }
  rebuildRoutes();

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.minDistance = 1.02;
  controls.maxDistance = 5.5;
  controls.rotateSpeed = 0.65;
  controls.zoomSpeed = 0.55;

  let autoRotate = true;
  let scatter = false;
  let migratePhase = 0;
  const basePositions = markerMeshes.map(m => m.position.clone());

  function resize() {
    const host = canvas.parentElement;
    const w = (host && host.clientWidth) || window.innerWidth;
    const h = (host && host.clientHeight) || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let hovered = null;
  let selectedMarker = null;
  let userSelectedMarker = null;
  let clickCycle = { x: 0, y: 0, index: 0, time: 0 };

  function setRegion(key) {
    const p = REGION_PRESETS[key] || REGION_PRESETS.global;
    const target = new THREE.Vector3();
    latLonToPosition(p.lat, p.lon, 0.02, target);
    controls.target.copy(target);
    const camPos = new THREE.Vector3();
    latLonToPosition(p.lat + p.polar * 18, p.lon - 32, p.dist, camPos);
    camera.position.copy(camPos);
    controls.update();
  }

  document.querySelectorAll("[data-region]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-region]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      setRegion(btn.dataset.region);
    });
  });

  document.getElementById("xr-toggle-grid")?.addEventListener("change", e => {
    gridGroup.visible = e.target.checked;
  });
  document.getElementById("xr-toggle-routes")?.addEventListener("change", e => {
    routesGroup.visible = e.target.checked;
  });
  document.getElementById("xr-toggle-story")?.addEventListener("change", e => {
    labelGroup.visible = e.target.checked;
  });
  document.getElementById("xr-toggle-rotate")?.addEventListener("change", e => {
    autoRotate = e.target.checked;
  });
  document.getElementById("xr-toggle-scatter")?.addEventListener("change", e => {
    scatter = e.target.checked;
    if (!scatter) {
      markerMeshes.forEach((m, i) => m.position.copy(basePositions[i]));
    }
  });
  let migrationIndex = 0;
  const migrationState = {
    active: false,
    route: null,
    mesh: null,
    vectors: [],
    startTime: 0,
    duration: 9000,
    startColor: new THREE.Color(0x7eb8ff),
    endColor: new THREE.Color(0xffb36b),
    startBg: new THREE.Color(0x030508),
    endBg: new THREE.Color(0x120b05),
    originalPosition: new THREE.Vector3()
  };
  let migrationCinemaBeacon = null;

  function exitMigrationCinema() {
    if (migrationCinemaBeacon) {
      scene.remove(migrationCinemaBeacon);
      migrationCinemaBeacon.geometry?.dispose();
      if (Array.isArray(migrationCinemaBeacon.material)) {
        migrationCinemaBeacon.material.forEach(m => m.dispose());
      } else {
        migrationCinemaBeacon.material?.dispose();
      }
      migrationCinemaBeacon = null;
    }
    const m = migrationState.mesh;
    if (m?.material && m.userData?._cinemaSpriteOpacity != null) {
      m.material.opacity = m.userData._cinemaSpriteOpacity;
      delete m.userData._cinemaSpriteOpacity;
    }
    card?.classList.remove("xr-card--cinema-hidden");
    card?.classList.remove("xr-card--migration-dock");
  }

  function enterMigrationCinema(mesh) {
    if (mesh?.material) {
      mesh.userData._cinemaSpriteOpacity = mesh.material.opacity;
      mesh.material.transparent = true;
      mesh.material.opacity = 0;
    }
    const bGeom = new THREE.SphereGeometry(MARKER_RADIUS * 0.85, 20, 16);
    const bMat = new THREE.MeshStandardMaterial({
      color: 0x6ec8ff,
      emissive: 0x3d9fff,
      emissiveIntensity: 0.75,
      metalness: 0.2,
      roughness: 0.35,
      depthTest: false,
      depthWrite: false
    });
    migrationCinemaBeacon = new THREE.Mesh(bGeom, bMat);
    migrationCinemaBeacon.name = "migrationCinemaBeacon";
    migrationCinemaBeacon.renderOrder = 100;
    scene.add(migrationCinemaBeacon);
    card?.classList.add("xr-card--cinema-hidden");
  }

  function clearMigrationLine() {
    while (migrationGroup.children.length) migrationGroup.remove(migrationGroup.children[0]);
  }

  function drawMigrationLine(route) {
    clearMigrationLine();
    const vectors = routeVectors(route, GLOBE_RADIUS * 1.09);
    const pointsOnArc = greatCirclePoints(vectors, GLOBE_RADIUS * 1.095, 128);
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pointsOnArc),
      new THREE.LineBasicMaterial({
        color: CLIMATE_VISUALS[route.climateEnd]?.color || 0x7eb8ff,
        transparent: true,
        opacity: 0.86
      })
    );
    migrationGroup.add(line);
    return vectors;
  }

  function migrationCardHtml(route) {
    if (!route) return "";
    const title = currentLang() === "zh" ? route.titleZh : route.titleEn;
    const story = currentLang() === "zh" ? route.storyZh : route.storyEn;
    const climate = `${localizedClimate(route.climateStart)} → ${localizedClimate(route.climateEnd)}`;
    const separator = currentLang() === "zh" ? "：" : ": ";
    return `
      <p class="meta"><strong>${localizedLabel("migration")}${separator}</strong>${title}</p>
      <p class="meta">${story}</p>
      <p class="meta">${localizedLabel("climate")}${separator}${climate} · ${localizedLabel("inferredRoute")}</p>
    `;
  }

  function startMigrationFor(mesh) {
    if (!mesh) return;
    const sp = mesh.userData.species;
    const route = findAnimalMigrationSource(sp, animalMigrationSources);
    if (!route) return;
    resetMigrationVisuals();
    scatter = false;
    const scatterToggle = document.getElementById("xr-toggle-scatter");
    if (scatterToggle) scatterToggle.checked = false;
    setSelectedMarker(mesh);
    showCard(sp, route);

    const climateStart = CLIMATE_VISUALS[route.climateStart] || CLIMATE_VISUALS.temperate;
    const climateEnd = CLIMATE_VISUALS[route.climateEnd] || CLIMATE_VISUALS.warming;
    migrationState.active = true;
    migrationState.route = route;
    migrationState.mesh = mesh;
    migrationState.vectors = drawMigrationLine(route);
    migrationState.startTime = performance.now();
    migrationState.duration = currentLang() === "zh" ? 9800 : 9200;
    migrationState.startColor.setHex(climateStart.color);
    migrationState.endColor.setHex(climateEnd.color);
    migrationState.startBg.setHex(climateStart.bg);
    migrationState.endBg.setHex(climateEnd.bg);
    migrationState.originalPosition.copy(mesh.position);
    enterMigrationCinema(mesh);
  }

  function resetMigrationVisuals() {
    exitMigrationCinema();
    migrationState.active = false;
    migrationState.mesh = null;
    climateShell.material.opacity = 0;
    scene.background.setHex(0x030508);
    globeMat.emissive.setHex(0x05070a);
    clearMigrationLine();
  }

  document.getElementById("xr-btn-migrate")?.addEventListener("click", () => {
    const mesh = userSelectedMarker || markerMeshes[migrationIndex % markerMeshes.length];
    migrationIndex += 1;
    startMigrationFor(mesh);
  });
  document.getElementById("xr-btn-mute")?.addEventListener("click", () => {
    setTimeout(() => {
      if (isSoundMuted()) stopSpeciesCall();
    }, 0);
  });
  window.addEventListener("xr:mute", stopSpeciesCall);

  function portalLinksHtml(portalUrls = {}) {
    const keys = Object.keys(portalUrls);
    if (!keys.length) return "";
    return keys
      .slice(0, 4)
      .map(k => {
        const label = localizedPortalLabel(k);
        return `<a href="${portalUrls[k]}" target="_blank" rel="noopener">${label}</a>`;
      })
      .join("");
  }

  function showCard(sp, migrationRoute = null) {
    const arch = archivalMap.get(sp.scientific_name);
    const portals = portalLinksHtml(arch?.portal_urls);
    const source = findAnimalImageSource(sp, animalImageSources);
    const audioSource = findAnimalAudioSource(sp, animalAudioSources);
    const sourceLink = source?.sourceUrl
      ? `<a href="${source.sourceUrl}" target="_blank" rel="noopener">${localizedLabel("image")}</a>`
      : "";
    const soundButton = audioSource
      ? `<button type="button" id="xr-play-species-sound">${audioSource.kind === "proxy" ? localizedLabel("proxySound") : localizedLabel("sound")}</button>`
      : `<button type="button" disabled>${localizedLabel("noSound")}</button>`;
    const audioNote = audioSource ? `<p class="meta">${audioNoteForSource(audioSource)}</p>` : "";
    const migrationNote = migrationRoute ? migrationCardHtml(migrationRoute) : "";
    cardBody.innerHTML = `
      <h3>${localizedSpeciesName(sp)}</h3>
      <div class="sci">${currentLang() === "zh" ? `学名：${sp.scientific_name}` : `${sp.common_name_zh || ""} · ${sp.scientific_name}`}</div>
      <p class="meta">${localizedCategory(sp.category)} · ${localizedExtinction(sp.extinction_summary)} · ${localizedRegion(sp.region)}</p>
      <p class="meta">${localizedDrivers(sp.extinction_drivers)}</p>
      ${migrationNote}
      ${audioNote}
      ${buildWhatIfSectionHtml(sp)}
      <div class="actions">
        <a href="${getSpeciesLink(sp.slug, { view: "habitat", fragment: "habitat" })}" title="${currentLang() === "zh" ? "打开档案并跳转到原始栖息地示意" : "Open dossier: scroll to habitat illustration"}">${localizedLabel("dossier")}</a>
        ${soundButton}
        ${sourceLink}
        ${portals}
      </div>
    `;
    if (migrationRoute) {
      card.classList.add("xr-card--migration-dock");
    } else {
      card.classList.remove("xr-card--migration-dock");
    }
    card.classList.add("visible");
    wireWhatIfSection(cardBody);
    document.getElementById("xr-play-species-sound")?.addEventListener("click", () => playSpeciesCall(audioSource));
    if (audioSource) playSpeciesCall(audioSource);
  }

  function setSelectedMarker(mesh) {
    selectedMarker = mesh || null;
    markerMeshes.forEach((marker, i) => {
      const s = marker.userData.baseScale || ICON_MARKER_SIZE;
      marker.scale.set(s, s, 1);
      marker.renderOrder = 0;
      if (!scatter) marker.position.copy(basePositions[i]);
      if (marker.material) {
        marker.material.depthTest = true;
        marker.material.opacity = 1;
      }
    });

    if (!selectedMarker) return;
    const s = selectedMarker.userData.baseScale || ICON_MARKER_SIZE;
    selectedMarker.scale.set(s * 1.36, s * 1.36, 1);
    selectedMarker.renderOrder = 50;
    if (selectedMarker.material) {
      selectedMarker.material.depthTest = false;
      selectedMarker.material.opacity = 1;
    }
  }

  function pointerToHits(ev) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObjects(markerMeshes, false);
  }

  cardClose?.addEventListener("click", () => {
    card.classList.remove("visible");
    setSelectedMarker(null);
    userSelectedMarker = null;
    stopSpeciesCall();
    resetMigrationVisuals();
  });

  canvas.addEventListener("pointermove", ev => {
    const hits = pointerToHits(ev);
    if (hits.length) {
      const sp = hits[0].object.userData.species;
      hovered = sp;
      tooltip.style.display = "block";
      tooltip.style.left = `${ev.clientX + 14}px`;
      tooltip.style.top = `${ev.clientY + 14}px`;
      tooltip.textContent = localizedSpeciesName(sp);
    } else {
      hovered = null;
      tooltip.style.display = "none";
    }
  });

  canvas.addEventListener("click", ev => {
    const hits = pointerToHits(ev);
    if (!hits.length) return;

    const nearLastClick =
      Math.hypot(ev.clientX - clickCycle.x, ev.clientY - clickCycle.y) < 18 &&
      performance.now() - clickCycle.time < 1800;
    clickCycle = {
      x: ev.clientX,
      y: ev.clientY,
      index: nearLastClick ? clickCycle.index + 1 : 0,
      time: performance.now()
    };

    const selectedHit = hits[clickCycle.index % hits.length];
    const mesh = selectedHit.object;
    const sp = mesh.userData.species;
    hovered = sp;
    resetMigrationVisuals();
    userSelectedMarker = mesh;
    setSelectedMarker(mesh);
    showCard(sp);
  });

  if (xrSlot) {
    const vrBtn = VRButton.createButton(renderer);
    vrBtn.title = "Enter VR (WebXR)";
    xrSlot.appendChild(vrBtn);
    try {
      const arBtn = ARButton.createButton(renderer);
      arBtn.title = "Enter AR (WebXR — device dependent)";
      xrSlot.appendChild(arBtn);
    } catch {
      /* AR optional */
    }
  }

  renderer.xr.addEventListener("sessionstart", () => {
    controls.enabled = false;
  });
  renderer.xr.addEventListener("sessionend", () => {
    controls.enabled = true;
  });

  function animate() {
    if (autoRotate && !renderer.xr.isPresenting) {
      earthGroup.rotation.y += 0.0009;
    }
    migratePhase += 0.012;
    if (scatter) {
      markerMeshes.forEach((m, i) => {
        if (migrationState.active && m === migrationState.mesh) return;
        const bp = basePositions[i];
        const nudge = 0.04 * Math.sin(migratePhase + i * 0.7);
        m.position.copy(bp).multiplyScalar(1 + nudge);
      });
    }
    if (selectedMarker && !migrationState.active) {
      selectedMarker.position.normalize().multiplyScalar(GLOBE_RADIUS * 1.19);
    }

    if (migrationState.active && migrationState.mesh) {
      const raw = (performance.now() - migrationState.startTime) / migrationState.duration;
      const t = Math.min(1, raw);
      const eased = smooth01(t);
      const arcRadius = GLOBE_RADIUS * (1.08 + 0.1 * Math.sin(Math.PI * eased));
      const pos = sampleRoutePosition(migrationState.vectors, eased, arcRadius);
      migrationState.mesh.position.copy(pos);
      const s = (migrationState.mesh.userData.baseScale || ICON_MARKER_SIZE) * (1.42 + 0.18 * Math.sin(Math.PI * eased));
      migrationState.mesh.scale.set(s, s, 1);
      migrationState.mesh.renderOrder = 80;
      if (migrationState.mesh.material) migrationState.mesh.material.depthTest = false;
      if (migrationCinemaBeacon) {
        migrationState.mesh.getWorldPosition(migrationCinemaBeacon.position);
      }

      climateShell.material.opacity = 0.08 + 0.1 * Math.sin(Math.PI * eased);
      climateShell.material.color.lerpColors(migrationState.startColor, migrationState.endColor, eased);
      scene.background.lerpColors(migrationState.startBg, migrationState.endBg, eased);
      globeMat.emissive.copy(climateShell.material.color).multiplyScalar(0.12 + 0.18 * Math.sin(Math.PI * eased));
      earthGroup.rotation.y += 0.0018;

      const worldPos = new THREE.Vector3();
      migrationState.mesh.getWorldPosition(worldPos);
      const direction = worldPos.clone().normalize();
      const desiredDistance = 2.7 - 1.05 * Math.sin(Math.PI * eased);
      const desiredCamera = direction.multiplyScalar(desiredDistance);
      desiredCamera.y += 0.16 + 0.18 * Math.sin(Math.PI * eased);
      camera.position.lerp(desiredCamera, 0.045);
      controls.target.lerp(worldPos.clone().multiplyScalar(0.06), 0.08);

      if (t >= 1) {
        migrationState.mesh.position.copy(sampleRoutePosition(migrationState.vectors, 1, GLOBE_RADIUS * 1.12));
        migrationState.active = false;
        if (migrationCinemaBeacon) {
          migrationState.mesh.getWorldPosition(migrationCinemaBeacon.position);
        }
        exitMigrationCinema();
        climateShell.material.opacity = 0.06;
      }
    }
    controls.update();
    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animate);

  setRegion("global");
  document.querySelector('[data-region="global"]')?.classList.add("active");
}
