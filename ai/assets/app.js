/* ============================================================
   Shared behavior for the AI Engineering knowledge hub.
   - Injects the floating reading-settings widget (font size + themes)
   - Persists preferences in localStorage
   - Loads Mermaid from CDN and renders diagrams ONCE on a fixed light
     panel, so they stay readable under every page theme.
   ============================================================ */
(function () {
  var root = document.documentElement;
  var LS_FONT = 'aiFontScale', LS_THEME = 'aiTheme';

  /* ---------- Inject reading widget ---------- */
  var fab = document.createElement('div');
  fab.className = 'a11y-fab';
  fab.innerHTML =
    '<div class="a11y-panel" id="a11yPanel" role="dialog" aria-label="Reading settings">' +
      '<h5>Text size</h5>' +
      '<div class="a11y-row">' +
        '<button class="a11y-btn" id="fontMinus" aria-label="Decrease text size">A&minus;</button>' +
        '<span class="a11y-size" id="fontVal">100%</span>' +
        '<button class="a11y-btn" id="fontPlus" aria-label="Increase text size">A+</button>' +
      '</div>' +
      '<h5>Color theme</h5>' +
      '<div class="a11y-themes">' +
        '<button class="a11y-theme" data-set-theme="light"><span class="a11y-swatch" style="background:#ffffff"></span>Light</button>' +
        '<button class="a11y-theme" data-set-theme="dark"><span class="a11y-swatch" style="background:#141a24"></span>Dark</button>' +
        '<button class="a11y-theme" data-set-theme="sepia"><span class="a11y-swatch" style="background:#f4ecd8"></span>Sepia</button>' +
        '<button class="a11y-theme" data-set-theme="contrast"><span class="a11y-swatch" style="background:#000;border-color:#fff"></span>Contrast</button>' +
      '</div>' +
      '<div class="a11y-row" style="margin-bottom:0"><button class="a11y-btn" id="a11yReset">Reset</button></div>' +
    '</div>' +
    '<button class="a11y-toggle" id="a11yToggle" aria-label="Open reading settings" aria-expanded="false" title="Reading settings">Aa</button>';
  document.body.appendChild(fab);

  /* ---------- Theme ---------- */
  function markActive(theme) {
    var btns = document.querySelectorAll('.a11y-theme');
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle('active', btns[i].getAttribute('data-set-theme') === theme);
    }
  }
  function applyTheme(theme) {
    if (theme) root.setAttribute('data-theme', theme); else root.removeAttribute('data-theme');
    markActive(theme);
  }
  var themeBtns = document.querySelectorAll('.a11y-theme');
  for (var i = 0; i < themeBtns.length; i++) {
    themeBtns[i].addEventListener('click', function () {
      var t = this.getAttribute('data-set-theme');
      localStorage.setItem(LS_THEME, t); applyTheme(t);
    });
  }

  /* ---------- Font size ---------- */
  var scale = parseInt(localStorage.getItem(LS_FONT) || '100', 10);
  var fontVal = document.getElementById('fontVal');
  function applyFont() {
    scale = Math.max(80, Math.min(180, scale));
    root.style.fontSize = scale + '%';
    fontVal.textContent = scale + '%';
    localStorage.setItem(LS_FONT, String(scale));
  }
  document.getElementById('fontPlus').addEventListener('click', function () { scale += 10; applyFont(); });
  document.getElementById('fontMinus').addEventListener('click', function () { scale -= 10; applyFont(); });

  /* ---------- Reset ---------- */
  document.getElementById('a11yReset').addEventListener('click', function () {
    localStorage.removeItem(LS_FONT); localStorage.removeItem(LS_THEME);
    scale = 100; applyFont(); applyTheme(null);
  });

  /* ---------- Toggle panel ---------- */
  var toggle = document.getElementById('a11yToggle');
  var panel = document.getElementById('a11yPanel');
  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = panel.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.a11y-fab')) { panel.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { panel.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  });

  /* ---------- Restore saved prefs ---------- */
  var savedTheme = localStorage.getItem(LS_THEME);
  applyFont();
  if (savedTheme) { root.setAttribute('data-theme', savedTheme); markActive(savedTheme); }

  /* ---------- Mermaid: load from CDN + render once on a fixed light panel ---------- */
  var diagrams = Array.prototype.slice.call(document.querySelectorAll('.mermaid'));
  if (diagrams.length) {
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js';
    s.onload = function () {
      var p = { bg:'#ffffff', text:'#1a1f26', line:'#4b5563', actorBg:'#eef0ff', actorBorder:'#6b46e5', noteBg:'#6b46e5', noteText:'#ffffff' };
      mermaid.initialize({
        startOnLoad: false, securityLevel: 'loose', theme: 'base',
        themeVariables: {
          fontFamily: 'inherit', fontSize: '15px',
          background: p.bg, primaryColor: p.actorBg, primaryBorderColor: p.actorBorder,
          primaryTextColor: p.text, lineColor: p.line, textColor: p.text,
          actorBkg: p.actorBg, actorBorder: p.actorBorder, actorTextColor: p.text, actorLineColor: p.line,
          signalColor: p.line, signalTextColor: p.text,
          labelBoxBkgColor: p.actorBg, labelBoxBorderColor: p.actorBorder, labelTextColor: p.text, loopTextColor: p.text,
          noteBkgColor: p.noteBg, noteBorderColor: p.actorBorder, noteTextColor: p.noteText,
          activationBkgColor: p.actorBg, activationBorderColor: p.actorBorder, sequenceNumberColor: p.noteText,
          mainBkg: p.actorBg, nodeBorder: p.actorBorder, nodeTextColor: p.text,
          edgeLabelBackground: p.bg, clusterBkg: '#f6f7fb', clusterBorder: p.line, titleColor: p.text
        },
        sequence: { showSequenceNumbers: false, actorMargin: 42, mirrorActors: false, messageFontSize: 14, noteFontSize: 14 },
        flowchart: { curve: 'basis' }
      });
      try { mermaid.run({ nodes: diagrams }); } catch (e) {}
    };
    document.head.appendChild(s);
  }
})();
