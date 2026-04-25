/**
 * 「若无人类影响」教育式分叉 + 原始栖息地描述（与档案页 #habitat 联动）
 */

function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function displayName(sp, zh) {
  if (zh) {
    if (String(sp.common_name_zh || "").trim()) return String(sp.common_name_zh).trim();
    return sp.scientific_name;
  }
  return sp.common_name_en || sp.scientific_name;
}

const OVERRIDES = {
  "Ectopistes migratorius": {
    mood: "temperate-forest",
    habitat: {
      zh: [
        "旅鸽曾依赖北美东部大面积连续林冠进行集群繁殖；秋季聚集可达巨量个体，对完整森林廊道极为敏感。",
        "在档案视角下，「栖息地」是成片阔叶—硬木与河岸林组成的立体空间：高冠层、倒木与林缘交错，而非均匀农田或孤立树岛。"
      ],
      en: [
        "Passenger pigeons depended on large, contiguous Eastern North American forest canopies for social breeding. Mega-flocks in autumn required landscape-scale connectivity, not tree islands in farmland.",
        "Here, 'habitat' is imagined as a layered mosaic of broadleaf, riverside, and old-growth edges rather than a uniform grid."
      ]
    },
    whatif: {
      zh: {
        q: "如果当时限制商业猎捕，并保留大面积连片森林，旅鸽是否更有机会延续下去？",
        hint: "选择一个情境，思考不同因素可能带来的影响：",
        options: [
          {
            label: "限制商业猎捕",
            fb: "可明显降低短期死亡，但旅鸽还需要大面积连通森林来维持集群繁殖。"
          },
          { label: "森林只剩零散斑块", fb: "栖息地破碎会削弱集群繁殖条件，种群风险仍然很高。" },
          { label: "猎捕和贸易不受限制", fb: "在栖息地已经减少的情况下，持续猎捕会进一步加速种群崩溃。" }
        ]
      },
      en: {
        q: "With restricted market hunting and protected breeding forests, could the passenger pigeon still remain viable?",
        hint: "Pick a historical branch (educational scenario, not one 'correct' answer):",
        options: [
          {
            label: "Cap commercial take",
            fb: "Cuts short-term mortality, but large contiguous tracts are still needed for colonial breeding."
          },
          { label: "Only fragmented patches", fb: "Fragmentation undermines colonial behavior; risk stays high." },
          { label: "Unregulated market hunting", fb: "Market pressure can collapse a population already squeezed by habitat loss." }
        ]
      }
    }
  },
  "Mammuthus columbi": {
    mood: "grassland",
    habitat: {
      zh: [
        "哥伦比亚猛犸象生活于更新世—全新世北美的开阔草地与稀树环境：高草、灌木丛、河岸走廊与冲积扇相连，与大型象类迁徙廊道相叠。",
        "地图上的点对应宏观分布；档案中的「栖息地表征」是开阔视野、季节性青草与融雪水源的网络，而不是现代城市或农田所替代的单一地貌。"
      ],
      en: [
        "Columbian mammoths used open grasslands, parkland, and alluvial corridors across North America—large, sight-rich landscapes tied to grass productivity and water.",
        "The 'habitat' readout here is a network of open plains, river bottoms, and seasonal green-up—not the urban grid that replaced it."
      ]
    },
    whatif: {
      zh: {
        q: "如果没有猎捕和大规模开垦，哥伦比亚猛犸象仍会面对气候变干和草原变化。你认为哪项压力更关键？",
        hint: "选择一个方向，比较不同压力的作用：",
        options: [
          { label: "气候干旱压缩草场", fb: "有效湿度变化仍可能收缩适宜草原，象群或向南或向河廊道收缩。" },
          { label: "大平原仍连通时更易迁徙", fb: "广域连接有利于追随水草，但仍受疾病、火情与其他捕食系统波动影响。" },
          { label: "无法单独归因于人类或气候", fb: "古生态记录常混合多重驱动，本卡仅作「反事实思考」。" }
        ]
      },
      en: {
        q: "Without human hunting and land conversion, mammoths would still face post-glacial climate and vegetation change—which lever matters more to you?",
        hint: "Choose a branch (illustrative, not a model output):",
        options: [
          { label: "Drying shrinks grasslands", fb: "Moisture shifts can still contract prime range; herds may track river corridors or shift latitude." },
          { label: "Open plains still connected", fb: "Continental connectivity helps follow forage, but fire regimes, disease, and predator systems still vary." },
          { label: "No single human/climate switch", fb: "Paleo records are mixed; the card is a thought experiment, not an attribution model." }
        ]
      }
    }
  },
  "Mammuthus primigenius": {
    mood: "tundra",
    habitat: {
      zh: [
        "真猛犸象与寒冷干旱的苔原—草原带相连：低垂植被、风蚀地貌、长日照季节变化，以及可预测的融雪与河冰边缘。",
        "栖息地表征是「寒冷开阔 + 可行走廊道 + 可预测牧草季」，与针叶林线进退密切相关。"
      ],
      en: [
        "Woolly mammoths track cold, dry mammoth-steppe mosaics: low sedge and grass carpets, long photoperiod swings, and predictable green-up at snowmelt.",
        "The habitat readout is open cold plains plus walkable bridges between forage, tied to treeline movement."
      ]
    },
    whatif: {
      zh: {
        q: "如果没有人类猎捕，气候变暖和森林扩张仍会改变猛犸象的食物与迁徙空间。你认为哪项影响更重要？",
        hint: "选择一个方向，比较不同因素的作用：",
        options: [
          { label: "气候变暖和森林线北推", fb: "草原让位于灌丛/针叶林时，高体型象类可食生物量与开阔视野会改变。" },
          { label: "疾病与近交在晚期种群", fb: "小种群遗传与病原体在历史档案中常难区分，本卡不给出定量结论。" },
          { label: "多种因素交织", fb: "古DNA 与年代学显示多重冲击可能叠加；这里用于引导讨论，并非给出最终判定。" }
        ]
      },
      en: {
        q: "Without human hunting, warming steppe retraction can still change forage and migration windows—what non-human stress do you foreground?",
        hint: "Illustrative fork, not a forecast:",
        options: [
          { label: "Treeline and shrub encroachment", fb: "Grass yields and sightlines shift as biomes creep north." },
          { label: "Disease / inbreeding on small late herds", fb: "Hard to separate in the record; the card remains qualitative." },
          { label: "Stacked multiple drivers", fb: "Ancient DNA and chronologies often show compounding pressures—this is a discussion prompt." }
        ]
      }
    }
  },
  "Raphus cucullatus": {
    mood: "tropical-island",
    habitat: {
      zh: [
        "渡渡鸟生活于毛里求斯近岸低地森林：榕属与棕榈林下落叶层、开阔林间空地，与岛屿特有的植物群落相伴。",
        "档案所呈现的「栖息地」是海风吹拂的林缘、倒木与果实季节律，而不是单一标本柜里的形象。"
      ],
      en: [
        "Dodos used Mauritian lowland forest—fallen fruit, palm fringes, and humid understory mosaics unique to the island's flora.",
        "The habitat readout is sea breeze, seasonally pulsing fruit, and forest floor light, not a cabinet specimen alone."
      ]
    },
    whatif: {
      zh: {
        q: "如果没有外来动物入侵和直接捕杀，渡渡鸟是否可能在毛里求斯继续生存更久？",
        hint: "选择一个情境，比较岛屿生态中的不同风险：",
        options: [
          { label: "控制外来食卵与食苗动物", fb: "可减少巢与幼苗压力，但飓风、干旱与极小规模仍存风险。" },
          { label: "只减少捕猎、不管理入侵者", fb: "入侵物种压力可能单独足以压制繁殖成功率。" },
          { label: "岛屿系统高度不确定", fb: "岛屿灭绝往往多因叠加，本卡鼓励讨论而非定案。" }
        ]
      },
      en: {
        q: "Without pigs, rats, macaques, and direct harvest, could dods persist for more centuries in lowland forest?",
        hint: "Pick a branch (educational):",
        options: [
          { label: "Control egg/seed predators", fb: "Less nest and seedling loss, but storms and small population risk remain." },
          { label: "Hunting down, invasives up", fb: "Invasives alone can suppress recruitment even with less hunting." },
          { label: "Island systems stay uncertain", fb: "Islands often face stacked drivers; this card prompts discussion, not verdicts." }
        ]
      }
    }
  }
};

