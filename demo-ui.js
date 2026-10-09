/* ══ v4.0 — GIAO DIỆN CHẾ ĐỘ TRẢI NGHIỆM (đi kèm demo.js; nạp cuối <body> của index.html và phu-huynh.html) ══
   · Màn đăng nhập: thẻ "Kiểm tra tính năng ứng dụng" ⇒ vào sổ ngay với dữ liệu mẫu (vai cô Thảo — GVCN).
   · Thanh #dm-bar: đổi vai · Hướng dẫn trải nghiệm (#dm-guide, 9 việc, tự đánh dấu) · Hộp thư mô phỏng (#dm-inbox) · Làm lại · Thoát.
   · Mỗi việc có nút "Làm ngay": đổi đúng vai (tải lại trang), mở đúng màn hình và cô Thảo nhắc cần bấm vào đâu. */
(function () {
  'use strict';
  var PAGE = /phu-huynh/.test(location.pathname) ? 'ph' : 'app';
  function g(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function s(k, v) { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) {} }
  function ss(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); v == null ? sessionStorage.removeItem(k) : sessionStorage.setItem(k, v); } catch (e) { return null; } }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function $(q) { return document.querySelector(q); }
  var CACHES = ['hk_cache_v3', 'hk_cache_v4', 'hk_outbox_v1', 'hk_khoa', 'hkph_cache_v1', 'hkph_token', 'hk_phreg_seen'];
  function clearCaches() { CACHES.forEach(function (k) { s(k, null); }); }
  function curRole() { if (PAGE === 'ph') return 'ph'; var t = g('hk_token') || ''; var m = t.match(/^tok\.(\w+)/); return m ? m[1] : 'gvcn'; }
  function switchRole(role, next) {
    if (next) ss('dm_next', next);
    clearCaches();
    if (role === 'ph') { location.href = 'phu-huynh.html?demo=1' + (next && next.indexOf('#') === 0 ? next : ''); return; }
    s('hk_token', 'tok.' + role);
    if (PAGE === 'ph' || curRole() !== role || true) { location.href = 'index.html?demo=1'; }
  }
  function enter() {
    var t = g('hk_token'); if (t && !/^tok\./.test(t)) s('hk_demo_bak', t);
    s('hk_demo', '1'); s('hk_demo_db_v1', null); clearCaches(); s('hk_token', 'tok.gvcn'); ss('dm_next', 'intro');
    location.href = 'index.html?demo=1';
  }
  function leave() {
    s('hk_demo', null); clearCaches(); var b = g('hk_demo_bak'); s('hk_token', b || null); s('hk_demo_bak', null);
    location.href = 'index.html?demo=0';
  }

  /* ── CSS chung ── */
  var css = document.createElement('style'); css.id = 'dm-css';
  css.textContent =
    '#dm-enter{display:flex;align-items:center;gap:12px;margin-top:12px;padding:14px 15px;border-radius:14px;background:linear-gradient(135deg,#FFF7E8,#FFFFFF);border:1.5px solid #F4A261;text-align:left;width:100%;font:inherit;cursor:pointer}' +
    '#dm-enter:hover{box-shadow:0 8px 22px rgba(244,162,97,.25)}#dm-enter .i{width:40px;height:40px;border-radius:12px;background:#F4A261;color:#fff;display:grid;place-items:center;flex:none}#dm-enter .i svg{width:22px;height:22px}' +
    '#dm-enter b{display:block;font-size:15px;color:#7A4A12}#dm-enter span span{display:block;font-size:12.5px;color:#8A6A3A;line-height:1.45}' +
    'html.demo body{padding-top:42px}html.demo #app{height:calc(100% - 42px)}html.demo #top{top:42px}' +
    '#dm-bar{position:fixed;left:0;right:0;top:0;height:42px;z-index:9800;display:flex;align-items:center;gap:8px;padding:0 12px;background:#1B333A;color:#fff;font:600 13px/1 Aptos,"Segoe UI",system-ui,sans-serif;box-shadow:0 2px 10px rgba(0,0,0,.18)}' +
    '#dm-bar .tag{background:#F4A261;color:#3A2410;border-radius:99px;padding:5px 10px;font-weight:800;font-size:11.5px;letter-spacing:.04em;white-space:nowrap}' +
    '#dm-bar .roles{display:flex;gap:3px;background:rgba(255,255,255,.08);border-radius:10px;padding:3px}' +
    '#dm-bar .roles button{border:0;background:none;color:#CFE3E6;font:inherit;font-size:12.5px;height:28px;padding:0 10px;border-radius:8px;cursor:pointer;white-space:nowrap}' +
    '#dm-bar .roles button.on{background:#fff;color:#0A5C64}#dm-bar .sp{flex:1}' +
    '#dm-bar .bt{border:1px solid rgba(255,255,255,.25);background:none;color:#fff;font:inherit;font-size:12.5px;height:30px;padding:0 11px;border-radius:9px;cursor:pointer;display:flex;align-items:center;gap:6px;white-space:nowrap}' +
    '#dm-bar .bt.hl{background:#F4A261;border-color:#F4A261;color:#3A2410}#dm-bar .bt i{font-style:normal;background:#C0392B;color:#fff;border-radius:9px;padding:1px 6px;font-size:11px}' +
    '#dm-bar .bt svg{width:16px;height:16px;flex:none}#dm-bar select{display:none;height:30px;border-radius:9px;border:0;background:#fff;color:#1B333A;max-width:150px;font:inherit;font-size:12.5px;padding:0 6px}' +
    '@media(max-width:820px){#dm-bar .roles{display:none}#dm-bar select{display:block}#dm-bar .tag{display:none}#dm-bar .bt .t{display:none}#dm-bar{gap:6px;padding:0 8px}}' +
    '.dm-ov{position:fixed;inset:0;z-index:9900;background:rgba(15,30,35,.45);display:flex;align-items:center;justify-content:center;padding:16px}' +
    '.dm-box{background:#fff;border-radius:18px;width:min(980px,100%);max-height:calc(100vh - 40px);display:flex;flex-direction:column;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.3);font-family:Aptos,"Segoe UI",system-ui,sans-serif;color:#1B333A}' +
    '.dm-box .hd{display:flex;align-items:center;gap:12px;padding:14px 18px;border-bottom:1px solid #E6EEF0}.dm-box .hd img{width:64px;height:64px;margin:-8px 0}' +
    '.dm-box .hd h3{margin:0;font-size:18px;color:#0A5C64}.dm-box .hd p{margin:2px 0 0;font-size:13px;color:#5C7A83}.dm-box .hd .x{margin-left:auto;border:0;background:#F0F5F6;border-radius:10px;width:34px;height:34px;font-size:18px;cursor:pointer}' +
    '.dm-box .bd{overflow:auto;padding:12px 18px 18px}' +
    '.dm-st{display:grid;grid-template-columns:34px 1fr auto;gap:12px;align-items:center;padding:11px 12px;border:1px solid #E6EEF0;border-radius:14px;margin-bottom:8px}' +
    '.dm-st.done{background:#F2FAF5;border-color:#CDE9D6}.dm-st .n{width:30px;height:30px;border-radius:50%;background:#E6F3F4;color:#0A5C64;display:grid;place-items:center;font-weight:800}' +
    '.dm-st.done .n{background:#1E8449;color:#fff}.dm-st > div > b{display:block;font-size:14.5px}.dm-st .r{display:inline-block;font-size:11.5px;font-weight:700;color:#7A4A12;background:#FFF1E0;border-radius:99px;padding:2px 8px;margin-left:6px}' +
    '.dm-st span.d{display:block;font-size:13px;color:#41566F;line-height:1.5;margin-top:2px}.dm-st button{height:34px;padding:0 14px;border-radius:10px;border:0;background:#0E7C86;color:#fff;font:inherit;font-weight:700;font-size:13px;cursor:pointer;white-space:nowrap}' +
    '.dm-st.done button{background:#fff;color:#0A5C64;border:1px solid #CFDDE0}.dm-pg{height:8px;border-radius:8px;background:#E6EEF0;margin:4px 0 12px;overflow:hidden}.dm-pg i{display:block;height:100%;background:#1E8449;border-radius:8px}' +
    '.dm-ib{display:grid;grid-template-columns:300px 1fr;min-height:420px}.dm-ib .ls{border-right:1px solid #E6EEF0;overflow:auto;max-height:calc(100vh - 160px)}' +
    '.dm-ib .it{display:block;width:100%;text-align:left;border:0;border-bottom:1px solid #EEF2F3;background:#fff;padding:10px 14px;font:inherit;cursor:pointer}.dm-ib .it.on{background:#E6F3F4}' +
    '.dm-ib .it b{display:block;font-size:13.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.dm-ib .it span{display:block;font-size:12px;color:#6C8A93}.dm-ib .it.un b::before{content:"";display:inline-block;width:8px;height:8px;border-radius:50%;background:#0E7C86;margin-right:6px}' +
    '.dm-ib .vw{padding:16px 20px;overflow:auto;max-height:calc(100vh - 160px)}.dm-ib .mh{border-bottom:1px solid #EEF2F3;padding-bottom:10px;margin-bottom:12px}.dm-ib .mh h4{margin:0 0 4px;font-size:16px}.dm-ib .mh div{font-size:12.5px;color:#6C8A93}' +
    '.dm-ib .att{display:inline-flex;gap:6px;align-items:center;margin-top:8px;border:1px solid #E6EEF0;border-radius:9px;padding:5px 10px;font-size:12.5px;color:#C0392B;font-weight:700;text-decoration:none}' +
    '.dm-ib .em{color:#6C8A93;padding:30px;text-align:center}' +
    '@media(max-width:760px){.dm-ib{grid-template-columns:1fr}.dm-ib .ls{max-height:200px;border-right:0;border-bottom:1px solid #E6EEF0}.dm-st{grid-template-columns:30px 1fr}.dm-st button{grid-column:2;justify-self:start}}' +
    '#dm-toast{position:fixed;left:50%;transform:translateX(-50%);top:52px;width:min(560px,calc(100vw - 24px));z-index:9850;background:#fff;border:1px solid #F4A261;border-radius:14px;box-shadow:0 12px 30px rgba(0,0,0,.18);padding:10px 12px 10px 14px;display:flex;gap:10px;align-items:center;font:600 13.5px Aptos,"Segoe UI",sans-serif;color:#1B333A;max-width:calc(100vw - 24px)}' +
    '#dm-toast span{flex:1;min-width:0;line-height:1.4}#dm-toast button{border:0;background:#0E7C86;color:#fff;border-radius:9px;height:30px;padding:0 12px;font:inherit;font-weight:700;cursor:pointer;white-space:nowrap}';
  document.head.appendChild(css);
  var SV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';

  /* ── 1. Nút vào chế độ trải nghiệm ở màn đăng nhập ── */
  if (!window.DEMO || !DEMO.on) {
    if (PAGE === 'app') {
      var addBtn = function () {
        var w = $('#login .lgwrap'); if (!w || w.querySelector('#dm-enter')) return;
        var b = document.createElement('button'); b.id = 'dm-enter'; b.type = 'button';
        b.innerHTML = '<span class="i">' + SV + '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></span><span><b>Kiểm tra tính năng ứng dụng</b><span>Không cần mật khẩu · dữ liệu mẫu — trải nghiệm đủ vai: giáo viên chủ nhiệm, cán bộ lớp, phụ huynh.</span></span>';
        b.onclick = enter;
        var card = w.querySelector('.lgcard'); if (card) card.after(b); else w.appendChild(b);
      };
      new MutationObserver(addBtn).observe(document.documentElement, { childList: true, subtree: true }); addBtn();
    }
    return;
  }

  /* chế độ trải nghiệm: không hiện thông báo cập nhật (ban giám khảo vào thẳng việc chính) */
  try { var hid = {}; (window.HK_UPDATES || []).forEach(function (u) { hid[u.id] = 1; }); localStorage.setItem('hk_upd_hide', JSON.stringify(hid)); } catch (e) {}
  /* ── 2. Thanh trải nghiệm ── */
  var STEPS = [
    { k: 'ghi', r: 'lt', t: 'Ghi điểm như một cán bộ lớp', d: 'Đóng vai <b>Lớp trưởng</b>: chạm tên một bạn ▸ chọn lỗi (vd. "Đi học muộn") hoặc điểm cộng ▸ <b>Bỏ qua, lưu luôn</b>. Điểm hiện ngay, tự lưu phía sau.' },
    { k: 'mail', r: '', t: 'Xem email phụ huynh vừa nhận', d: 'Bấm <b>Hộp thư</b> trên thanh này: phụ huynh của bạn vừa được ghi điểm sẽ nhận thư, kèm lời nhắn của cô Thảo hợp với từng trường hợp.' },
    { k: 'phtb', r: 'ph', t: 'Đóng vai phụ huynh: mở thông báo + tải PDF', d: 'Trong email, bấm <b>Xem chi tiết &amp; tải PDF thông báo</b> ⇒ trang phụ huynh mở đúng thông báo; bấm <b>Tải PDF thông báo</b> (PDF khổ ngang có ảnh cô Thảo).' },
    { k: 'nx', r: 'gvcn', t: 'Cô chủ nhiệm nhận xét học sinh', d: 'Vai <b>Cô Thảo</b>: <b>Cập nhật hạnh kiểm</b> ▸ chạm thẻ một học sinh ▸ <b>Nhận xét</b> ▸ chọn xếp loại, viết nhận xét ▸ Lưu. Rê chuột vào ô điểm để xem điểm từ đâu.' },
    { k: 'bc', r: 'gvcn', t: 'Xem báo cáo tháng & tải PDF', d: 'Menu <b>Báo cáo</b>: số liệu so với tháng trước, xếp hạng tổ, tuyên dương, nhắc nhở; thử ô <b>Tìm nhanh</b> ("tổ 2 vi phạm"). Bấm <b>In / Lưu PDF</b> ⇒ báo cáo khổ ngang có biểu đồ.' },
    { k: 'hs', r: 'gvcn', t: 'PDF riêng một học sinh', d: 'Bấm <b>kính lúp</b> (hoặc phím /) ▸ gõ tên ▸ mở hồ sơ ▸ <b>Tải PDF báo cáo</b>: điểm từng tuần, lỗi thường mắc, khen thưởng, nhận xét của cô.' },
    { k: 'dk', r: 'ph', t: 'Phụ huynh đăng ký nhận email', d: 'Vai <b>Phụ huynh</b>: mở hồ sơ một học sinh ▸ ô <b>Nhận thông báo qua email</b> ▸ nhập email bất kỳ ▸ <b>Gửi mã</b> ▸ nhập <b>123456</b> ▸ Xác nhận.' },
    { k: 'duyet', r: 'gvcn', t: 'Cô duyệt phụ huynh', d: 'Vai <b>Cô Thảo</b>: thẻ "Phụ huynh vừa đăng ký" hiện ngay ▸ <b>Duyệt</b> (menu <b>Phụ huynh</b>). Phụ huynh nhận thư xác nhận kèm <b>file hướng dẫn PDF</b> — xem trong Hộp thư.' },
    { k: 'chot', r: 'gvcn', t: 'Khoá sổ tháng', d: '<b>Cập nhật hạnh kiểm</b> ▸ <b>Khoá sổ tháng 10</b>. Sau khi khoá sổ, thử xoá / sửa một ghi nhận: hệ thống chặn lại. Cô bấm <b>Mở khoá</b> để chỉnh tiếp.' }];
  function db() { return DEMO.db(); }
  function nDone() { var d = db().done; return STEPS.filter(function (x) { return d[x.k]; }).length; }
  function unread() { return db().mails.filter(function (m) { return m.unread; }).length; }
  var role = curRole();
  function bar() {
    var b = $('#dm-bar'); if (!b) { b = document.createElement('div'); b.id = 'dm-bar'; document.body.appendChild(b); }
    var R = ['gvcn', 'lt', 'tt', 'ph'];
    b.innerHTML = '<span class="tag">TRẢI NGHIỆM · DỮ LIỆU MẪU</span><span class="roles">' + R.map(function (r) { return '<button data-r="' + r + '" class="' + (r === role ? 'on' : '') + '">' + DEMO.ROLE_T[r] + '</button>'; }).join('') + '</span>'
      + '<select aria-label="Đổi vai">' + R.map(function (r) { return '<option value="' + r + '"' + (r === role ? ' selected' : '') + '>' + DEMO.ROLE_T[r] + '</option>'; }).join('') + '</select><span class="sp"></span>'
      + '<button class="bt hl" data-a="guide">' + SV + '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg><span class="t">Hướng dẫn</span> ' + nDone() + '/' + STEPS.length + '</button>'
      + '<button class="bt" data-a="mail">' + SV + '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg><span class="t">Hộp thư</span>' + (unread() ? '<i>' + unread() + '</i>' : '') + '</button>'
      + '<button class="bt" data-a="reset" title="Làm lại từ đầu">' + SV + '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg><span class="t">Làm lại</span></button>'
      + '<button class="bt" data-a="out" title="Thoát chế độ trải nghiệm">' + SV + '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg><span class="t">Thoát</span></button>';
    b.querySelectorAll('[data-r]').forEach(function (x) { x.onclick = function () { if (x.dataset.r !== role) switchRole(x.dataset.r); }; });
    b.querySelector('select').onchange = function (e) { switchRole(e.target.value); };
    b.querySelector('[data-a=guide]').onclick = guide;
    b.querySelector('[data-a=mail]').onclick = function () { inbox(); };
    b.querySelector('[data-a=reset]').onclick = function () { if (confirm('Làm lại từ đầu với dữ liệu mẫu ban đầu?')) { DEMO.reset(); clearCaches(); s('hk_token', 'tok.gvcn'); ss('dm_next', 'intro'); location.href = 'index.html?demo=1'; } };
    b.querySelector('[data-a=out]').onclick = function () { if (confirm('Thoát chế độ trải nghiệm?')) leave(); };
  }
  function ov(html) { var o = document.createElement('div'); o.className = 'dm-ov'; o.innerHTML = '<div class="dm-box">' + html + '</div>'; document.body.appendChild(o);
    o.onclick = function (e) { if (e.target === o) o.remove(); }; var x = o.querySelector('.x'); if (x) x.onclick = function () { o.remove(); }; return o; }
  function mimg(e, n) { return window.MASCOT ? MASCOT.img(e, n || 64) : ''; }
  function guide() {
    var d = db().done, n = nDone();
    var o = ov('<div class="hd">' + mimg(n >= STEPS.length ? 'khen-lon' : 'chi-tay') + '<div><h3>Hướng dẫn trải nghiệm · ' + n + '/' + STEPS.length + ' việc</h3><p>Không cần mật khẩu. Bấm <b>Làm ngay</b> — hệ thống tự đổi vai và mở đúng màn hình. Dữ liệu là mẫu, thoải mái thử.</p></div><button class="x" aria-label="Đóng">×</button></div>'
      + '<div class="bd"><div class="dm-pg"><i style="width:' + Math.round(n * 100 / STEPS.length) + '%"></i></div>' + STEPS.map(function (x, i) {
        return '<div class="dm-st ' + (d[x.k] ? 'done' : '') + '"><span class="n">' + (d[x.k] ? '✓' : i + 1) + '</span><div><b>' + x.t + (x.r ? '<span class="r">' + DEMO.ROLE_T[x.r] + '</span>' : '') + '</b><span class="d">' + x.d + '</span></div><button data-k="' + x.k + '">' + (d[x.k] ? 'Làm lại' : 'Làm ngay') + '</button></div>'; }).join('')
      + '<p style="font-size:12.5px;color:#6C8A93;margin:10px 2px 0">Mọi thứ khác trong sổ cũng dùng được: thống kê, lịch sử, cài đặt, đổi giao diện, ghi nhiều bạn cùng lúc, ảnh bằng chứng… Bấm <b>Làm lại</b> trên thanh để quay về dữ liệu ban đầu.</p></div>');
    o.querySelectorAll('[data-k]').forEach(function (b) { b.onclick = function () { o.remove(); run(b.dataset.k); }; });
  }
  function say(emo, t, ms) { if (window.MASCOT) setTimeout(function () { MASCOT.say(emo, t, { ms: ms || 9000 }); }, 300); }
  function run(k) {
    var st = STEPS.filter(function (x) { return x.k === k; })[0]; if (!st) return;
    if (k === 'mail') { inbox(); return; }
    if (k === 'phtb') { var m = db().mails.filter(function (x) { return x.kind === 'tb'; })[0];
      if (!m) { alert('Chưa có email thông báo nào. Hãy làm việc 1 (ghi điểm) trước nhé: nếu phụ huynh của bạn đó đã đăng ký email, họ sẽ nhận thư.'); return; }
      inbox(m.id); return; }
    if (st.r && st.r !== role) { switchRole(st.r, k); return; }
    act(k);
  }
  function act(k) {
    var go = window.go;
    if (PAGE === 'ph') {
      if (k === 'dk') { location.hash = 'hs=HS06'; setTimeout(function () { var r = $('#reg'); if (r) r.scrollIntoView({ block: 'center' }); say('chi-tay', 'Bác nhập email bất kỳ ▸ <b>Gửi mã</b> ▸ nhập <b>123456</b> ▸ Xác nhận nhé.'); }, 900); }
      return;
    }
    if (!go) return;
    if (k === 'ghi') { go('ghi'); say('chi-tay', 'Em chạm tên một bạn ▸ chọn lỗi hoặc điểm cộng ▸ <b>Bỏ qua, lưu luôn</b>. Nếu phụ huynh của bạn đó đã đăng ký email, họ sẽ nhận thư ngay!'); }
    if (k === 'nx') { go('bang'); say('chi-tay', 'Cô chạm thẻ một học sinh ▸ <b>Nhận xét</b> ▸ chọn xếp loại, viết vài dòng ▸ <b>Lưu nhận xét</b>.'); }
    if (k === 'bc') { go('bc'); say('chi-tay', 'Đây là báo cáo tháng. Thử gõ "tổ 2 vi phạm" ở ô Tìm nhanh, rồi bấm <b>In / Lưu PDF</b>.'); }
    if (k === 'hs') { go('bang'); setTimeout(function () { var f = $('#hFind'); if (f) f.click(); }, 500); say('chi-tay', 'Gõ tên một bạn ▸ mở hồ sơ ▸ <b>Tải PDF báo cáo</b>.'); }
    if (k === 'duyet') { go('ph'); say('chi-tay', 'Cô bấm <b>Duyệt</b> ở mục Đăng ký chờ duyệt. Phụ huynh nhận thư kèm hướng dẫn PDF.'); }
    if (k === 'chot') { go('bang'); say('chi-tay', 'Cô bấm <b>Khoá sổ tháng 10</b>. Sau đó thử xoá một ghi nhận — hệ thống sẽ chặn.'); }
  }
  function inbox(openId) {
    var M = db().mails;
    var o = ov('<div class="hd">' + mimg('chao') + '<div><h3>Hộp thư mô phỏng</h3><p>Thư hệ thống gửi cho phụ huynh và cô chủ nhiệm (chế độ trải nghiệm không gửi thư thật).</p></div><button class="x" aria-label="Đóng">×</button></div>'
      + '<div class="dm-ib"><div class="ls">' + (M.length ? M.map(function (m) { return '<button class="it ' + (m.unread ? 'un' : '') + '" data-m="' + m.id + '"><b>' + esc(m.subject) + '</b><span>Tới: ' + esc(m.to) + ' · ' + esc(m.at) + '</span></button>'; }).join('') : '<div class="em">Chưa có thư. Hãy ghi điểm cho một bạn có email phụ huynh (vd. bạn đầu tiên mỗi tổ).</div>') + '</div><div class="vw"><div class="em">Chọn một thư để xem.</div></div></div>');
    function show(id) { var m = M.filter(function (x) { return x.id === id; })[0]; if (!m) return; m.unread = false; var D = db(); D.mails.forEach(function (x) { if (x.id === id) x.unread = false; });
      try { localStorage.setItem('hk_demo_db_v1', JSON.stringify(D)); } catch (e) {}
      if (m.kind === 'tb' || m.kind === 'duyet') DEMO.mark('mail');
      o.querySelectorAll('[data-m]').forEach(function (b) { b.classList.toggle('on', b.dataset.m === id); if (b.dataset.m === id) b.classList.remove('un'); });
      var v = o.querySelector('.vw'); v.innerHTML = '<div class="mh"><h4>' + esc(m.subject) + '</h4><div>Từ: ' + esc(m.from) + ' · Tới: ' + esc(m.to) + ' · ' + esc(m.at) + '</div>'
        + (m.attach ? '<a class="att" href="' + esc(m.attachUrl) + '" target="_blank">' + SV + '<path d="M21.4 11.1l-9.2 9.2a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5"/></svg>' + esc(m.attach) + '</a>' : '') + '</div>' + m.html;
      v.querySelectorAll('a[data-demo-link]').forEach(function (a) { a.onclick = function (e) { e.preventDefault(); clearCaches(); location.href = a.getAttribute('href'); }; });
      v.querySelectorAll('a[data-demo-role]').forEach(function (a) { a.onclick = function (e) { e.preventDefault(); o.remove(); switchRole(a.dataset.demoRole, a.dataset.demoGo === 'ph' ? 'duyet' : null); }; });
      bar(); }
    o.querySelectorAll('[data-m]').forEach(function (b) { b.onclick = function () { show(b.dataset.m); }; });
    if (openId) show(openId); else if (M[0]) show(M[0].id);
  }
  window.addEventListener('demo-mail', function (e) {
    var m = e.detail; bar(); var t = $('#dm-toast'); if (t) t.remove(); t = document.createElement('div'); t.id = 'dm-toast';
    t.innerHTML = '<span>' + (m.kind === 'gv' ? 'Cô Thảo vừa nhận email: phụ huynh đăng ký' : m.kind === 'code' ? 'Phụ huynh nhận email mã xác nhận (mã: 123456)' : 'Email đã gửi tới phụ huynh · ' + esc(m.subject.replace(/^\[11D3\] /, ''))) + ' <em style="font-style:normal;color:#8A6A3A">(mô phỏng)</em></span><button>Xem thư</button>';
    document.body.appendChild(t); t.querySelector('button').onclick = function () { t.remove(); inbox(m.id); };
    clearTimeout(t._t); t._t = setTimeout(function () { t.remove(); }, 9000);
  });
  window.addEventListener('demo-done', function () { bar(); });

  /* đánh dấu các việc xem báo cáo / PDF học sinh */
  function hookApp() {
    if (window.go && !window.go._dm) { var o = window.go; window.go = function (v) { if (v === 'bc') DEMO.mark('bc'); return o.apply(this, arguments); }; window.go._dm = 1; try { go = window.go; } catch (e) {} }
    if (window.RPT && !RPT._dm) { var st = RPT.student; RPT.student = function () { if (PAGE === 'app') DEMO.mark('hs'); return st.apply(this, arguments); }; RPT._dm = 1; }
  }
  function start() {
    bar(); hookApp();
    if (PAGE === 'ph') window.addEventListener('hashchange', function () { if (/tb=/.test(location.hash)) DEMO.mark('phtb'); });
    var nx = ss('dm_next'); ss('dm_next', null);
    var waitApp = function (fn, n) { n = n || 0; if (PAGE === 'ph' || (document.querySelector('#app.on') && (function () { try { return S && S.me; } catch (e) { return false; } })())) { setTimeout(fn, 500); return; } if (n < 80) setTimeout(function () { waitApp(fn, n + 1); }, 200); };
    if (nx === 'intro') waitApp(function () { guide(); say('chao', 'Chào mừng thầy cô đến với <b>Sổ theo dõi học sinh 11D3</b>! Mở <b>Hướng dẫn</b> để thử từng việc nhé.', 7000); });
    else if (nx) waitApp(function () { hookApp(); act(nx); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
