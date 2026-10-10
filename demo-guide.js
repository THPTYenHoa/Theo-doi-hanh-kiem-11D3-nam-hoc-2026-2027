/* ══ v4.5 — HƯỚNG DẪN TRẢI NGHIỆM THEO VAI (window.DMG) ══════════════════════════════════
   Thay "Hướng dẫn 9 việc" (tự làm theo chữ) bằng hướng dẫn TỪNG BƯỚC: chọn vai ▸ xem các việc vai đó làm được ▸
   bấm một việc ⇒ màn hình tối lại, chỉ sáng đúng chỗ cần bấm (zoom), bong bóng chỉ dẫn; bấm đúng chỗ ⇒ tự sang bước sau.
   · Vai: Giáo viên chủ nhiệm (gvcn) · Cán bộ lớp (lt) · Phụ huynh (ph — trang phu-huynh.html).
   · Đổi vai / đổi trang giữa chừng: lưu bước kế tiếp ở sessionStorage.dm_next = 'tut:<id>:<bước>' (demo-ui.js đọc lại).
   · Bước: {el, t, d, act:'click'|'next', until(), pre(), nav:true (bấm xong trang sẽ tải lại), opt:true (không thấy thì bỏ qua)}.
   Nạp SAU demo-ui.js. Chỉ chạy khi DEMO.on. */
