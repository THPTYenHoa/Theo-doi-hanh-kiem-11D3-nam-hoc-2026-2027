/* ══ MASCOT — nhân vật chibi "Cô giáo 11D3" (dùng chung index.html + phu-huynh.html) ══
   · Ảnh thật: mascot/<phong-cách>/<biểu-cảm>.webp (prompt Gemini: docs/prompt-chibi.md). Thiếu ảnh ⇒ chibi SVG vẽ sẵn.
   · MASCOT.say(emo, html, {ms}) — bong bóng góc dưới trái; MASCOT.img(emo, size) — thẻ <img> để chèn (hướng dẫn, hồ sơ…).
   · Phong cách: localStorage.hk_mascot = 'auto' (theo chủ đề giao diện) | tên phong cách | 'off' (tắt). */
(function () {
  'use strict';
  var EMO = ['chao', 'huong-dan', 'chi-tay', 'vui', 'khen-lon', 'co-vu', 'buon', 'lo-lang', 'nghiem', 'gian', 'suy-nghi', 'ngac-nhien', 'nghi-ngoi', 'an-mung', 'chup-anh', 'cam-on'];
  var STYLES = [
    { id: 'kawaii', ten: 'Kawaii sticker', c: ['#0E7C86', '#F3F7F8'] },
    { id: 'man-chin', ten: 'Mận chín', c: ['#7A1E3A', '#F2C230'] },
    { id: 'mau-nuoc', ten: 'Chàm màu nước', c: ['#302663', '#D9482B'] },
    { id: 'but-chi', ten: 'Bút chì vở ô ly', c: ['#2B6CB0', '#FFFFFF'] },
    { id: 'hoa-phuong', ten: 'Hoa phượng', c: ['#C23B22', '#FFF3E0'] },
    { id: 'lo-fi', ten: 'Lo-fi', c: ['#6B4C9A', '#F4E9FB'] },
    { id: '3d', ten: '3D đất sét', c: ['#E07B5F', '#22325A'] },
    { id: 'anime', ten: 'Anime tươi sáng', c: ['#3D86CF', '#FFFFFF'] }
  ];
  var BY_THEME = { 'man-chin': 'man-chin', 'van-mieu': 'man-chin', 'thu-vang': 'man-chin', 'giay-kraft': 'man-chin',
    'cham-mau-nuoc': 'mau-nuoc', 'trung-thu': 'mau-nuoc', 'dong-ha-noi': 'mau-nuoc', 'vo-o-ly': 'but-chi', 'bang-phan': 'but-chi',
    'hoa-phuong': 'hoa-phuong', 'hoa-dao': 'hoa-phuong', 'nha-giao': 'hoa-phuong', 'lo-fi': 'lo-fi' };
  var OK = {}; /* url → true | false */

  function lsG(k) { try { return localStorage.getItem(k); } catch (_) { return null; } }
  function lsS(k, v) { try { localStorage.setItem(k, v); } catch (_) {} }
  function pick() { return lsG('hk_mascot') || 'auto'; }
  function styleId() {
    var p = pick(); if (p === 'off') return 'off';
    if (p !== 'auto' && STYLES.some(function (s) { return s.id === p; })) return p;
    var th = (window.THEME && THEME.cur && THEME.cur().id) || lsG('hkph_theme') || '';
    return BY_THEME[th] || 'kawaii';
  }
  function sty(id) { return STYLES.filter(function (s) { return s.id === id; })[0] || STYLES[0]; }

  /* ── chibi SVG dự phòng: cô giáo tóc búi, kính tròn; mắt / miệng / chân mày đổi theo biểu cảm ── */
  function svg(emo, st) {
    var c = sty(st).c, top = c[0], acc = c[1];
    var eye = { happy: 'M37 52q4-5 8 0M55 52q4-5 8 0', open: '', closed: 'M37 52q4 3 8 0M55 52q4 3 8 0', wide: '', sad: '', angry: '' };
    var E = {
      'chao': ['happy', 'M42 64q8 8 16 0', 0], 'huong-dan': ['open', 'M44 64q6 5 12 0', 0], 'chi-tay': ['wink', 'M43 63q7 6 14 0', 0],
      'vui': ['happy', 'M41 62q9 10 18 0', 0], 'khen-lon': ['happy', 'M40 61q10 13 20 0z', 0], 'co-vu': ['open', 'M42 63q8 7 16 0', 0],
      'buon': ['sad', 'M43 67q7-5 14 0', 1], 'lo-lang': ['open', 'M44 66q6-3 12 0', 1], 'nghiem': ['flat', 'M44 65h12', 2],
      'gian': ['angry', 'M44 67q6-4 12 0', 3], 'suy-nghi': ['up', 'M46 65q4 2 8 0', 0], 'ngac-nhien': ['wide', 'M47 64a3 4 0 1 0 6 0a3 4 0 1 0-6 0', 0],
      'nghi-ngoi': ['closed', 'M44 63q6 5 12 0', 0], 'an-mung': ['happy', 'M40 61q10 13 20 0z', 0], 'chup-anh': ['open', 'M45 64q5 4 10 0', 0], 'cam-on': ['closed', 'M43 63q7 6 14 0', 0]
    }[emo] || ['open', 'M44 64q6 5 12 0', 0];
    var e = E[0], eyes;
    if (e === 'happy' || e === 'closed') eyes = '<path d="' + eye[e] + '" fill="none" stroke="#2A1E1E" stroke-width="2.6" stroke-linecap="round"/>';
    else if (e === 'wink') eyes = '<circle cx="41" cy="52" r="3.6" fill="#2A1E1E"/><circle cx="42.2" cy="50.8" r="1.2" fill="#fff"/><path d="M55 52q4-4 8 0" fill="none" stroke="#2A1E1E" stroke-width="2.6" stroke-linecap="round"/>';
    else if (e === 'wide') eyes = '<circle cx="41" cy="52" r="4.6" fill="#2A1E1E"/><circle cx="59" cy="52" r="4.6" fill="#2A1E1E"/><circle cx="42.5" cy="50.5" r="1.6" fill="#fff"/><circle cx="60.5" cy="50.5" r="1.6" fill="#fff"/>';
    else if (e === 'flat') eyes = '<path d="M37 53h8M55 53h8" stroke="#2A1E1E" stroke-width="2.8" stroke-linecap="round"/>';
    else if (e === 'up') eyes = '<circle cx="42" cy="50" r="3.6" fill="#2A1E1E"/><circle cx="60" cy="50" r="3.6" fill="#2A1E1E"/>';
    else eyes = '<circle cx="41" cy="52.5" r="3.8" fill="#2A1E1E"/><circle cx="59" cy="52.5" r="3.8" fill="#2A1E1E"/><circle cx="42.3" cy="51.2" r="1.3" fill="#fff"/><circle cx="60.3" cy="51.2" r="1.3" fill="#fff"/>';
    var brow = ['', '<path d="M36 44l9 2M64 44l-9 2" stroke="#2A1E1E" stroke-width="2.2" stroke-linecap="round"/>',
      '<path d="M36 45h9M55 45h9" stroke="#2A1E1E" stroke-width="2.2" stroke-linecap="round"/>',
      '<path d="M36 42l9 4M64 42l-9 4" stroke="#2A1E1E" stroke-width="2.4" stroke-linecap="round"/><path d="M70 22l4 4M74 22l-4 4M72 20v8M68 24h8" stroke="#E5484D" stroke-width="2.2" stroke-linecap="round"/>'][E[2]];
    var extra = '';
    if (emo === 'vui' || emo === 'khen-lon' || emo === 'an-mung') extra = '<path d="M14 30l2 5 5 2-5 2-2 5-2-5-5-2 5-2zM84 34l1.5 3.5 3.5 1.5-3.5 1.5L84 44l-1.5-3.5L79 39l3.5-1.5z" fill="#F2C230"/>';
    if (emo === 'buon' || emo === 'lo-lang') extra = '<path d="M70 40q3 5 0 7q-3-2 0-7z" fill="#7CC4F2"/>';
    if (emo === 'suy-nghi') extra = '<text x="74" y="30" font-size="14" font-weight="800" fill="' + top + '">?</text>';
    if (emo === 'ngac-nhien') extra = '<text x="76" y="30" font-size="15" font-weight="800" fill="#E5484D">!</text>';
    return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M22 100q2-24 28-26q26 2 28 26z" fill="' + top + '"/><path d="M42 76l8 8 8-8" fill="none" stroke="' + acc + '" stroke-width="3" stroke-linejoin="round"/>' +
      '<circle cx="50" cy="13" r="10" fill="#2A1E1E"/>' +
      '<ellipse cx="50" cy="48" rx="27" ry="27" fill="#2A1E1E"/>' +
      '<ellipse cx="50" cy="53" rx="22" ry="21" fill="#F7DCC8"/>' +
      '<path d="M27 46q8-18 23-18q15 0 23 18q-11-9-23-9q-7 0-12 6q-6-2-11 3z" fill="#2A1E1E"/>' +
      '<circle cx="41" cy="52.5" r="7.5" fill="none" stroke="#5A4A44" stroke-width="1.6"/><circle cx="59" cy="52.5" r="7.5" fill="none" stroke="#5A4A44" stroke-width="1.6"/><path d="M48.5 52.5h3" stroke="#5A4A44" stroke-width="1.6"/>' +
      eyes + brow + '<ellipse cx="35" cy="61" rx="4" ry="2.6" fill="#F4A6A6" opacity=".7"/><ellipse cx="65" cy="61" rx="4" ry="2.6" fill="#F4A6A6" opacity=".7"/>' +
      '<path d="' + E[1] + '" fill="' + (/z$/.test(E[1]) ? '#B8434F' : 'none') + '" stroke="#8A3A3A" stroke-width="2.2" stroke-linecap="round"/>' + extra + '</svg>';
  }
  function url(emo, st) { return 'mascot/' + st + '/' + emo + '.webp'; }
  function img(emo, size, st) {
    st = st || styleId(); if (st === 'off') return '';
    size = size || 72;
    var u = url(emo, st), id = 'm' + Math.random().toString(36).slice(2, 8);
    var fb = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg(emo, st));
    if (OK[u] === true) return '<img class="mascot m-' + emo + '" src="' + u + '" width="' + size + '" height="' + size + '" alt="">';
    if (OK[u] === undefined) {
      var t = new Image(); t.onload = function () { OK[u] = true; var e = document.getElementById(id); if (e) e.src = u; }; t.onerror = function () { OK[u] = false; }; t.src = u;
    }
    return '<img class="mascot m-' + emo + '" id="' + id + '" src="' + fb + '" width="' + size + '" height="' + size + '" alt="">';
  }

  var css = document.createElement('style');
  css.textContent =
    '#msc{position:fixed;left:14px;bottom:calc(var(--nav,0px) + env(safe-area-inset-bottom,0px) + 78px);z-index:9000;display:flex;align-items:flex-end;gap:2px;pointer-events:none;' +
    'opacity:0;transform:translateY(18px) scale(.92);transition:opacity .25s,transform .35s cubic-bezier(.2,1.4,.4,1)}' +
    '#msc.on{opacity:1;transform:none;pointer-events:auto}' +
    '#msc .mascot{width:84px;height:84px;filter:drop-shadow(0 6px 10px rgba(0,0,0,.18))}' +
    '@keyframes mscb{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}' +
    '#msc .bb{max-width:min(260px,calc(100vw - 120px));margin-bottom:46px;background:#fff;color:#1B333A;border:1px solid #E3ECEE;border-radius:16px 16px 16px 4px;' +
    'padding:9px 12px;font:600 13.5px/1.45 Aptos,"Segoe UI",system-ui,sans-serif;box-shadow:0 8px 24px rgba(20,40,50,.14);cursor:pointer}' +
    '#msc .bb b{color:var(--teal-d,#0A5C64)}' +
    '@media (min-width:1024px){#msc{left:calc(var(--rail,0px) + 22px);bottom:22px}}' +
    '@media (prefers-reduced-motion:reduce){#msc,#msc .mascot{animation:none;transition:none}}' +
    '#tg-card .tgm{float:left;margin:-4px 10px 4px -4px}' +
    '.mascot{transform-origin:50% 90%}' +
    '.m-chao{animation:m-wave 1.2s ease-in-out 3}@keyframes m-wave{0%,100%{transform:rotate(0)}25%{transform:rotate(-8deg)}75%{transform:rotate(8deg)}}' +
    '.m-vui,.m-co-vu{animation:m-hop .55s ease-out 3}@keyframes m-hop{0%,100%{transform:translateY(0)}40%{transform:translateY(-14px) scale(1.04,.97)}}' +
    '.m-khen-lon,.m-an-mung{animation:m-jump 1.1s cubic-bezier(.3,1.6,.5,1) 2}@keyframes m-jump{0%,100%{transform:translateY(0) rotate(0)}35%{transform:translateY(-22px) rotate(-6deg) scale(1.08)}60%{transform:translateY(-10px) rotate(6deg)}}' +
    '.m-buon,.m-lo-lang{animation:m-droop 2.2s ease-in-out 2}@keyframes m-droop{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(5px) rotate(-3deg) scale(.98)}}' +
    '.m-nghiem{animation:m-no .5s ease-in-out 4}@keyframes m-no{0%,100%{transform:rotate(0)}25%{transform:rotate(-5deg)}75%{transform:rotate(5deg)}}' +
    '.m-gian{animation:m-angry .12s linear 10,m-puff .6s ease-in-out 3}@keyframes m-angry{0%,100%{transform:translateX(0)}50%{transform:translateX(-3px)}}@keyframes m-puff{50%{filter:drop-shadow(0 0 8px rgba(229,72,77,.55))}}' +
    '.m-suy-nghi{animation:m-sway 1.8s ease-in-out infinite}@keyframes m-sway{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}' +
    '.m-ngac-nhien{animation:m-pop .45s cubic-bezier(.3,1.8,.5,1) 1}@keyframes m-pop{0%{transform:scale(.6)}100%{transform:scale(1)}}' +
    '.m-chi-tay,.m-huong-dan{animation:m-nudge 1s ease-in-out 3}@keyframes m-nudge{0%,100%{transform:translateX(0)}50%{transform:translateX(5px) rotate(3deg)}}' +
    '.m-chup-anh{animation:m-flash .9s ease-out 2}@keyframes m-flash{0%{filter:brightness(1)}15%{filter:brightness(1.6)}100%{filter:brightness(1)}}' +
    '.m-cam-on{animation:m-bow 1.6s ease-in-out 2}@keyframes m-bow{0%,100%{transform:rotate(0)}40%{transform:rotate(10deg) translateY(4px)}}' +
    '@media (prefers-reduced-motion:reduce){.mascot{animation:none!important}}';
  document.head.appendChild(css);

  var hideT = null;
  function say(emo, html, o) {
    o = o || {};
    if (styleId() === 'off') return;
    var b = document.getElementById('msc');
    if (!b) { b = document.createElement('div'); b.id = 'msc'; document.body.appendChild(b); b.onclick = function () { b.classList.remove('on'); }; }
    b.innerHTML = img(emo, 84) + (html ? '<div class="bb">' + html + '</div>' : '');
    requestAnimationFrame(function () { b.classList.add('on'); });
    clearTimeout(hideT); hideT = setTimeout(function () { b.classList.remove('on'); }, o.ms || 3400);
  }

  window.MASCOT = {
    EMO: EMO, STYLES: STYLES, BY_THEME: BY_THEME,
    say: say, img: img, svg: svg, style: styleId, pick: pick,
    set: function (v) { lsS('hk_mascot', v); }
  };
})();
