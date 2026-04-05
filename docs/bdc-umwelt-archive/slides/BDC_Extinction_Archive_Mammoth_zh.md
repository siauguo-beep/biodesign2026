---
marp: true
theme: default
paginate: true
size: 16:9
style: |
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;600;700&display=swap');
  section { font-size: 26px; font-family: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif; }
  h1 { font-size: 38px; }
  table { font-size: 20px; }
footer: 灭绝档案 · BDC 2026 · 猛犸 MVP
---

<!-- _class: lead -->
# 灭绝档案 Extinction Archive
## 真猛犸 *Mammuthus primigenius* 的 *Umwelt* 纪念

**Biodesign Challenge 2026** · **生物—数字卓越奖** · 展览主题 *Convergent Life*

数字艺术与 AI 技术（MDes）· **2 人团队** · **2–3 周 MVP**

---

## 物种消失时，我们失去了什么？

- 不仅是**躯体**，更是在时间中生存的**方式**
- 季风性迁徙、光暗授时、社群节律、以及 **感知世界（*Umwelt*）**
- 科学留在 PDF 里；公众记忆往往坍缩成**文化符号**

**设计问题：** 怎样让严谨生物学变得**可感知**，同时**不说谎**？

---

## 项目论点

**灭绝档案** = 以浏览器为先的体验，为 ***Mammuthus primigenius*** 搭建**假设级别**的 *Umwelt*

- **锚定**可引用研究：象牙同位素层序、北极适应、灭绝情境
- **转译**为着色器、受控生成式管线、**Web Audio**
- **收束**于**媒介素养** + **分支伦理**——数字召回**不得**替代就地保护紧迫性

---

## 为何锁定真猛犸（范围已冻结）

| 支柱 | 与 MVP 的契合 |
|------|----------------|
| **同位素「日记」** | 已发表的生命史重建 → **档案科学折叠区 + R/ggplot 静帧** |
| **光周期 / 季节** | 高纬极端昼夜 → **光照 + Mixer 脉冲层** |
| **生物—数字叙事** | 古基因组 / 形态文献 ↔ **参数化场景 + 标签** |
| **伦理** | 反灭绝（de-extinction）与北极话语 → **锋利而诚实的分支卡** |

**冻结：** 2–3 周内**仅单一英雄物种** · 不做平行完整档案

---

## 用户路径（三模块）

```
档案 Dossier  →  混音台 Mixer  →  伦理 Ethics
   （读）          （听）           （选）
```

**Group1Slim（已锁定）：** 三者全交付 · 讲演中 Ethics 约 **2 分钟**

---

## 模块 A — 档案 *Dossier*

- **锚点：** 地理与时间（末次冰期—早全新世框架 — 具体点位须 **Cited**）
- **科学折叠：** 象牙 **Sr/O** 等化学沿生长轴、已发表个体轨迹
- **逐块标签：** **Cited / Modeled / Speculative**
- **360° 场景**由**季节与太阳高度**参数驱动——非无边界「全文生世界」

---

## 模块 B — 混音台 *Mixer*

- **≥3 层音频（猛犸语境）：**
  - 季节 / **光周期脉冲**
  - 苔原—草原**环境声床**（象类近缘处标 *Speculative*）
  - **人类纪压强**层（在可能处标 *Cited/Modeled*）
- **和谐 → 冲突：** 明确 **DSP 规则**（如增益竞争 → ducking / 拍频微失谐）
- **可质询：** 规则写入幻灯片 + README（评委可追问「黑盒」）

---

## 模块 C — 伦理台 *Ethics*

**C 门禁（约 45s）：** 三道判断/排序——*「该陈述是 Cited 还是 Speculative？」*

**B 分支（约 75s）：** 2–3 张卡，例如：
- 就地保护资金 vs 反灭绝技术 hype
- 入侵种治理框架（简化二元）
- 数据、土地与原住民知识——以**发问 + 本团队承诺**呈现（**不替他人代言**）

**结果：** 不同**终曲混音预设** + 短字幕（≤80 字）

---

## 生物 + 数字 — 双层都必须成立

| 生物学（来自文献） | 数字（实现） |
|--------------------|--------------|
| 同位素剖面、季节生命 | `ggplot2` + 档案图表 |
| 光环境、生境 proxy | Three.js / R3F + shader |
| 不确定性与争论 | **C/M/S** 界面与文案 |
| 情绪节奏 | Mixer + 分支终曲 |

**去掉生物学** → 炫酷 demo · **去掉代码** → 静态论述 → **双层缺一不可** → 符合 biodigital 自测

---

## 实体 + AR（轻量）

- **3D 打印：** 抽象**象牙「生长柱」**或颅骨代币——物质证词
- **手机 WebAR：** 与桌面**同一 GLB + 同一音频 stem**（`?ar=1` 或独立入口）
- **预案：** QR → **同一档案锚点**（保证演示可复现）

---

## 技术栈（建议）

- **前端：** Vite · React · React Three Fiber / Three.js · Web Audio API
- **科学可视化：** R · **ggplot2** → 导出 PNG/SVG 供幻灯与网页
- **生成式 AI：** **控制优先**（mask / 调色板）+ **程序化基底** · 核查 API 成本与合规
- **AR：** WebXR 友好路径（若团队标准统一也可用 A-Frame）

---

## 2–3 周日程（摘要）

| 周 | 重点 |
|----|------|
| **1** | 脚手架 · 档案 UI + 猛犸 JSON · 场景 · Mixer 原型 · 证据审计 #1 · ggplot v1 |
| **2** | Ethics UI · GLB · 最小 WebAR · 打印 · Methods/Cite/Limits 幻灯 · 走台 · 预告片 |
| **3\*** | 打磨 · 无障碍 · 模拟 Q&A · 只修 P0 · *可选 Stretch* |

