# BDC 2026 — Extinction Archive (Chronobiology / Temporal Niche)

**Team:** 2 members | **Build scope:** Web-only (no living biosensor demo)  
**Core angle:** Palaeo-chronobiology + temporal niche reconstruction via WebXR + generative environments + epistemic UI  
**Target prizes:** Biodigital Excellence; Narrative / Context / Reflection strengths

## Execution strategy — 重内容、轻装置 (agreed)

**Principle:** Redirect all limited bandwidth away from hardware you cannot ship, and into **deep scientific storytelling** + **honest technical reflection**. Installation stays **minimal**—only what supports comprehension and judging (e.g. one printed/affordable tactile anchor + QR), not a second build track.

**English:** *Heavy on evidence-linked narrative, epistemic transparency, and ethics; light on physical apparatus.*  
**中文：** *把精力集中在「有据的节律叙事」「不确定度与 AI 边界的诚实交代」「语境与伦理」；装置只做能帮他们理解 WebXR 入口的最低配套，不做第二条生产线。*

**Non-goals (explicit):** Custom sensors, live bioelectric demos, projection-mapped dioramas, multi-piece AR hardware setups—unless time collapses to zero for narrative/reflection, do not reopen these.

---

### Content priorities (invest here) / 内容投入清单

| Track | What “done” looks like |
|--------|-------------------------|
| **Scientific narrative depth** | Per species: **parameter card** (photoperiod, cited clock/morph claims, confidence); **scene-to-citation map** (each VR beat → 1+ source); **plain-language** “why time matters” thread in talk + UI |
| **Honest technical reflection** | **3 epistemic layers** always visible: *Cited / Model-interpolated / Speculative*; **tooling disclosure** (which models, prompts constrained how, known failure modes); **“what we still don’t know”** panel per species; optional **user reflection** capture for process documentation (Reflection rubric) |
| **Context upgrade** | De-extinction: **funding vs. conservation**, **ecological novelty risk**, **Indigenous sovereignty / TEK**—each with **named sources**; state **limits of your claims** |

### Physical presence — minimum viable / 实体最低配

**Purpose:** Meet BDC’s “physical model encouraged” without competing with the WebXR build.

- **One** tactile anchor (print, cast, small footprint card, or cheap surrogate) + **QR / short URL** to the experience.  
- Optional: **one** tall postcard or A3 **“scene → citation”** cheat sheet for judges during Q&A—not a second art installation.

---

## Step 1 — Map Interests and Skills / 兴趣与技能地图

| Role | Focus |
|------|--------|
| **Member A — Experience Lead** | Narrative & sensory direction; translating palaeo-chronobiology for a public experience; critical narrative; ethics oversight |
| **Member B — Tech/AI Lead** | Digital spatial design; WebXR (A-Frame / Three.js); generative landscapes; uncertainty / epistemic UI |

**Project thesis / 项目核心视角:** Merge **chronobiology** with **temporal niche** to reconstruct how extinct species lived inside **cycles of day, season, and environment**—not only their static anatomy.

---

## Step 2 — Find Overlaps / 交集句

**Core proposition / 核心命题:**  
*If we use **generative AI + WebXR** to **reconstruct and visualize** the **temporal phenotype** of extinct species, can we address **the human gap in sensing extinction**—the loss of another species’ **time** in the world, not only its image?*

---

## Step 3 — Stress-test vs. BDC Rubric / 压力测试 (self-scores 1–3)

| Dimension | Score | Notes |
|-----------|-------|--------|
| **Narrative** | **3** | Strengthen beat: **discover rhythm → feel loss → ethical fork**. Rehearse Q&A so chronobiology reads as **emotion**, not lecture. |
| **Concept** | **3** | **Time** as the design spine (not “fancy 3D clone”). Judges: tie every scene to **one cited proxy** (gene, orbit, photoperiod). |
| **Context** | **2** | **Upgrade plan:** de-extinction **resource trade-offs**, **ecological risk** (invasive / novel ecosystem effects), **Indigenous sovereignty & TEK**—cite sources; avoid token one-liners; name what you **did not** claim after community consultation (if any). |
| **Reflection** | **2.5 → 3** | **Epistemic UI** must be **interactive** (toggle evidence / inference), not footnotes; log **user reflection** optional but good for documentation. |