(function () {
  if (!window.DEMO || !DEMO.on || window.DMG) return;
  var PAGE = /phu-huynh/.test(location.pathname) ? 'ph' : 'app';
  var $ = function (q) { return document.querySelector(q); };
  var ss = function (k, v) { try { if (v === undefined) return sessionStorage.getItem(k); v == null ? sessionStorage.removeItem(k) : sessionStorage.setItem(k, v); } catch (e) { return null; } };
  var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var vis = function (el) { if (!el) return false; var r = el.getBoundingClientRect(); return r.width > 2 && r.height > 2 && getComputedStyle(el).visibility !== 'hidden'; };
  function pick(sel) {
    if (typeof sel === 'function') return sel();
    var L = [].concat(sel);
    for (var i = 0; i < L.length; i++) { var all = document.querySelectorAll(L[i]); for (var j = 0; j < all.length; j++) if (vis(all[j])) return all[j]; }
    return null;
  }
  var nav = function (v) { return ['#railNav [data-v="' + v + '"]', '#tabbar [data-v="' + v + '"]']; };
  var GO = function (v) { return function () { try { window.go(v); } catch (e) {} }; };
  var MAIL = '<br><span class="dmg-n">Email trong chế độ này là <b>giả định</b>: không gửi thư thật, thư hiện trong nút <b>Hộp thư</b> trên thanh trên cùng.</span>';
  function unlock() {   // bài "Khoá sổ" chạy trước có thể đã khoá tháng mẫu ⇒ mở lại để các bài ghi điểm chạy được
    try { var D = DEMO.db(); if (!D.khoa || !D.khoa[10]) return;
      var r = DEMO.api('lockMonth', { thang: 10, lock: false }, 'tok.gvcn');
      if (r && r.khoa && typeof window.setKhoa === 'function') { setKhoa(r.khoa); try { renderAll(); } catch (e) {} } } catch (e) {}
  }
  function demoEntry() {
    unlock();   // giả lập lớp trưởng vừa ghi điểm cho 1 bạn có email phụ huynh ⇒ có thư thông báo
    try { DEMO.api('addEntries', { thang: 10, tuan: 2, rid: 'dmg' + Date.now(), items: [{ maHS: 'HS01', loai: 'Trừ', maMuc: 'T01', noiDung: 'Đi học muộn', diem: -2 }] }, 'tok.lt'); } catch (e) {}
  }

  /* ── NỘI DUNG HƯỚNG DẪN ── */
  var ROLES = [
    { r: 'gvcn', t: 'Giáo viên chủ nhiệm', emo: 'chao', d: 'Theo dõi cả lớp, nhận xét, xác nhận xếp loại, báo cáo, duyệt phụ huynh, khoá sổ tháng.' },
    { r: 'lt', t: 'Cán bộ lớp', emo: 'co-vu', d: 'Lớp trưởng ghi điểm cả lớp; tổ trưởng ghi điểm cho tổ mình. Ghi trên điện thoại, chỉ vài lần chạm.' },
    { r: 'ph', t: 'Phụ huynh', emo: 'vui', d: 'Xem kết quả của con, tải báo cáo PDF / Excel, đăng ký và nhận email thông báo.' }];
  var T = [
    { id: 'gv1', r: 'gvcn', t: 'Xem điểm cả lớp và nguồn từng điểm', s: [
      { el: nav('bang'), t: 'Mở mục Cập nhật hạnh kiểm', d: 'Bấm vào mục <b>Cập nhật hạnh kiểm</b>.', act: 'click', pre: GO('ghi') },
      { el: ['#vBang .sq39'], t: 'Tìm nhanh', d: 'Gõ <b>tổ 2</b>, <b>vi phạm</b>, <b>khá</b> hay tên một em để lọc ngay danh sách.', act: 'next', opt: 1 },
      { el: ['#vBang .hkcard[data-ma]'], t: 'Thẻ từng học sinh', d: 'Mỗi thẻ có điểm từng tuần, điểm trung bình và xếp loại. <b>Rê chuột vào ô điểm</b> (điện thoại: chạm giữ) để xem điểm đến từ việc gì, ai ghi.', act: 'next' }] },
    { id: 'gv2', r: 'gvcn', t: 'Nhận xét và xác nhận xếp loại', s: [
      { el: ['#vBang .hkcard[data-ma]'], t: 'Chọn một học sinh', d: 'Chạm vào thẻ của một học sinh để mở hồ sơ.', act: 'click', pre: GO('bang') },
      { el: ['#pfNx'], t: 'Nhận xét', d: 'Bấm <b>Nhận xét</b>.', act: 'click' },
      { el: ['#mRemark'], t: 'Mở khung nhận xét', d: 'Bấm <b>Nhận xét</b> để viết nhận xét tháng.', act: 'click', opt: 1 },
      { el: ['#rkXl'], t: 'Xác nhận xếp loại', d: 'Chọn xếp loại. Để trống thì ứng dụng tự tính theo điểm.', act: 'next' },
      { el: ['#rkNx'], t: 'Viết nhận xét', d: 'Viết vài dòng về ý thức, nề nếp, sự tiến bộ. Phụ huynh sẽ đọc được.', act: 'next' },
      { el: ['#rkSave'], t: 'Lưu', d: 'Bấm <b>Lưu</b>. Nhận xét hiện ngay trên hồ sơ và trong báo cáo PDF.', act: 'click' }] },
    { id: 'gv3', r: 'gvcn', t: 'Báo cáo tháng và tải file', s: [
      { el: nav('bc'), t: 'Mở Báo cáo', d: 'Bấm vào mục <b>Báo cáo</b>.', act: 'click' },
      { el: ['#vBC [data-bk]'], t: 'Chọn kỳ báo cáo', d: 'Báo cáo theo tuần, tháng, học kỳ hoặc cả năm, có so sánh với kỳ trước.', act: 'next', opt: 1 },
      { el: ['#vBC textarea'], t: 'Nhận xét của cô', d: 'Ứng dụng gợi ý sẵn lời nhận xét và phương hướng; giáo viên sửa trực tiếp.', act: 'next', opt: 1 },
      { el: ['#bcPrint'], t: 'Tải PDF', d: 'Bấm <b>Tải PDF</b>. Ứng dụng tạo file báo cáo khổ ngang có biểu đồ rồi tự tải về.', act: 'click' },
      { el: ['#dl-sh'], t: 'File đã tải về', d: 'Bấm <b>Mở file</b> để xem. Nút <b>Tải Excel</b> bên cạnh tạo file Excel tương tự.', act: 'next', wait: 30000 }] },
    { id: 'gv4', r: 'gvcn', t: 'Tải báo cáo riêng của một học sinh', s: [
      { el: ['#hFind'], t: 'Tra cứu học sinh', d: 'Bấm biểu tượng <b>kính lúp</b>.', act: 'click', pre: GO('ghi') },
      { el: ['#fq'], t: 'Gõ tên', d: 'Gõ tên một bạn, không cần dấu, ví dụ <b>an</b>.', act: 'next', until: function () { var q = $('#fq'); return q && q.value.trim().length >= 2 && $('#fls [data-ma]'); } },
      { el: ['#fls [data-ma]'], t: 'Mở hồ sơ', d: 'Chạm vào tên học sinh.', act: 'click' },
      { el: ['#pfPr'], t: 'Tải PDF', d: 'Bấm <b>Tải PDF</b>: điểm từng tuần, lỗi thường mắc, khen thưởng và nhận xét của cô Thảo.', act: 'click' },
      { el: ['#dl-sh'], t: 'File đã tải về', d: 'Bấm <b>Mở file</b> để xem báo cáo.', act: 'next', wait: 30000 }] },
    { id: 'gv5', r: 'gvcn', t: 'Duyệt phụ huynh đăng ký nhận email', s: [
      { el: ['#vPH .pend'], t: 'Phụ huynh chờ duyệt', d: 'Khi phụ huynh đăng ký, giáo viên thấy thông báo trên màn hình và nhận email.' + MAIL, act: 'next', pre: function () { ensureReg(); setTimeout(GO('ph'), 300); }, wait: 12000 },
      { el: ['#vPH .pend .ok'], t: 'Duyệt', d: 'Bấm <b>Duyệt</b>. Phụ huynh nhận thư xác nhận kèm file hướng dẫn PDF.', act: 'click' },
      { el: ['#dm-bar [data-a=mail]'], t: 'Xem thư đã gửi', d: 'Bấm <b>Hộp thư</b> để xem thư phụ huynh nhận được.', act: 'click' },
      { el: ['.dm-ib .vw'], t: 'Thư xác nhận', d: 'Thư có lời nhắn của cô Thảo và file hướng dẫn đính kèm.', act: 'next' }] },
    { id: 'gv6', r: 'gvcn', t: 'Khoá sổ cuối tháng', s: [
      { el: ['#vBang [data-lk="1"]'], t: 'Khoá sổ tháng', d: 'Xếp loại xong thì bấm <b>Khoá sổ tháng</b>, rồi bấm <b>OK</b> để xác nhận.', act: 'click', pre: GO('bang') },
      { el: ['#vBang .lkb'], t: 'Đã khoá sổ', d: 'Không ai thêm, sửa, xoá được điểm của tháng này nữa.', act: 'next', until: function () { var b = $('#vBang .lkb'); return b && !b.classList.contains('go'); }, hold: 1 },
      { el: ['#vBang .lkb:not(.go) button'], t: 'Mở khoá khi cần sửa', d: 'Cần sửa lại thì bấm <b>Mở khoá</b>, rồi <b>OK</b>. Trong bản dùng thử, hãy mở khoá để thử tiếp các việc khác.', act: 'click', opt: 1 }] },
    { id: 'cb1', r: 'lt', t: 'Ghi điểm cho một bạn', s: [
      { el: ['#listGhi .row'], t: 'Chọn bạn cần ghi', d: 'Chạm vào tên một bạn trong danh sách.', act: 'click', pre: function () { unlock(); GO('ghi')(); } },
      { el: ['#pBody [data-add]'], t: 'Chọn lỗi hoặc điểm cộng', d: 'Chạm vào một lỗi. Muốn khen thì chuyển sang thẻ <b>Cộng điểm</b>.', act: 'click' },
      { el: ['#gcTxt'], t: 'Ghi chú và ảnh bằng chứng', d: 'Có thể ghi rõ vì sao, bấm micro để nói, hoặc <b>Chụp ảnh</b> làm bằng chứng.', act: 'next', opt: 1, wait: 2500 },
      { el: ['#gcSkip'], t: 'Lưu', d: 'Bấm <b>Bỏ qua, lưu luôn</b>. Điểm hiện ngay, ứng dụng tự lưu lên sổ.', act: 'click', opt: 1, wait: 2500 },
      { el: ['#dm-toast'], t: 'Phụ huynh nhận tin', d: 'Nếu phụ huynh đã đăng ký email, họ nhận thư ngay.' + MAIL, act: 'next', wait: 5000, opt: 1 }] },
    { id: 'cb2', r: 'lt', t: 'Ghi điểm cho nhiều bạn cùng lúc', s: [
      { el: ['#multiBtn'], t: 'Chọn nhiều', d: 'Bấm <b>Chọn nhiều</b>.', act: 'click', pre: function () { unlock(); GO('ghi')(); } },
      { el: ['#listGhi'], t: 'Chọn các bạn', d: 'Chạm chọn 2 bạn trở lên, rồi bấm <b>Tiếp</b>.', act: 'next', until: function () { try { return S.sel.size >= 2; } catch (e) { return false; } }, hold: 1 },
      { el: ['#bulkGo'], t: 'Ghi điểm', d: 'Bấm <b>Ghi điểm</b>.', act: 'click' },
      { el: ['#pBody [data-add]'], t: 'Chọn lý do', d: 'Chọn một lý do, áp dụng cho cả nhóm.', act: 'click' },
      { el: ['#gcSkip'], t: 'Lưu', d: 'Bấm <b>Bỏ qua, lưu luôn</b>.', act: 'click', opt: 1, wait: 2500 }] },
    { id: 'cb3', r: 'lt', t: 'Xem lại, sửa hoặc xoá một lượt đã ghi', s: [
      { el: ['#tk39 .it', '#tk39'], t: 'Dải điểm tuần', d: 'Dải này lần lượt hiện mọi lượt cộng, trừ của tuần. Bấm vào một lượt.', act: 'click', pre: GO('ghi') },
      { el: ['#tkm39'], t: 'Chọn thao tác', d: 'Xem hồ sơ của bạn đó, hoặc <b>Sửa / xoá ghi nhận này</b>. Lỡ tay xoá thì bấm <b>Hoàn tác</b> ngay.', act: 'next' }] },
    { id: 'cb4', r: 'lt', t: 'Tra cứu một bạn trong lớp', s: [
      { el: ['#hFind'], t: 'Tra cứu', d: 'Bấm biểu tượng <b>kính lúp</b>.', act: 'click' },
      { el: ['#fq'], t: 'Gõ tên', d: 'Gõ tên một bạn, không cần dấu.', act: 'next', until: function () { var q = $('#fq'); return q && q.value.trim().length >= 2 && $('#fls [data-ma]'); } },
      { el: ['#fls [data-ma]'], t: 'Mở hồ sơ', d: 'Chạm vào tên để xem điểm, vi phạm, khen thưởng cả năm của bạn đó.', act: 'click' }] },
    { id: 'ph1', r: 'ph', t: 'Xem kết quả của con', s: [
      { el: ['#q'], t: 'Tìm tên con', d: 'Gõ tên con, không cần dấu, ví dụ <b>an</b>.', act: 'next', pre: function () { if (/hs=/.test(location.hash)) location.hash = ''; }, until: function () { var q = $('#q'); return q && q.value.trim().length >= 2; } },
      { el: ['#lst [data-ma]'], t: 'Mở hồ sơ', d: 'Chạm vào tên con.', act: 'click' },
      { el: ['#ks'], t: 'Chọn kỳ', d: 'Xem theo tháng, học kỳ hoặc cả năm.', act: 'next' },
      { el: ['.sum2'], t: 'Kết quả', d: 'Số lần vi phạm, số lần được cộng điểm, điểm từng tuần và xếp loại.', act: 'next', opt: 1 },
      { el: ['.nxc'], t: 'Nhận xét của cô Thảo', d: 'Lời nhận xét của giáo viên chủ nhiệm hiện ở đây.', act: 'next', opt: 1 }] },
    { id: 'ph2', r: 'ph', t: 'Tải báo cáo PDF và Excel của con', s: [
      { el: ['#pdf'], t: 'Tải PDF', d: 'Bấm <b>Tải PDF báo cáo</b>. Chờ vài giây, file tự tải về.', act: 'click', pre: function () { if (!/hs=/.test(location.hash)) location.hash = 'hs=HS01'; } },
      { el: ['#dl-sh'], t: 'Mở file', d: 'Bấm <b>Mở file</b> để xem, hoặc <b>Chia sẻ</b> để lưu.', act: 'next', wait: 30000 },
      { el: ['#csv'], t: 'Tải Excel', d: 'Bấm <b>Tải Excel</b> để có bảng điểm chi tiết.', act: 'click' },
      { el: ['#dl-sh'], t: 'Đã tải Excel', d: 'File Excel mở được bằng Excel hoặc Google Trang tính.', act: 'next', wait: 20000 }] },
    { id: 'ph3', r: 'ph', t: 'Đăng ký nhận email thông báo', s: [
      { el: ['#rgE'], t: 'Nhập email', d: 'Nhập một email bất kỳ, ví dụ <b>bo.me@vidu.vn</b>.' + MAIL, act: 'next', pre: function () { try { localStorage.removeItem('hkph_reg_HS06'); } catch (e) {} if (!/hs=HS06/.test(location.hash)) location.hash = 'hs=HS06'; }, until: function () { var e = $('#rgE'); return e && /\S+@\S+\.\S+/.test(e.value); } },
      { el: ['#rgS'], t: 'Gửi mã', d: 'Bấm <b>Gửi mã</b>.', act: 'click' },
      { el: ['#rgK'], t: 'Nhập mã', d: 'Nhập mã <b>123456</b> (mã giả định của chế độ trải nghiệm).', act: 'next', until: function () { var e = $('#rgK'); return e && e.value.replace(/\D/g, '').length === 6; } },
      { el: ['#rgV'], t: 'Xác nhận', d: 'Bấm <b>Xác nhận</b>. Cô Thảo duyệt xong, phụ huynh bắt đầu nhận email.', act: 'click' },
      { el: ['#rgM', '.reg'], t: 'Đã đăng ký', d: 'Đăng ký xong. Giáo viên nhận thông báo để duyệt.', act: 'next', opt: 1 }] },
    { id: 'ph4', r: 'ph', t: 'Nhận email khi con được ghi điểm', s: [
      { el: ['#dm-bar [data-a=mail]'], t: 'Hộp thư', d: 'Lớp trưởng vừa ghi điểm cho con. Bấm <b>Hộp thư</b> để xem thư phụ huynh nhận được.' + MAIL, act: 'click', pre: demoEntry },
      { el: ['.dm-ib a[data-demo-link]'], t: 'Xem chi tiết', d: 'Thư có lời nhắn của cô Thảo về con. Bấm <b>Xem chi tiết &amp; tải PDF thông báo</b>.', act: 'click', nav: 1, pre: function () { try { var m = DEMO.db().mails.filter(function (x) { return x.kind === 'tb'; })[0]; if (m && window.DMUI) { document.querySelectorAll('.dm-ov').forEach(function (e) { e.remove(); }); DMUI.inbox(m.id); } } catch (e) {} } },
      { el: ['.tbc'], t: 'Thông báo mới', d: 'Trang phụ huynh mở đúng thông báo vừa nhận.', act: 'next', wait: 8000 },
      { el: ['#tbPdf'], t: 'Tải PDF thông báo', d: 'Bấm để tải PDF thông báo có lời nhắn của cô Thảo.', act: 'click' },
      { el: ['#dl-sh'], t: 'Đã tải', d: 'Bấm <b>Mở file</b> để xem.', act: 'next', wait: 30000 }] }];
  function ensureReg() {
    try { var D = DEMO.db(); if ((D.phReg || []).some(function (r) { return !r.st || r.st === 'cho'; })) return;
      DEMO.api('phDangKy', { ma: 'HS06', email: 'phuhuynh.vidu@vidu.vn' }); DEMO.api('phXacNhan', { email: 'phuhuynh.vidu@vidu.vn', code: '123456' });
      try { window.LIVE && LIVE.now && LIVE.now(); } catch (e) {} } catch (e) {}
  }
  var byId = function (id) { return T.filter(function (x) { return x.id === id; })[0]; };
  var done = function (id) { try { return !!DEMO.db().done['tut:' + id]; } catch (e) { return false; } };

  /* ── CSS ── */
  var css = document.createElement('style'); css.id = 'dmg-css';
  css.textContent = '.dmg-b{position:fixed;z-index:99990;background:rgba(10,24,28,.62);transition:all .25s ease}'
    + '#dmg-ring{position:fixed;z-index:99991;border-radius:12px;box-shadow:0 0 0 3px #F4A261,0 0 0 7px rgba(244,162,97,.35);pointer-events:none;transition:all .25s ease;animation:dmgP 1.4s infinite}'
    + '@keyframes dmgP{50%{box-shadow:0 0 0 3px #F4A261,0 0 0 12px rgba(244,162,97,.12)}}'
    + '#dmg-tip{position:fixed;z-index:99992;width:min(360px,calc(100vw - 20px));background:#fff;border-radius:16px;box-shadow:0 18px 50px rgba(0,0,0,.3);padding:14px 16px 12px;font:14px/1.5 Aptos,"Segoe UI",system-ui,sans-serif;color:#1B333A;transition:top .25s,left .25s}'
    + '#dmg-tip .hd{display:flex;gap:10px;align-items:center;margin-bottom:6px}#dmg-tip .hd .mc{width:46px;height:46px;flex:none}#dmg-tip .hd .mc img{width:46px;height:46px;object-fit:contain}'
    + '#dmg-tip .k{font-size:11.5px;font-weight:800;color:#C2410C;letter-spacing:.04em;text-transform:uppercase}#dmg-tip h4{margin:0;font-size:16px;color:#0A5C64}'
    + '#dmg-tip .d b{color:#0A5C64}#dmg-tip .dmg-n{display:block;margin-top:6px;font-size:12.5px;color:#7A4A12;background:#FFF4E6;border-radius:8px;padding:6px 8px}'
    + '#dmg-tip .pg{height:5px;border-radius:5px;background:#EEF3F4;margin:10px 0 8px;overflow:hidden}#dmg-tip .pg i{display:block;height:100%;background:#0E7C86}'
    + '#dmg-tip .ft{display:flex;align-items:center;gap:8px}#dmg-tip .ft .h{flex:1;font-size:12.5px;color:#6C8A93}'
    + '#dmg-tip button{border:1px solid #CFDDE0;background:#fff;color:#0A5C64;border-radius:10px;height:34px;padding:0 12px;font:inherit;font-weight:700;font-size:13px;cursor:pointer}'
    + '#dmg-tip button.p{background:#0E7C86;border-color:#0E7C86;color:#fff}#dmg-tip button.l{border:0;background:none;color:#6C8A93;padding:0 4px;font-weight:600}'
    + '.dmg-roles{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.dmg-rc{border:1.5px solid #E1EBED;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;background:#fff}'
    + '.dmg-rc.on{border-color:#0E7C86;box-shadow:0 0 0 3px rgba(14,124,134,.12)}.dmg-rc .top{display:flex;gap:10px;align-items:center}.dmg-rc .top img{width:58px;height:58px;object-fit:contain}'
    + '.dmg-rc h4{margin:0;font-size:16px;color:#0A5C64}.dmg-rc p{margin:0;font-size:12.5px;color:#5C7A83;line-height:1.45}'
    + '.dmg-rc ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px;flex:1}'
    + '.dmg-rc li button{width:100%;text-align:left;border:1px solid #E6EEF0;background:#F8FBFB;border-radius:10px;padding:8px 10px;font:inherit;font-size:13.5px;color:#1B333A;cursor:pointer;display:flex;gap:8px;align-items:center}'
    + '.dmg-rc li button:hover{border-color:#0E7C86;background:#EEF7F8}.dmg-rc li .c{width:22px;height:22px;border-radius:50%;background:#E6F3F4;color:#0A5C64;font-size:12px;font-weight:800;display:grid;place-items:center;flex:none}'
    + '.dmg-rc li.ok .c{background:#1E8449;color:#fff}.dmg-rc .go{border:0;background:#0E7C86;color:#fff;border-radius:11px;height:38px;font:inherit;font-weight:700;cursor:pointer}'
    + '.dmg-note{margin-top:12px;font-size:12.5px;color:#7A4A12;background:#FFF4E6;border-radius:10px;padding:8px 12px;line-height:1.5}'
    + '@media(max-width:820px){.dmg-roles{grid-template-columns:1fr}}';
  document.head.appendChild(css);

  /* ── chọn vai ── */
  function mimg(e, n) { try { return window.MASCOT ? MASCOT.img(e, n || 58) : ''; } catch (x) { return ''; } }
  function curRole() { if (PAGE === 'ph') return 'ph'; var t = ''; try { t = localStorage.getItem('hk_token') || ''; } catch (e) {} var m = t.match(/^tok\.(\w+)/); return m ? (m[1] === 'tt' ? 'lt' : m[1]) : 'gvcn'; }
  function open(focus) {
    var old = $('.dm-ov'); if (old) old.remove();
    var cr = focus || curRole();
    var o = document.createElement('div'); o.className = 'dm-ov';
    o.innerHTML = '<div class="dm-box"><div class="hd">' + mimg('chao', 64) + '<div><h3>Trải nghiệm theo vai trò</h3><p>Chọn một vai, rồi chọn việc muốn thử. Ứng dụng chỉ từng bước, bạn chỉ cần bấm theo. Dữ liệu là mẫu.</p></div><button class="x" aria-label="Đóng">×</button></div>'
      + '<div class="bd"><div class="dmg-roles">' + ROLES.map(function (R) {
        var L = T.filter(function (x) { return x.r === R.r; }), n = L.filter(function (x) { return done(x.id); }).length;
        return '<div class="dmg-rc ' + (R.r === cr ? 'on' : '') + '"><div class="top">' + mimg(R.emo) + '<div><h4>' + R.t + '</h4><p>' + R.d + '</p></div></div>'
          + '<ol>' + L.map(function (x, i) { return '<li class="' + (done(x.id) ? 'ok' : '') + '"><button data-t="' + x.id + '"><span class="c">' + (done(x.id) ? '✓' : i + 1) + '</span>' + esc(x.t) + '</button></li>'; }).join('') + '</ol>'
          + '<button class="go" data-r="' + R.r + '">' + (n ? 'Tiếp tục (' + n + '/' + L.length + ')' : 'Bắt đầu hướng dẫn') + '</button></div>';
      }).join('') + '</div><div class="dmg-note">Email trong chế độ này là <b>giả định</b>: không cần email thật, không gửi thư thật; thư hiện ở nút <b>Hộp thư</b>. Các nút <b>Tải PDF</b>, <b>Tải Excel</b> tạo file thật để bạn xem.</div></div></div>';
    document.body.appendChild(o);
    o.onclick = function (e) { if (e.target === o) o.remove(); };
    o.querySelector('.x').onclick = function () { o.remove(); };
    o.querySelectorAll('[data-t]').forEach(function (b) { b.onclick = function () { o.remove(); start(b.dataset.t, 0); }; });
    o.querySelectorAll('[data-r]').forEach(function (b) { b.onclick = function () { o.remove(); var L = T.filter(function (x) { return x.r === b.dataset.r; }), nx = L.filter(function (x) { return !done(x.id); })[0] || L[0]; start(nx.id, 0); }; });
  }

  /* ── chạy hướng dẫn ── */
  var cur = null, raf = 0, poll = 0;
  function start(id, from) {
    var tu = byId(id); if (!tu) return;
    var need = tu.r === 'ph' ? 'ph' : 'app';
    if (need !== PAGE || (need === 'app' && curRole() !== tu.r)) {
      ss('dm_next', 'tut:' + id + ':' + (from || 0));
      if (window.DMUI) DMUI.switchRole(tu.r === 'lt' ? 'lt' : tu.r); return;
    }
    stop(); clean(); cur = { tu: tu, i: from || 0, pred: null }; step();
  }
  function clean() {   // đóng bảng / hộp còn mở từ bài trước (che mất nút cần bấm)
    try { window.closePanel && closePanel(); } catch (e) {}
    try { window.findClose && findClose(); } catch (e) {}
    ['#phNew', '#tkm39', '#dl-sh', '#dm-toast', '.dm-ov'].forEach(function (q) { document.querySelectorAll(q).forEach(function (e) { if (q === '#tkm39') e.classList.remove('on'); else e.remove(); }); });
  }
  function stop() {
    cancelAnimationFrame(raf); clearInterval(poll);
    ['#dmg-ring', '#dmg-tip'].forEach(function (q) { var e = $(q); if (e) e.remove(); });
    document.querySelectorAll('.dmg-b').forEach(function (e) { e.remove(); });
    if (cur && cur.off) cur.off(); if (cur) cur.off = null;
  }
  function finish() {
    var tu = cur.tu; stop(); cur = null;
    try { DEMO.mark('tut:' + tu.id); } catch (e) {}
    var L = T.filter(function (x) { return x.r === tu.r; }), nx = L.filter(function (x) { return !done(x.id); })[0];
    var tip = card(null, { k: 'Hoàn thành', t: tu.t, d: nx ? 'Việc tiếp theo: <b>' + esc(nx.t) + '</b>.' : 'Bạn đã thử hết các việc của vai này. Chọn vai khác để trải nghiệm tiếp.', emo: 'khen-lon' });
    tip.querySelector('.ft').innerHTML = '<span class="h"></span><button class="l" data-a="roles">Chọn vai khác</button>' + (nx ? '<button class="p" data-a="next">Tiếp tục</button>' : '<button class="p" data-a="close">Xong</button>');
    tip.querySelector('[data-a=roles]').onclick = function () { tip.remove(); open(); };
    var b = tip.querySelector('[data-a=next]'); if (b) b.onclick = function () { tip.remove(); start(nx.id, 0); };
    var c = tip.querySelector('[data-a=close]'); if (c) c.onclick = function () { tip.remove(); };
    place(tip, null);
    try { window.DMUI && DMUI.bar(); } catch (e) {}
  }
  function card(st, o) {
    var tip = document.createElement('div'); tip.id = 'dmg-tip'; tip.setAttribute('role', 'dialog');
    tip.innerHTML = '<div class="hd"><div class="mc">' + mimg(o.emo || 'chi-tay', 46) + '</div><div><div class="k">' + o.k + '</div><h4>' + esc(o.t) + '</h4></div></div><div class="d">' + o.d + '</div>'
      + (o.p != null ? '<div class="pg"><i style="width:' + o.p + '%"></i></div>' : '') + '<div class="ft"></div>';
    document.body.appendChild(tip); return tip;
  }
  function place(tip, r) {
    var W = innerWidth, H = innerHeight, tw = tip.offsetWidth, th = tip.offsetHeight, top, left;
    if (!r) { top = (H - th) / 2; left = (W - tw) / 2; }
    else if (W < 640) { top = r.top + r.height / 2 > H / 2 ? 50 : H - th - 12; left = (W - tw) / 2; }
    else {
      left = Math.min(W - tw - 12, Math.max(12, r.left + r.width / 2 - tw / 2));
      top = r.bottom + 14 + th < H ? r.bottom + 14 : r.top - th - 14 > 46 ? r.top - th - 14 : Math.max(50, Math.min(H - th - 12, r.top));
      if (top === r.top && r.right + tw + 20 < W) left = r.right + 16; else if (top === r.top && r.left - tw - 20 > 0) left = r.left - tw - 16;
    }
    tip.style.left = Math.round(left) + 'px'; tip.style.top = Math.round(Math.max(46, top)) + 'px';
  }
  function holes(r) {
    var bs = document.querySelectorAll('.dmg-b');
    if (!bs.length) { for (var k = 0; k < 4; k++) { var d = document.createElement('div'); d.className = 'dmg-b'; document.body.appendChild(d); } bs = document.querySelectorAll('.dmg-b'); }
    var W = innerWidth, H = innerHeight, p = 6, x = Math.max(0, r.left - p), y = Math.max(0, r.top - p), x2 = Math.min(W, r.right + p), y2 = Math.min(H, r.bottom + p);
    var set = function (e, l, t, w, h) { e.style.left = l + 'px'; e.style.top = t + 'px'; e.style.width = Math.max(0, w) + 'px'; e.style.height = Math.max(0, h) + 'px'; };
    set(bs[0], 0, 0, W, y); set(bs[1], 0, y2, W, H - y2); set(bs[2], 0, y, x, y2 - y); set(bs[3], x2, y, W - x2, y2 - y);
    var ring = $('#dmg-ring'); if (!ring) { ring = document.createElement('div'); ring.id = 'dmg-ring'; document.body.appendChild(ring); }
    ring.style.left = x + 'px'; ring.style.top = y + 'px'; ring.style.width = (x2 - x) + 'px'; ring.style.height = (y2 - y) + 'px';
  }
  function step() {
    if (!cur) return;
    var tu = cur.tu, i = cur.i, st = tu.s[i];
    if (!st) return finish();
    stop(); cur.tu = tu; cur.i = i;
    if (st.pre && cur.pred !== i) { cur.pred = i; try { st.pre(); } catch (e) {} }
    var t0 = Date.now(), lim = st.wait || 8000;
    clearInterval(poll);
    poll = setInterval(function () {
      var el = pick(st.el);
      if (el) { clearInterval(poll); show(el); }
      else if (Date.now() - t0 > lim) { clearInterval(poll); if (st.opt) { next(); } else show(null); }
    }, 150);
  }
  function next() { if (!cur) return; cur.i++; cur.pred = null; step(); }
  function back() { if (!cur || cur.i === 0) return; cur.i--; cur.pred = null; step(); }
  function show(el) {
    var tu = cur.tu, i = cur.i, st = tu.s[i], N = tu.s.length;
    if (el && el.scrollIntoView) try { el.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' }); } catch (e) { el.scrollIntoView(); }
    var tip = card(st, { k: 'Bước ' + (i + 1) + '/' + N + ' · ' + esc(tu.t), t: st.t, d: st.d + (el ? '' : '<br><span class="dmg-n">Chưa thấy chỗ cần bấm trên màn hình này. Bấm <b>Tiếp</b> để đi tiếp.</span>'), p: Math.round(i * 100 / N), emo: i === 0 ? 'chao' : 'chi-tay' });
    var ft = tip.querySelector('.ft');
    var clickStep = st.act === 'click' && el;
    ft.innerHTML = '<span class="h">' + (clickStep ? 'Bấm vào ô đang sáng' : st.until && el ? 'Làm xong, ứng dụng tự chuyển bước' : '') + '</span>'
      + '<button class="l" data-a="x">Thoát</button>' + (i ? '<button data-a="b">Quay lại</button>' : '') + (clickStep && !st.hold ? '' : '<button class="p" data-a="n">' + (i === N - 1 ? 'Xong' : 'Tiếp') + '</button>');
    ft.querySelector('[data-a=x]').onclick = function () { stop(); cur = null; };
    var bb = ft.querySelector('[data-a=b]'); if (bb) bb.onclick = back;
    var nb = ft.querySelector('[data-a=n]'); if (nb) nb.onclick = next;
    if (!el) { place(tip, null); return; }
    var fired = false;
    var loop = function () { if (!cur || !document.body.contains(el)) { if (cur && cur.tu.s[cur.i] === st && !document.body.contains(el) && !fired) { cancelAnimationFrame(raf); step(); } return; }
      var r = el.getBoundingClientRect(); holes(r); place(tip, r); raf = requestAnimationFrame(loop); };
    loop();
    if (clickStep) {
      var EV = ['pointerdown', 'mousedown', 'touchstart', 'click'];
      var h = function (e) {
        if (fired || !(e.target === el || el.contains(e.target))) return;
        fired = true; EV.forEach(function (k) { document.removeEventListener(k, h, true); });
        if (st.nav) ss('dm_next', 'tut:' + tu.id + ':' + (i + 1));
        setTimeout(function () { if (cur && cur.tu === tu && cur.i === i) next(); }, st.nav ? 1500 : 600);
      };
      EV.forEach(function (k) { document.addEventListener(k, h, true); });
      cur.off = function () { EV.forEach(function (k) { document.removeEventListener(k, h, true); }); };
    }
    if (st.until) {
      var pu = setInterval(function () { if (!cur || cur.i !== i || cur.tu !== tu) return clearInterval(pu); if (st.until()) { clearInterval(pu); if (!st.hold) setTimeout(next, 500); else if (nb) nb.classList.add('p'); } }, 300);
      var off0 = cur.off; cur.off = function () { clearInterval(pu); if (off0) off0(); };
    }
  }
  addEventListener('keydown', function (e) { if (e.key === 'Escape' && cur) { stop(); cur = null; } });
  addEventListener('resize', function () { if (cur) { var st = cur.tu.s[cur.i]; var el = pick(st.el); if (el) { holes(el.getBoundingClientRect()); } } });
  window.DMG = { open: open, start: start, T: T, ROLES: ROLES, count: function () { return [T.filter(function (x) { return done(x.id); }).length, T.length]; }, resume: function (v) {
    var m = /^tut:(\w+):(\d+)$/.exec(v || ''); if (!m) return false; setTimeout(function () { start(m[1], +m[2]); }, 400); return true; } };
})();