function moodFromSpecies(sp) {
  const c = String(sp.category || "").toLowerCase();
  const r = String(sp.region || "").toLowerCase();
  if (r.includes("毛里求斯") || r.includes("mauritius") || r.includes("hawaii") || r.includes("夏威夷"))
    return "tropical-island";
  if (c.includes("fish") || r.includes("river") || r.includes("海") || r.includes("水"))
    return "river-blue";
  if (c.includes("bird")) return "temperate-forest";
  if (c.includes("megafauna") || c.includes("mammal")) {
    if (r.includes("北美") || r.includes("north america") || r.includes("南美")) return "grassland";
    if (r.includes("欧亚") || r.includes("西伯利亚") || r.includes("europe") || r.includes("eurasia"))
      return "tundra";
  }
  return "generic";
}

function genericHabitatCopy(sp, zh) {
  const place = String(sp.region || (zh ? "它活动的那一片" : "its range"));
  if (zh) {
    return [
      `档案记录显示，它大致生活在「${place}」一带。这里的“栖息地”指它获取食物、繁殖和躲避风险所依赖的自然环境。`,
      "本页提供的是帮助理解的概念图景，不代替野外调查。若需进一步核对，可查看下方的灭绝原因与外部资料链接。"
    ];
  }
  return [
    `Using the recorded range (${place}), picture habitat as a connected seasonal mosaic of forage, cover, and water—not a point on the map alone.`,
    "This panel is a visual anchor for memory and follow-up: compare extinction drivers with distribution portals below."
  ];
}

