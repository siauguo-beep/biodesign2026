(function () {
  "use strict";

  var state = {
    archive: null,
    loadError: null,
    currentSpecies: null,
    epistemicTab: "cited",
    ethicsChoice: null,
    procTexturesInit: false,
    reflectionReady: false,
  };

  var pigeonAudio = null;
  /** @type {{ ctx: AudioContext, osc: OscillatorNode, filt: BiquadFilterNode, gain: GainNode } | null} */
  var mammothSon = null;
  /** @type {{ ctx: AudioContext, osc: OscillatorNode, osc2: OscillatorNode, filt: BiquadFilterNode, gain: GainNode } | null} */
  var thylaSon = null;

  function $(sel) {
    return document.querySelector(sel);
  }

  function archiveUrl() {
    return (window.EA_CONFIG && window.EA_CONFIG.archiveJson) || "";
  }

  function reflectionUrl() {
    return (window.EA_CONFIG && window.EA_CONFIG.reflectionTemplate) || "";
  }

  function showView(id) {
    document.querySelectorAll(".view").forEach(function (v) {
      v.classList.toggle("active", v.id === id);
    });
  }

  function setHeaderMode(mode) {
    var hub = $("#btn-hub");
    var land = $("#btn-landing");
    if (!hub || !land) return;
    hub.style.display = mode === "landing" ? "none" : "inline-block";
    land.style.display = mode === "landing" ? "none" : "inline-block";
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function hexFromRgb(r, g, b) {
    return (
      "#" +
      [r, g, b]
        .map(function (x) {
          return Math.round(Math.max(0, Math.min(255, x)))
            .toString(16)
            .padStart(2, "0");
        })
        .join("")
    );
  }

  function mammothSkyColor(hourT) {
    var t = hourT;
    var r = lerp(18, 140, t);
    var g = lerp(22, 180, t);
    var b = lerp(45, 210, t);
    if (t < 0.25) {
      r = lerp(8, 18, t / 0.25);
      g = lerp(12, 22, t / 0.25);
      b = lerp(28, 45, t / 0.25);
    }
    return hexFromRgb(r, g, b);
  }

  function thylacineSkyColor(twilT) {
    var t = twilT;
    var r = lerp(42, 120, t);
    var g = lerp(28, 55, t);
    var b = lerp(61, 95, t);
    return hexFromRgb(r, g, b);
  }

  function makeCheckerDataUrl(light, dark) {
    var c = document.createElement("canvas");
    c.width = 64;
    c.height = 64;
    var g = c.getContext("2d");
    var s = 8;
    for (var y = 0; y < 64; y += s) {
      for (var x = 0; x < 64; x += s) {
        g.fillStyle = (x / s + y / s) % 2 ? light : dark;
        g.fillRect(x, y, s, s);
      }
    }
    return c.toDataURL("image/png");
  }

  function initProcTextures() {
    if (state.procTexturesInit) return;
    var m = document.getElementById("ea-tex-mammoth-ground");
    var t = document.getElementById("ea-tex-thyla-ground");
    if (m) m.src = makeCheckerDataUrl("#4a6b45", "#2d4030");
    if (t) t.src = makeCheckerDataUrl("#3a3048", "#1f1828");
    state.procTexturesInit = true;
  }

  function updateAframeLabels(scene) {
    if (!scene || !scene.aframeLabels) return;
    scene.aframeLabels.forEach(function (row) {
      var el = document.getElementById(row.el);
      if (el && el.setAttribute) el.setAttribute("value", row.text);
    });
  }

  function stopMammothSon() {
    if (!mammothSon) return;
    try {
      mammothSon.osc.stop();
      mammothSon.osc.disconnect();
      mammothSon.filt.disconnect();
      mammothSon.gain.disconnect();
      mammothSon.ctx.close();
    } catch (_) {}
    mammothSon = null;
  }

  function stopThylaSon() {
    if (!thylaSon) return;
    try {
      thylaSon.osc.stop();
      thylaSon.osc2.stop();
      thylaSon.osc.disconnect();
      thylaSon.osc2.disconnect();
      thylaSon.filt.disconnect();
      thylaSon.gain.disconnect();
      thylaSon.ctx.close();
    } catch (_) {}
    thylaSon = null;
  }

  function stopAmbientSonify() {
    stopMammothSon();
    stopThylaSon();
  }

  function updateMammothSonify(v) {
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    if (!mammothSon) {
      var ctx = new Ctx();
      var osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = 48;
      var filt = ctx.createBiquadFilter();
      filt.type = "lowpass";
      filt.Q.value = 0.7;
      var gain = ctx.createGain();
      gain.gain.value = 0.04;
      osc.connect(filt);
      filt.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      mammothSon = { ctx: ctx, osc: osc, filt: filt, gain: gain };
    }
    mammothSon.filt.frequency.setTargetAtTime(
      lerp(180, 5200, v),
      mammothSon.ctx.currentTime,
      0.08
    );
    mammothSon.gain.gain.setTargetAtTime(
      lerp(0.015, 0.055, v),
      mammothSon.ctx.currentTime,
      0.12
    );
  }

  function updateThylaSonify(v) {
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    if (!thylaSon) {
      var ctx = new Ctx();
      var osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = 92;
      var osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.value = 184;
      var filt = ctx.createBiquadFilter();
      filt.type = "bandpass";
      filt.Q.value = 1.2;
      var gain = ctx.createGain();
      gain.gain.value = 0.035;
      osc.connect(filt);
      osc2.connect(filt);
      filt.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc2.start();
      thylaSon = { ctx: ctx, osc: osc, osc2: osc2, filt: filt, gain: gain };
    }
    thylaSon.filt.frequency.setTargetAtTime(
      lerp(220, 1400, v),
      thylaSon.ctx.currentTime,
      0.1
    );
    thylaSon.gain.gain.setTargetAtTime(
      lerp(0.012, 0.045, v),
      thylaSon.ctx.currentTime,
      0.12
    );
  }

  function bindMammothControls() {
    var sky = document.getElementById("mammoth-sky");
    var fog = document.getElementById("mammoth-scene");
    var slider = $("#mammoth-hour");
    var son = $("#mammoth-sonify");
    if (!sky || !slider || slider.dataset.bound) return;
    slider.dataset.bound = "1";
    initProcTextures();
    function apply() {
      var v = parseFloat(slider.value, 10) / 100;
      sky.setAttribute("color", mammothSkyColor(v));
      if (fog) {
        fog.setAttribute(
          "fog",
          "type: exponential; color: " + mammothSkyColor(v) + "; density: 0.04"
        );
      }
      if (!son || son.checked) updateMammothSonify(v);
      else stopMammothSon();
    }
    slider.addEventListener("input", apply);
    if (son) son.addEventListener("change", apply);
    apply();
  }

  function bindThylacineControls() {
    var sky = document.getElementById("thylacine-sky");
    var slider = $("#thylacine-twilight");
    var son = $("#thyla-sonify");
    if (!sky || !slider || slider.dataset.bound) return;
    slider.dataset.bound = "1";
    initProcTextures();
    function apply() {
      var v = parseFloat(slider.value, 10) / 100;
      sky.setAttribute("color", thylacineSkyColor(v));
      if (!son || son.checked) updateThylaSonify(v);
      else stopThylaSon();
    }
    slider.addEventListener("input", apply);
    if (son) son.addEventListener("change", apply);
    apply();
  }

  function stopPigeonAudio() {
    if (pigeonAudio && pigeonAudio.ctx) {
      try {
        pigeonAudio.osc.forEach(function (o) {
          o.stop();
          o.disconnect();
        });
      } catch (_) {}
      pigeonAudio.ctx.close();
      pigeonAudio = null;
    }
  }

  function stopAllAudio() {
    stopPigeonAudio();
    stopAmbientSonify();
  }

  function startPigeonPolyphony(nNorm) {
    stopPigeonAudio();
    stopAmbientSonify();
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    var ctx = new Ctx();
    var n = Math.max(1, Math.round(3 + nNorm * 17));
    var osc = [];
    var master = ctx.createGain();
    master.gain.value = 0.12 * Math.sqrt(nNorm);
    master.connect(ctx.destination);
    for (var i = 0; i < n; i++) {
      var o = ctx.createOscillator();
      var g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = 220 + i * 18 + Math.random() * 30;
      g.gain.value = 0.15 / Math.sqrt(n);
      o.connect(g);
      g.connect(master);
      o.start();
      osc.push(o);
    }
    pigeonAudio = { ctx: ctx, osc: osc, master: master };
  }

  function bindPigeonControls() {
    var slider = $("#pigeon-n");
    if (!slider || slider.dataset.bound) return;
    slider.dataset.bound = "1";
    function apply() {
      var v = parseFloat(slider.value, 10) / 100;
      var label = $("#pigeon-n-label");
      if (label) {
        label.textContent =
          "Effective colony synchrony proxy: " +
          Math.round(v * 100) +
          "% (Modeled — not historic flock recording).";
      }
      startPigeonPolyphony(v);
    }
    slider.addEventListener("input", apply);
    apply();
  }

  function renderEpistemic(scene) {
    var panel = $("#epistemic-body");
    if (!panel || !scene) return;
    var tier = state.epistemicTab;
    var text =
      tier === "cited"
        ? scene.cited
        : tier === "interpolated"
          ? scene.interpolated
          : scene.speculative;
    panel.textContent = text;
    document.querySelectorAll(".epistemic-tabs button").forEach(function (b) {
      b.classList.toggle("active", b.dataset.tier === tier);
      b.classList.toggle("cited", b.dataset.tier === "cited");
      b.classList.toggle("interp", b.dataset.tier === "interpolated");
      b.classList.toggle("spec", b.dataset.tier === "speculative");
    });
  }

  function renderSpeciesView(key) {
    var SCENES = window.EXTINCTION_ARCHIVE_SCENES;
    var scene = SCENES[key];
    if (!scene) return;

    state.currentSpecies = key;
    state.epistemicTab = "cited";
    $("#species-title").textContent = scene.title;
    $("#species-sci").textContent = scene.archiveScientific;

    var strip = $("#species-scene-ids");
    strip.innerHTML = scene.sceneIds
      .map(function (id) {
        return '<span class="badge cited">' + id + "</span>";
      })
      .join(" ");

    var animal = null;
    if (state.archive && state.archive.animals) {
      animal = state.archive.animals.find(function (a) {
        return a.scientific_name === scene.archiveScientific;
      });
    }
    var ext = $("#species-archive-meta");
    if (animal) {
      ext.textContent =
        "Archive id " +
        animal.id +
        " · Extinct " +
        animal.extinction_year +
        " · " +
        (animal.extinction_location || "") +
        " · Data: " +
        (animal.data_availability || "—");
    } else {
      ext.textContent = state.loadError || "Archive row not loaded.";
    }

    var indo = $("#thylacine-indigenous-block");
    if (indo) indo.style.display = key === "thylacine" ? "block" : "none";

    document.querySelectorAll(".xr-species").forEach(function (el) {
      el.style.display = el.dataset.species === key ? "block" : "none";
    });

    renderEpistemic(scene);
    updateAframeLabels(scene);

    if (key === "mammoth") {
      stopPigeonAudio();
      stopThylaSon();
      bindMammothControls();
      var ms = document.getElementById("mammoth-hour");
      if (ms) ms.dispatchEvent(new Event("input", { bubbles: true }));
    } else if (key === "thylacine") {
      stopPigeonAudio();
      stopMammothSon();
      bindThylacineControls();
      var ts = document.getElementById("thylacine-twilight");
      if (ts) ts.dispatchEvent(new Event("input", { bubbles: true }));
    } else if (key === "pigeon") {
      stopAmbientSonify();
      bindPigeonControls();
      var ps = document.getElementById("pigeon-n");
      if (ps) ps.dispatchEvent(new Event("input", { bubbles: true }));
    } else {
      stopAllAudio();
    }

    showView("view-species");
    setHeaderMode("flow");
  }

  function renderHub() {
    var grid = $("#hub-grid");
    if (!grid || !state.archive) return;
    var featured = [
      "Mammuthus primigenius",
      "Thylacinus cynocephalus",
      "Ectopistes migratorius",
    ];
    grid.innerHTML = featured
      .map(function (sci) {
        var a = state.archive.animals.find(function (x) {
          return x.scientific_name === sci;
        });
        if (!a) return "";
        var key =
          sci.indexOf("Mammuthus primigenius") === 0
            ? "mammoth"
            : sci.indexOf("Thylacinus") === 0
              ? "thylacine"
              : "pigeon";
        var tier =
          key === "pigeon" ? "P0 · dossier / acoustic" : "P0 · WebXR depth";
        return (
          '<button type="button" class="species-card" data-species="' +
          key +
          '">' +
          "<h2>" +
          a.common_name +
          "</h2>" +
          '<div class="sci">' +
          a.scientific_name +
          "</div>" +
          '<div class="badge-row"><span class="badge">' +
          tier +
          "</span></div>" +
          "</button>"
        );
      })
      .join("");

    var count = $("#archive-count");
    if (count)
      count.textContent =
        state.archive.meta && state.archive.meta.animal_count
          ? String(state.archive.meta.animal_count)
          : String(state.archive.animals.length);

    grid.querySelectorAll(".species-card").forEach(function (btn) {
      btn.addEventListener("click", function () {
        renderSpeciesView(btn.dataset.species);
      });
    });
  }

  function ethicsPayload() {
    var choices = window.EXTINCTION_ETHICS_CHOICES || [];
    var id = state.ethicsChoice;
    var row = choices.find(function (c) {
      return c.id === id;
    });
    return {
      source: window.EA_POSTMESSAGE_SOURCE_PARENT || "extinction-archive-parent",
      type: "ea-ethics-choice",
      choiceId: id || null,
      label: row ? row.label : null,
      note: row ? row.note : null,
    };
  }

  function postEthicsToReflectionIframe() {
    var frame = $("#reflection-frame");
    if (!frame || !frame.contentWindow) return;
    try {
      frame.contentWindow.postMessage(ethicsPayload(), "*");
    } catch (_) {}
  }

  function onReflectionMessage(ev) {
    var d = ev.data;
    if (!d || d.source !== (window.EA_POSTMESSAGE_SOURCE_CHILD || "extinction-archive-reflection"))
      return;
    if (d.type === "ea-reflection-text") {
      var echo = $("#reflection-echo");
      if (echo) {
        var preview = (d.text || "").trim();
        echo.textContent = preview
          ? preview.slice(0, 400) + (preview.length > 400 ? "…" : "")
          : "（iframe 内暂无文字）";
      }
    }
  }

  function wireReflectionIframe() {
    var frame = $("#reflection-frame");
    if (!frame) return;
    frame.addEventListener("load", function () {
      state.reflectionReady = true;
      postEthicsToReflectionIframe();
    });
  }

  function renderEthics() {
    var box = $("#ethics-options");
    if (!box) return;
    var choices = window.EXTINCTION_ETHICS_CHOICES || [];
    box.innerHTML = choices
      .map(function (c) {
        return (
          '<label><input type="radio" name="ethics" value="' +
          c.id +
          '"' +
          (state.ethicsChoice === c.id ? " checked" : "") +
          " />" +
          "<span><strong>" +
          c.label +
          "</strong><br/><span style=\"color:var(--muted);font-size:0.8rem\">" +
          c.note +
          "</span></span></label>"
        );
      })
      .join("");

    box.querySelectorAll('input[name="ethics"]').forEach(function (inp) {
      inp.addEventListener("change", function () {
        state.ethicsChoice = inp.value;
        try {
          sessionStorage.setItem("ea_ethics_v1", inp.value);
        } catch (_) {}
        if ($("#view-reflection") && $("#view-reflection").classList.contains("active")) {
          postEthicsToReflectionIframe();
        }
      });
    });
  }

  function loadArchive() {
    var url = archiveUrl();
    if (!url) {
      state.loadError = "EA_CONFIG missing — load js/config.js before app.js.";
      return Promise.resolve();
    }
    return fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(function (data) {
        state.archive = data;
        state.loadError = null;
      })
      .catch(function (e) {
        state.loadError =
          "Could not load archive.json. Serve repository root (e.g. python3 -m http.server 8080) or set <meta name=\"ea-asset-base\" content=\"https://…/\"> for GitHub Pages — " +
          (e.message || String(e));
      });
  }

  function init() {
    $("#btn-enter") &&
      $("#btn-enter").addEventListener("click", function () {
        showView("view-hub");
        setHeaderMode("flow");
        renderHub();
      });

    $("#btn-hub") &&
      $("#btn-hub").addEventListener("click", function () {
        stopAllAudio();
        showView("view-hub");
        if (state.archive) renderHub();
      });

    $("#btn-back-species") &&
      $("#btn-back-species").addEventListener("click", function () {
        stopAllAudio();
        showView("view-hub");
        if (state.archive) renderHub();
      });

    $("#btn-landing") &&
      $("#btn-landing").addEventListener("click", function () {
        stopAllAudio();
        showView("view-landing");
        setHeaderMode("landing");
      });

    $("#btn-ethics") &&
      $("#btn-ethics").addEventListener("click", function () {
        stopAllAudio();
        renderEthics();
        showView("view-ethics");
        setHeaderMode("flow");
      });

    $("#btn-reflection") &&
      $("#btn-reflection").addEventListener("click", function () {
        stopAllAudio();
        var frame = $("#reflection-frame");
        var url = reflectionUrl();
        if (frame && url) frame.src = url;
        showView("view-reflection");
        setHeaderMode("flow");
      });

    $("#btn-back-ethics") &&
      $("#btn-back-ethics").addEventListener("click", function () {
        renderEthics();
        showView("view-ethics");
      });

    wireReflectionIframe();
    window.addEventListener("message", onReflectionMessage);

    var epi = document.querySelector(".epistemic-tabs");
    if (epi) {
      epi.addEventListener("click", function (e) {
        var t = e.target;
        if (t.tagName === "BUTTON" && t.dataset.tier) {
          state.epistemicTab = t.dataset.tier;
          var sc = window.EXTINCTION_ARCHIVE_SCENES[state.currentSpecies];
          renderEpistemic(sc);
        }
      });
    }

    try {
      state.ethicsChoice = sessionStorage.getItem("ea_ethics_v1");
    } catch (_) {}

    loadArchive().then(function () {
      var err = $("#load-error");
      if (err) {
        if (state.loadError) {
          err.textContent = state.loadError;
          err.style.display = "block";
        } else {
          err.style.display = "none";
        }
      }
    });

    showView("view-landing");
    setHeaderMode("landing");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
