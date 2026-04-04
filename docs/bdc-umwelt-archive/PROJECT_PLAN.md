# Biodesign Challenge 2026 — Project Planning Document

## Extinction Archive / Umwelt Archive（集体记忆断裂）

**Canonical path in repo:** `docs/bdc-umwelt-archive/PROJECT_PLAN.md`  
**Document type:** Planning brief aligned with BDC finalist deliverables and judging criteria.  
**References:** [BDC Judging](https://biodesignchallenge.org/judging) · [Project Guidelines](https://biodesignchallenge.org/project-guidelines) · [Prizes](https://biodesignchallenge.org/prizes) · [Expert Consultants](https://biodesignchallenge.org/expert-consultants)  
**Exhibition context:** 2026 gallery theme *Convergent Life* · Summit June 11–13, NYC (Parsons + MoMA for Top 8).

> **Scope note:** This document supersedes the earlier mammoth-only MVP baseline in git history. **Hero species are locked to passenger pigeon + woolly mammoth** per team decision (2026-04-04).

---

## 1. Executive summary | 项目摘要

**One-sentence pitch (EN):**  
*Extinction Archive* is a biodigital memorial that lets visitors inhabit—critically and incompletely—the **Umwelt** of vanished species (passenger pigeon, woolly mammoth), turning peer-reviewed traces into a constrained immersive dossier, a **polyphonic mixer** of ecological rhythms, and an **ethics console** that lands collective memory back in real tradeoffs.

**中文摘要：**  
本项目以 **「物种灭绝—生态缺席」** 与 **「人类对生物多样性的集体记忆断裂」** 为伦理入口；**主命题**是借助可核查的古生态与古基因组证据，**重建（推断而非宣称复原）已灭物种的感官—时间世界（Umwelt）**。**辅命题**是社会记忆：档案如何既 **唤起共情** 又 **标明无知与推测边界**。体验由三大模块构成：**Species Dossier（电子档案）**、**Polyphony Mixer（多物种声景/节律混音）**、**Ethics Console（伦理抉择）**。物理层以 **3D 打印 + WebAR** 锚定物种身体性现场；可选 **活体—环境传感器** 作为「仍在场生态」的对照。**首要夺奖方向：** BDC Prize for **Biodigital Excellence**；辅：**Social Critique / Art**（依反思深度而定）。

---

## 2. Locked team decisions | 已定选项汇总

| Step | 决策 | 本项目锁定 |
|------|------|------------|
| 1 | 主命题 + 辅线 | **主 A**（Umwelt / 物种感知—时间世界）+ **辅 B**（人类对灭绝的社会记忆） |
| 2 | MVP 模块组 | **以组 1 为主**（Dossier + Mixer + Ethics）；**1–5 min 影片剪辑可采用组 3 节奏**（Ethics 压缩为结尾 ~2 min，强化电影感） |
| 3 | 评委追问「活体/生物在哪？」 | **话术 B**：核心是 **from biology** 的设计（古基因、形态代理、迁徙同位素、声学生态）；活体装置为 **增强对照**，非叙事实体 |
| 4 | 英雄物种 | **A：旅鸽（*Ectopistes migratorius*）+ 猛犸（*Mammuthus primigenius*）** |
| 4 | 嗅觉/味觉 MVP | **数字体验默认 A**（无合成气味管线，仅以文字/轻量 UI 暗示）；**实体侧可选 C**（象征性材质样本：苔原/草原植被触感、毛毡、木屑等，**非食物**；过敏与消防需审核） |
| 5 | AI 生成 | **以 B 为主**（diffusion + control / 强结构条件）；**以 A 为辅**（procedural + shader 负责结构、昼夜、大气与「科学可信」基底） |
| 5 | Living 信号 | **推荐 A**（见 §7） |
| 6 | Ethics 结尾 | **B 主**（分支卡片 → 解锁不同声景终曲）+ **C 辅**（进入深度抉择前需完成 **Cited / Modeled / Speculative** 分类小测） |
| 7 | AR | **A + B**：Mobile **WebAR** 为主路径 + **桌面 Web** 全功能演示（现场带备用录屏） |
| 7 | R 同位素 viz | **A + C**：**Dossier 科学页**内嵌图表；**slide / 网页**用 **ggplot2 等静态导出**（轻量、可审计） |
| 8 | 节奏 | **1 个月** 压缩冲刺：Discovery → Prototyping → Integration → Polish（见 §11)；若课程全学期更长，在同一框架上按周倍增 scope |

