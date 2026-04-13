/**
 * Resolve data + template URLs for local dev and GitHub Pages (repo root = site root).
 *
 * Optional override (CDN or fork layout):
 *   <meta name="ea-asset-base" content="https://user.github.io/Biodesign-Project/" />
 * Trailing slash optional. Empty content = derive from this page (../../ → repo root).
 */
(function (w) {
  var meta = document.querySelector('meta[name="ea-asset-base"]');
  var raw = meta && meta.getAttribute("content");
  var root;
  if (raw && raw.trim()) {
    root = raw.trim().replace(/\/?$/, "/");
  } else {
    root = new URL("../../", w.location.href).href;
  }

  w.EA_CONFIG = {
    /** Absolute URL to archive.json */
    archiveJson: new URL("data/extinction_archive/archive.json", root).href,
    /** Reflection template (same-origin for postMessage) */
    reflectionTemplate: new URL("templates/reflection-log-webxr.html", root).href,
    /** Repo root used by A-Frame asset() if needed later */
    assetRoot: root,
  };

  w.EA_POSTMESSAGE_SOURCE_PARENT = "extinction-archive-parent";
  w.EA_POSTMESSAGE_SOURCE_CHILD = "extinction-archive-reflection";
})(window);
