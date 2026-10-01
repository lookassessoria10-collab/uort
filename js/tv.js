/* Lâminas HTML de Televisão (TV Bahia e TV Record), geradas a partir de DECK.tv */
window.TV = (() => {
  const T = window.DECK.tv;
  const brl = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const r2 = (v) => Math.round(v * 100 + 1e-6) / 100;           // arredonda como o Excel (meio para cima)
  const money = (v) => 'R$ ' + brl.format(r2(v));

  const I = {
    sunrise: '<path d="M3 18h18M6.5 18a5.5 5.5 0 0 1 11 0"/><path d="M12 5v3M5 10.5l2 1.3M19 10.5l-2 1.3M8 21h8"/>',
    news: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/>',
    ball: '<circle cx="12" cy="12" r="9"/><path d="M12 7.2l3.9 2.8-1.5 4.6H9.6L8.1 10z"/><path d="M12 7.2V3.4M15.9 10l3.6-1.2M14.4 14.6l2.2 3.1M9.6 14.6l-2.2 3.1M8.1 10 4.5 8.8"/>',
    tv: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M8 21h8M12 18v3M9 2.5l3 3 3-3"/>',
    chef: '<path d="M7 14a3.8 3.8 0 0 1-.9-7.5A5 5 0 0 1 12 3a5 5 0 0 1 5.9 3.5A3.8 3.8 0 0 1 17 14"/><path d="M7 13.5V20h10v-6.5M7 17h10"/>',
    pan: '<circle cx="10" cy="13" r="6.2"/><circle cx="10" cy="13" r="3" opacity=".5"/><path d="M16.2 13H22"/>',
    play: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M10 9v6l5-3z"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 12.5l9 5 9-5"/><path d="M3 16.5l9 5 9-5" opacity=".6"/>',
    clock: '<circle cx="12" cy="13" r="7.5"/><path d="M12 13V9.5M9.5 2.5h5M12 2.5v3M18.5 6.5l1.5-1.5"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4M7.5 14h2M11 14h2M14.5 14h2M7.5 17.5h2M11 17.5h2"/>',
    coins: '<ellipse cx="9" cy="6.5" rx="5.5" ry="2.5"/><path d="M3.5 6.5v4c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-4"/><path d="M3.5 10.5v4c0 1.4 2.5 2.5 5.5 2.5.7 0 1.3 0 1.9-.2"/><circle cx="16.5" cy="16.5" r="4.5"/><path d="M16.5 14.5v4M14.8 16.5h3.4"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.6h.01"/>',
    bars: '<path d="M5 20v-5M10 20v-9M15 20v-7M20 20V5"/>',
    plus: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
    playFill: '<path d="M8.5 5.5v13l10-6.5z" fill="currentColor" stroke="none"/>'
  };
  const ic = (n) => `<svg class="tv-ic" viewBox="0 0 24 24" aria-hidden="true">${I[n] || ''}</svg>`;

  const deco = `<svg class="hs-deco" viewBox="0 0 1920 1080" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 905C380 1010 760 1062 1180 1080H0Z" fill="#eef9fa"/>
    <path d="M1490 0C1600 150 1730 252 1920 302V0Z" fill="url(#g-swoosh)"/>
    <path d="M1350 0C1560 232 1742 362 1920 404" fill="none" stroke="#7fdce4" stroke-width="2.5" opacity=".75"/>
    <path d="M1690 0C1790 92 1858 160 1920 192" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>
    <path d="M1920 470C1838 604 1818 806 1900 1080H1920Z" fill="url(#g-swoosh-soft)"/>
    <path d="M1920 432C1800 622 1790 842 1880 1080" fill="none" stroke="#9fe6eb" stroke-width="2" opacity=".85"/>
  </svg>`;

  const footOf = (st) => `<div class="hs-foot"><span>UORT • Planejamento de Mídia · Televisão</span><span class="pg">${st.toUpperCase()}</span></div>`;
  const labelOf = (st, tag) => `<div class="hs-label">Televisão · ${st}${tag ? ' · ' + tag : ''}</div>`;
  const foot = footOf(T.station), label = labelOf(T.station);
  // um cenário pode ter emissora, formato e grade próprios (ex.: TV Record); senão usa os da TV Bahia
  const stOf = (sc) => sc.station || T.station;
  const fmtOf = (sc) => sc.format || T.format;
  const progsOf = (sc) => sc.programs || T.programs;
  const keyOf = (p) => p.key || p.code;
  const rowTotal = (p, ds) => (p.total != null ? p.total : p.neg * ds.length);   // merchan: total fixo da planilha
  const costsOf = (sc) => sc.costs || [['Produção e envio', sc.producao], [stOf(sc), sc.total]];
  const words = (sc) => (sc.merchan
    ? { many: 'ações de merchandising', month: 'ações no mês', per: 'por ação', map: 'Mapa de merchandising', one: 'ação' }
    : { many: 'inserções', month: 'inserções no mês', per: 'por inserção', map: 'Mapa de inserções', one: 'inserção' });
  const code = (p) => (p.code ? `<span class="tvp-code">${p.code}</span>` : '');
  const count = (sc) => Object.values(sc.days).reduce((a, d) => a + d.length, 0);
  const perDay = (sc) => { const a = Array(32).fill(0); Object.values(sc.days).forEach((ds) => ds.forEach((d) => a[d]++)); return a; };
  const span = (sc) => { const all = Object.values(sc.days).flat(); return [Math.min(...all), Math.max(...all)]; };
  const minMax = () => { const d = T.programs.map((p) => p.desc); return [Math.min(...d), Math.max(...d)]; };

  function programas() {
    const [lo, hi] = minMax();
    const cards = T.programs.map((p) => `
      <div class="hs-card tvp-card">
        <div class="tvp-top">
          <span class="hs-circle">${ic(p.icon)}</span>
          <div>
            <span class="tvp-code">${p.code}</span>
            <div class="tvp-name">${p.name}${p.time ? `<span class="tvp-time">${p.time}</span>` : ''}</div>
          </div>
        </div>
        <div class="tvp-prices">
          <div><small>Tabela</small><s>${money(p.tab)}</s></div>
          <span class="tvp-off">−${p.desc}%</span>
          <div class="tvp-neg"><small>Negociado · unit.</small><b>${money(p.neg)}</b></div>
        </div>
      </div>`).join('');
    return `${deco}<div class="hs-pad">
      ${label}
      <h2 class="hs-h">Programação <span class="sep">|</span> <em>${T.station}</em></h2>
      <div class="hs-bar"></div>
      <p class="hs-sub">Inserções de <b>${T.format}</b> em seis programas da grade, com descontos negociados de <b>${lo}% a ${hi}%</b> sobre a tabela.</p>
      <div class="tvp-grid">${cards}</div>
    </div>
    <div class="hs-note">${ic('bars')}<span>Os dois cenários usam <b>esta mesma grade</b> — o que muda é a frequência e o período das inserções.</span></div>
    ${foot}`;
  }

  function cenario(i, slide = {}) {
    const sc = T.scenarios[i], st = stOf(sc), fmt = fmtOf(sc), progs = progsOf(sc), w = words(sc);
    const vid = slide.video && (window.DECK.videos || {})[slide.video];
    const n = count(sc), pd = perDay(sc), [first, last] = span(sc);
    let g = '<div class="hd l">Programa</div>';
    for (let d = 1; d <= 31; d++) g += `<div class="hd${pd[d] ? ' on' : ''}">${d}</div>`;
    g += '<div class="hd r">Ins.</div><div class="hd r">Total</div>';
    let sum = 0;
    progs.forEach((p) => {
      const ds = sc.days[keyOf(p)] || [];
      const tot = rowTotal(p, ds); sum += tot;
      g += `<div class="p">${code(p)}<b>${p.name}</b></div>`;
      for (let d = 1; d <= 31; d++) g += `<div class="c${ds.includes(d) ? ' on' : ''}${d >= first && d <= last ? ' win' : ''}"><i></i></div>`;
      g += `<div class="n">${ds.length}</div><div class="v">${money(tot)}</div>`;
    });
    g += '<div class="t p">Por dia</div>';
    for (let d = 1; d <= 31; d++) g += `<div class="t dc">${pd[d] || ''}</div>`;
    g += `<div class="t n">${n}</div><div class="t v">${money(sum)}</div>`;

    const kpi = (icon, v, l) => `<div class="hs-card tvk"><span class="hs-circle">${ic(icon)}</span><span class="div"></span><div><b>${v}</b><small>${l}</small></div></div>`;
    return `${deco}<div class="hs-pad">
      ${labelOf(st, sc.tag)}
      <h2 class="hs-h">${sc.label} <span class="sep">|</span> <em>${money(sc.bruto)}</em></h2>
      <div class="hs-bar"></div>
      <p class="hs-sub">${st} — <b>${n} ${w.many} de ${fmt}</b> ${sc.periodLong}.</p>
    </div>
    <div class="tvk-row">
      ${kpi('play', n, w.month)}
      ${kpi('layers', progs.length, progs.length > 1 ? 'programas' : 'programa')}
      ${kpi('clock', fmt, w.per)}
      ${kpi('cal', sc.period, 'período de veiculação')}
    </div>
    <div class="tvc-main">
      <div class="hs-card tvm">
        <div class="tvm-head"><span>${w.map} · Outubro</span><span class="tvm-legend"><i></i>${w.one} de ${fmt}</span></div>
        <div class="tvm-grid">${g}</div>
      </div>
      <div class="tvc-side${vid ? ' has-video' : ''}">
        <div class="hs-card tvc-break">
          ${costsOf(sc).map(([l, v]) => `<div><span>${l}</span><b>${money(v)}</b></div>`).join('')}
          <div class="tot"><span>${sc.brutoLabel || 'Total bruto'}</span><b>${money(sc.bruto)}</b></div>
        </div>
        ${vid ? `<button type="button" class="tvv js-video" data-video="${slide.video}"><span class="tvv-play">${ic('playFill')}</span><span><b>${vid.title}</b><small>${vid.sub}</small></span></button>` : ''}
      </div>
    </div>
    <div class="hs-note sm">${ic('info')}<span>${T.obs.join(' &nbsp;·&nbsp; ')}</span></div>
    ${footOf(st)}`;
  }

  function comparativo() {
    const all = T.scenarios, stations = [...new Set(all.map(stOf))];
    const lo = Math.min(...all.map((sc) => span(sc)[0])), hi = Math.max(...all.map((sc) => span(sc)[1]));
    const days = []; for (let d = lo - 1; d <= hi + 1; d++) days.push(d);
    const card = (sc) => {
      const pd = perDay(sc), w = words(sc), progs = progsOf(sc);
      return `<div class="hs-card tvx-card${sc.merchan ? ' mc' : ''}">
        <span class="tvx-pill">${sc.label}</span>
        <span class="tvx-st">${stOf(sc)} · ${sc.merchan ? 'merchandising' : 'inserções'} de ${fmtOf(sc)}</span>
        <div class="tvx-big"><span>${count(sc)}</span> ${sc.merchan ? 'ações' : 'inserções'}</div>
        <div class="tvx-lines">
          <span>${progs.length} programa${progs.length > 1 ? 's' : ''} · ${sc.period}</span>
          <span>${stOf(sc)}: <b>${money(sc.total)}</b></span>
        </div>
        <div class="tvx-cap"><span>${sc.merchan ? 'Ações' : 'Inserções'} por dia</span><span>Outubro</span></div>
        <div class="tvx-spark" style="--n:${days.length}">${days.map((d) => `<i class="${pd[d] ? 'h' + Math.min(pd[d], 2) : ''}"></i>`).join('')}</div>
        <div class="tvx-days" style="--n:${days.length}">${days.map((d) => `<span class="${pd[d] ? 'on' : ''}">${d}</span>`).join('')}</div>
        <div class="tvx-total"><small>${sc.brutoLabel || 'Total bruto'}</small><b>${money(sc.bruto)}</b></div>
      </div>`;
    };
    const num = ['Um', 'Dois', 'Três', 'Quatro', 'Cinco', 'Seis'][all.length - 1] || all.length;
    const byStation = stations.map((st) => {
      const idx = all.map((sc, i) => (stOf(sc) === st ? i : -1)).filter((i) => i >= 0);
      const names = idx.map((i) => all[i].label.replace(/^Cenário TV /, '')).join(idx.length > 2 ? ', ' : ' e ').replace(/, (\d+)$/, ' e $1');
      return `<b>${st}</b> no${idx.length > 1 ? 's' : ''} cenário${idx.length > 1 ? 's' : ''} ${names}`;
    });
    return `${deco}<div class="hs-pad">
      ${labelOf(stations.join(' e '))}
      <h2 class="hs-h">${num} caminhos <span class="sep">|</span> <em>na TV</em></h2>
      <div class="hs-bar"></div>
      <p class="hs-sub">Compare os cenários: emissora, formato, frequência, período e investimento.</p>
    </div>
    <div class="tvx-cards" style="--cols:${all.length}">${all.map(card).join('')}</div>
    <div class="hs-note">${ic('layers')}<span>${byStation.join(' · ')} — inserções de ${[...new Set(all.filter((sc) => !sc.merchan).map(fmtOf))].join(' e ')} e merchandising de ${[...new Set(all.filter((sc) => sc.merchan).map(fmtOf))].join(' e ')}.</span></div>
    ${footOf(stations.join(' · '))}`;
  }

  function render(slide) {
    const el = document.createElement('div');
    el.className = 'hs';
    el.setAttribute('role', slide.video ? 'group' : 'img');
    el.setAttribute('aria-label', slide.t + '. ' + slide.d);
    el.innerHTML = slide.html === 'tvProgramas' ? programas() : slide.html === 'tvCenario' ? cenario(slide.scenario, slide) : comparativo();
    return el;
  }

  /* Versões em texto para a tela do celular */
  function mobileMap(i) {
    const sc = T.scenarios[i];
    const rows = progsOf(sc).map((p) => {
      const ds = sc.days[keyOf(p)] || [];
      return `<div class="tvmob-row">
        <div class="nm">${p.code ? `<span>${p.code}</span>` : ''}${p.name}</div>
        <div class="val">${ds.length}× · ${money(rowTotal(p, ds))}</div>
        <div class="days">${ds.map((d) => `<i>${String(d).padStart(2, '0')}/10</i>`).join('')}</div>
      </div>`;
    }).join('');
    return `<div class="tvmob">${rows}
      <div class="tvmob-tot">
        ${costsOf(sc).map(([l, v]) => `<div><span>${l}</span><b>${money(v)}</b></div>`).join('')}
        <div><span>${sc.brutoLabel || 'Total bruto'}</span><b>${money(sc.bruto)}</b></div>
      </div></div>`;
  }
  const mapTitle = (i) => words(T.scenarios[i]).map;
  function mobilePrograms() {
    return `<div class="tvmob">${T.programs.map((p) => `<div class="tvmob-row">
      <div class="nm"><span>${p.code}</span>${p.name}${p.time ? ' · ' + p.time : ''}</div>
      <div class="val">${money(p.neg)}</div>
      <div class="days"><i>−${p.desc}%</i><small style="color:#8fb2b8;font-size:12px;align-self:center">tabela ${money(p.tab)}</small></div>
    </div>`).join('')}</div>`;
  }

  return { render, mobileMap, mobilePrograms, mapTitle, money };
})();