function genericWhatIf(sp, zh) {
  const name = displayName(sp, zh);
  if (zh) {
    return {
      q: `如果没有大规模猎捕、建设和土地开发，${name} 的处境可能会怎样变化？`,
      hint: "选择一个情境，理解不同因素如何影响物种存续：",
      options: [
        {
          label: "可能延续更久",
          fb: "气候、竞争和疾病仍会造成压力，但更完整的栖息地通常能提高种群维持的机会。"
        },
        {
          label: "仍然可能脆弱",
          fb: "即使人类压力减轻，小种群也可能受极端天气、疾病或遗传多样性下降影响。"
        },
        {
          label: "资料不足以判断",
          fb: "许多历史记录并不完整，因此这里更适合作为研究与课堂讨论的起点，而不是确定结论。"
        }
      ]
    };
  }
  return {
    q: `Without direct harvest, large-scale conversion, and other major human pressures, which trajectory seems most plausible for ${name}?`,
    hint: "Illustrative branches, not a single 'correct' answer.",
    options: [
      {
        label: "More likely to persist with climate and resource wobble",
        fb: "Non-human drivers (climate, competition, disease) still vary; connectivity can raise persistence relative to a fragmented baseline (qualitative)."
      },
      {
        label: "Still vulnerable in small or isolated groups",
        fb: "Inbreeding, climate shocks, or chance events can hurt small populations even without direct human take."
      },
      {
        label: "Not enough in the record to call",
        fb: "Paleo and historical archives are incomplete; treat this as a prompt for research and class discussion, not a forecast."
      }
    ]
  };
}