---

## 3. BDC alignment checklist | 与指南 / Guidebook 对齐

### 3.1 Required deliverables（ finalists 必做）

| 交付物 | 本项目绑定资产 | 负责人 |
|--------|----------------|--------|
| **10 min 口头陈述 + 5 min Q&A** | 叙事结构见 §8；附 **Methods + Citations** 备用幻灯片 | TBD |
| **视觉渲染与图解** | Dossier UI、Mixer、Atlas 草图、关键帧、**不确定性**可视化语言 | TBD |
| **实体模型或原型（强烈建议）** | 旅鸽/猛犸 **3D 打印**（骨/牙/抽象形态）+ **AR 触发**；Living 小台 | TBD |
| **1–5 min 项目视频** | **创意预告片**（非演讲录像）：英雄物种一日 + Mixer 高潮 + **Ethics 转折**（组 3 节奏） | TBD |
| **PPT / Keynote → Google Drive** | 主叙事 deck + **附录：证据卡、引用、局限** | TBD |

### 3.2 Judging criteria（四维，各 4 分制；铂金需四维 ≥2.75）

| 维度 | 我们如何把分拿满 | 风险与对策 |
|------|------------------|------------|
| **Narrative** | 清晰「地图点→档案→混音→伦理」动线；实体+影像同步 | 避免技术罗列；彩排计时 |
| **Concept** | Umwelt + 时间生态位 + 双物种对照；Biodigital 双轨 **缺一不可** | 防「物种 Spotify」：每层绑定 **文献字段** |
| **Context** | de-extinction、资源分配、**误信息/感伤消费**自省；安全与双用途 | Ethics Console 必须输出 **可解释后果** |
| **Reflection** | Prompt 迭代日志、弃用方案、**三档证据标签**、专家顾问反馈记录 | UI **禁止**将推测呈现为事实 |

### 3.3 Prize targeting

- **Primary:** **BDC Prize for Biodigital Excellence**（生物证据 × 数位交互硬耦合）。  
- **Secondary (optional):** **Outstanding Social Critique**（若原住民/正义维度在 Ethics 中有 **引用级** 处理，而非表演性提及）。  
- **DNA Futures:** 仅在猛犸 **clock / 适应性基因**叙事可 **逐个引用到论文** 时作为 **slide 副线**，非主 slogan。

---

## 4. Concept architecture | 概念与信息架构

### 4.1 主—辅命题（Step 1）

- **主 A（Umwelt）：** 用户进入的是 **「由证据约束的感知假设空间」**，而非魔幻复活。  
- **辅 B（社会记忆）：** 文案与结构强调 **缺席**（dossier 中的空白字段、静音层、故意 incomplete 的声景）。

### 4.2 三大模块（Step 2 — 组 1 为核心）

1. **Species Dossier**  
   - 双物种独立档案页：**时间（昼夜/季节）**、**运动（迁徙/集群）**、**感官代理（眼眶、内耳、嗅相关形态或基因—谨慎表述）**。  
   - **三档标签** 全局一致：`Cited` · `Modeled` · `Speculative`。  
   - **360° / 沉浸场景**：以 **B（diffusion+条件）** 生成氛围层，**A（shader/procedural）** 绑定光照、雾、地平线、地表结构与昼夜周期。

2. **Polyphony Mixer**  
   - 将 **节律、季节、集群密度阈值、叫声重建（不确定性）** 映射为 **Web Audio** 多层轨道。  
   - **旅鸽：** 同步性、密集群体、「羽影日食」隐喻—**混音冲突=生态挤压**。  
   - **猛犸：** 长周期迁徙、极端光周期—**低频节奏 + 空间移动 pan**。

3. **Ethics Console**  
   - **C 辅：** 进入前 **3–5 道**「证据分类」交互（拖曳陈述到 Cited/Modeled/Speculative）。  
   - **B 主：** **不可全选的分支卡片**（资源、技术路径、社群、土地）；每张选择 **重混终曲**（静音/嘈杂/单一主导种）并 **1 句话系统后果**（规则 + 轻量 LLM 可读性润色，**事实约束用规则**）。

### 4.3 Atlas（非 MVP 必需，可为 Phase 2）

- **桌面 Web 可含简化版**：以「最后栖息地坐标 + 时间」点位呈现；全星球缩放为 **stretch**。

