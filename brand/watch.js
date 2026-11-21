/* ZAMAN — watch renderer (Blender renders + live hand layers) and logo. */
(function (g) {
  let n = 0;

  // Collection presets
  g.ZAMAN_MODELS = {
    layl:  { name: 'Layl',  ar: 'ليل',  line: 'Heritage', strapType: 'leather', price: 1890, case: '#D6B77A', caseDark: '#8A6D3C', dial: '#14223A', dialEdge: '#080E1A', index: '#E8D6A8', hand: '#F2ECE1', second: '#C9A86A', strap: '#2B211C', stitch: '#6B5643', style: 'baton', tag: 'Leather' },
    noor:  { name: 'Noor',  ar: 'نور',  line: 'Heritage', strapType: 'leather', price: 1750, case: '#E6E2DA', caseDark: '#8F8B84', dial: '#EFE6D2', dialEdge: '#CDBF9F', index: '#7A5F2E', hand: '#3A2E1C', second: '#6E1F25', strap: '#5A3A24', stitch: '#9C7A55', style: 'numeral', tag: 'Leather' },
    qamar: { name: 'Qamar', ar: 'قمر',  line: 'Sport',    strapType: 'steel',   price: 2350, case: '#E3E5E8', caseDark: '#7D828A', dial: '#C9CDD3', dialEdge: '#8E949C', index: '#1A1D23', hand: '#1A1D23', second: '#C9A86A', strap: '#C4C8CE', stitch: '#8E949C', style: 'baton', tag: 'Steel' },
    bahr:  { name: 'Bahr',  ar: 'بحر',  line: 'Sport',    strapType: 'steel',   price: 2490, case: '#DADDE1', caseDark: '#6F747B', dial: '#0F3B3E', dialEdge: '#062022', index: '#E9E4D8', hand: '#F2ECE1', second: '#D9A55B', strap: '#BFC3C9', stitch: '#80868E', style: 'baton', tag: 'Steel' },
    sahra: { name: 'Sahra', ar: 'صحراء', line: 'Heritage', strapType: 'leather', price: 1690, case: '#D6B77A', caseDark: '#8A6D3C', dial: '#C8A57A', dialEdge: '#8C6A45', index: '#2B211C', hand: '#2B211C', second: '#F2ECE1', strap: '#6A4A30', stitch: '#B08B62', style: 'numeral', tag: 'Leather' },
    jamr:  { name: 'Jamr',  ar: 'جمر',  line: 'Limited',  strapType: 'leather', price: 3200, case: '#D6B77A', caseDark: '#7E6234', dial: '#5A161C', dialEdge: '#2A080B', index: '#EBD3A0', hand: '#F2ECE1', second: '#EBD3A0', strap: '#1A1412', stitch: '#5A161C', style: 'baton', tag: 'Limited' },
    sawad: { name: 'Sawad', ar: 'سواد', line: 'Limited',  strapType: 'steel',   price: 2950, case: '#2B2E34', caseDark: '#0E1013', dial: '#0D0F13', dialEdge: '#000000', index: '#C9A86A', hand: '#C9A86A', second: '#E8D6A8', strap: '#25282E', stitch: '#3A3E46', style: 'baton', tag: 'Limited' },
    fajr:  { name: 'Fajr',  ar: 'فجر',  line: 'Heritage', strapType: 'leather', price: 1820, case: '#E6E2DA', caseDark: '#8F8B84', dial: '#D9C2C0', dialEdge: '#A88986', index: '#3A2E1C', hand: '#2B2420', second: '#6E1F25', strap: '#2F2A28', stitch: '#7A6E66', style: 'numeral', tag: 'Leather' }
  };

  // Each model knows its own key (renders are named <key>-base.webp, <key>-hour.webp …)
  Object.keys(g.ZAMAN_MODELS).forEach(k => { g.ZAMAN_MODELS[k].key = k; });
  // Dial colours tuned to match the Blender renders
  g.ZAMAN_MODELS.layl.dial = '#1B3566'; g.ZAMAN_MODELS.bahr.dial = '#0E5258'; g.ZAMAN_MODELS.jamr.dial = '#7C1C26';

  const SRC = (document.currentScript && document.currentScript.src) || location.href;
  const BASE = new URL('watches/', SRC).href;
  const url = (k, layer) => `${BASE}${k}-${layer}.webp`;

  // Warm the image cache so watches redraw instantly (live clocks, reels, sliders)
  g.ZAMAN_PRELOAD = [];
  Object.keys(g.ZAMAN_MODELS).forEach(k => ['base', 'hour', 'minute', 'second'].forEach(l => {
    const im = new Image(); im.src = url(k, l); g.ZAMAN_PRELOAD.push(im);
  }));

  /* Photoreal watch: a Blender render of the watch body plus one layer per hand.
     The render camera is orthographic and centred on the dial, so each hand layer
     rotates around (100,170) in this 200×340 viewBox — same geometry as before. */
  g.watchSVG = function (o = {}) {
    const id = 'zw' + (n++);
    const c = Object.assign({}, g.ZAMAN_MODELS.layl, { h: 10, m: 9, s: 32 }, o);
    const k = c.key || 'layl';
    const ha = (c.h % 12) * 30 + c.m * 0.5 + c.s / 120;
    const ma = c.m * 6 + c.s * 0.1;
    const sa = c.s * 6;
    const img = (cls, layer, a) => `<image class="${cls}" href="${url(k, layer)}" x="0" y="0" width="200" height="340" preserveAspectRatio="xMidYMid meet"${a === undefined ? '' : ` transform="rotate(${a.toFixed(2)} 100 170)"`}/>`;
    return `<svg viewBox="0 0 200 340" xmlns="http://www.w3.org/2000/svg" class="zaman-watch" role="img" aria-label="${c.name} watch">
  <defs><filter id="${id}h" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx=".5" dy=".9" stdDeviation=".7" flood-color="#000" flood-opacity=".5"/></filter></defs>
  ${img('zw-base', 'base')}
  <g filter="url(#${id}h)">
    ${img('zh-h', 'hour', ha)}
    ${img('zh-m', 'minute', ma)}
    ${img('zh-s', 'second', sa)}
  </g>
</svg>`;
  };

  // Move the hands of an already-rendered watch. totalMinutes = h*60 + m (can be fractional / exceed 720).
  g.setHands = function (root, totalMinutes, seconds) {
    const r = (sel, a) => { const el = root.querySelector(sel); if (el) el.setAttribute('transform', `rotate(${a.toFixed(2)} 100 170)`); };
    r('.zh-h', (totalMinutes / 2) % 360);
    r('.zh-m', (totalMinutes * 6) % 360);
    if (seconds !== undefined) r('.zh-s', (seconds * 6) % 360);
  };

  // Logo mark: a dial whose "Z" doubles as clock hands, with a 12 o'clock index
  g.zamanMark = function (color = '#C9A86A', sw = 2.4) {
    return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="zaman-mark" aria-label="ZAMAN mark">
  <circle cx="50" cy="50" r="44" fill="none" stroke="${color}" stroke-width="${sw}"/>
  <circle cx="50" cy="50" r="38.5" fill="none" stroke="${color}" stroke-width="${sw * 0.32}" opacity=".7"/>
  <rect x="48.6" y="13.5" width="2.8" height="8" fill="${color}"/>
  <path d="M33 35 H67 L33 65 H67" fill="none" stroke="${color}" stroke-width="${sw * 1.5}" stroke-linejoin="miter" stroke-linecap="square"/>
  <circle cx="50" cy="50" r="3" fill="${color}"/>
</svg>`;
  };

  g.zamanWordmark = function (color = '#C9A86A', sub = true) {
    return `<div class="zaman-wordmark" style="color:${color}">
      <span class="wm-en">ZAMAN</span>${sub ? '<span class="wm-ar">زمان</span>' : ''}
    </div>`;
  };
})(window);