export function getWhatIfForSpecies(sp) {
  const o = OVERRIDES[sp.scientific_name];
  if (o?.whatif) {
    return {
      mood: o.mood || moodFromSpecies(sp),
      ...o
    };
  }
  const zh = (localStorage.getItem("ea-lang") || "zh") === "zh";
  return {
    mood: moodFromSpecies(sp),
    habitat: { zh: genericHabitatCopy(sp, true), en: genericHabitatCopy(sp, false) },
    whatif: { zh: genericWhatIf(sp, true), en: genericWhatIf(sp, false) }
  };
}

function lang() {
  return localStorage.getItem("ea-lang") || localStorage.getItem("xr-lang") || "zh";
}

/**
 * 类型化「真实感」生境对图（Unsplash 示意图库，非同一地点/非测绘；离线或失败时由 CSS 渐变兜底）。
 * reality：偏受扰、开发或单维度景观；counter：偏连续、健康生境网络想象。
 */
const HABITAT_PHOTO_BY_MOOD = {
  "temperate-forest": {
    reality: "https://images.unsplash.com/photo-1500382017468-9049fed42ef0?w=1600&auto=format&fit=crop",
    counter: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&auto=format&fit=crop"
  },
  grassland: {
    reality: "https://images.unsplash.com/photo-1501594907352-04cda38eaa29?w=1600&auto=format&fit=crop",
    counter: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&auto=format&fit=crop"
  },
  tundra: {
    reality: "https://images.unsplash.com/photo-1511593358241-7eea1f3c85e5?w=1600&auto=format&fit=crop",
    counter: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&auto=format&fit=crop"
  },
  "tropical-island": {
    reality: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop",
    counter: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1600&auto=format&fit=crop"
  },
  "river-blue": {
    reality: "https://images.unsplash.com/photo-1520996306703-b600436edd9?w=1600&auto=format&fit=crop",
    counter: "https://images.unsplash.com/photo-1546026423-464eb6182423?w=1600&auto=format&fit=crop"
  },
  generic: {
    reality: "https://images.unsplash.com/photo-1500382017468-9049fed42ef0?w=1600&auto=format&fit=crop",
    counter: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&auto=format&fit=crop"
  }
};

const HABITAT_PHOTO_OVERRIDES = {
  "Ectopistes migratorius": {
    reality: "https://images.unsplash.com/photo-1500382017468-9049fed42ef0?w=1600&auto=format&fit=crop",
    counter: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&auto=format&fit=crop"
  },
  "Corvus hawaiiensis": {
    reality: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop",
    counter: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1600&auto=format&fit=crop"
  }
};

function getHabitatPhotoPair(mood, scientificName) {
  if (HABITAT_PHOTO_OVERRIDES[scientificName]) return HABITAT_PHOTO_OVERRIDES[scientificName];
  return HABITAT_PHOTO_BY_MOOD[mood] || HABITAT_PHOTO_BY_MOOD.generic;
}

function buildHabitatCompareSceneHtml(mood, regionDisplay, scientificName, zh) {
  const { reality, counter } = getHabitatPhotoPair(mood, scientificName);
  const capR = zh
    ? "示意：人类使用较强、栖息地较破碎"
    : "More like: heavily used, patchy landscapes";
  const capC = zh
    ? "示意：人类干扰较弱、自然区域更连通"
    : "More like: less human pressure, more connected nature";
  const foot = zh ? "图库示例，非同一地点对比" : "Two stock photos, not the same place—illustration only";
  const handleErr = "this.closest('.xr-habitat-bg').classList.add('is-fb')";
  const regLabel = zh ? "档案里写的地区" : "Range in data";
  return `
    <div class="xr-habitat-compare-reality">
      <div class="xr-habitat-bg habitat-fb--${esc(mood)}" data-side="reality">
        <img class="xr-habitat-img xr-habitat-img--reality" src="${reality}" alt="" loading="eager" decoding="async" onerror="${handleErr}"/>
        <div class="xr-habitat-fallback" aria-hidden="true"></div>
        <div class="xr-habitat-graded xr-habitat-graded--reality" aria-hidden="true"></div>
        <p class="xr-habitat-pill">${esc(capR)}<span class="xr-habitat-pill-foot">${esc(foot)}</span></p>
      </div>
    </div>
    <div class="xr-habitat-compare-if" id="xr-habitat-if-layer" style="opacity:0.25">
      <div class="xr-habitat-bg habitat-fb--${esc(mood)}" data-side="counter">
        <img class="xr-habitat-img xr-habitat-img--counter" src="${counter}" alt="" loading="eager" decoding="async" onerror="${handleErr}"/>
        <div class="xr-habitat-fallback" aria-hidden="true"></div>
        <div class="xr-habitat-graded xr-habitat-graded--counter" aria-hidden="true"></div>
        <p class="xr-habitat-pill xr-habitat-pill--soft">${esc(capC)}<span class="xr-habitat-pill-geo"> ${esc(
          regLabel
        )}：${esc(regionDisplay)}</span></p>
      </div>
    </div>
  `;
}

