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

  /* ---------- Detect language from the URL (/ai/mr/... = Marathi) ---------- */
  var path = location.pathname.replace(/index\.html$/, '');
  if (path.charAt(path.length - 1) !== '/') path += '/';
  var onAi = path.indexOf('/ai/') === 0;
  var isMr = path.indexOf('/ai/mr/') === 0;
  var T = isMr ? {
    reading: 'वाचन सेटिंग्ज', size: 'अक्षर आकार', theme: 'रंगसंगती',
    light: 'उजळ', dark: 'गडद', sepia: 'सेपिया', contrast: 'ठळक', reset: 'रीसेट'
  } : {
    reading: 'Reading settings', size: 'Text size', theme: 'Color theme',
    light: 'Light', dark: 'Dark', sepia: 'Sepia', contrast: 'Contrast', reset: 'Reset'
  };

  /* ---------- Inject reading widget ---------- */
  var fab = document.createElement('div');
  fab.className = 'a11y-fab';
  fab.innerHTML =
    '<div class="a11y-panel" id="a11yPanel" role="dialog" aria-label="' + T.reading + '">' +
      '<h5>' + T.size + '</h5>' +
      '<div class="a11y-row">' +
        '<button class="a11y-btn" id="fontMinus" aria-label="Decrease text size">A&minus;</button>' +
        '<span class="a11y-size" id="fontVal">100%</span>' +
        '<button class="a11y-btn" id="fontPlus" aria-label="Increase text size">A+</button>' +
      '</div>' +
      '<h5>' + T.theme + '</h5>' +
      '<div class="a11y-themes">' +
        '<button class="a11y-theme" data-set-theme="light"><span class="a11y-swatch" style="background:#ffffff"></span>' + T.light + '</button>' +
        '<button class="a11y-theme" data-set-theme="dark"><span class="a11y-swatch" style="background:#141a24"></span>' + T.dark + '</button>' +
        '<button class="a11y-theme" data-set-theme="sepia"><span class="a11y-swatch" style="background:#f4ecd8"></span>' + T.sepia + '</button>' +
        '<button class="a11y-theme" data-set-theme="contrast"><span class="a11y-swatch" style="background:#000;border-color:#fff"></span>' + T.contrast + '</button>' +
      '</div>' +
      '<div class="a11y-row" style="margin-bottom:0"><button class="a11y-btn" id="a11yReset">' + T.reset + '</button></div>' +
    '</div>' +
    '<button class="a11y-toggle" id="a11yToggle" aria-label="' + T.reading + '" aria-expanded="false" title="' + T.reading + '">Aa</button>';
  document.body.appendChild(fab);

  /* ---------- Inject language switcher (English default / Marathi) into the nav ---------- */
  if (onAi) {
    var navWrap = document.querySelector('nav .wrap');
    if (navWrap) {
      var enPath = isMr ? path.replace('/ai/mr/', '/ai/') : path;
      var mrPath = isMr ? path : path.replace('/ai/', '/ai/mr/');
      var ls = document.createElement('div');
      ls.className = 'lang-switch';
      ls.innerHTML =
        '<button class="lang-btn" id="langBtn" aria-haspopup="true" aria-expanded="false">🌐 <span>' + (isMr ? 'मराठी' : 'English') + '</span> ▾</button>' +
        '<div class="lang-menu" id="langMenu">' +
          '<a href="' + enPath + '"' + (!isMr ? ' class="active"' : '') + '>English</a>' +
          '<a href="' + mrPath + '"' + (isMr ? ' class="active"' : '') + '>मराठी</a>' +
        '</div>';
      navWrap.appendChild(ls);
      var lb = ls.querySelector('#langBtn'), lm = ls.querySelector('#langMenu');
      lb.addEventListener('click', function (e) { e.stopPropagation(); var o = lm.classList.toggle('open'); lb.setAttribute('aria-expanded', o ? 'true' : 'false'); });
      document.addEventListener('click', function (e) { if (!e.target.closest('.lang-switch')) { lm.classList.remove('open'); lb.setAttribute('aria-expanded', 'false'); } });
    }
  }

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

  /* ---------- Copy-code buttons on every code block ---------- */
  var codeBlocks = document.querySelectorAll('pre');
  Array.prototype.forEach.call(codeBlocks, function (pre) {
    if (pre.classList.contains('mermaid')) return;         // skip diagrams
    var codeEl = pre.querySelector('code') || pre;
    var text = codeEl.textContent;                          // capture BEFORE adding the button
    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Copy code');
    btn.textContent = 'Copy';
    btn.addEventListener('click', function () {
      var done = function () {
        btn.textContent = 'Copied'; btn.classList.add('copied');
        setTimeout(function () { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else { done(); }
    });
    pre.style.position = 'relative';
    pre.appendChild(btn);
  });

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