---

## Step 4 — Research Sprint / 生物学冲刺 (locked species)

| Species | Biology focus | Digital translation (examples) |
|---------|----------------|--------------------------------|
| **Woolly mammoth** | **Mammoth-specific changes in circadian-related genes** (Lynch et al., 2015) + Arctic photoperiod analogy (Lu et al., 2010) | Season slider: polar day/night; UI avoids naming *PER2* until sentence-level confirmation in primary PDF |
| **Thylacine** | Bony orbit → diel activity / low-light **Umwelt** (cite orbit–DAP methods; verify) | Visual filter / resolution model tied to **published morphological proxies**, not generic “night vision” |

**Decision / 决策:** Depth on **these two only**—no third species for v1.

### Required citations — slots filled (DOI / ISBN) / 必引文献槽位（已填标识符）

**How to use:** Keep `[x]` only after **PDF read + claim check**. If a verification note below applies, fix on-screen copy before tagging as **Cited**.

#### Literature verification log / 核验备忘（必读）

| Slot | Issue | Resolution (2026-04 audit) |
|------|--------|------------------------------|
| **M1** | **PER2** variant count / gene-specific wording in Lynch et al. (2015) | **Cursor 未能在本环境中打开 Elsevier 全文 / 补充表。** PubMed 摘要仅确认 **circadian biology 等功能富集**与 **TRPV3** 实验。**已采用保守 UI 文案**（见 `Scene_Bio_01`）。若课程周内有全文权限，可再搜全文 “PER2”；在此之前 **不得** 写具体 *PER2* 突变数目。 |
| **M4** | `10.1101/151746` is **bioRxiv** (preprint). **TRPV3** functional mammoth–elephant contrast is also in **Lynch et al. (2015)** (peer-reviewed). | Prefer **Lynch et al., 2015** for jury-safe *TRPV3* claims; use **Kim et al., 2017** as optional structural detail + label **preprint** in epistemic UI. |
| **T2** | Mass & Supin **2025** DOI 多版本无法在 Crossref 可靠解析。 | **已改为可验证的出版 PDF：** Mass & Supin **(2020)** 瓶鼻海豚视网膜 RGC 拓扑与分辨率，**同一作者方法谱系**，DOI [10.31857/S0002332920060107](https://doi.org/10.31857/S0002332920060107)，[Publisher PDF](https://sciencejournals.ru/issues/izvbio/2020/vol_2020/iss_6/IzvBio2006010Mass/IzvBio2006010Mass.pdf)。Scene_POV_01 仍为 **Interpolated**（非袋狼实测）。若日后找到 2025 文，可在 epistemic 层并列更新。 |
| **T5** | Clements (2025) + Palawa-first sourcing | 已增 **Palawa 主导 / 相关**补全文献与 `UI_Indigenous_Context` 文案；Clements 作学术交叉引用，**不**替代原住民第一声音。 |

---

#### Species A — Woolly mammoth (*Mammuthus primigenius*) — polar rhythm & cold

| # | 建议主题 | 选定文献（短引文） | DOI / ID | 对应分镜 / 界面 ID | Tier |
|---|----------|-------------------|----------|-------------------|------|
| M1 | 比较基因组 / 节律相关通路 | Lynch et al., 2015 | [10.1016/j.celrep.2015.06.027](https://doi.org/10.1016/j.celrep.2015.06.027) · PMID [26146078](https://pubmed.ncbi.nlm.nih.gov/26146078/) | `Scene_Bio_01` | Cited |
| M2 | 极地节律弱化类比 | Lu et al., 2010 | [10.1016/j.cub.2010.01.042](https://doi.org/10.1016/j.cub.2010.01.042) | `Scene_Environment_02` | Interpolated |
| M3 | 高产草原 / 猛犸草原生境 | Zimov et al., 2012 | [10.1016/j.quascirev.2012.08.004](https://doi.org/10.1016/j.quascirev.2012.08.004) | `Scene_Landscape_01` | Cited |
| M4 | 冷觉与毛发生长 (*TRPV3* 等) | Kim et al., 2017 (bioRxiv) | [10.1101/151746](https://doi.org/10.1101/151746) | `Scene_Sensory_01` | Cited* |
| M5 | 去灭绝伦理 / 资源与生态权衡 | Sherkow & Greely, 2013 | [10.1126/science.1236946](https://doi.org/10.1126/science.1236946) | `UI_Ethics_Fork` · `UI_Reflection_Log` | Cited |

\*M4: disclose preprint status; anchor core *TRPV3* phenotype to **Lynch et al., 2015** when possible.

#### Species B — Thylacine (*Thylacinus cynocephalus*) — crepuscular vision & colonial context

| # | 建议主题 | 选定文献（短引文） | DOI / ID | 对应分镜 / 界面 ID | Tier |
|---|----------|-------------------|----------|-------------------|------|
| T1 | 眶径与昼夜活动型 | Pozniak et al., 2018 | [10.1002/ar.23910](https://doi.org/10.1002/ar.23910) | `Scene_Bio_02` | Cited |
| T2 | 视网膜 / RGC 拓扑方法（外推至陆生哺乳类视觉隐喻） | Mass & Supin, 2020 | [10.31857/S0002332920060107](https://doi.org/10.31857/S0002332920060107) · [PDF](https://sciencejournals.ru/issues/izvbio/2020/vol_2020/iss_6/IzvBio2006010Mass/IzvBio2006010Mass.pdf) | `Scene_POV_01` | Interpolated |
| T3 | 灭绝史与行为记录 | Paddle, 2000 | ISBN `9780521782196` (Cambridge Univ. Press) | `Scene_Context_01` | Cited |
| T4 | 人为干扰 / 赏金与栖息地 | Sleightholme & Campbell, 2016 | [10.1080/00222933.2016.1217037](https://doi.org/10.1080/00222933.2016.1217037) | `Scene_Context_01` · `UI_Ethics_Fork` | Cited |
| T5 | 文化主权 / 殖民与复活叙事 | Clements, 2025 | [10.1177/13534858251272203](https://doi.org/10.1177/13534858251272203) | `UI_Indigenous_Context` | Context |

**Checklist — 文献审核状态 (toggle after PDF pass)**  
M1 [x] · M2 [ ] · M3 [ ] · M4 [ ] · M5 [ ] · T1 [ ] · T2 [x] · T3 [ ] · T4 [ ] · T5 [ ]  

- **M1 [x]:** 保守文案已锁定（无全文则不提 *PER2* 具体变异）。  
- **T2 [x]:** DOI + Publisher PDF 已核对可访问（Mass & Supin 2020）；仍为 **Interpolated** 用于袋狼 POV。

---

### Storyboard — interaction notes + on-screen tags / 分镜交互说明与短引文挂载

Use these strings **in Figma / doc / WebXR comments** and mirror the **short tag** in the epistemic panel when that scene loads.

| ID | Interaction / 交互说明 | On-screen tag (short) / 角标 |
|----|-------------------------|------------------------------|
| `Scene_Bio_01` | **Locked copy (EN):** *“Woolly mammoths carry **mammoth-specific amino-acid changes enriched in circadian-related genes** among other Arctic adaptations (Lynch et al., 2015).”* **Do not** state *PER2* counts until verified in primary PDF.**中文：** 「猛犸象基因组相对现生象，存在**与昼夜节律相关的基因类别**中的猛犸特异氨基酸改变（Lynch et al., 2015）。」**勿写** *PER2* 具体突变数。 | (Lynch et al., 2015) |
| `Scene_Environment_02` | **Interpolated:** Polar day/night scrub; copy explains reindeer “molecular clock attenuation” as **analogical** support for how high-latitude life decouples from strict 24h entrainment—not a mammoth measurement. | (Lu et al., 2010) · **Interpolated** |
| `Scene_Landscape_01` | Vegetation density / productivity tied to **mammoth steppe** / savanna-like pulse; constrain generative prompts with Zimov parameters (seasonal productivity), not fantasy jungle. | (Zimov et al., 2012) |
| `Scene_Sensory_01` | Cold / thermo narrative: *TRPV3* mammoth substitution → altered temperature sensitivity & hair-associated phenotypes; **cite Lynch 2015 for validated channel**; Kim 2017 as **preprint** detail if used. | (Lynch et al., 2015); optional (Kim et al., 2017) |
| `Scene_Bio_02` | Skull / orbit measurement beat → **crepuscular or nocturnal** predation niche; no overstated “night vision” without Interpolated flag. | (Pozniak et al., 2018) |
| `Scene_POV_01` | **Interpolated:** 依据 **Mass & Supin (2020)** 对哺乳动物视网膜 **RGC 拓扑与分辨率** 的方法与结论，**隐喻式**强化运动/对比线索；**非**袋狼视网膜实测。示例句：*“POV 运动—对比强调借鉴 Mass & Supin (2020) 的 RGC 分布模型（海豚物种）；袋狼仅为推演。”* **WebXR 外链：** [DOI](https://doi.org/10.31857/S0002332920060107) · [Publisher PDF](https://sciencejournals.ru/issues/izvbio/2020/vol_2020/iss_6/IzvBio2006010Mass/IzvBio2006010Mass.pdf) | (Mass & Supin, 2020) · **Interpolated** |
| `Scene_Context_01` | Historical behaviors, habitat, hunting; layer Sleightholme for **bounty / land-use** after Paddle baseline. | (Paddle, 2000); (Sleightholme & Campbell, 2016) |
| `UI_Indigenous_Context` | 见下文 **「T5 殖民暴力与生态记忆」** 文案 + Palawa 补全文献表。 | (Clements, 2025); Schlunke (2025); Rimmer (2020); Lehman (2013) |
| `UI_Ethics_Fork` | **Resource sliders** (e.g. de-extinction vs. field conservation; legal personhood of “products”; ecosystem risk) scripted from **Sherkow & Greely (2013)** tensions—each slider footnoted to a clause or theme from the paper, not generic sci-fi. | (Sherkow & Greely, 2013) |
| `UI_Reflection_Log` | User short reflection + team **limits**: aDNA, protein folding, circadian phenotype uncertainty; cross-link to Sherkow for **why trade-offs matter**. | (Sherkow & Greely, 2013); team process |

**`UI_Ethics_Fork` — Sherkow & Greely–aligned prompts (draft copy hooks)**  
- *“Should public funding prioritize laboratory de-extinction or **in situ** conservation of extant species and landscapes?”*  
- *“If a revived lineage is legally novel, who bears liability for **ecological harm**?”*  
- *“Does revival rhetoric repeat extractive relationships to **Country** and Indigenous governance?”* (bridge from Clements / separate Palawa sources)

---

### T5 — `UI_Indigenous_Context` copy / 殖民暴力与生态记忆（袋狼档案）

**参考 Clements (2025) 的论证轴：** 去灭绝话语不仅是实验室技术，也可能延续 **殖民暴力之后果**——包括对 **Country（lutruwita / 塔斯马尼亚土地与水系）** 的关系性伤害与对灭绝的政治性遗忘。袋狼的消失与殖民开拓、赏金与土地剥夺 **同一历史织物**；将袋狼仅当作“可复活图标”，可能 **遮蔽** 这段交织史。

**介绍文案（中，可置于 UI 首屏）：**  
「袋狼的灭绝不是孤立的‘自然事件’，而是与殖民开拓、土地剥夺与针对 Palawa 人民的暴力相互缠绕。今天关于‘复活’的讨论，同样牵动 **谁有权定义生命、记忆与责任**——这是 **文化主权** 问题，而不只是基因问题。」

**English (subtitle option):**  
*Thylacine extinction is entangled with colonial violence against Palawa peoples and Country. De-extinction discourse raises questions of **cultural sovereignty**—who defines life, memory, and responsibility—not genetics alone.*

#### Palawa-led / Palawa-centred supplementary sources / 原住民主导或中心文献补全

| 文献 | 说明 | 稳定链接 / ID |
|------|------|----------------|
| **Rimmer, Z.** (2020). *palawa kani: Expressing the power of language in art and the museum context.* **Artlink** 40(2). **Pakana** 作者；语言、博物馆与殖民知识断裂。 | [artlink.com.au 文章页](https://www.artlink.com.au/articles/4846/palawa-kani-expressing-the-power-of-language-in-art-and-the-museum-context/) |
| **Lehman, G.** (2013). *Tasmanian Gothic.* **Griffith Review**（随笔；**Trawulwuy** / 塔斯马尼亚原住民学者；殖民景观与再现政治）。 | [griffithreview.com 文章](https://www.griffithreview.com/articles/tasmanian-gothic/) |
| **Schlunke, K.** (2025). *De-extinction and poetry.* **Cambridge Prism Extinct** 3:e14. 非原住民作者；明确将袋狼去灭绝与 **对 Indigenous peoples and country 的暴力** 并置，并列出 **Palawa 对袋狼的多种称谓**。 | DOI [10.1017/ext.2025.10008](https://doi.org/10.1017/ext.2025.10008) · [PMC12722039](https://pmc.ncbi.nlm.nih.gov/articles/PMC12722039/) |

**Use protocol:** 并置 **Clements + Schlunke** 作批判理论，**Rimmer + Lehman** 作 **Palawa 声音优先**层；界面脚注写明作者身份与局限。

---

### `UI_Reflection_Log` — WebXR 反思输入框代码模版

**路径:** [`templates/reflection-log-webxr.html`](templates/reflection-log-webxr.html)  

- 含 `<textarea>`、**本地** `localStorage` 暂存、以及基于关键词的 **文献伦理片段对照**（Sherkow & Greely 框架 + 项目交叉引用）。  
- **非** LLM：匹配规则可审计；适合答辩时解释「实时比对」= **启发式并列文献观点**。  
- 嵌入 A-Frame：可将该 HTML 作为 **2D overlay**（如 `a-entity` + `html` 组件或 iframe），置于体验结尾 `UI_Reflection_Log` 场景。

---

**Scene / UI ID index (compact) / 分镜索引**

| ID | Role |
|----|------|
| `Scene_Bio_01` | Mammoth: genomics / circadian |
| `Scene_Environment_02` | Mammoth: polar photoperiod (reindeer analogy) |
| `Scene_Landscape_01` | Mammoth: mammoth-steppe staging |
| `Scene_Sensory_01` | Mammoth: TRPV3 / cold sensation |
| `Scene_Bio_02` | Thylacine: orbit → diel activity |
| `Scene_POV_01` | Thylacine: POV (RGC model, Interpolated) |
| `Scene_Context_01` | Thylacine: history + drivers |
| `UI_Indigenous_Context` | Sovereignty / colonial critique |
| `UI_Ethics_Fork` | Resource & legal / ecological trade-offs |
| `UI_Reflection_Log` | Limits + user reflection |

**Completion rule / 完成规则:** All **10** checklist boxes `[x]` after PDF read; every **Storyboard** row shows the **same** tag in the shipped WebXR epistemic strip; **M2** and **Scene_POV_01** always display **Interpolated**.

---

## Step 5 — Bio + Digital Split / 生物与数字层自检 (web-only)

**Biology layer (non-negotiable):** Daylight regimes, chronobiology proxies, sensory ecology **anchored in papers**. Narrative climax: **stewardship of extant biodiversity** (de-extinction as a **decision space**, not a sales pitch).

**Digital layer (non-negotiable):** WebXR scene graph; generative 360°/6DoF-adapted environments **constrained** by paleo-environment proxies; **sonification** of phase (day/night, season); **epistemic UI** separating measured vs. inferred vs. imagined.

**Red lines / 红线:** No purely ornamental AI vistas—every shot maps to **a data column** (even if that column is “unknown → band of uncertainty”).

**Living-sensor note:** You are **not** doing wet-lab or live bioelectric demo; **replace** that strand with: (1) **comparison to extant relatives / ecosystems** in copy + UI, (2) optional **ambient data** from **public APIs** (e.g. daylight API for user’s locale vs. species paleo-lat) if time permits—clearly labeled, not “biosensor.”

---

## Step 6 — Concept Narrative / 概念叙事 (~200 字电梯演讲)

**[Problem 问题]** 物种灭绝不仅是 DNA 的丢失，更是生态系统中独特“节律”的永久断裂；人类对消失物种往往只有扁平图像，缺乏对其“怎样活在时间里”的感知，形成一种结构性遗忘。

**[Insight 洞见]** 古生物钟学让我们能把极地光照季节、钟基因与骨骼视觉代理转译成可讨论的 **时间生态位**——灭绝也是 **共生时间的抹去**。

**[Solution 方案]** 《灭绝档案》是基于 WebXR 的沉浸式纪念馆：以文献为约束，用生成式环境与音化呈现猛犸象的极地节律与袋狼的晨昏世界；并通过 **不确定度 UI** 标出证据、推演与想象的边界。

**[Impact 影响]** 在“去灭绝”技术话语面前，它把观众带回 **生命时间的不可逆**；伦理权衡界面引导人们从“复活奇观”转向对 **现生生物多样性** 的清醒守护。

*(Rewrite in your own voice for submission; 终稿须为你们本人的语气。)*

---

## Step 7 — Prototype & Deliverables / 原型与交付物

**Strategy:** **Content-first.** Physical piece is **single-anchor + QR** only; do not scope dioramas/projections unless narrative + epistemic UI + ethics are already solid.

| Deliverable | MVP (must ship) | Target | Stretch (if time) |
|-------------|-----------------|--------|-------------------|
| **Live demo (Summit)** | One species **“day arc”** in WebXR + **interactive** epistemic UI + ethics fork | **Both species** + **contrast** (polar vs. crepuscular **time shape**) | Extra mammoth season/latitude slice |
| **Narrative / science pack** | **Scene→citation** table + talking points for judges | 1-page **methods & limits** PDF (web + print) | Glossary slide of clock/orbit terms |
| **Visual system** | **3-layer** epistemic legend + data panel synced to scenes | Full type / color / motion | **One** judge-facing “evidence board” print |
| **Physical (minimal)** | **One** object or card + **QR → WebXR** | Same; nicer print finish | — *(no projection / no multi-part exhibit)* |
| **Video (1–5 min)** | Trailer: rhythm → **uncertainty** → ethics (not a talk recording) | Sonification + tighter edit; state AI role in credits | — |
| **Slides** | Each section maps to **Narrative · Concept · Context · Reflection** | Strong **Reflection** slide: biases, cuts, unknowns | — |

**MVP done when:** User completes **immersive interval → manipulates uncertainty layers → completes one ethical choice + short reflection** (text or optional localStorage stub).

---

## Step 8 — Build Sprint Plan / 4 周节奏 (2-person)

**Priority order if time crunches:** (1) epistemic UI + scene→citation, (2) ethics fork + Context copy, (3) second species, (4) sonification polish, (5) print collateral, (6) physical anchor procurement.

| Week | Phase | Member A | Member B |
|------|--------|----------|----------|
| **1** | Discovery | **Literature pack + scene→citation grid**; narrative beats; ethics draft | WebXR shell; routing; **epistemic UI wireframe** (3 toggles) |
| **2** | Prototyping | **Parameter tables** (mammoth clock claims; thylacine orbit→visual); plain-language tooltips | Time scrubber; generative pipeline **with constraint doc**; bind first citations to scenes |
| **3** | Integration | Sonification + ethics script; **Reflection** slide deck; **Q&A risk list** | Full epistemic layers + ethics UI; **methods/limitations** panel; perf pass |
| **4** | Polish | **10-min + 5-min Q&A** drills; **honest-AI / bias** talking points | Deploy; video capture; **order/print** single QR anchor + optional one-sheet |

**Buffer:** If Week 3 slips, **cut** stretch—not epistemic UI, ethics, or citation mapping.

---

## BDC Q&A — Likely prompts (prep bullets)

- **Is this biodesign without living matter?** *We design *with* biology as the constraint system: chronotype proxies from literature drive the experience; the “living” stake is **extant biodiversity** and honest limits of inference.*  
- **How do you prevent AI hallucination?** *Layers: cited → model-interpolated → speculative; nothing speculative without UI flag.*  
- **Indigenous / local knowledge?** *Name sources; state limits; do not claim community partnership unless real.*

---

## Risk register (web-only + content-first)

| Risk | Mitigation |
|------|------------|
| “Just a VR art piece” | **Scene→citation** grid + synced **data panel**; judges can **pause** and verify proxies |
| Ethics feels bolted-on | **Structural** fork after immersion; **named** trade-offs (funding, ecosystem novelty, justice) |
| Reflection reads shallow | Ship **interactive** epistemic layers + **explicit** AI/tool limits + “what we cut / got wrong” in talk |
| Scope creep into hardware | **Non-goals** locked; physical = **one** QR anchor + optional one-sheet |
| 4-week crush | Priority order above; feature freeze end of Week 3 |

---

*Strategy locked: 重内容、轻装置 — align dates with biodesignchallenge.org.*