export function buildWhatIfSectionHtml(sp) {
  const pack = getWhatIfForSpecies(sp);
  const zh = lang() === "zh";
  const w = zh ? pack.whatif.zh : pack.whatif.en;
  const head = zh
    ? "如果人类影响较小？"
    : "What if we hadn’t changed nature so much?";
  const opts = w.options
    .map(
      (o, i) => `
    <button type="button" class="xr-whatif-choice" data-idx="${i}">${esc(o.label)}</button>
    `
    )
    .join("");
  const feedbacks = w.options
    .map(
      (o, i) => `<p class="xr-whatif-fb" data-idx="${i}" hidden>${esc(o.fb)}</p>`
    )
    .join("");

  return `
    <div class="xr-card-whatif" data-species="${esc(sp.scientific_name)}">
      <p class="xr-whatif-head">${esc(head)}</p>
      <p class="xr-whatif-q">${esc(w.q)}</p>
      <p class="xr-whatif-hint">${esc(w.hint)}</p>
      <div class="xr-whatif-choices" role="group" aria-label="${esc(head)}">${opts}</div>
      <div class="xr-whatif-fbwrap">${feedbacks}</div>
    </div>
  `;
}

export function wireWhatIfSection(root) {
  const wrap = root.querySelector(".xr-card-whatif");
  if (!wrap) return;
  const choices = wrap.querySelectorAll(".xr-whatif-choice");
  const fbs = wrap.querySelectorAll(".xr-whatif-fb");
  choices.forEach(btn => {
    btn.addEventListener("click", () => {
      const i = btn.getAttribute("data-idx");
      choices.forEach(b => b.classList.toggle("is-selected", b.getAttribute("data-idx") === i));
      fbs.forEach(p => {
        p.hidden = p.getAttribute("data-idx") !== i;
      });
    });
  });
}

/** 物种页「反思」卡片用：与资料卡同源的「若无人类」主问句 */
export function getWhatIfQuestionForPage(sp) {
  const pack = getWhatIfForSpecies(sp);
  const zh = lang() === "zh";
  const w = zh ? pack.whatif.zh : pack.whatif.en;
  return w.q;
}

export function getHabitatForSpeciesPage(sp, regionLine) {
  const pack = getWhatIfForSpecies(sp);
  const zh = lang() === "zh";
  const mood = pack.mood || moodFromSpecies(sp);
  const regionDisplay =
    (typeof regionLine === "string" && regionLine.trim()) ||
    (sp.region && String(sp.region).trim()) ||
    (zh ? "未标注地区" : "Region n/a");
  let paragraphs;
  if (pack.habitat?.zh) {
    paragraphs = zh ? pack.habitat.zh : pack.habitat.en;
  } else {
    paragraphs = zh ? genericHabitatCopy(sp, true) : genericHabitatCopy(sp, false);
  }
  return {
    mood,
    title: zh ? "它曾经生活在什么样的地方？" : "What its home was like (plain notes)",
    paragraphs,
    regionDisplay,
    compareSceneHtml: buildHabitatCompareSceneHtml(mood, regionDisplay, sp.scientific_name, zh)
  };
}
