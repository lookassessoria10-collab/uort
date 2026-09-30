/* UORT × LOOK — apresentação interativa */
(() => {
  'use strict';

  const D = window.DECK;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const pad = (n) => String(n).padStart(2, '0');
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
  const norm = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mqPortrait = matchMedia('(orientation: portrait) and (max-width: 1024px)');
  const mqLandscape = matchMedia('(orientation: landscape) and (max-height: 540px)');
  const store = {
    get(k) { try { return JSON.parse(sessionStorage.getItem('uort:' + k)); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem('uort:' + k, JSON.stringify(v)); } catch (e) { /* armazenamento indisponível */ } }
  };

  /* ---------- ícones ---------- */
  const ICONS = {
    arrowR: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowL: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    chevL: '<path d="M15 5l-7 7 7 7"/>',
    chevR: '<path d="M9 5l7 7-7 7"/>',
    chevD: '<path d="M5 9l7 7 7-7"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z"/>',
    play: '<path d="M8 5.5v13l10.5-6.5z" fill="currentColor" stroke="none"/>',
    pause: '<path d="M7.5 5h3v14h-3zM13.5 5h3v14h-3z" fill="currentColor" stroke="none"/>',
    list: '<path d="M9 6h12M9 12h12M9 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
    grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.6"/>',
    compare: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M12 2v20M8.5 9.5 6 12l2.5 2.5M15.5 9.5 18 12l-2.5 2.5"/>',
    columns: '<rect x="3" y="4" width="7.5" height="16" rx="2"/><rect x="13.5" y="4" width="7.5" height="16" rx="2"/>',
    arrowsH: '<path d="M8.5 7 3.5 12l5 5M15.5 7l5 5-5 5"/>',
    quiz: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.2a2.5 2.5 0 1 1 3.4 2.3c-.7.3-1 .9-1 1.6v.4M12 16.8h.01"/>',
    home: '<path d="M3.5 11 12 4l8.5 7M5.5 9.5V20h13V9.5M10 20v-5h4v5"/>',
    expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    zoom: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4M11 8v6M8 11h6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    volume: '<path d="M4 9.5v5h3.5l5 4v-13l-5 4z"/><path d="M16 9a4.5 4.5 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',
    radio: '<rect x="3" y="8" width="18" height="12" rx="2.5"/><path d="M7 8l10-4.5"/><circle cx="15.5" cy="14" r="2.6"/><path d="M6.5 12.5h4M6.5 15.5h4"/>',
    route: '<circle cx="6" cy="19" r="2.2"/><circle cx="18" cy="5" r="2.2"/><path d="M8.2 19H16a3.5 3.5 0 0 0 0-7H8a3.5 3.5 0 0 1 0-7h7.8"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
    check: '<path d="M5 12.5 9.5 17 19 7.5"/>',
    hand: '<path d="M9 11.5V5.5a1.5 1.5 0 0 1 3 0v5M12 10V8.5a1.5 1.5 0 0 1 3 0V11M15 10.5a1.5 1.5 0 0 1 3 0v4a6.5 6.5 0 0 1-6.5 6.5h-.6a6 6 0 0 1-4.9-2.5l-2.4-3.4a1.5 1.5 0 0 1 2.3-1.9L9 15.5"/>',
    rotate: '<rect x="7" y="2.5" width="10" height="19" rx="2.2"/><path d="M11 18.5h2"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.8-3.8M4 3.5v4h4M4 13a8 8 0 0 0 14.8 3.8M20 20.5v-4h-4"/>',
    whatsapp: '<path d="M3.6 20.4l1.3-4.1a8.4 8.4 0 1 1 3 3z"/><path d="M9.2 8.3c.2 3.3 3.2 6.3 6.5 6.5l.9-1.5-2-1-1 .8a4.6 4.6 0 0 1-2.7-2.7l.8-1-1-2z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    insta: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.2 6.8h.01"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2.2"/><path d="m3.6 6.6 8.4 6.4 8.4-6.4"/>',
    chart: '<path d="M4 20V4M4 20h16"/><path d="m8 15 3.5-4 3 2.5L20 7"/>',
    pen: '<path d="M12 3 18 10 12 21 6 10z"/><circle cx="12" cy="11" r="1.8"/><path d="M12 3v6.2"/>',
    megaphone: '<path d="M3.5 10.5v3a1 1 0 0 0 1 1H7l7.5 4.5v-14L7 9.5H4.5a1 1 0 0 0-1 1z"/><path d="M18 9a4 4 0 0 1 0 6M7.5 14.5l1.2 5H11l-1-4.6"/>',
    coins: '<ellipse cx="9" cy="7" rx="5.5" ry="2.5"/><path d="M3.5 7v4c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5V7M3.5 11v4c0 1.4 2.5 2.5 5.5 2.5"/><circle cx="16.5" cy="16.5" r="4.5"/>',
    tv: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M8 21h8M12 18v3M9 2.5l3 3 3-3"/>',
    activity: '<path d="M3 12h4l3-7 4 14 3-7h4"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'
  };
  const icon = (name, cls = '') => `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;

  /* ---------- lâminas ---------- */
  const S = (n) => D.slides[n];
  const chapterOf = (n) => D.chapters.find((c) => n >= c.from && n <= c.to);
  const imgNo = (n) => S(n).img || n;
  const isHtml = (n) => !!S(n).html;
  const srcOf = (n, size) => `assets/${{ l: 'slides', m: 'slides-m', t: 'slides-t' }[size]}/s${pad(imgNo(n))}.jpg`;
  const minutes = (count) => Math.max(1, Math.round(count * D.minutesPerSlide));
  const numbered = D.chapters.filter((c) => /^\d+$/.test(c.n) && c.n !== '00');

  /* lâmina "página": landing page rolável dentro de uma janela de navegador (desenhada em 1920×1080) */
  function pageSlide(s) {
    const p = s.page;
    const el = document.createElement('div');
    el.className = 'hs pg';
    el.innerHTML = `<svg class="hs-deco" viewBox="0 0 1920 1080" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 905C380 1010 760 1062 1180 1080H0Z" fill="#eef9fa"/>
        <path d="M1490 0C1600 150 1730 252 1920 302V0Z" fill="url(#g-swoosh)"/>
        <path d="M1350 0C1560 232 1742 362 1920 404" fill="none" stroke="#7fdce4" stroke-width="2.5" opacity=".75"/>
      </svg>
      <div class="pg-copy">
        <div class="hs-label">Mídia online · Landing page</div>
        <h2 class="pg-h">Página de<br><em>especialidade</em></h2>
        <div class="hs-bar"></div>
        <p class="pg-sub">Modelo de página para as campanhas: quem clica no anúncio chega a uma página feita para a sua dor, com tratamentos, especialista e agendamento.</p>
        <ol class="pg-secs">${p.sections.map((x, i) => `<li><button type="button" class="pg-sec${i ? '' : ' on'}" data-y="${x.y}"><span class="n">${pad(i + 1)}</span><span><b>${esc(x.t)}</b><small>${esc(x.d)}</small></span></button></li>`).join('')}</ol>
        <p class="pg-tip">${icon('hand')} Role a página na janela ao lado</p>
      </div>
      <div class="pg-win">
        <div class="pg-bar"><i></i><i></i><i></i><span class="pg-url">${icon('lock')}${esc(p.url)}</span></div>
        <div class="pg-view" tabindex="0" aria-label="${esc(s.t)} — role para ver a página"><img src="${p.src}" width="${p.w}" height="${p.h}" alt="${esc(s.d)}" draggable="false"></div>
        <div class="pg-cue">${icon('chevD')} Role para ver a página</div>
      </div>`;
    const view = $('.pg-view', el), img = $('img', view), secs = $$('.pg-sec', el);
    const k = () => img.offsetHeight / p.h;   // escala da imagem dentro da janela
    el.addEventListener('click', (e) => {
      const b = e.target.closest('.pg-sec');
      if (b) view.scrollTo({ top: +b.dataset.y * k(), behavior: reduced ? 'auto' : 'smooth' });
    });
    view.addEventListener('scroll', () => {
      el.classList.toggle('scrolled', view.scrollTop > 30);
      const at = view.scrollTop + view.clientHeight * .35;
      let cur = 0; p.sections.forEach((x, i) => { if (x.y * k() <= at) cur = i; });
      if (view.scrollTop + view.clientHeight >= view.scrollHeight - 2) cur = p.sections.length - 1;
      secs.forEach((b, i) => b.classList.toggle('on', i === cur));
    }, { passive: true });
    return el;
  }
  const renderHs = (s) => (s.html === 'page' ? pageSlide(s) : TV.render(s));

  // lâminas HTML (TV e página): escala automática para qualquer largura
  const ro = new ResizeObserver((entries) => {
    for (const e of entries) if (e.contentRect.width) e.target.style.setProperty('--s', e.contentRect.width / 1920);
  });
  function hsHost(n, width) {
    const host = document.createElement('div');
    host.className = 'hs-host';
    if (width) host.style.setProperty('--s', width / 1920);
    host.append(renderHs(S(n)));
    ro.observe(host);
    return host;
  }
  const thumb = (n) => isHtml(n)
    ? `<div class="hs-host" data-hs="${n}"></div>`
    : `<img src="${srcOf(n, 't')}" alt="" loading="lazy" decoding="async">`;
  function mountMinis(root) {
    $$('[data-hs]', root).forEach((el) => {
      if (el.firstChild) return;
      el.append(renderHs(S(+el.dataset.hs)));
      el.inert = true;   // miniatura: só imagem, sem foco nem cliques internos
      ro.observe(el);
    });
  }

  /* ---------- toast ---------- */
  const toast = (() => {
    const el = $('#toast'); let t;
    return (msg, ms = 2800) => { el.innerHTML = msg; el.classList.add('show'); clearTimeout(t); t = setTimeout(() => el.classList.remove('show'), ms); };
  })();

  /* ---------- contatos ---------- */
  const CONTACT = [
    { icon: 'whatsapp', label: 'WhatsApp', text: '71 99154-9332', href: 'https://wa.me/5571991549332' },
    { icon: 'globe', label: 'Site', text: 'lookassessoria.com.br', href: 'https://lookassessoria.com.br' },
    { icon: 'insta', label: 'Instagram', text: '@lookassessoria', href: 'https://www.instagram.com/lookassessoria' },
    { icon: 'mail', label: 'E-mail', text: 'contato@lookassessoria.com.br', href: 'mailto:contato@lookassessoria.com.br' }
  ];
  const ext = (href) => href.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
  // botão da ferramenta de análise funcional (lâminas "Onde dói?" e Análise de Movimento)
  const toolCta = (cls) => `<a class="${cls}" href="${D.tool.url}"${ext(D.tool.url)}><span class="ic">${icon('activity')}</span><span><b>${esc(D.tool.title)}</b><small>${esc(D.tool.label)}</small></span>${icon('external')}</a>`;

  /* ==========================================================================
     ÁUDIO
     ========================================================================== */
  const audio = (() => {
    const els = {}; let playing = null; let raf = 0;
    const fmt = (s) => (isFinite(s) ? `${Math.floor(s / 60)}:${pad(Math.floor(s % 60))}` : '0:—');
    function get(id) {
      if (!els[id]) {
        const a = new Audio(D.audios.find((x) => x.id === id).src);
        a.preload = 'metadata';
        a.addEventListener('loadedmetadata', () => update(id));
        a.addEventListener('ended', () => { a.currentTime = 0; if (playing === id) playing = null; update(id); });
        a.addEventListener('pause', () => update(id));
        els[id] = a;
      }
      return els[id];
    }
    function update(id) {
      const a = els[id]; if (!a) return;
      const frac = a.duration ? a.currentTime / a.duration : 0;
      $$(`.player[data-id="${id}"]`).forEach((p) => {
        const on = !a.paused;
        p.classList.toggle('is-playing', on);
        const btn = $('.pl-btn', p);
        if (btn.dataset.state !== String(on)) {
          btn.dataset.state = String(on);
          btn.setAttribute('aria-label', (on ? 'Pausar ' : 'Ouvir ') + btn.dataset.name);
        }
        const bars = p.querySelectorAll('.pl-wave i'); const lit = Math.round(frac * bars.length);
        bars.forEach((b, i) => b.classList.toggle('on', i < lit));
        $('.pl-wave', p).setAttribute('aria-valuenow', Math.round(frac * 100));
        $('.pl-time', p).textContent = `${fmt(a.currentTime)} / ${fmt(a.duration)}`;
      });
    }
    function loop() {
      cancelAnimationFrame(raf);
      const step = () => { if (!playing) return; update(playing); raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step);
    }
    function toggle(id) {
      const a = get(id);
      if (playing && playing !== id) { els[playing].pause(); update(playing); }
      if (a.paused) {
        const p = a.play(); playing = id; loop();
        if (p && p.catch) p.catch(() => { playing = null; update(id); toast('Não foi possível reproduzir o áudio neste navegador.'); });
      } else { a.pause(); playing = null; }
      update(id);
    }
    function seek(id, frac) { const a = get(id); if (a.duration) { a.currentTime = clamp(frac, 0, 1) * a.duration; update(id); } }
    function stopAll() { Object.keys(els).forEach((id) => { els[id].pause(); update(id); }); playing = null; }
    function sync() { D.audios.forEach((x) => { get(x.id); update(x.id); }); }

    const bars = (seed, n = 46) => Array.from({ length: n }, (_, i) => {
      const env = Math.sin((i / (n - 1)) * Math.PI) * .55 + .45;
      const v = Math.abs(Math.sin(i * .9 + seed) * Math.cos(i * .37 + seed * 1.7));
      return `<i style="--h:${Math.round(18 + 82 * env * (.35 + .65 * v))}%"></i>`;
    }).join('');
    const player = (a) => `<div class="player" data-id="${a.id}">
      <button class="pl-btn" data-state="false" data-name="${esc(a.radio)}" aria-label="Ouvir ${esc(a.radio)}">${icon('play', 'i-play')}${icon('pause', 'i-pause')}</button>
      <div class="pl-body">
        <div class="pl-top"><strong>${esc(a.radio)}</strong><span class="pl-tag">Testemunhal BTN</span></div>
        <div class="pl-wave" role="slider" tabindex="0" aria-label="Posição do áudio ${esc(a.radio)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">${bars(a.seed)}</div>
        <div class="pl-time">0:00 / 0:—</div>
      </div>
    </div>`;
    const block = () => `<div class="audio-block">
      <div class="ab-head"><span class="bub">${icon('radio')}</span><div><strong>Ouça o formato na prática</strong><span>Testemunhais reais veiculados junto aos boletins de trânsito da BandNews FM e da Jovem Pan FM — é assim que a mensagem da UORT entra na BTN.</span></div></div>
      ${D.audios.map(player).join('')}
      <p class="ab-note">Áudios de referência de outro anunciante, usados apenas para ilustrar o formato.</p>
    </div>`;

    // interação (delegada)
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.pl-btn');
      if (btn) { toggle(btn.closest('.player').dataset.id); }
    });
    document.addEventListener('pointerdown', (e) => {
      const w = e.target.closest('.pl-wave'); if (!w) return;
      const id = w.closest('.player').dataset.id;
      const at = (ev) => { const r = w.getBoundingClientRect(); seek(id, (ev.clientX - r.left) / r.width); };
      at(e); w.setPointerCapture(e.pointerId);
      const mv = (ev) => at(ev);
      const up = () => { w.removeEventListener('pointermove', mv); w.removeEventListener('pointerup', up); };
      w.addEventListener('pointermove', mv); w.addEventListener('pointerup', up);
    });
    document.addEventListener('keydown', (e) => {
      const w = e.target.closest && e.target.closest('.pl-wave'); if (!w) return;
      const a = get(w.closest('.player').dataset.id); if (!a.duration) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault(); e.stopPropagation();
        seek(w.closest('.player').dataset.id, (a.currentTime + (e.key === 'ArrowRight' ? 1 : -1)) / a.duration);
      }
    }, true);

    return { block, stopAll, sync };
  })();

  /* ==========================================================================
     ZOOM (lâmina ou imagem ampliada, com pinça)
     ========================================================================== */
  const zoom = (() => {
    const dlg = $('#zoom'), sc = $('.zoom-scroll', dlg), content = $('.zoom-content', dlg), tip = $('.zoom-tip', dlg);
    $('.js-zin', dlg).innerHTML = icon('plus');
    $('.js-zout', dlg).innerHTML = icon('minus');
    $('.js-zclose', dlg).innerHTML = icon('close');
    let z = 1, ratio = 16 / 9, tipT;
    const baseW = () => Math.min(innerWidth, innerHeight * ratio);
    function layout() { content.style.setProperty('--base-w', baseW() + 'px'); content.style.setProperty('--ratio', ratio); }
    function set(v, cx = innerWidth / 2, cy = innerHeight / 2) {
      const nz = clamp(v, 1, 4); if (Math.abs(nz - z) < .001) return;
      const r = content.getBoundingClientRect();
      const fx = (cx - r.left) / r.width, fy = (cy - r.top) / r.height;
      z = nz; content.style.setProperty('--z', z);
      const nr = content.getBoundingClientRect();
      sc.scrollLeft += (nr.left + fx * nr.width) - cx;
      sc.scrollTop += (nr.top + fy * nr.height) - cy;
    }
    function show() {
      z = 1; content.style.setProperty('--z', 1); layout();
      if (!dlg.open) dlg.showModal();
      sc.scrollTo(0, 0);
      tip.hidden = false; clearTimeout(tipT); tipT = setTimeout(() => { tip.hidden = true; }, 2600);
    }
    function openSlide(n) {
      ratio = 16 / 9; content.innerHTML = '';
      if (isHtml(n)) content.append(hsHost(n, baseW()));
      else { const img = new Image(); img.src = srcOf(n, 'l'); img.alt = S(n).t; img.draggable = false; content.append(img); }
      show();
    }
    function openImage(src, alt, r) {
      ratio = r; content.innerHTML = '';
      const img = new Image(); img.src = src; img.alt = alt; img.draggable = false; content.append(img);
      show();
    }
    const close = () => dlg.close();
    dlg.addEventListener('close', () => { content.innerHTML = ''; });
    $('.js-zin', dlg).addEventListener('click', () => set(z + .75));
    $('.js-zout', dlg).addEventListener('click', () => set(z - .75));
    $('.js-zclose', dlg).addEventListener('click', close);
    dlg.addEventListener('click', (e) => { if (e.target === sc && z === 1) close(); });
    sc.addEventListener('dblclick', (e) => set(z > 1.2 ? 1 : 2.5, e.clientX, e.clientY));
    sc.addEventListener('wheel', (e) => { if (e.ctrlKey) { e.preventDefault(); set(z * (e.deltaY < 0 ? 1.12 : .89), e.clientX, e.clientY); } }, { passive: false });
    // pinça + toque duplo
    let pinch = null, lastTap = 0, tapStart = null;
    const dist = (t) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
    const mid = (t) => ({ x: (t[0].clientX + t[1].clientX) / 2, y: (t[0].clientY + t[1].clientY) / 2 });
    sc.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) { pinch = { d: dist(e.touches), z }; content.classList.add('pinching'); tapStart = null; }
      else if (e.touches.length === 1) tapStart = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now() };
    }, { passive: true });
    sc.addEventListener('touchmove', (e) => {
      if (pinch && e.touches.length === 2) { e.preventDefault(); const m = mid(e.touches); set(pinch.z * dist(e.touches) / pinch.d, m.x, m.y); }
      else if (tapStart && e.touches.length === 1 && Math.hypot(e.touches[0].clientX - tapStart.x, e.touches[0].clientY - tapStart.y) > 10) tapStart = null;
    }, { passive: false });
    sc.addEventListener('touchend', (e) => {
      if (e.touches.length < 2 && pinch) { pinch = null; content.classList.remove('pinching'); }
      if (tapStart && e.touches.length === 0 && Date.now() - tapStart.t < 300) {
        const now = Date.now();
        if (now - lastTap < 320) { e.preventDefault(); set(z > 1.2 ? 1 : 2.5, tapStart.x, tapStart.y); lastTap = 0; } else lastTap = now;
      }
      tapStart = null;
    });
    addEventListener('resize', () => { if (dlg.open) layout(); });
    return { openSlide, openImage, isOpen: () => dlg.open, inc: () => set(z + .5), dec: () => set(z - .5) };
  })();

  /* ==========================================================================
     ROTEAMENTO
     ========================================================================== */
  const views = { home: $('#home'), guide: $('#guide'), viewer: $('#viewer'), mural: $('#mural'), quiz: $('#quiz') };
  const TITLES = { home: 'UORT · Estratégia de Marca, Comunicação e Crescimento', guide: 'Monte sua trilha · UORT', mural: 'Mural UORT · antes × depois', quiz: 'Teste seus conhecimentos · UORT' };
  let current = null, previous = null, internalNavs = 0;

  function showView(name) {
    if (current === name) return;
    previous = current; current = name;
    Object.entries(views).forEach(([k, el]) => el.classList.toggle('is-active', k === name));
    document.body.dataset.view = name;
    if (name !== 'viewer') { audio.stopAll(); if (TITLES[name]) document.title = TITLES[name]; }
    if (name === 'home') home.refresh();
    window.scrollTo(0, 0);
  }
  function parse() {
    const raw = decodeURIComponent(location.hash.replace(/^#/, ''));
    const [name, arg] = raw.split('/');
    return { name: name || 'inicio', arg };
  }
  function route() {
    const { name, arg } = parse();
    if (name === 'sumario') { if (!current) showView('home'); toc.open(); return; }
    toc.close();
    if (zoom.isOpen()) $('#zoom').close();
    switch (name) {
      case 's': showView('viewer'); viewer.go(parseInt(arg, 10) || 1); break;
      case 'guia': showView('guide'); guide.show(arg); break;
      case 'mural': {
        const origin = current === 'viewer' ? viewer.cur() : current === 'mural' ? undefined : null;
        showView('mural'); mural.enter(parseInt(arg, 10) || 1, origin); break;
      }
      case 'quiz': showView('quiz'); quiz.show(); break;
      default: showView('home');
    }
  }
  function nav(hash, { replace = false } = {}) {
    if (replace) { history.replaceState(null, '', '#' + hash); route(); }
    else if (location.hash === '#' + hash) route();
    else location.hash = hash;
  }
  function back(fallback) { if (internalNavs > 0) history.back(); else nav(fallback, { replace: true }); }
  addEventListener('hashchange', () => { internalNavs++; route(); });

  /* ==========================================================================
     INÍCIO
     ========================================================================== */
  const home = (() => {
    const el = views.home;
    const waves = `<svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="hb-core" cx="64%" cy="40%" r="78%"><stop offset="0" stop-color="#086579"/><stop offset=".42" stop-color="#043f50"/><stop offset=".78" stop-color="#022029"/><stop offset="1" stop-color="#011215"/></radialGradient>
        <linearGradient id="hb-rim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ff8ff" stop-opacity="0"/><stop offset=".5" stop-color="#6ff4fd"/><stop offset="1" stop-color="#35e8f2" stop-opacity="0"/></linearGradient>
        <linearGradient id="hb-fl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0d8ea3" stop-opacity=".75"/><stop offset="1" stop-color="#06495c" stop-opacity=".12"/></linearGradient>
        <linearGradient id="hb-fr" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#1bb7c9" stop-opacity=".7"/><stop offset="1" stop-color="#06495c" stop-opacity=".08"/></linearGradient>
        <filter id="hb-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect width="1440" height="900" fill="url(#hb-core)"/>
      <g class="wv-left">
        <path d="M0 60C190 200 300 420 230 620C185 750 90 840 0 900Z" fill="url(#hb-fl)"/>
        <path d="M0 60C190 200 300 420 230 620C185 750 90 840 0 900" fill="none" stroke="url(#hb-rim)" stroke-width="3" filter="url(#hb-glow)"/>
        <path d="M0 250C120 360 170 500 120 640C95 710 50 770 0 810" fill="none" stroke="#35e8f2" stroke-opacity=".25" stroke-width="1.5"/>
      </g>
      <g class="wv-right">
        <path d="M1120 0C1200 170 1300 280 1440 330V0Z" fill="url(#hb-fr)"/>
        <path d="M1120 0C1200 170 1300 280 1440 330" fill="none" stroke="url(#hb-rim)" stroke-width="3" filter="url(#hb-glow)"/>
        <path d="M1440 470C1330 560 1270 720 1320 900H1440Z" fill="url(#hb-fr)" opacity=".7"/>
        <path d="M1440 470C1330 560 1270 720 1320 900" fill="none" stroke="url(#hb-rim)" stroke-width="2.5" filter="url(#hb-glow)"/>
      </g>
      <path class="wv-line" d="M-40 760C260 640 520 860 860 700S1260 500 1480 590" fill="none" stroke="#35e8f2" stroke-opacity=".28" stroke-width="1.4"/>
      <path class="wv-line" d="M-40 820C300 720 600 900 920 780S1300 610 1480 680" fill="none" stroke="#9ff3f7" stroke-opacity=".14" stroke-width="1.2"/>
    </svg>`;

    const act = (href, ic, title, sub, cls = '', attrs = '') =>
      `<a class="act ${cls}" href="${href}" ${attrs}><span class="bub">${icon(ic)}</span><span><b>${title}</b><small>${sub}</small></span>${icon('arrowR', 'go')}</a>`;

    el.innerHTML = `
      <div class="hero">
        <div class="hero-bg">${waves}</div>
        <header class="brandbar">
          <img class="uort" src="assets/brand/uort-white.png" alt="UORT — Ortopedia &amp; Traumatologia" width="339" height="144">
          <span class="sep" aria-hidden="true"></span>
          <img class="look" src="assets/brand/look-white.png" alt="LOOK Assessoria de Comunicação" width="443" height="215">
          <span class="tag">Movimento para<br>uma vida melhor</span>
        </header>
        <div class="hero-grid">
          <div class="hero-copy">
            <span class="eyebrow">Estratégia de</span>
            <h1>Marca,<br>comunicação<br>e crescimento</h1>
            <div class="accent-bar"></div>
            <p class="lede">Uma nova forma de apresentar a estrutura, os especialistas e as possibilidades de cuidado da UORT.</p>
            <p class="prompt">Escolha como quer explorar:</p>
            <div class="actions">
              ${act('#guia', 'spark', 'O que você quer saber?', 'Responda 2 perguntas e receba uma trilha feita para você', 'primary')}
              ${act('#s/1', 'play', 'Ver apresentação completa', `${D.total} lâminas · ${numbered.length} capítulos · ~${minutes(D.total)} min`, '', 'data-full')}
              ${act('#sumario', 'grid', 'Sumário', 'Pule direto para um capítulo ou busque um tema')}
              ${act('#mural/1', 'compare', 'Mural: antes × depois', 'Compare a evolução visual do mural UORT')}
              ${act('#quiz', 'quiz', 'Teste seus conhecimentos', `${D.quiz.length} perguntas rápidas sobre a estratégia`)}
            </div>
            <div class="resume"></div>
            <div class="faq">
              <p class="faq-label">Perguntas rápidas</p>
              <div class="faq-list">${D.faq.map((f) => `<a class="chip" href="#s/${f.to}" data-full>${icon('arrowR')}${esc(f.q)}</a>`).join('')}</div>
            </div>
          </div>
          <div class="hero-visual" aria-hidden="true">
            <svg class="bigU" viewBox="0 0 200 250"><path d="M28 0V140a72 72 0 0 0 144 0V0" fill="none" stroke="url(#g-u)" stroke-width="40"/></svg>
            <div class="glow-floor"></div>
            <div class="stack">
              <div class="sl s3"><img src="${srcOf(19, 'm')}" alt=""></div>
              <div class="sl s2"><img src="${srcOf(11, 'm')}" alt=""></div>
              <div class="sl s1"><img src="${srcOf(1, 'm')}" alt="" fetchpriority="high"></div>
            </div>
            <span class="float-pill p1">${icon('route')} Trilha personalizada</span>
            <span class="float-pill p2">${icon('compare')} Mural antes × depois</span>
            <span class="float-pill p3">${icon('volume')} Áudios de rádio</span>
          </div>
        </div>
        <button class="scroll-cue js-scroll">Conheça os capítulos ${icon('chevD')}</button>
      </div>

      <section class="light chapters" id="capitulos">
        <svg class="deco" style="right:0;top:0;width:min(620px,70vw)" viewBox="0 0 620 380" aria-hidden="true">
          <path d="M190 0C290 150 440 250 620 282V0Z" fill="url(#g-swoosh)"/>
          <path d="M70 0C260 220 450 320 620 352" fill="none" stroke="#7fdce4" stroke-width="2"/>
          <path d="M420 0C490 70 560 110 620 128" fill="none" stroke="#fff" stroke-width="2.5" opacity=".7"/>
        </svg>
        <div class="sec-wrap">
          <span class="sec-label">Sumário</span>
          <h2 class="sec-title">Da estratégia<br><em>à execução.</em></h2>
          <p class="sec-lede">${numbered.length} capítulos, do diagnóstico à mídia. Escolha um capítulo para começar por ele.</p>
          <div class="chap-grid">
            ${numbered.map((c) => `<a class="chap" href="#s/${c.from}" data-full>
              <span class="th">${thumb(c.cover)}<span class="n">${c.n}</span></span>
              <span class="body"><span class="t">${esc(c.title)}</span><span class="d">${esc(c.desc)}</span>
              <span class="meta"><span>${c.to - c.from + 1} lâmina${c.to > c.from ? 's' : ''}</span><span>Começar ${icon('arrowR')}</span></span></span>
            </a>`).join('')}
          </div>
        </div>
      </section>

      <section class="features">
        <div class="sec-wrap">
          <span class="eyebrow">Recursos interativos</span>
          <h2 class="sec-title" style="color:#fff">Explore além<br><em style="color:var(--cyan)">das lâminas.</em></h2>
          <div class="feat-grid">
            <a class="feat feat-mural" href="#mural/1">
              <span class="k">Nova identidade</span><h3>Mural UORT: antes × depois</h3>
              <p>Arraste a linha e compare as 7 páginas do mural anterior com o novo.</p>
              <span class="cta">Comparar agora ${icon('arrowR')}</span>
              <span class="viz"><img src="assets/mural/t/antigo-04.jpg" alt=""><img src="assets/mural/t/novo-04.jpg" alt=""></span>
            </a>
            <a class="feat feat-audio" href="#s/52" data-full>
              <span class="k">Mídia offline</span><h3>Ouça a BTN na prática</h3>
              <p>Testemunhais reais veiculados nos boletins de trânsito da BandNews FM e da Jovem Pan FM.</p>
              <span class="cta">Ouvir na lâmina 52 ${icon('arrowR')}</span>
              <span class="viz">${Array.from({ length: 16 }, (_, i) => `<i style="--h:${30 + Math.round(Math.abs(Math.sin(i * 1.3)) * 70)}%;--d:${(i * .09).toFixed(2)}s"></i>`).join('')}</span>
            </a>
            <a class="feat feat-quiz" href="#quiz">
              <span class="k">Desafio</span><h3>Teste seus conhecimentos</h3>
              <p>${D.quiz.length} perguntas sobre conceito, ações e mídia — com link para a lâmina de cada resposta.</p>
              <span class="cta">Começar ${icon('arrowR')}</span>
              <span class="viz">?</span>
            </a>
          </div>
        </div>
      </section>

      <footer class="footer">
        <div class="sec-wrap">
          <img src="assets/brand/look-white.png" alt="LOOK Assessoria de Comunicação" width="443" height="215">
          <p class="tagline">Um olhar <em>diferente.</em></p>
          <div class="contacts">${CONTACT.map((c) => `<a href="${c.href}"${ext(c.href)}>${c.text}</a>`).join('')}</div>
        </div>
      </footer>`;

    mountMinis(el);
    el.addEventListener('click', (e) => {
      if (e.target.closest('.js-scroll')) $('#capitulos').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    });
    function refresh() {
      const last = store.get('lastSlide');
      $('.resume', el).innerHTML = last && last > 1
        ? `<a class="chip" href="#s/${last}">${icon('play')} Continuar de onde parou · lâmina ${last}</a>` : '';
    }
    return { refresh };
  })();

  /* ==========================================================================
     TRILHA GUIADA
     ========================================================================== */
  let trail = store.get('trail');

  const guide = (() => {
    const el = views.guide;
    const st = Object.assign({ focus: null, topics: [], mode: 'essencial' }, store.get('guide') || {});
    const save = () => store.set('guide', st);

    function build() {
      const set = new Set([1]);
      D.topics.filter((t) => st.topics.includes(t.id)).forEach((t) => {
        (st.mode === 'essencial' ? t.key : range(t.from, t.to)).forEach((n) => set.add(n));
      });
      set.add(D.total);
      return Array.from(set).sort((a, b) => a - b);
    }
    function frame(label, pct, inner, foot = '') {
      el.innerHTML = `
        <header class="g-top">
          <button class="ibtn js-gback" aria-label="Voltar">${icon('arrowL')}</button>
          <div class="g-steps"><span>${label}</span><div class="g-bar"><i style="--p:${pct}%"></i></div></div>
          <a class="ibtn" href="#inicio" aria-label="Fechar e voltar ao início">${icon('close')}</a>
        </header>
        <div class="g-body">${inner}</div>${foot}`;
      mountMinis(el);
    }
    function step1() {
      frame('Passo 1 de 2', 50, `
        <span class="eyebrow">Trilha personalizada</span>
        <h2 style="margin-top:14px">O que você quer <em>saber?</em></h2>
        <p class="g-lede">Escolha um foco. Na próxima etapa você ajusta os temas e o tempo — e a gente monta a trilha.</p>
        <div class="opts">${D.focus.map((f) => `<button class="opt${st.focus === f.id ? ' is-on' : ''}" data-focus="${f.id}"><span class="bub">${icon(f.icon)}</span><span><b>${f.title}</b><small>${f.desc}</small></span></button>`).join('')}</div>
        <a class="g-alt" href="#s/1" data-full>Prefiro ver tudo, do início ${icon('arrowR')}</a>`);
    }
    function summary() {
      const n = build().length;
      return `<p class="g-sum"><b>${n}</b> lâminas · ~${minutes(n)} min</p>`;
    }
    function step2() {
      frame('Passo 2 de 2', 100, `
        <h2>Monte sua <em>trilha.</em></h2>
        <p class="g-lede">Deixamos marcados os temas ligados ao seu foco. Marque ou desmarque o que quiser.</p>
        <div class="topic-grid">${D.topics.map((t) => `<button class="tchip" data-topic="${t.id}" aria-pressed="${st.topics.includes(t.id)}"><span class="box">${icon('check')}</span><span>${esc(t.label)} <small>· ${t.to - t.from + 1} lâmina${t.to > t.from ? 's' : ''}</small></span></button>`).join('')}</div>
        <p class="g-sub">Quanto tempo você tem?</p>
        <div class="seg" role="group" aria-label="Duração da trilha">
          <button data-mode="essencial" aria-pressed="${st.mode === 'essencial'}"><b>Essencial</b><small>Só as lâminas-chave</small></button>
          <button data-mode="completa" aria-pressed="${st.mode === 'completa'}"><b>Completa</b><small>Todas as lâminas dos temas</small></button>
        </div>`,
      `<div class="g-foot"><div class="g-foot-in"><div class="js-sum">${summary()}</div><button class="btn btn-primary js-build"${st.topics.length ? '' : ' disabled'}>Ver minha trilha ${icon('arrowR')}</button></div></div>`);
    }
    function step3() {
      if (!st.topics.length) return nav('guia', { replace: true });
      const slides = build();
      frame('Sua trilha', 100, `
        <span class="eyebrow">Tudo pronto</span>
        <h2 style="margin-top:14px">Sua trilha está <em>pronta.</em></h2>
        <p class="g-lede">Começa pela capa, passa pelos temas escolhidos e termina no contato. Você pode sair da trilha a qualquer momento.</p>
        <div class="trail-stats">
          <span>${icon('list')}<b>${slides.length}</b> lâminas</span>
          <span>${icon('clock')}<b>~${minutes(slides.length)}</b> min</span>
          <span>${icon('route')}<b>${st.topics.length}</b> tema${st.topics.length > 1 ? 's' : ''}</span>
        </div>
        <div class="trail-list">${slides.map((n) => `<button class="trail-item" data-start="${n}"><span class="th">${thumb(n)}</span><span><b>${esc(S(n).t)}</b><small>${esc(chapterOf(n).title)} · lâmina ${n}</small></span></button>`).join('')}</div>`,
      `<div class="g-foot"><div class="g-foot-in"><a class="btn btn-ghost" href="#guia/temas">Ajustar</a><button class="btn btn-primary js-start" data-start="${slides[0]}">${icon('play')} Começar trilha</button></div></div>`);
    }
    function start(at) {
      trail = { slides: build(), topics: st.topics.slice(), mode: st.mode };
      store.set('trail', trail);
      nav('s/' + at);
    }
    el.addEventListener('click', (e) => {
      const f = e.target.closest('[data-focus]');
      if (f) { const x = D.focus.find((o) => o.id === f.dataset.focus); st.focus = x.id; st.topics = x.topics.slice(); save(); nav('guia/temas'); return; }
      const t = e.target.closest('[data-topic]');
      if (t) {
        const id = t.dataset.topic; const on = !st.topics.includes(id);
        st.topics = on ? st.topics.concat(id) : st.topics.filter((x) => x !== id); save();
        t.setAttribute('aria-pressed', on);
        $('.js-sum', el).innerHTML = summary(); $('.js-build', el).disabled = !st.topics.length; return;
      }
      const m = e.target.closest('[data-mode]');
      if (m) { st.mode = m.dataset.mode; save(); $$('[data-mode]', el).forEach((b) => b.setAttribute('aria-pressed', b === m)); $('.js-sum', el).innerHTML = summary(); return; }
      if (e.target.closest('.js-build')) return nav('guia/trilha');
      const s = e.target.closest('[data-start]');
      if (s) return start(+s.dataset.start);
      if (e.target.closest('.js-gback')) return back('inicio');
    });
    function show(arg) { if (arg === 'temas') step2(); else if (arg === 'trilha') step3(); else step1(); window.scrollTo(0, 0); }
    return { show };
  })();

  /* ==========================================================================
     VISUALIZADOR
     ========================================================================== */
  const viewer = (() => {
    const el = views.viewer;
    el.innerHTML = `
      <header class="v-top">
        <a class="v-home" href="#inicio" aria-label="Voltar ao início"><img src="assets/brand/uort-white.png" alt="UORT" width="339" height="144"></a>
        <div class="v-chapter"><span class="n"></span><span class="t"></span></div>
        <div class="v-trail" hidden>${icon('route')}<span class="lbl"></span><button class="js-trail"></button></div>
        <div class="v-tools">
          <button class="ibtn js-toc" aria-label="Abrir sumário (S)">${icon('grid')}</button>
          <button class="ibtn js-fs" aria-label="Tela cheia (F)">${icon('expand')}</button>
          <a class="ibtn" href="#inicio" aria-label="Início">${icon('home')}</a>
        </div>
      </header>
      <main class="v-stage">
        <button class="v-nav prev js-prev" aria-label="Lâmina anterior">${icon('chevL')}</button>
        <div class="v-frame">
          <div class="v-layers"></div>
          <div class="v-over"></div>
          <button class="v-zoom js-zoom" aria-label="Ampliar lâmina (Z)">${icon('zoom')}</button>
        </div>
        <button class="v-nav next js-next" aria-label="Próxima lâmina">${icon('chevR')}</button>
        <div class="v-hint" aria-hidden="true"></div>
      </main>
      <section class="v-info" aria-live="polite"></section>
      <footer class="v-bottom">
        <div class="v-progress"></div>
        <div class="v-row">
          <div class="v-meta"><span class="v-count"></span><span class="v-title"></span></div>
          <div class="v-action"></div>
          <button class="v-btn v-prev js-prev" aria-label="Lâmina anterior">${icon('chevL')}<span>Anterior</span></button>
          <button class="v-btn v-next js-next" aria-label="Próxima lâmina"><span>Próxima</span>${icon('chevR')}</button>
        </div>
      </footer>
      <div class="v-end" hidden></div>`;

    const frame = $('.v-frame', el), layers = $('.v-layers', el), over = $('.v-over', el), info = $('.v-info', el);
    const action = $('.v-action', el), prog = $('.v-progress', el), endEl = $('.v-end', el), hintEl = $('.v-hint', el);
    const trailEl = $('.v-trail', el), stage = $('.v-stage', el);
    let cur = 0, token = 0;

    if (!document.documentElement.requestFullscreen) $('.js-fs', el).hidden = true;

    prog.innerHTML = D.chapters.map((c) => `<button class="v-seg" style="--n:${c.to - c.from + 1}" data-go="${c.from}" data-title="${esc((/^\d+$/.test(c.n) && c.n !== '00' ? c.n + ' · ' : '') + c.title)}" aria-label="Ir para ${esc(c.title)}"><i></i></button>`).join('')
      + '<div class="v-tprog" hidden style="flex:1"><i></i></div>';
    const segs = $$('.v-seg', prog), tprog = $('.v-tprog', prog);

    const pickSrc = (n) => ((frame.clientWidth || innerWidth) * (devicePixelRatio || 1) > 1100 ? srcOf(n, 'l') : srcOf(n, 'm'));
    function preload(n) {
      [n + 1, n + 2, n - 1].filter((k) => k >= 1 && k <= D.total && !isHtml(k)).forEach((k) => { const i = new Image(); i.src = pickSrc(k); });
    }

    async function swap(n, dir) {
      const my = ++token;
      const layer = document.createElement('div'); layer.className = 'v-layer';
      if (isHtml(n)) layer.append(hsHost(n, frame.clientWidth));
      else {
        const img = new Image(); img.alt = `${S(n).t}. ${S(n).d}`; img.decoding = 'async'; img.draggable = false; img.src = pickSrc(n);
        layer.append(img);
        try { await img.decode(); } catch (e) { /* segue mesmo assim */ }
        if (my !== token) return;
      }
      const old = Array.from(layers.children);
      if (dir && !reduced) layer.classList.add(dir > 0 ? 'from-right' : 'from-left');
      else if (old.length) layer.classList.add('fade-in');
      layers.append(layer);
      void layer.offsetWidth;
      layer.classList.remove('from-right', 'from-left', 'fade-in');
      old.forEach((o) => { o.classList.add(dir < 0 ? 'to-right' : 'to-left'); setTimeout(() => o.remove(), 650); });
    }

    const inTrail = (n) => !!trail && trail.slides.includes(n);
    function chrome(n) {
      const c = chapterOf(n);
      $('.v-chapter .n', el).textContent = /^\d+$/.test(c.n) && c.n !== '00' ? c.n : '';
      $('.v-chapter .t', el).textContent = c.title;
      $('.v-count', el).innerHTML = `${pad(n)} <span>/ ${D.total}</span>`;
      $('.v-title', el).textContent = S(n).t;
      segs.forEach((seg, i) => {
        const ch = D.chapters[i];
        const f = n > ch.to ? 100 : n < ch.from ? 0 : ((n - ch.from + 1) / (ch.to - ch.from + 1)) * 100;
        seg.style.setProperty('--fill', f + '%');
      });
      el.classList.toggle('has-trail', !!trail);
      trailEl.hidden = !trail;
      segs.forEach((s) => { s.hidden = !!trail; });
      tprog.hidden = !trail;
      let prevOff = n === 1;
      if (trail) {
        const idx = trail.slides.indexOf(n);
        if (idx >= 0) {
          $('.lbl', trailEl).textContent = `Sua trilha · ${idx + 1}/${trail.slides.length}`;
          $('.js-trail', trailEl).textContent = 'Sair';
          tprog.style.setProperty('--p', ((idx + 1) / trail.slides.length) * 100 + '%');
          prevOff = idx === 0;
        } else {
          $('.lbl', trailEl).textContent = 'Fora da trilha';
          $('.js-trail', trailEl).textContent = 'Voltar à trilha';
        }
      }
      $$('.js-prev', el).forEach((b) => { b.disabled = prevOff; });
    }

    function overlay(n) {
      const x = D.extras[n];
      over.innerHTML = (D.links[n] || []).map((l) => `<a class="hs-link" href="#s/${l.to}" data-go="${l.to}" style="left:${l.x}%;top:${l.y}%;width:${l.w}%;height:${l.h}%" aria-label="Ir para ${esc(l.label)}"><span>${esc(l.label)} ${icon('arrowR')}</span></a>`).join('')
        + (x && x.type === 'mural' ? `<a class="hs-cta" href="#mural/1"><span class="ic">${icon('compare')}</span><span><b>Novo mural UORT</b><small>Compare antes × depois</small></span>${icon('arrowR')}</a>` : '')
        + (x && x.type === 'tool' ? toolCta('hs-cta hs-cta-tr') : '');
    }

    const contactLinks = (cls) => CONTACT.map((c) => `<a class="${cls}" href="${c.href}"${ext(c.href)}>${icon(c.icon)} ${cls === 'btn-pill' ? c.label : esc(c.text)}${cls === 'vi-link' ? icon('arrowR') : ''}</a>`).join('');

    function infoPanel(n) {
      const s = S(n), c = chapterOf(n), x = D.extras[n] || {}, links = D.links[n];
      let extra = '';
      if (links) extra += `<div class="vi-block vi-links"><p class="lbl">Ir direto para</p>${links.map((l) => `<a class="vi-link" href="#s/${l.to}" data-go="${l.to}">${icon('arrowR')} ${esc(l.label)} ${icon('chevR')}</a>`).join('')}</div>`;
      if (x.type === 'mural') extra += `<div class="vi-block"><a class="vi-cta" href="#mural/1"><span class="ic">${icon('compare')}</span><span><b>Novo mural UORT</b><small>Compare o mural antigo com o novo</small></span>${icon('arrowR')}</a></div>`;
      if (s.page) extra += `<div class="vi-block"><p class="lbl">A página completa · role para ver</p><div class="vi-page"><div class="bar"><i></i><i></i><i></i><span>${icon('lock')}${esc(s.page.url)}</span></div><img src="${s.page.src}" width="${s.page.w}" height="${s.page.h}" alt="${esc(s.d)}" loading="lazy"></div></div>`;
      if (x.type === 'tool') extra += `<div class="vi-block">${toolCta('vi-cta')}</div>`;
      if (x.type === 'audio') extra += `<div class="vi-block">${audio.block()}</div>`;
      if (x.type === 'tvmap') extra += `<div class="vi-block"><p class="lbl">Mapa de inserções · Outubro</p>${TV.mobileMap(x.scenario)}</div>`;
      if (x.type === 'tvprog') extra += `<div class="vi-block"><p class="lbl">Valor negociado por inserção</p>${TV.mobilePrograms()}</div>`;
      if (x.type === 'contact') extra += `<div class="vi-block vi-contact">${contactLinks('vi-link')}</div>`;
      info.innerHTML = `
        <p class="vi-kicker"><b>${/^\d+$/.test(c.n) && c.n !== '00' ? c.n : '•'}</b>${esc(c.title)}</p>
        <h2 class="vi-title">${esc(s.t)}</h2>
        <p class="vi-desc">${esc(s.d)}</p>
        ${extra}
        <p class="vi-rotate">${icon('rotate')} Toque na lâmina para ampliar · gire o celular para tela cheia</p>`;
    }

    function actions(n) {
      const x = D.extras[n] || {};
      let html = '';
      if (D.links[n]) html = `<span class="pill-hint">${icon('hand')} Clique nos cards para ir direto ao tema</span>`;
      else if (S(n).page) html = `<span class="pill-hint">${icon('hand')} Role a página na janela · clique numa seção para ir direto a ela</span>`;
      else if (x.type === 'mural') html = `<a class="btn-pill glow" href="#mural/1">${icon('compare')} Comparar mural: antes × depois ${icon('arrowR')}</a>`;
      else if (x.type === 'tool') html = `<a class="btn-pill glow" href="${D.tool.url}"${ext(D.tool.url)}>${icon('activity')} ${esc(D.tool.label)} ${icon('external')}</a>`;
      else if (x.type === 'audio') html = `<button class="btn-pill glow js-pop" aria-expanded="false">${icon('volume')} ${x.short ? 'Ouvir um testemunhal da BTN' : 'Ouvir exemplos de testemunhal'}</button>
        <div class="v-pop" role="dialog" aria-label="Exemplos de áudio"><button class="ibtn x js-pop-close" aria-label="Fechar">${icon('close')}</button>${audio.block()}</div>`;
      else if (x.type === 'contact') html = contactLinks('btn-pill');
      action.innerHTML = html;
    }
    const pop = () => $('.v-pop', action);
    function togglePop(force) {
      const p = pop(); if (!p) return;
      const open = force !== undefined ? force : !p.classList.contains('open');
      p.classList.toggle('open', open);
      const b = $('.js-pop', action); if (b) b.setAttribute('aria-expanded', open);
    }

    function go(n) {
      n = clamp(Math.round(n) || 1, 1, D.total);
      endEl.hidden = true;
      if (n === cur && layers.children.length) { document.title = `${S(n).t} · UORT`; return; }
      const dir = cur ? (n > cur ? 1 : -1) : 0;
      cur = n;
      audio.stopAll();
      swap(n, dir);
      chrome(n); overlay(n); infoPanel(n); actions(n); audio.sync();
      preload(n);
      store.set('lastSlide', n);
      document.title = `${S(n).t} · UORT`;
      if (location.hash !== '#s/' + n) history.replaceState(null, '', '#s/' + n);
      if (mqPortrait.matches && el.scrollTop > 40) el.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
      pokeUI();
      if (!store.get('hinted')) hint();
    }
    function next() {
      if (inTrail(cur)) {
        const i = trail.slides.indexOf(cur);
        return i >= trail.slides.length - 1 ? showEnd(true) : go(trail.slides[i + 1]);
      }
      return cur >= D.total ? showEnd(false) : go(cur + 1);
    }
    function prev() {
      if (inTrail(cur)) { const i = trail.slides.indexOf(cur); if (i > 0) go(trail.slides[i - 1]); return; }
      if (cur > 1) go(cur - 1);
    }
    function clearTrail() { trail = null; store.set('trail', null); if (cur) chrome(cur); }

    function showEnd(isTrail) {
      endEl.innerHTML = `<div class="v-end-card">
        <span class="eyebrow">${isTrail ? 'Trilha concluída' : 'Fim da apresentação'}</span>
        <div class="accent-bar"></div>
        <h2>${isTrail ? 'Você viu o essencial <em>da sua trilha.</em>' : 'Obrigado <em>pela atenção.</em>'}</h2>
        <p>${isTrail ? 'Quer ir além? Veja a apresentação completa ou explore os recursos interativos.' : 'Explore os recursos interativos ou fale com a LOOK.'}</p>
        <div class="v-end-actions">
          ${isTrail ? `<button class="btn btn-primary js-full">${icon('play')} Ver apresentação completa</button>` : `<button class="btn btn-primary js-restart">${icon('refresh')} Recomeçar</button>`}
          <a class="btn btn-ghost" href="#mural/1">${icon('compare')} Mural antes × depois</a>
          <a class="btn btn-ghost" href="#quiz">${icon('quiz')} Teste seus conhecimentos</a>
          <a class="btn btn-ghost" href="#inicio">${icon('home')} Início</a>
        </div>
        <button class="chip js-end-close" style="margin-top:18px">${icon('close')} Fechar</button>
      </div>`;
      endEl.hidden = false;
      $('.btn-primary', endEl).focus({ preventScroll: true });
    }

    function hint() {
      store.set('hinted', 1);
      const touch = matchMedia('(pointer: coarse)').matches;
      hintEl.innerHTML = touch
        ? `${icon('hand')} Deslize para os lados para navegar · toque na lâmina para ampliar`
        : 'Use <kbd>←</kbd> <kbd>→</kbd> para navegar · <kbd>S</kbd> sumário · <kbd>F</kbd> tela cheia';
      setTimeout(() => hintEl.classList.add('show'), 700);
      setTimeout(() => hintEl.classList.remove('show'), 5200);
    }

    // interface imersiva no celular deitado
    let uiT;
    function pokeUI() {
      el.classList.remove('ui-hidden'); clearTimeout(uiT);
      if (mqLandscape.matches) uiT = setTimeout(() => el.classList.add('ui-hidden'), 3200);
    }
    mqLandscape.addEventListener('change', pokeUI);

    function toggleFs() {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen().catch(() => toast('Tela cheia indisponível neste navegador.'));
    }

    el.addEventListener('click', (e) => {
      const t = e.target.closest('[data-go]');
      if (t) { e.preventDefault(); go(+t.dataset.go); return; }
      if (e.target.closest('.js-next')) return next();
      if (e.target.closest('.js-prev')) return prev();
      if (e.target.closest('.js-toc')) return nav('sumario');
      if (e.target.closest('.js-fs')) return toggleFs();
      if (e.target.closest('.js-zoom')) return zoom.openSlide(cur);
      if (e.target.closest('.js-pop-close')) return togglePop(false);
      if (e.target.closest('.js-pop')) return togglePop();
      if (e.target.closest('.js-end-close')) { endEl.hidden = true; return; }
      if (e.target.closest('.js-restart')) return go(1);
      if (e.target.closest('.js-full')) { clearTrail(); return go(1); }
      if (e.target.closest('.js-trail')) {
        if (inTrail(cur)) { clearTrail(); toast('Você saiu da trilha — agora está navegando pela apresentação completa.'); }
        else if (trail) go(trail.slides.find((k) => k >= cur) || trail.slides[trail.slides.length - 1]);
      }
    });
    document.addEventListener('click', (e) => {
      const p = pop();
      if (p && p.classList.contains('open') && !e.composedPath().includes(action)) togglePop(false);
    });
    el.addEventListener('pointerdown', (e) => { if (mqLandscape.matches && !e.target.closest('.v-stage')) pokeUI(); });

    // gestos: deslizar para navegar, toque para ampliar
    let ps = null;
    stage.addEventListener('pointerdown', (e) => { if (e.pointerType === 'mouse') return; ps = { x: e.clientX, y: e.clientY, t: Date.now(), target: e.target }; });
    stage.addEventListener('pointercancel', () => { ps = null; });
    stage.addEventListener('pointerup', (e) => {
      if (!ps) return;
      const dx = e.clientX - ps.x, dy = e.clientY - ps.y, dt = Date.now() - ps.t, tgt = ps.target; ps = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) { dx < 0 ? next() : prev(); return; }
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10 && dt < 350 && !tgt.closest('a, button')) {
        if (mqLandscape.matches) { if (el.classList.contains('ui-hidden')) pokeUI(); else el.classList.add('ui-hidden'); }
        else if (mqPortrait.matches && tgt.closest('.v-frame')) zoom.openSlide(cur);
      }
    });

    function escape() {
      if (pop() && pop().classList.contains('open')) return togglePop(false);
      if (!endEl.hidden) { endEl.hidden = true; }
    }

    return { go, next, prev, clearTrail, escape, toggleFs, cur: () => cur };
  })();

  // links "ver completa" sempre saem da trilha
  document.addEventListener('click', (e) => { if (e.target.closest('[data-full]')) viewer.clearTrail(); }, true);

  /* ==========================================================================
     SUMÁRIO
     ========================================================================== */
  const toc = (() => {
    const el = $('#toc'); let built = false, openedAt = -1;
    function item(n) {
      const s = S(n), x = D.extras[n] || {};
      const badge = x.type === 'audio' && !x.short ? `<span class="badge">${icon('volume')} Áudio</span>`
        : x.type === 'mural' ? `<span class="badge">${icon('compare')} Mural</span>`
          : x.type === 'tool' ? `<span class="badge">${icon('activity')} Ferramenta</span>`
            : s.page ? `<span class="badge">${icon('globe')} Página</span>`
          : D.links[n] ? `<span class="badge">${icon('hand')} Interativa</span>` : '';
      const text = norm([s.t, s.d, s.k || '', chapterOf(n).title, 'lamina ' + n].join(' '));
      return `<button class="toc-item" data-go="${n}" data-text="${esc(text)}"><span class="th">${thumb(n)}<span class="num">${pad(n)}</span>${badge}</span><span class="tt">${esc(s.t)}</span></button>`;
    }
    function build() {
      el.innerHTML = `<div class="toc-inner">
        <div class="toc-head">
          <h2 id="toc-title">Sumário<small>${D.total} lâminas · ${numbered.length} capítulos</small></h2>
          <button class="ibtn toc-close js-toc-close" aria-label="Fechar sumário">${icon('close')}</button>
          <label class="toc-search">${icon('search')}<span class="sr-only">Buscar um tema</span><input type="search" placeholder="Busque um tema: investimento, rádio, WhatsApp, TV…" autocomplete="off" enterkeyhint="search"></label>
        </div>
        <div class="toc-quick">
          <a class="chip" href="#mural/1">${icon('compare')} Mural antes × depois</a>
          <button class="chip" data-go="52">${icon('volume')} Áudios da BTN</button>
          <button class="chip" data-go="59">${icon('tv')} Mapa de inserções na TV</button>
          <a class="chip" href="#quiz">${icon('quiz')} Teste seus conhecimentos</a>
        </div>
        ${D.chapters.map((c) => `<section class="toc-chap">
          <div class="toc-chap-h"><span class="n">${c.n}</span><h3>${esc(c.title)}</h3><span class="c">${c.to - c.from + 1} lâmina${c.to > c.from ? 's' : ''}</span></div>
          <div class="toc-grid">${range(c.from, c.to).map(item).join('')}</div>
        </section>`).join('')}
        <p class="toc-empty" hidden>Nenhuma lâmina encontrada para “<span></span>”.</p>
      </div>`;
      const input = $('input', el);
      input.addEventListener('input', () => filter(input.value));
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { const first = $$('.toc-item', el).find((i) => !i.hidden); if (first) first.click(); }
      });
      el.addEventListener('click', (e) => {
        const g = e.target.closest('[data-go]');
        if (g) { e.preventDefault(); nav('s/' + g.dataset.go, { replace: true }); return; }
        if (e.target.closest('.js-toc-close')) requestClose();
      });
      mountMinis(el);
      built = true;
    }
    function filter(q) {
      const words = norm(q.trim()).split(/\s+/).filter(Boolean);
      let total = 0;
      $$('.toc-chap', el).forEach((sec) => {
        let c = 0;
        $$('.toc-item', sec).forEach((it) => { const hit = words.every((w) => it.dataset.text.includes(w)); it.hidden = !hit; if (hit) c++; });
        sec.hidden = c === 0; total += c;
      });
      const empty = $('.toc-empty', el); empty.hidden = total > 0; $('span', empty).textContent = q;
    }
    function open() {
      if (!built) build();
      openedAt = internalNavs;
      el.hidden = false; document.body.style.overflow = 'hidden';
      const curN = current === 'viewer' ? viewer.cur() : 0;
      $$('.toc-item', el).forEach((i) => i.classList.toggle('is-current', +i.dataset.go === curN));
      const input = $('input', el);
      if (input.value) { input.value = ''; filter(''); }
      const c = $('.toc-item.is-current', el);
      if (c) c.scrollIntoView({ block: 'center' }); else el.scrollTop = 0;
      if (matchMedia('(pointer: fine)').matches) input.focus({ preventScroll: true }); else $('.js-toc-close', el).focus({ preventScroll: true });
    }
    function close() { if (el.hidden) return; el.hidden = true; document.body.style.overflow = ''; }
    function requestClose() { if (internalNavs > 0) history.back(); else nav(current === 'viewer' ? 's/' + viewer.cur() : 'inicio', { replace: true }); }
    return { open, close, requestClose, isOpen: () => !el.hidden };
  })();

  /* ==========================================================================
     MURAL — ANTES × DEPOIS
     ========================================================================== */
  const mural = (() => {
    const el = views.mural;
    const OLD_R = 794 / 1123, NEW_R = 941 / 1672;
    let page = 1, mode = 'slider', from = null, demoRaf = 0;
    el.innerHTML = `
      <header class="m-top">
        <button class="btn-back js-mback" aria-label="Voltar à apresentação">${icon('arrowL')}<span>Voltar à apresentação</span></button>
        <div class="m-head"><b>Mural UORT · antes × depois</b><small>Materiais digitais · ${D.mural.length} páginas</small></div>
        <div class="seg" role="group" aria-label="Modo de comparação">
          <button data-mode="slider" aria-pressed="true">${icon('compare')} Deslizar</button>
          <button data-mode="side" aria-pressed="false">${icon('columns')} Lado a lado</button>
        </div>
      </header>
      <div class="m-body">
        <nav class="m-list" aria-label="Páginas do mural"><p class="lbl">Páginas</p>
          ${D.mural.map((m, i) => `<button class="m-page" data-page="${i + 1}"><span class="th"><img src="assets/mural/t/novo-${pad(i + 1)}.jpg" alt="" loading="lazy"></span><span><b>${esc(m.title)}</b><small>${esc(m.tag)}</small></span></button>`).join('')}
        </nav>
        <div class="m-stage">
          <div class="cmp">
            <img class="after" alt="" draggable="false">
            <div class="before-wrap"><img class="before" alt="" draggable="false"></div>
            <span class="cmp-tag b">ANTES</span><span class="cmp-tag a">DEPOIS</span>
            <div class="cmp-line"></div><div class="cmp-knob">${icon('arrowsH')}</div>
            <input type="range" min="0" max="100" step="1" value="50" aria-label="Comparar: arraste para a esquerda para ver o mural novo, para a direita para ver o antigo">
          </div>
          <div class="sbs" hidden>
            <figure><button class="card js-zold" aria-label="Ampliar mural antigo"><img class="old" alt=""></button><figcaption><i></i>ANTES</figcaption></figure>
            <figure class="new"><button class="card new js-znew" aria-label="Ampliar mural novo"><img class="new" alt=""></button><figcaption><i></i>DEPOIS</figcaption></figure>
          </div>
          <div class="m-pager">
            <button class="ibtn js-mprev" aria-label="Página anterior">${icon('chevL')}</button>
            <p class="pg" aria-live="polite"></p>
            <button class="ibtn js-mnext" aria-label="Próxima página">${icon('chevR')}</button>
          </div>
          <p class="m-hint">${icon('hand')}<span></span></p>
        </div>
        <aside class="m-notes">
          <div class="m-card"><p class="k">Nesta página</p><h3 class="js-nt"></h3><p class="js-nn"></p></div>
          <div class="m-card"><p class="k">O que mudou no mural</p><ul class="m-changes">${D.muralChanges.map((c) => `<li>${icon('check')}<span>${esc(c)}</span></li>`).join('')}</ul></div>
        </aside>
      </div>`;

    const cmp = $('.cmp', el), sbs = $('.sbs', el), rangeIn = $('input[type="range"]', cmp);
    const tagB = $('.cmp-tag.b', cmp), tagA = $('.cmp-tag.a', cmp);
    const oldSrc = (p) => `assets/mural/antigo-${pad(p)}.jpg`, newSrc = (p) => `assets/mural/novo-${pad(p)}.jpg`;

    function setPos(v) {
      const pos = clamp(v, 0, 100);
      cmp.style.setProperty('--pos', pos + '%');
      rangeIn.value = Math.round(pos);
      tagB.style.opacity = pos < 16 ? 0 : 1; tagA.style.opacity = pos > 84 ? 0 : 1;
    }
    function stopDemo() { cancelAnimationFrame(demoRaf); demoRaf = 0; }
    function demo() {
      stopDemo(); if (reduced || mode !== 'slider') return;
      const keys = [[0, 50], [550, 18], [1250, 82], [1850, 50]]; const t0 = performance.now() + 450;
      const ease = (t) => (t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
      const step = (now) => {
        const t = now - t0;
        if (t >= 0) {
          let k = 1; while (k < keys.length - 1 && t > keys[k][0]) k++;
          const [ta, va] = keys[k - 1], [tb, vb] = keys[k];
          setPos(va + (vb - va) * ease(clamp((t - ta) / (tb - ta), 0, 1)));
          if (t >= keys[keys.length - 1][0]) { demoRaf = 0; return; }
        }
        demoRaf = requestAnimationFrame(step);
      };
      demoRaf = requestAnimationFrame(step);
    }
    function render() {
      const m = D.mural[page - 1];
      $('.after', cmp).src = newSrc(page); $('.after', cmp).alt = `Mural novo — ${m.title}`;
      $('.before', cmp).src = oldSrc(page); $('.before', cmp).alt = `Mural antigo — ${m.title}`;
      $('img.old', sbs).src = oldSrc(page); $('img.old', sbs).alt = `Mural antigo — ${m.title}`;
      $('img.new', sbs).src = newSrc(page); $('img.new', sbs).alt = `Mural novo — ${m.title}`;
      $('.js-nt', el).textContent = m.title; $('.js-nn', el).textContent = m.note;
      $('.pg', el).innerHTML = `<span>${pad(page)}</span> / ${pad(D.mural.length)} · ${esc(m.title)}`;
      $$('.m-page', el).forEach((b) => { const on = +b.dataset.page === page; b.classList.toggle('is-active', on); if (on) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
      const act = $('.m-page.is-active', el);
      const list = act && act.parentElement;
      if (list && list.scrollWidth > list.clientWidth) list.scrollTo({ left: act.offsetLeft - (list.clientWidth - act.offsetWidth) / 2, behavior: reduced ? 'auto' : 'smooth' });
      $('.m-hint span', el).textContent = mode === 'slider' ? 'Arraste a linha para comparar o antes e o depois' : 'Toque em uma página para ampliar';
      if (location.hash !== '#mural/' + page) history.replaceState(null, '', '#mural/' + page);
      // pré-carrega a próxima página
      if (page < D.mural.length) { new Image().src = newSrc(page + 1); new Image().src = oldSrc(page + 1); }
      setPos(50); demo();
    }
    function goPage(p) { page = clamp(p, 1, D.mural.length); render(); }
    function setMode(m) {
      mode = m; stopDemo();
      $$('[data-mode]', el).forEach((b) => b.setAttribute('aria-pressed', b.dataset.mode === m));
      cmp.hidden = m !== 'slider'; sbs.hidden = m !== 'side';
      $('.m-hint span', el).textContent = m === 'slider' ? 'Arraste a linha para comparar o antes e o depois' : 'Toque em uma página para ampliar';
      if (m === 'slider') { setPos(50); demo(); }
    }
    function enter(p, origin) {
      if (origin !== undefined) from = origin;
      goPage(p);
    }

    // arrastar
    let drag = null;
    const posFrom = (e) => { const r = cmp.getBoundingClientRect(); return ((e.clientX - r.left) / r.width) * 100; };
    cmp.addEventListener('pointerdown', (e) => {
      stopDemo();
      drag = { x: e.clientX, y: e.clientY, decided: e.pointerType === 'mouse', id: e.pointerId };
      if (drag.decided) { cmp.setPointerCapture(e.pointerId); cmp.classList.add('dragging'); setPos(posFrom(e)); }
    });
    cmp.addEventListener('pointermove', (e) => {
      if (!drag) return;
      if (!drag.decided) {
        const dx = Math.abs(e.clientX - drag.x), dy = Math.abs(e.clientY - drag.y);
        if (dx < 6 && dy < 6) return;
        if (dy > dx) { drag = null; return; }
        drag.decided = true; cmp.setPointerCapture(e.pointerId); cmp.classList.add('dragging');
      }
      setPos(posFrom(e));
    });
    const endDrag = (e) => { if (drag && !drag.decided && e && e.type === 'pointerup') setPos(posFrom(e)); drag = null; cmp.classList.remove('dragging'); };
    cmp.addEventListener('pointerup', endDrag);
    cmp.addEventListener('pointercancel', () => endDrag());
    rangeIn.addEventListener('input', () => { stopDemo(); setPos(+rangeIn.value); });

    el.addEventListener('click', (e) => {
      const pg = e.target.closest('[data-page]'); if (pg) return goPage(+pg.dataset.page);
      const m = e.target.closest('[data-mode]'); if (m) return setMode(m.dataset.mode);
      if (e.target.closest('.js-mprev')) return goPage(page - 1);
      if (e.target.closest('.js-mnext')) return goPage(page + 1);
      if (e.target.closest('.js-zold')) return zoom.openImage(oldSrc(page), `Mural antigo — ${D.mural[page - 1].title}`, OLD_R);
      if (e.target.closest('.js-znew')) return zoom.openImage(newSrc(page), `Mural novo — ${D.mural[page - 1].title}`, NEW_R);
      if (e.target.closest('.js-mback')) {
        stopDemo();
        if (from && internalNavs > 0) history.back();
        else nav('s/16', { replace: !internalNavs });
      }
    });
    // deslizar horizontalmente fora da comparação troca de página (celular)
    let sw = null;
    $('.m-stage', el).addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse' && !e.target.closest('.cmp')) sw = { x: e.clientX, y: e.clientY }; });
    $('.m-stage', el).addEventListener('pointerup', (e) => {
      if (!sw) return; const dx = e.clientX - sw.x, dy = e.clientY - sw.y; sw = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) goPage(page + (dx < 0 ? 1 : -1));
    });
    return { enter, step: (d) => goPage(page + d), back: () => $('.js-mback', el).click() };
  })();

  /* ==========================================================================
     TESTE DE CONHECIMENTOS
     ========================================================================== */
  const quiz = (() => {
    const el = views.quiz;
    let st = store.get('quiz') || { i: 0, answers: [] };
    const save = () => store.set('quiz', st);
    const total = D.quiz.length;
    function frame(label, pct, inner) {
      el.innerHTML = `
        <header class="g-top">
          <button class="ibtn js-qback" aria-label="Voltar">${icon('arrowL')}</button>
          <div class="g-steps"><span>${label}</span><div class="g-bar"><i style="--p:${pct}%"></i></div></div>
          <a class="ibtn" href="#inicio" aria-label="Fechar e voltar ao início">${icon('close')}</a>
        </header>
        <div class="q-body">${inner}</div>`;
    }
    function feedback(q, k) {
      const ok = k === q.c;
      return `<div class="q-fb">
        <b class="${ok ? 'ok' : 'no'}">${ok ? 'Isso mesmo!' : 'Quase! A resposta é: ' + esc(q.a[q.c])}</b>
        <p>${esc(q.why)}</p>
        <div class="row">
          <a class="q-link" href="#s/${q.s}" data-full>Ver na lâmina ${q.s} ${icon('arrowR')}</a>
          <button class="btn btn-primary js-qnext">${st.i >= total - 1 ? 'Ver resultado' : 'Próxima'} ${icon('arrowR')}</button>
        </div>
      </div>`;
    }
    function question() {
      const q = D.quiz[st.i], k = st.answers[st.i];
      const done = k !== undefined && k !== null;
      frame(`Pergunta ${st.i + 1} de ${total}`, ((st.i + (done ? 1 : 0)) / total) * 100, `
        <div class="q-card">
          <span class="eyebrow">Teste seus conhecimentos</span>
          <h2>${esc(q.q)}</h2>
          <div class="q-opts">${q.a.map((a, j) => {
            const cls = !done ? '' : j === q.c ? ' right' : j === k ? ' wrong' : ' dim';
            const mark = !done ? '' : j === q.c ? icon('check') : j === k ? icon('close') : '';
            return `<button class="q-opt${cls}" data-k="${j}"${done ? ' disabled' : ''}><span class="l">${'ABCD'[j]}</span><span>${esc(a)}</span>${mark}</button>`;
          }).join('')}</div>
          <div class="q-fb-slot">${done ? feedback(q, k) : ''}</div>
        </div>`);
    }
    function result() {
      const score = D.quiz.reduce((a, q, i) => a + (st.answers[i] === q.c ? 1 : 0), 0);
      const r = 74, c = 2 * Math.PI * r, f = score / total;
      const msg = f === 1 ? ['Você domina a estratégia!', 'Acertou todas — pronto para apresentar a UORT.']
        : f >= .7 ? ['Mandou bem!', 'Você entendeu os pilares da estratégia.']
          : f >= .4 ? ['Bom começo!', 'Vale revisitar alguns capítulos para fechar o quadro.']
            : ['Vale revisitar a apresentação', 'Que tal fazer uma trilha personalizada pelos temas?'];
      frame('Resultado', 100, `
        <div class="q-result">
          <div class="q-ring">
            <svg viewBox="0 0 170 170"><circle cx="85" cy="85" r="${r}" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="12"/>
              <circle cx="85" cy="85" r="${r}" fill="none" stroke="url(#qg)" stroke-width="12" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c}" class="js-ring"/>
              <defs><linearGradient id="qg" x1="0" x2="1"><stop offset="0" stop-color="#14a7b2"/><stop offset="1" stop-color="#35e8f2"/></linearGradient></defs></svg>
            <div class="v"><div>${score}/${total}<small>acertos</small></div></div>
          </div>
          <h2>${msg[0]}</h2><p>${msg[1]}</p>
          <div class="v-end-actions">
            <button class="btn btn-primary js-qredo">${icon('refresh')} Refazer</button>
            <a class="btn btn-ghost" href="#guia">${icon('route')} Fazer uma trilha</a>
            <a class="btn btn-ghost" href="#s/1" data-full>${icon('play')} Ver apresentação</a>
          </div>
        </div>`);
      const ring = $('.js-ring', el);
      requestAnimationFrame(() => { ring.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(.2,.7,.2,1)'; ring.style.strokeDashoffset = c * (1 - f); });
    }
    function show() { if (st.i >= total) result(); else question(); window.scrollTo(0, 0); }
    el.addEventListener('click', (e) => {
      const o = e.target.closest('.q-opt');
      if (o && !o.disabled) { st.answers[st.i] = +o.dataset.k; save(); question(); $('.q-fb', el).scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' }); return; }
      if (e.target.closest('.js-qnext')) { st.i++; save(); show(); return; }
      if (e.target.closest('.js-qredo')) { st = { i: 0, answers: [] }; save(); show(); return; }
      if (e.target.closest('.js-qback')) {
        if (st.i > 0 && st.i < total) { st.i--; save(); show(); } else back('inicio');
      }
    });
    return { show };
  })();

  /* ==========================================================================
     TECLADO
     ========================================================================== */
  document.addEventListener('keydown', (e) => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    if (zoom.isOpen()) {
      if (e.key === '+' || e.key === '=') zoom.inc();
      else if (e.key === '-') zoom.dec();
      return;
    }
    if (toc.isOpen()) { if (e.key === 'Escape') { e.preventDefault(); toc.requestClose(); } return; }
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    if ((e.key === ' ' || e.key === 'Enter') && e.target.closest && e.target.closest('button, a')) return;
    if (current === 'viewer') {
      switch (e.key) {
        case 'ArrowRight': case 'PageDown': case ' ': e.preventDefault(); viewer.next(); break;
        case 'ArrowLeft': case 'PageUp': e.preventDefault(); viewer.prev(); break;
        case 'Home': e.preventDefault(); viewer.go(1); break;
        case 'End': e.preventDefault(); viewer.go(D.total); break;
        case 's': case 'S': case 'g': case 'G': nav('sumario'); break;
        case 'f': case 'F': viewer.toggleFs(); break;
        case 'z': case 'Z': zoom.openSlide(viewer.cur()); break;
        case 'Escape': viewer.escape(); break;
        default:
      }
    } else if (current === 'mural') {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); mural.step(1); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); mural.step(-1); }
      else if (e.key === 'Escape') mural.back();
    }
  });

  route();
})();
