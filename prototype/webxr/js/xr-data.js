/** Shared dataset + helpers for WebXR Extinction Archive prototype */

export const PORTAL_LABELS = {
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

const DATA_BASE = "../../data/";

export async function loadDataset() {
  const [speciesRes, archivalRes] = await Promise.all([
    fetch(`${DATA_BASE}research_extinct_animals_list.json`),
    fetch(`${DATA_BASE}archival_media_research.json`)
  ]);
  if (!speciesRes.ok || !archivalRes.ok) throw new Error("Data fetch failed");
  const speciesData = await speciesRes.json();
  const archivalData = await archivalRes.json();
  return { species: speciesData.species, archival: archivalData.species, meta: speciesData.meta };
}

export function slugify(text) {
  return String(text).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function buildArchivalMap(archivalRows) {
  const map = new Map();
  archivalRows.forEach(row => map.set(row.scientific_name, row));
  return map;
}

export function regionToAnchor(region = "") {
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

export function speciesToPoints(species) {
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

/** Spherical coords aligned with common Three.js globe examples (Y up). */
export function latLonToPosition(latDeg, lonDeg, radius, target) {
  const phi = ((90 - latDeg) * Math.PI) / 180;
  const theta = ((lonDeg + 180) * Math.PI) / 180;
  target.x = -radius * Math.sin(phi) * Math.cos(theta);
  target.y = radius * Math.cos(phi);
  target.z = radius * Math.sin(phi) * Math.sin(theta);
  return target;
}

export function categoryColorHex(category = "") {
  const c = category.toLowerCase();
  if (c.includes("bird")) return 0xf6e7a3;
  if (c.includes("mammal")) return 0xf3c8c8;
  if (c.includes("reptile")) return 0xc8edbf;
  if (c.includes("amphib")) return 0xafe7e8;
  if (c.includes("fish")) return 0xb8d8ff;
  if (c.includes("invertebrate")) return 0xdfc9f7;
  if (c.includes("insect")) return 0xfde3b8;
  if (c.includes("megafauna")) return 0xffd4b1;
  return 0xd0def2;
}

export function getSpeciesLink(slug, { fragment, view } = {}) {
  const params = new URLSearchParams();
  params.set("slug", String(slug));
  if (view) params.set("view", String(view));
  let u = `./species.html?${params.toString()}`;
  if (fragment) u += `#${String(fragment).replace(/^#/, "")}`;
  return u;
}