---

## 5. Bio + Digital system table | 生物层与数字层系统表

| 输出 | 生物层输入（须可追溯） | 数字层处理 | UI 披露 |
|------|------------------------|------------|---------|
| 昼夜/季节光环境 | 光周期文献、纬度、古气候 proxy | 程序化太阳路径 + 体积雾参数 | Modeled |
| 迁徙/移动叙事 | 猛犸牙同位素轨迹（公开研究）；旅鸽历史分布与生态 | R → 静态图 + 摘要进入 Dossier；驱动 Mixer 节奏 | Cited → viz |
| 视觉「物种眼中」 | 眼眶/活动节律形态学文献；近缘种对比 | Shader 锐利度、对比、色差；diffusion 仅作纹理/远景 | Cited + Speculative 分层 |
| 听觉/声景 | 近缘种录音、啄羽/振翅文献；缺失时 **带宽限制噪声** | 合成 + 采样混合；缺失显式标记 | Modeled / Speculative |
| 嗅觉叙述 | 一般不宣称「真实气味」；草原/苔原 **植被类型** 文献 | 文案 +（可选）实体材质 **C** | Cited（生态）vs Speculative（联觉） |
| 伦理后果 | 保护生物学框架、de-extinction 综述 | 分支状态机 + 受规则约束的文案 | Reflection |

**Red-flag test：** 去掉生物证据链 → 体验坍塌为玄学生成；去掉代码 → 只剩论文综述。**两者均不可。**

---

## 6. Hero species research plan | Hero 物种研究计划（48 天可并行）

### 6.1 旅鸽 *Ectopistes migratorius*

| Sprint（~45 min） | 产出 |
|-------------------|------|
| 集群与社会同步 | Allee/阈值、历史种群叙事；**所有数字「羽影」强度绑定 Modeled** |
| 声学 | 近缘种 + 缺失声明；Mixer **高密度层** 的 DSP 定义 |
| 灭绝叙事 | 人类记忆与狩猎、森林丧失；Ethics **资源/土地利用** 卡片素材 |

### 6.2 猛犸 *Mammuthus primigenius*

| Sprint | 产出 |
|--------|------|
| 同位素与个体生命史 | 公开牙层 / 迁徙模型；**ggplot 静态图** + Dossier 科学页 |
| 北极适应 / clock | 比较基因组学 **逐条核对**（标题级Claim→PMC/bioRxiv）；**禁止幻灯片泛化** |
| 感官与体量 | 与象科对比的形态与尺度；shader **地面视角**、低频律动 |

**顾问建议：** Round 1 前至少一次 **BDC Expert Consultant** 或校内 **古生物学/保护生物学** office hour，核对猛犸基因表述与旅鸽生态表述。

---

## 7. Living installation recommendation | 活体装置推荐（Step 5）

**推荐选项：A — 植物 + 土壤湿度 / 光照 / 温度（简易环境传感器）**

**理由（简要）：**

1. **课堂与场馆安全：** 较微生物/开放水体更易通过审批；无尖锐「伪科学生物电」误读风险（若用生物电模块需极强文案约束）。  
2. **叙事对症：** 「仍在场的光合与土壤水分」对照「已缺席的巨型食草动物与消失的草原/林相」— **直接服务主 A + 辅 B**。  
3. **Biodigital：** 传感器数据 **实时驱动** Mixer 某一层的 gain 或 filter（例如干旱 = 高频削减），数字与活体 **同一数据管道**。  
4. **可持续：** 装置可续养、低耗材，符合 Context 中 **生命周期** 叙述。

**实施：** 一盆（或两盆对照）本土易活植物 + 商用土壤湿度计与环境光传感器 + micro:bit / ESP32 → WebSocket → 前端；展台标示 **「Not a simulation of extinct habitat—an index of present life」**。

---

## 8. Narrative for presentation & film | 叙事结构（口述 + 预告片）

### 8.1 10 min oral（建议时间轴）

| 时段 | 内容 |
|------|------|
| 0:00–0:45 | Hook：灭绝 = 生态缺席 + **社会记忆断裂**；档案≠复活 |
| 0:45–2:30 | Demo：桌面 Web—猛犸 Dossier **同位素一页** + 一日光周期 |
| 2:30–5:30 | Demo：旅鸽 Mixer—**同步性崩溃**听觉隐喻 |
| 5:30–7:30 | 三档标签 + **prompt / 迭代** Reflection（1–2 个具体例子） |
| 7:30–9:30 | Ethics：C 小测 15s 视频 + B 分支 **终曲对比** |
| 9:30–10:00 | 落地：Living 台 10s；致谢顾问与局限 |

