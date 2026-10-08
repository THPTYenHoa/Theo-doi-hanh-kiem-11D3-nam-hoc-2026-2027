/* ══ MASCOT — nhân vật chibi "cô Thảo" (GVCN 11D3) (dùng chung index.html + phu-huynh.html) ══
   · Ảnh thật: mascot/<phong-cách>/<biểu-cảm>.webp (prompt Gemini: docs/prompt-chibi.md). Thiếu ảnh ⇒ chibi SVG vẽ sẵn.
   · MASCOT.say(emo, html, {ms}) — bong bóng góc dưới trái; MASCOT.img(emo, size) — thẻ <img> để chèn (hướng dẫn, hồ sơ…).
   · Phong cách: localStorage.hk_mascot = 'auto' (theo chủ đề giao diện) | tên phong cách | 'off' (tắt). */
(function () {
  'use strict';
  var EMO = ['chao', 'huong-dan', 'chi-tay', 'vui', 'khen-lon', 'co-vu', 'buon', 'lo-lang', 'nghiem', 'gian', 'suy-nghi', 'ngac-nhien', 'nghi-ngoi', 'an-mung', 'chup-anh', 'cam-on'];
  /* "Vai" của cô Thảo — mỗi vai một bộ ảnh (thư mục mascot/<id>/). c = [áo chính, viền / điểm nhấn, tay áo] */
  var STYLES = [
    { id: 'chu-nhiem', ten: 'Cô Thảo chủ nhiệm', mo: 'Gile đen viền vàng — như ảnh thật', c: ['#24232B', '#E2C27A', '#F4EEE2'] },
    { id: 'giang-day', ten: 'Cô Thảo lên lớp', mo: 'Cầm thước, đọc hướng dẫn', c: ['#0E7C86', '#FFFFFF', '#0E7C86'] },
    { id: 'ao-dai', ten: 'Cô Thảo áo dài', mo: 'Khai giảng, 20/11, lễ', c: ['#F8F5EF', '#C9A36A', '#F8F5EF'] },
    { id: 'ao-dai-do', ten: 'Cô Thảo áo dài Tết', mo: 'Tết, xuân', c: ['#C0392B', '#F2C230', '#C0392B'] },
    { id: 'stem', ten: 'Cô Thảo STEM', mo: 'Áo blouse, robot, khoa học', c: ['#FFFFFF', '#3D86CF', '#FFFFFF'] },
    { id: 'man-chin', ten: 'Cô Thảo mận chín', mo: 'Theo đề cương lớp 12', c: ['#7A1E3A', '#F2C230', '#F8E9ED'] },
    { id: 'mau-nuoc', ten: 'Cô Thảo màu nước', mo: 'Áo dài chàm — đề cương lớp 11', c: ['#302663', '#D9482B', '#302663'] },
    { id: 'mua-dong', ten: 'Cô Thảo mùa đông', mo: 'Khăn len, áo khoác', c: ['#4A6378', '#C0392B', '#4A6378'] },
    { id: 'trung-thu', ten: 'Cô Thảo Trung thu', mo: 'Đèn ông sao', c: ['#E07B2E', '#F2C230', '#E07B2E'] },
    { id: 'doi-thuong', ten: 'Cô Thảo cuối tuần', mo: 'Áo len, lo-fi', c: ['#9B7BC4', '#FFFFFF', '#9B7BC4'] }
  ];
  var BY_THEME = { 'mac-dinh': 'chu-nhiem', 'man-chin': 'man-chin', 'van-mieu': 'ao-dai', 'thu-vang': 'man-chin', 'giay-kraft': 'man-chin',
    'cham-mau-nuoc': 'mau-nuoc', 'trung-thu': 'trung-thu', 'dong-ha-noi': 'mua-dong', 'vo-o-ly': 'giang-day', 'bang-phan': 'giang-day',
    'hoa-phuong': 'chu-nhiem', 'hoa-dao': 'ao-dai-do', 'nha-giao': 'ao-dai', 'ho-guom': 'ao-dai', 'lo-fi': 'doi-thuong',
    'origami': 'giang-day', 'la-xanh': 'giang-day', 'bien-may': 'stem' };
  var OK = {}; /* url → true | false */

  function lsG(k) { try { return localStorage.getItem(k); } catch (_) { return null; } }
  function lsS(k, v) { try { localStorage.setItem(k, v); } catch (_) {} }
  function pick() { return lsG('hk_mascot') || 'auto'; }
  function styleId() {
    var p = pick(); if (p === 'off') return 'off';
    if (p !== 'auto' && STYLES.some(function (s) { return s.id === p; })) return p;
    var d = new Date(), m = d.getMonth() + 1, dd = d.getDate();
    if (m === 11 && dd >= 14 && dd <= 22) return 'ao-dai';            /* tuần lễ 20/11 */
    var th = (window.THEME && THEME.cur && THEME.cur().id) || lsG('hkph_theme') || '';
    return BY_THEME[th] || 'chu-nhiem';
  }
  function sty(id) { return STYLES.filter(function (s) { return s.id === id; })[0] || STYLES[0]; }

  /* ── chibi SVG dự phòng: cô Thảo — tóc dài mái thưa nâu ánh đỏ, mặt tròn phúc hậu, kính cận gọng đen; mắt / miệng / chân mày đổi theo biểu cảm ── */
  function svg(emo, st) {
    var c = sty(st).c, top = c[0], acc = c[1];
    var eye = { happy: 'M36 54q4-5 8 0M56 54q4-5 8 0', open: '', closed: 'M36 53q4 3 8 0M56 53q4 3 8 0', wide: '', sad: '', angry: '' };
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
    else eyes = '<circle cx="40" cy="53.5" r="3.6" fill="#2A1E1E"/><circle cx="60" cy="53.5" r="3.6" fill="#2A1E1E"/><circle cx="41.3" cy="52.2" r="1.3" fill="#fff"/><circle cx="61.3" cy="52.2" r="1.3" fill="#fff"/>';
    var brow = ['', '<path d="M36 44l9 2M64 44l-9 2" stroke="#2A1E1E" stroke-width="2.2" stroke-linecap="round"/>',
      '<path d="M36 45h9M55 45h9" stroke="#2A1E1E" stroke-width="2.2" stroke-linecap="round"/>',
      '<path d="M36 42l9 4M64 42l-9 4" stroke="#2A1E1E" stroke-width="2.4" stroke-linecap="round"/><path d="M70 22l4 4M74 22l-4 4M72 20v8M68 24h8" stroke="#E5484D" stroke-width="2.2" stroke-linecap="round"/>'][E[2]];
    var extra = '';
    if (emo === 'vui' || emo === 'khen-lon' || emo === 'an-mung') extra = '<path d="M14 30l2 5 5 2-5 2-2 5-2-5-5-2 5-2zM84 34l1.5 3.5 3.5 1.5-3.5 1.5L84 44l-1.5-3.5L79 39l3.5-1.5z" fill="#F2C230"/>';
    if (emo === 'buon' || emo === 'lo-lang') extra = '<path d="M70 40q3 5 0 7q-3-2 0-7z" fill="#7CC4F2"/>';
    if (emo === 'suy-nghi') extra = '<text x="74" y="30" font-size="14" font-weight="800" fill="' + top + '">?</text>';
    if (emo === 'ngac-nhien') extra = '<text x="76" y="30" font-size="15" font-weight="800" fill="#E5484D">!</text>';
    var sl = sty(st).c[2], hair = '#5A2E22', hairL = '#7A3E2C', body;
    if (st === 'chu-nhiem') body = '<path d="M20 100q2-23 30-25q28 2 30 25z" fill="' + sl + '"/><path d="M30 100q1-18 9-23l11 13 11-13q8 5 9 23z" fill="' + top + '"/><path d="M39 77l11 13 11-13" fill="none" stroke="' + acc + '" stroke-width="2.4"/><path d="M42 75q8 6 16 0" fill="#fff"/>';
    else if (st === 'ao-dai' || st === 'ao-dai-do' || st === 'mau-nuoc') body = '<path d="M20 100q2-23 30-25q28 2 30 25z" fill="' + top + '"/><rect x="44" y="72" width="12" height="9" rx="3" fill="' + top + '" stroke="' + acc + '" stroke-width="1.6"/><path d="M50 81v19" stroke="' + acc + '" stroke-width="1.6"/>';
    else if (st === 'stem') body = '<path d="M20 100q2-23 30-25q28 2 30 25z" fill="#fff" stroke="#C9D6DB" stroke-width="1.2"/><path d="M42 75l8 10 8-10" fill="#BFD6EE"/><rect x="60" y="86" width="9" height="6" rx="1.5" fill="' + acc + '"/>';
    else if (st === 'mua-dong') body = '<path d="M20 100q2-23 30-25q28 2 30 25z" fill="' + top + '"/><path d="M34 76q16 9 32 0l-2 8q-14 6-28 0z" fill="' + acc + '"/><path d="M58 82l3 14" stroke="' + acc + '" stroke-width="5" stroke-linecap="round"/>';
    else body = '<path d="M20 100q2-23 30-25q28 2 30 25z" fill="' + top + '"/><path d="M42 75l8 9 8-9" fill="none" stroke="' + acc + '" stroke-width="2.6" stroke-linejoin="round"/>';
    if (st === 'trung-thu') extra += '<path d="M84 60l3 6 6 1-4.5 4.5 1 6.5-5.5-3-5.5 3 1-6.5-4.5-4.5 6-1z" fill="#F2C230" stroke="#E07B2E" stroke-width="1"/><path d="M84 52v8" stroke="#8A5A35" stroke-width="1.4"/>';
    if (st === 'giang-day' && (emo === 'huong-dan' || emo === 'chi-tay')) extra += '<path d="M70 92L92 66" stroke="#8A5A35" stroke-width="3" stroke-linecap="round"/>';
    return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M22 50q0-28 28-28t28 28v34q-6 6-12 4V60H34v28q-6 2-12-4z" fill="' + hair + '"/>' + body +
      '<ellipse cx="50" cy="52" rx="24" ry="23" fill="#F8DECC"/>' +
      '<path d="M25 50q2-24 25-24t25 24q-3-9-8-13q-1 6-6 8q1-6-2-9q-3 6-9 8q1-5-1-8q-4 7-11 9q2-5 1-9q-8 5-14 14z" fill="' + hair + '"/>' +
      '<path d="M30 40q6-8 14-10" stroke="' + hairL + '" stroke-width="1.6" fill="none" opacity=".8"/>' +
      '<circle cx="40" cy="53" r="8.6" fill="rgba(255,255,255,.25)" stroke="#1E1A1A" stroke-width="2.4"/><circle cx="60" cy="53" r="8.6" fill="rgba(255,255,255,.25)" stroke="#1E1A1A" stroke-width="2.4"/><path d="M48.6 52.5q1.4-1.2 2.8 0" fill="none" stroke="#1E1A1A" stroke-width="2.2"/><path d="M31.4 51l-5-2M68.6 51l5-2" stroke="#1E1A1A" stroke-width="2"/>' +
      eyes + brow + '<ellipse cx="33" cy="63" rx="4.6" ry="3" fill="#F4A6A6" opacity=".75"/><ellipse cx="67" cy="63" rx="4.6" ry="3" fill="#F4A6A6" opacity=".75"/>' +
      '<path d="' + E[1] + '" fill="' + (/z$/.test(E[1]) ? '#B8434F' : 'none') + '" stroke="#8A3A3A" stroke-width="2.2" stroke-linecap="round"/>' + extra + '</svg>';
  }
  function url(emo, st) { return 'mascot/' + st + '/' + emo + '.webp'; }
  function img(emo, size, st) {
    var cur = styleId(); if (cur === 'off') return '';
    if (st === 'tour') st = pick() === 'auto' ? 'giang-day' : cur;
    st = st || cur;
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