\*若仅 **14 天**：合并第 2–3 周并砍掉 Stretch

---

## BDC 评审四维 — 我们的抓手

| 维度 | 我们的材料 |
|------|------------|
| **Narrative 叙事** | 英雄个体_arc · 现场 Demo · 诚实标签 |
| **Concept 概念** | *Umwelt* + 同位素—时间 · 生物—数字整合 |
| **Context 语境** | 反灭绝伦理 · 「可逆灭绝」道德风险 · 保护框架 |
| **Reflection 反思** | 迭代记录 · Speculative 门禁 · 局限幻灯 |

目标叙事：**Biodigital Excellence（生物—数字卓越）**

---

## 交付清单（课程 / BDC 导向）

- [ ] **讲演** · 8 分钟 + 2 分钟 Demo
- [ ] **视觉** · UI 录屏 + 静帧
- [ ] **实体** · 打印物 + AR 素材
- [ ] **短片** · 45–90 秒
- [ ] **幻灯** · 含 **Methods · Citations · Limitations**

---

## Methods 方法

- **文献三角：** 经同行评审的三篇支柱——**象牙同位素生命史**（阿拉斯加雄性个体；Sr/O 与随机游走模型）；**比较基因组**（猛犸相对象类的节律与温度通路）；**灭绝驱动**（气候 × 人类压力建模）
- **档案：** 论断进入 JSON；每块 **Cited / Modeled / Speculative**；`ggplot2` **复现公开剖面摘要**作静帧（非重新鉴定该个体）
- **三维场景：** 太阳高度、雾、色板由**季节与光周期**驱动；可选 **control-net / mask** 图像管线，记录 **模型 ID + 日期 + seed**
- **Mixer：** 分层 stem；DSP 规则文档化（README **v0.1**）；象类近缘声床标 *Speculative*
- **流程：** **≥2× 30 min 证据审计**（第 1、2 周）· GEN-AI 与 prompt 变更日志供 Reflection 幻灯

---

## Citations — 核心文献（3）+ 工具（+1）

**1 — 象牙同位素 mobility（档案科学折叠 · 迁徙模型）**  
Wooller, M. J., Bataille, C., Druckenmiller, P., Erickson, G. M., Groves, P., Haubenstock, N., Howe, T., Irrgeher, J., Mann, D., Moon, K., Potter, B. A., Prohaska, T., Rasic, J., Reuther, J., Shapiro, B., Spaleta, K. J., & Willis, A. D. (2021). Lifetime mobility of an Arctic woolly mammoth. *Science*, *373*(6556), 806–808. https://doi.org/10.1126/science.abg1134

**2 — 基因组与北极适应（昼夜节律 / 温度叙事依据）**  
Lynch, V. J., Bedoya-Reina, O. C., Ratan, A., Sulak, M., Drautz-Moses, D. I., Perry, G. H., Miller, W., & Schuster, S. C. (2015). Elephantid genomes reveal the molecular bases of Woolly Mammoth adaptations to the Arctic. *Cell Reports*, *12*(2), 217–228. https://doi.org/10.1016/j.celrep.2015.06.027

**3 — 灭绝情境（气候 × 人类；忌单一归因）**  
Nogués-Bravo, D., Rodríguez, J., Hortal, J., Batra, P., & Araújo, M. B. (2008). Climate change, humans, and the extinction of the Woolly Mammoth. *PLoS Biology*, *6*(4), e79. https://doi.org/10.1371/journal.pbio.0060079

**+1 — 软件与运行时**  
R Core Team (2024). *R: A language and environment for statistical computing.* R Foundation for Statistical Computing. https://www.R-project.org/ · Wickham, H. (2016). *ggplot2: Elegant Graphics for Data Analysis.* Springer. https://ggplot2.tidyverse.org · Three.js r152+ https://threejs.org/ ·（WebXR、Marp 导出等见附录。）

---

## Limitations 局限（坦诚 — 评委买账）

- 无存世猛犸——**所有感官重建均为部分**；象类近缘区间标 **Modeled/Speculative**
- 生成式媒介**易感真实**——我们以标签与视觉克制**对抗误导**
- **2–3 周 / 2 人** → 单物种、**窄而深**
- AR 硬件分裂——**桌面路径为正**

---

## 团队与分工（扁平 + 审计）

- 两人**交叉职能** · 每日 **15 min** 站会
- **证据审计** 每周 2×（30 min）— Demo 中无不标签论断
- 可选：**视效/代码** vs **声音/研究/文案** ——但**两人共背评审表**

---

## 致谢 / 我们预习的 Q&A

- 为何是猛犸而非「更简单」的符号物种？
- **活体生物学**究竟在哪里？（答：**from biology** 证据链 + 可选 Stretch 植物；论点是数字—古生态桥。）
- 如何防止**误信息**？（**C/M/S** + 伦理门禁 + 局限幻灯）
- 若多 **4 个月**会做什么？

---

## 备用 — 一句话 pitch

> **灭绝档案**把象牙时间与北极之光变成**可听、可点的纪念**——并逼问：「带回猛犸」**应付出什么代价**。

---

## 幻灯导出说明

**英文源：** `slides/BDC_Extinction_Archive_Mammoth.md` · **中文源：** 本文件  
**成品路径：** `slides/export/BDC_Deck_EN.pdf` / `BDC_Deck_ZH.pdf` / `.pptx`  
**预览入口：** 浏览器打开 `slides/preview.html`（见 `slides/README.md`）