### 8.2 ~200 字叙述稿核心（可改团队口吻）

当物种消失，消失的不仅是身体，更是在时间中展开的行为与感知节律：移动的相位、群体的同步、对季节与光的耦合。Extinction Archive 将公开科学与历史材料转化为可进入的 **Umwelt 假设空间**—以 **引用、模型与推测** 三级标明每一步推断的边界；继而以混音台让用户听见 **共生与挤压**。结尾的伦理台拒绝廉价的「复活憧憬」，而以不可兼得的抉择与不同声景终曲，将共情导回 **当下保护与资源正义**。

### 8.3 1–5 min 影片（组 3 节奏）

- **70%** 情感与视听（Dossier + Mixer）；**最后 ~2 min** Ethics 急收；**不**用整段演讲旁白代替画面。

---

## 9. Technology stack | 技术栈（与 Step 7 一致）

| 层 | 选型 |
|----|------|
| 前端 | Three.js / React Three Fiber 或 A-Frame（团队统一一种） |
| AR | WebXR / WebAR—**手机优先**；桌面为完整 fallback |
| 音频 | Web Audio API、自定义 DSP、多轨混音抽象 |
| 生成式 | 条件 diffusion / ControlNet 类流程；**元数据**侧记录 prompt 与 source ID |
| 数据 | R / Python：同位素与简易分析 → **静态图** + CSV/JSON 供前端 |
| 物理 | 3D 打印 + AR marker 或模型特征点；Living MQTT/WebSocket |

---

## 10. One-month sprint | 一个月冲刺（Step 8）

> **说明：** 全赛季 BDC 通常需多月迭代；下列 **4 周** 适用于 **Proof-of-concept 截点** 或密集课程月。全学期可在每周重复「小 Discovery→Polish」螺旋。

| 周 | 阶段 | 目标产出 |
|----|------|----------|
| **W1** | Discovery | 证据卡 v1（两物种）；叙事板；技术栈拍板；**顾问约见** |
| **W2** | Prototyping | **单物种端到端**（建议先猛犸：数据链最清晰）：Dossier + Mixer 一轨 |
| **W3** | Integration | 旅鸽接入；Ethics **B 状态机** + **C 小测**；WebAR 路径；Living 数据通 |
| **W4** | Polish | 三档标签全局稽核；**10 min 彩排**；预告片粗剪；实体打磨；Q&A 清单 |

**每周固定：** 1× **证据审计**（新 Claim 必须有引用）；1× **弃用记录**（Reflection）。

---

## 11. Risk register | 风险登记与缓解

| 风险 | 缓解 |
|------|------|
| 生成内容像「真实复原」 | UI 强制 Speculative；评审口播首句强调 **假设空间** |
| 旅鸽/猛犸科学表述错误 | 顾问审 + 幻灯片 **逐条引用** |
| 现场 AR 翻车 | **录屏 + 备用设备**；桌面路径全功能 |
| 嗅觉/材质过敏 | 仅 C：**低挥发、非食物**；现场标识与 opt-out |
| Ethics 浅薄 | B 卡片由 **团队+文献** 共写；LLM 仅润色 |
| 「活体不够 biodesign」 | 统一 **话术 B**；Living 为 **indexed present**，非装饰 |

---

## 12. Open items | 待分配

- [ ] 团队角色：Bio Lead / Tech Lead / Sound / Fabrication / Film  
- [ ] Google Drive 文件夹结构与命名  
- [ ] 专家顾问姓名与约见日期  
- [ ] 开源协议与 **是否**公开 repo（注意生成模型权重许可）

---

## 13. Document history

| 版本 | 日期 | 说明 |
|------|------|------|
| 0.1 | 2026-04-04 | 依团队选项与 BDC deliverables 初稿 |
| 0.2 | 2026-04-04 | 推送到 GitHub：`docs/bdc-umwelt-archive/PROJECT_PLAN.md` 为 canonical |

---

*本文件供课堂与团队内部使用；对外陈述请以团队口吻重写，并遵循 BDC 最终提交格式。*
