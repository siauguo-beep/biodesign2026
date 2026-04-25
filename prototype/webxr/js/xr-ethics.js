export function initEthicsPage() {
  const budget = document.getElementById("budget");
  const risk = document.getElementById("risk");
  const bv = document.getElementById("budget-value");
  const rv = document.getElementById("risk-value");
  const out = document.getElementById("ethics-output");

  const getLang = () => localStorage.getItem("ea-lang") || localStorage.getItem("ethics-lang") || "zh";
  const messages = {
    zh: {
      high: "你倾向于投入更多资源，并接受较高生态不确定性。若推进去灭绝研究，应优先明确技术安全、生态评估和原住民/当地社群的知情参与。",
      low: "你更偏向保护现有生态。即使不尝试复活，灭绝物种仍需要被记录、解释，并转化为今天的保护行动。",
      balanced: "你选择了较平衡的路径：既关注技术可能性，也需要清楚说明证据边界、生态风险和公众参与方式。",
      saved: "已保存到本地浏览器。",
      loaded: "已载入上次记录。"
    },
    en: {
      high: "High de-extinction investment + high uncertainty tolerance: which sovereignty commitments and technical safeguards are non-negotiable?",
      low: "Conservation-first path: even without revival, what ethical work must extinction memory still perform?",
      balanced: "Balanced strategy: where should uncertainty be made explicit in public communication?",
      saved: "Saved locally in this browser.",
      loaded: "Last reflection loaded."
    }
  };

  const update = () => {
    bv.textContent = budget.value;
    rv.textContent = risk.value;
    const b = Number(budget.value);
    const r = Number(risk.value);
    const copy = messages[getLang()] || messages.zh;
    if (b > 65 && r > 55) {
      out.textContent = copy.high;
    } else if (b < 35 && r < 40) {
      out.textContent = copy.low;
    } else {
      out.textContent = copy.balanced;
    }
  };
  budget.addEventListener("input", update);
  risk.addEventListener("input", update);
  window.addEventListener("ethics:languagechange", update);
  update();

  const input = document.getElementById("reflection-input");
  const save = document.getElementById("save-reflection");
  const load = document.getElementById("load-reflection");
  const status = document.getElementById("reflection-status");
  const key = "umwelt_archive_reflection_xr";

  save.addEventListener("click", () => {
    localStorage.setItem(key, input.value || "");
    status.textContent = (messages[getLang()] || messages.zh).saved;
  });
  load.addEventListener("click", () => {
    input.value = localStorage.getItem(key) || "";
    status.textContent = (messages[getLang()] || messages.zh).loaded;
  });
}
