/* ══ v4.0 — CHẾ ĐỘ "KIỂM TRA TÍNH NĂNG ỨNG DỤNG" (dành cho ban giám khảo / người muốn thử) ══
   · Không cần email, mật khẩu: bấm nút ở màn đăng nhập ⇒ vào sổ với DỮ LIỆU MẪU (tên học sinh giả).
   · Toàn bộ lệnh gọi máy chủ (script.google.com) được trả lời NGAY TRÊN TRÌNH DUYỆT (DEMO.api) — không ghi gì vào sổ thật.
   · Thanh trên cùng: đổi vai (Cô Thảo · Lớp trưởng · Tổ trưởng · Phụ huynh), Hộp thư mô phỏng (email phụ huynh / cô nhận được),
     Hướng dẫn trải nghiệm (danh sách việc nên thử, tự đánh dấu khi làm xong), Làm lại từ đầu, Thoát.
   · Dữ liệu demo lưu localStorage hk_demo_db_v1; bật bằng localStorage hk_demo=1 hoặc ?demo=1 trên địa chỉ.
   Nạp ở <head> của index.html và phu-huynh.html, TRƯỚC mọi script khác. */
(function () {
  'use strict';
  var LS = window.localStorage, qs = new URLSearchParams(location.search);
  function g(k) { try { return LS.getItem(k); } catch (e) { return null; } }
  function s(k, v) { try { v == null ? LS.removeItem(k) : LS.setItem(k, v); } catch (e) {} }
  if (qs.get('demo') === '1') s('hk_demo', '1');
  if (qs.get('demo') === '0') s('hk_demo', null);
  var ON = g('hk_demo') === '1';
  var PAGE = /phu-huynh/.test(location.pathname) ? 'ph' : 'app';
  /* link / QR ?demo=1 ⇒ vào thẳng vai cô Thảo (cất token thật để khi Thoát khôi phục) */
  if (ON && PAGE === 'app' && qs.get('demo') === '1') { var t0 = g('hk_token') || '';
    if (!/^tok\./.test(t0)) { if (t0) s('hk_demo_bak', t0); ['hk_cache_v3', 'hk_cache_v4', 'hk_outbox_v1', 'hk_khoa'].forEach(function (k) { s(k, null); }); s('hk_token', 'tok.gvcn'); try { sessionStorage.setItem('dm_next', 'intro'); } catch (e) {} } }

  /* ── dữ liệu mẫu (tên giả, không phải học sinh thật) ── */
  var HO = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Vũ', 'Đặng', 'Bùi', 'Đỗ', 'Ngô'];
  var DEM = ['Minh', 'Thu', 'Gia', 'Bảo', 'Ngọc', 'Hải', 'Khánh', 'Phương', 'Đức', 'Thanh'];
  var TEN = ['An', 'Bình', 'Chi', 'Dũng', 'Hằng', 'Hà', 'Hưng', 'Khoa', 'Lan', 'Linh', 'Long', 'Mai', 'Nam', 'Nga', 'Phúc', 'Quân', 'Sơn', 'Trang', 'Tú', 'Vy'];
  var ME = {
    gvcn: { name: 'Nguyễn Thị Thu Thảo', role: 'GVCN', email: 'co.thao@demo.vn', to: '' },
    lt: { name: 'Nguyễn Minh An', role: 'Lớp trưởng', email: 'loptruong@demo.vn', to: '1' },
    tt: { name: 'Trần Hải Bình', role: 'Tổ trưởng', email: 'totruong2@demo.vn', to: '2' },
    ph: { name: 'Phụ huynh', role: 'Phụ huynh', email: '', to: '' }
  };
  var ROLE_T = { gvcn: 'Cô Thảo (GVCN)', lt: 'Lớp trưởng', tt: 'Tổ trưởng tổ 2', ph: 'Phụ huynh' };
  function rnd(seed) { var x = seed; return function () { x = (x * 9301 + 49297) % 233280; return x / 233280; }; }
  function pad(n) { return String(n).padStart(2, '0'); }
  function build() {
    var r = rnd(11), students = [], i;
    for (i = 0; i < 40; i++) {
      var to = 1 + (i % 4);
      students.push({ ma: 'HS' + pad(i + 1), ten: HO[(i * 7) % 10] + ' ' + DEM[(i * 3) % 10] + ' ' + TEN[(i * 11) % 20], to: String(to),
        chucVu: i === 0 ? 'Lớp trưởng' : (i < 4 ? 'Tổ trưởng' : 'Học sinh'), trangThai: 'Đang học',
        email: i % 5 !== 4 ? 'phuhuynh.hs' + pad(i + 1) + '@demo.vn' : '' });   /* 4/5 học sinh có email phụ huynh ⇒ ghi điểm là thấy thư */
    }
    var tru = [
      { ma: 'T01', nhom: 'Nề nếp', noiDung: 'Đi học muộn', diem: -2, active: true, dienGiai: 'Có mặt sau tiếng trống vào lớp.' },
      { ma: 'T02', nhom: 'Nề nếp', noiDung: 'Không mặc đồng phục', diem: -2, active: true, dienGiai: '' },
      { ma: 'T03', nhom: 'Học tập', noiDung: 'Không làm bài tập', diem: -3, active: true, dienGiai: 'Giáo viên bộ môn báo.' },
      { ma: 'T04', nhom: 'Học tập', noiDung: 'Nói chuyện riêng', diem: -1, active: true, dienGiai: '' },
      { ma: 'T05', nhom: 'Kỷ luật', noiDung: 'Dùng điện thoại trong giờ', diem: -5, active: true, dienGiai: '' },
      { ma: 'T06', nhom: 'Vệ sinh', noiDung: 'Không trực nhật', diem: -3, active: true, dienGiai: '' }];
    var cong = [
      { ma: 'C01', nhom: 'Học tập', noiDung: 'Phát biểu xây dựng bài', diem: 1, active: true, dienGiai: '' },
      { ma: 'C02', nhom: 'Học tập', noiDung: 'Điểm 9–10 kiểm tra', diem: 2, active: true, dienGiai: '' },
      { ma: 'C03', nhom: 'Phong trào', noiDung: 'Tham gia phong trào', diem: 3, active: true, dienGiai: '' }];
    var entries = [], id = 1, th, tu, k;
    [9, 10].forEach(function (th) {
      for (tu = 1; tu <= 4; tu++) students.forEach(function (st) {
        if (th === 10 && tu > 2) return;              /* tháng 10 mới qua 2 tuần */
        k = r();
        var who = k < 0.5 ? ['loptruong@demo.vn', 'Nguyễn Minh An'] : ['totruong2@demo.vn', 'Trần Hải Bình'];
        var day = th === 9 ? (tu * 7 - 1) : (tu * 7 - 5);
        if (k < 0.3) { var c = tru[Math.floor(r() * tru.length)];
          entries.push(['D' + id++, '2026-' + pad(th) + '-' + pad(day) + ' 08:1' + tu, th, tu, st.ma, st.to, 'Trừ', c.ma, c.noiDung, c.diem, who[0], who[1], '']); }
        if (k > 0.82) { var d = cong[Math.floor(r() * cong.length)];
          entries.push(['D' + id++, '2026-' + pad(th) + '-' + pad(day) + ' 09:0' + tu, th, tu, st.ma, st.to, 'Cộng', d.ma, d.noiDung, d.diem, who[0], who[1], '']); }
      });
    });
    var remarks = [
      { maHS: 'HS03', thang: 9, nhanXet: 'Em tiến bộ rõ, cần đúng giờ hơn.', xepLoai: 'Khá' },
      { maHS: 'HS05', thang: 9, nhanXet: 'Ngoan, tích cực phát biểu.', xepLoai: 'Tốt' }];
    return { v: 1, rev: 1, students: students, tru: tru, cong: cong, entries: entries, remarks: remarks, nid: id,
      cfg: { namHoc: '2026 - 2027', lop: '11D3', gvcn: 'Nguyễn Thị Thu Thảo', thang: 10, soTuan: 4,
        thresholds: [{ ten: 'Tốt', san: 0 }, { ten: 'Khá', san: -6 }, { ten: 'Trung bình', san: -12 }, { ten: 'Yếu', san: -9999 }] },
      khoa: { 9: { by: 'Nguyễn Thị Thu Thảo', at: '2026-10-01 16:30' } },
      phMail: { on: true, cong: true },
      phReg: [{ id: 'R1', ma: 'HS02', ten: students[1].ten, email: 'me.' + 'hs02@demo.vn', at: '2026-10-09 07:45' }],
      quyDinh: { xepThuLop: 5, heSoTaiPham: 2, chiTieu: [{ tu: 1, den: 5, min: 0, max: 1 }, { tu: 6, den: 8, min: 1, max: 2 }] },
      thongBao: { mode: 'Ngay', emails: 'co.thao@demo.vn', nguong: 0, baoCong: true },
      accounts: [
        { email: 'co.thao@demo.vn', ten: 'Nguyễn Thị Thu Thảo', role: 'GVCN', to: '', active: true },
        { email: 'loptruong@demo.vn', ten: 'Nguyễn Minh An', role: 'Lớp trưởng', to: '1', active: true },
        { email: 'totruong2@demo.vn', ten: 'Trần Hải Bình', role: 'Tổ trưởng', to: '2', active: true }],
      theme: '', mails: [], done: {}, ev: {}, reg: {} };
  }
  var DB = null;
  function load() { try { DB = JSON.parse(g('hk_demo_db_v1') || 'null'); } catch (e) { DB = null; } if (!DB || DB.v !== 1) { DB = build(); save(); } return DB; }
  function save() { try { LS.setItem('hk_demo_db_v1', JSON.stringify(DB)); } catch (e) { /* đầy bộ nhớ ⇒ bỏ ảnh bằng chứng */ DB.ev = {}; try { LS.setItem('hk_demo_db_v1', JSON.stringify(DB)); } catch (e2) {} } }
  function now() { var d = new Date(); return '2026-10-' + pad(Math.min(28, Math.max(10, d.getDate()))) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()); }
  function stu(ma) { return DB.students.filter(function (x) { return x.ma === ma; })[0]; }
  function nz(n) { return (n > 0 ? '+' : '') + n; }
  function ten1(t) { return String(t || '').trim().split(/\s+/).pop(); }
  function mark(k) { if (!DB.done[k]) { DB.done[k] = Date.now(); save(); try { window.dispatchEvent(new CustomEvent('demo-done', { detail: k })); } catch (e) {} } }
  function mail(o) { o.id = 'M' + (DB.mails.length + 1); o.at = now(); o.unread = true; DB.mails.unshift(o); save();
    try { window.dispatchEvent(new CustomEvent('demo-mail', { detail: o })); } catch (e) {} }
  var BASE = location.href.replace(/[#?].*$/, '').replace(/[^/]*$/, '');

  /* email mô phỏng gửi phụ huynh — cùng nội dung với máy chủ thật (KhoaThang.gs ▸ guiPhuHuynh_) */
  function loiNhan(con, items, me) {
    var tru = items.filter(function (e) { return e[9] < 0; });
    if (tru.length) {
      var nTru = me.filter(function (e) { return e[9] < 0; }).length, lan = 0;
      tru.forEach(function (e) { var n = me.filter(function (x) { return x[7] === e[7] && x[9] < 0; }).length; if (n > lan) lan = n; });
      if (nTru >= 5 || lan >= 3) return { emo: 'lo-lang', loi: 'Tháng này ' + con + ' đã có <b>' + nTru + '</b> lần bị trừ điểm. Cô mong bác dành thời gian trò chuyện và phối hợp cùng cô để giúp con tiến bộ hơn ạ.' };
      if (lan === 2) return { emo: 'nghiem', loi: 'Đây là lần thứ 2 trong tháng ' + con + ' mắc lỗi này. Bác nhắc nhở con giúp cô để con không tái phạm nữa nhé.' };
      return { emo: 'buon', loi: 'Đây là lần đầu trong tháng con mắc lỗi này, bác nhắc nhẹ ' + con + ' giúp cô nhé. Cô tin con sẽ cố gắng hơn ạ.' };
    }
    var t = items.reduce(function (a, e) { return a + e[9]; }, 0);
    return t >= 3 ? { emo: 'khen-lon', loi: 'Cô rất vui vì ' + con + ' đã cố gắng nhiều. Bác khen con giúp cô nhé!' } : { emo: 'vui', loi: 'Cô báo tin vui để bác cùng động viên ' + con + ' ạ!' };
  }
  function mailPhuHuynh(st, items) {
    if (!st.email || !DB.phMail.on) return;
    var tru = items.some(function (e) { return e[9] < 0; }); if (!tru && !DB.phMail.cong) return;
    var th = items[0][2], me = DB.entries.filter(function (e) { return e[4] === st.ma && e[2] === th; });
    var tong = me.reduce(function (a, e) { return a + e[9]; }, 0), con = 'con <b>' + ten1(st.ten) + '</b>', L = loiNhan(con, items, me);
    var rows = items.map(function (e) { return '<tr><td style="padding:6px 10px;border-bottom:1px solid #EEF2F3;text-align:left">' + e[8] + (e[12] ? '<div style="color:#6C8A93;font-size:12px">' + e[12] + '</div>' : '') + '</td><td style="padding:6px 10px;border-bottom:1px solid #EEF2F3;text-align:right;font-weight:800;color:' + (e[9] < 0 ? '#C0392B' : '#1E8449') + '">' + nz(e[9]) + '</td></tr>'; }).join('');
    var link = BASE + 'phu-huynh.html?demo=1#hs=' + st.ma + '&tb=' + items.map(function (e) { return e[0]; }).join(',');
    mail({ kind: 'tb', to: st.email, from: 'Cô Thảo · Sổ hạnh kiểm 11D3', ma: st.ma, link: link,
      subject: (tru ? '[11D3] Cô Thảo cập nhật hạnh kiểm của con ' : 'Tin vui: con ') + st.ten + (tru ? '' : ' được cộng điểm'),
      html: '<div style="font-family:Arial,sans-serif;max-width:560px;color:#1B333A"><img src="' + BASE + 'mascot/chu-nhiem/png/' + L.emo + '.png" width="110" style="float:right;margin:0 0 6px 10px" alt="">'
        + '<div style="color:#6C8A93;font-size:12px">LỚP 11D3 · THPT YÊN HÒA</div><div style="font-size:19px;font-weight:800;color:#0A5C64;margin:4px 0">Cô Thảo xin cập nhật cho bác về con ' + st.ten + '</div>'
        + '<p style="line-height:1.55">' + L.loi + '</p><table style="border-collapse:collapse;width:100%;clear:both;font-size:14px">' + rows + '</table>'
        + '<p>Tổng điểm tháng ' + th + ' của con: <b style="color:' + (tong < 0 ? '#C0392B' : '#1E8449') + '">' + nz(tong) + '</b></p>'
        + '<p><a data-demo-link="1" href="' + link + '" style="display:inline-block;background:#0E7C86;color:#fff;text-decoration:none;padding:10px 18px;border-radius:10px;font-weight:bold">Xem chi tiết &amp; tải PDF thông báo</a></p>'
        + '<p style="color:#8AA6AD;font-size:12px">Không muốn nhận thư nữa? Bấm vào đây.</p></div>' });
  }

  /* ── máy chủ mô phỏng ── */
  function base(who) {
    var me = ME[who] || ME.ph;
    var o = { ok: true, me: me, cfg: DB.cfg, students: DB.students, cong: DB.cong, tru: DB.tru, accounts: DB.accounts, thongBao: DB.thongBao,
      sheetUrl: '', quyDinh: DB.quyDinh, thang: DB.cfg.thang, theme: DB.theme, khoa: DB.khoa, rev: String(DB.rev),
      data: { entries: DB.entries.filter(function (e) { return e[2] === DB.cfg.thang; }), remarks: DB.remarks } };
    if (who === 'gvcn') { o.phMail = DB.phMail; o.phReg = DB.phReg; }
    if (who === 'ph') o.data.entries = o.data.entries.map(function (e) { e = e.slice(); if (e[13]) e[13] = '1'; return e; });
    return o;
  }
  function locked(a, p) {
    var th = /^(addEntries|saveRemark)$/.test(a) ? Number(p.thang)
      : /^(updateEntry|deleteEntry)$/.test(a) ? ((DB.entries.filter(function (e) { return e[0] === p.id; })[0] || [])[2])
      : a === 'addEvidence' ? ((DB.entries.filter(function (e) { return e[0] === (p.entryIds || [])[0]; })[0] || [])[2])
      : a === 'delEvidence' ? ((DB.entries.filter(function (e) { return e[0] === p.entryId; })[0] || [])[2]) : null;
    return th && DB.khoa[th] ? th : null;
  }
  function api(a, p, tok) {
    load(); p = p || {};
    var who = (String(tok || '').match(/^tok\.(\w+)/) || [])[1], me = ME[who], write = false, r;
    var lk = locked(a, p);
    if (lk) return { ok: false, error: 'Tháng ' + lk + ' đã được GVCN chốt hạnh kiểm — không thêm, sửa, xoá được nữa.' };
    switch (a) {
      case 'loginKhach': r = { ok: true, token: 'tok.ph', boot: base('ph') }; break;
      case 'bootstrap': r = who ? base(who) : { ok: false, error: 'Phiên đăng nhập hết hạn' }; break;
      case 'roster': r = { ok: true, members: [] }; break;
      case 'otpStart': r = { ok: false, error: 'Đang ở chế độ trải nghiệm — dùng nút đổi vai ở thanh trên cùng.' }; break;
      case 'sync':
        if (p.rev && p.rev === String(DB.rev)) { r = { ok: true, rev: String(DB.rev), same: true }; break; }
        r = { ok: true, rev: String(DB.rev), khoa: DB.khoa, entries: DB.entries.filter(function (e) { return !p.thangs || p.thangs.indexOf(e[2]) >= 0; }).map(function (e) { e = e.slice(); if (who === 'ph' && e[13]) e[13] = '1'; return e; }), remarks: DB.remarks };
        if (who === 'gvcn') r.phReg = DB.phReg; break;
      case 'entries': r = { ok: true, entries: DB.entries.filter(function (e) { return !p.thangs || p.thangs.indexOf(e[2]) >= 0; }), remarks: DB.remarks }; break;
      case 'addEntries':
        if (!me || who === 'ph') { r = { ok: false, error: 'Phiên đăng nhập hết hạn' }; break; }
        if (p.rid && DB.reg['rid:' + p.rid]) { r = DB.reg['rid:' + p.rid]; r.dup = true; break; }
        var out = (p.items || []).map(function (x) { var st = stu(x.maHS) || {};
          if (who === 'tt' && String(st.to) !== '2') return null;
          var e = ['D' + (DB.nid++), now(), Number(p.thang), Number(p.tuan), x.maHS, st.to, x.loai, x.maMuc, x.noiDung, x.diem, me.email, me.name, x.ghiChu || ''];
          DB.entries.push(e); return e; }).filter(Boolean);
        if (!out.length) { r = { ok: false, error: 'Bạn chỉ được ghi điểm cho tổ mình.' }; break; }
        r = { ok: true, ids: out.map(function (e) { return e[0]; }) }; if (p.rid) DB.reg['rid:' + p.rid] = r; write = true;
        var by = {}; out.forEach(function (e) { (by[e[4]] = by[e[4]] || []).push(e); });
        setTimeout(function () { Object.keys(by).forEach(function (ma) { mailPhuHuynh(stu(ma), by[ma]); }); }, 400);
        if (who === 'lt' || who === 'tt') mark('ghi'); else mark('ghi');
        break;
      case 'deleteEntry': DB.entries = DB.entries.filter(function (e) { return e[0] !== p.id; }); r = { ok: true }; write = true; break;
      case 'updateEntry': DB.entries.forEach(function (e) { if (e[0] === p.id) { if (p.tuan) e[3] = Number(p.tuan); if (p.diem != null) e[9] = Number(p.diem); if (p.ghiChu != null) e[12] = p.ghiChu; } }); r = { ok: true }; write = true; break;
      case 'saveRemark':
        if (who !== 'gvcn') { r = { ok: false, error: 'Chỉ GVCN được nhận xét, chốt xếp loại.' }; break; }
        DB.remarks = DB.remarks.filter(function (x) { return !(x.maHS === p.maHS && x.thang === Number(p.thang)); });
        DB.remarks.push({ maHS: p.maHS, thang: Number(p.thang), xepLoai: p.xepLoai || '', nhanXet: p.nhanXet || '' }); r = { ok: true }; write = true; mark('nx'); break;
      case 'lockMonth':
        if (who !== 'gvcn') { r = { ok: false, error: 'Chỉ GVCN được chốt / mở khoá tháng.' }; break; }
        if (p.lock === false) delete DB.khoa[p.thang]; else { DB.khoa[p.thang] = { by: ME.gvcn.name, at: now() }; mark('chot'); }
        r = { ok: true, khoa: DB.khoa }; write = true; break;
      case 'addEvidence': var fid = 'F' + (Object.keys(DB.ev).length + 1); DB.ev[fid] = { n: p.name, m: p.mime, data: p.data };
        (p.entryIds || []).forEach(function (eid) { DB.entries.forEach(function (e) { if (e[0] === eid) e[13] = (e[13] ? e[13] + ';' : '') + fid + '|' + p.name + '|' + p.mime; }); });
        r = { ok: true, file: { id: fid, n: p.name, m: p.mime } }; write = true; break;
      case 'getEvidence': var f = DB.ev[p.id]; r = f ? { ok: true, name: f.n, mime: f.m, data: f.data } : { ok: false, error: 'Ảnh mẫu không còn.' }; break;
      case 'delEvidence': DB.entries.forEach(function (e) { if (e[0] === p.entryId) e[13] = String(e[13] || '').split(';').filter(function (x) { return x.indexOf(p.fileId + '|') !== 0; }).join(';'); }); r = { ok: true }; write = true; break;
      case 'savePhMail': DB.phMail = { on: p.on !== false, cong: p.cong !== false }; r = { ok: true, phMail: DB.phMail }; break;
      case 'phDangKy':
        var em = String(p.email || '').trim().toLowerCase(), sx = stu(p.ma);
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) { r = { ok: false, error: 'Email chưa đúng.' }; break; }
        DB.reg['ph:' + em] = p.ma; save();
        mail({ kind: 'code', to: em, from: 'Cô Thảo · Sổ hạnh kiểm 11D3', subject: 'Mã xác nhận nhận thông báo hạnh kiểm: 123456',
          html: '<div style="font-family:Arial,sans-serif;max-width:480px"><p>Kính gửi bác,</p><p>Mã xác nhận để nhận thông báo hạnh kiểm của con <b>' + (sx ? sx.ten : '') + '</b> là:</p><p style="font-size:30px;font-weight:800;letter-spacing:6px;color:#0A5C64">123456</p><p style="color:#6C8A93;font-size:13px">(Chế độ trải nghiệm: mã luôn là 123456.)</p></div>' });
        r = { ok: true, ten: sx && sx.ten }; break;
      case 'phXacNhan':
        var em2 = String(p.email || '').trim().toLowerCase(), ma2 = DB.reg['ph:' + em2];
        if (!ma2) { r = { ok: false, error: 'Mã đã hết hạn. Bác bấm gửi lại mã nhé.' }; break; }
        if (String(p.code) !== '123456') { r = { ok: false, error: 'Mã chưa đúng ạ. (Trải nghiệm: mã là 123456)' }; break; }
        delete DB.reg['ph:' + em2]; var s2 = stu(ma2);
        var rec = { id: 'R' + (Date.now() % 100000), ma: ma2, ten: s2 ? s2.ten : ma2, email: em2, at: now() };
        DB.phReg.push(rec); write = true; mark('dk');
        mail({ kind: 'gv', to: ME.gvcn.email, from: 'Sổ hạnh kiểm 11D3', subject: '[11D3] Phụ huynh của ' + rec.ten + ' đăng ký nhận thông báo — cô duyệt giúp nhé',
          html: '<div style="font-family:Arial,sans-serif;max-width:520px"><p>Chào cô Thảo,</p><p>Phụ huynh của <b>' + rec.ten + '</b> (' + em2 + ') vừa đăng ký nhận email thông báo hạnh kiểm. Hiện có <b>' + DB.phReg.length + '</b> đăng ký chờ cô duyệt.</p><p><a data-demo-role="gvcn" data-demo-go="ph" href="#" style="display:inline-block;background:#0E7C86;color:#fff;text-decoration:none;padding:10px 18px;border-radius:10px;font-weight:bold">Mở sổ để duyệt</a></p></div>' });
        r = { ok: true, cho: true }; break;
      case 'phDuyet':
        if (who !== 'gvcn') { r = { ok: false, error: 'Chỉ GVCN duyệt đăng ký của phụ huynh.' }; break; }
        var rr = DB.phReg.filter(function (x) { return x.id === p.id; })[0]; DB.phReg = DB.phReg.filter(function (x) { return x.id !== p.id; });
        if (rr && p.ok !== false) { var s3 = stu(rr.ma); if (s3) s3.email = (s3.email ? s3.email + ', ' : '') + rr.email; mark('duyet');
          mail({ kind: 'duyet', to: rr.email, from: 'Cô Thảo · Sổ hạnh kiểm 11D3', attach: 'HDSD_Phu_huynh.pdf', attachUrl: BASE + 'docs/HDSD_Phu_huynh.pdf',
            subject: 'Cô Thảo đã duyệt — bác sẽ nhận thông báo hạnh kiểm của con ' + rr.ten,
            html: '<div style="font-family:Arial,sans-serif;max-width:560px"><img src="' + BASE + 'mascot/chu-nhiem/png/cam-on.png" width="110" style="float:right" alt=""><p>Kính gửi bác,</p><p>Cô Thảo đã duyệt đăng ký của bác. Từ nay, mỗi khi con <b>' + rr.ten + '</b> được cộng hoặc bị trừ điểm, bác sẽ nhận email kèm lời nhắn của cô ạ.</p><p style="clear:both">Hướng dẫn chi tiết dành cho phụ huynh: file PDF đính kèm thư này.</p><p>Cô cảm ơn bác đã luôn đồng hành cùng con ạ!</p></div>' }); }
        r = { ok: true, dangKy: DB.phReg }; write = true; break;
      case 'saveStudents': if (who !== 'gvcn') { r = { ok: false, error: 'Chỉ GVCN được sửa danh sách lớp.' }; break; } DB.students = p.students || DB.students; r = { ok: true, students: DB.students }; write = true; break;
      case 'saveAccounts': if (who !== 'gvcn') { r = { ok: false, error: 'Chỉ GVCN được sửa tài khoản.' }; break; } DB.accounts = p.accounts || DB.accounts; r = { ok: true }; break;
      case 'saveConfig': if (p.thang) DB.cfg.thang = Number(p.thang); if (p.soTuan) DB.cfg.soTuan = Number(p.soTuan); if (p.thresholds) DB.cfg.thresholds = p.thresholds; r = { ok: true }; write = true; break;
      case 'saveQuyDinh': DB.quyDinh = p; r = { ok: true }; break;
      case 'saveNotify': DB.thongBao = p; r = { ok: true }; break;
      case 'saveCatalog': if (p.loai === 'Cộng' || p.loai === 'cong') DB.cong = p.items; else DB.tru = p.items; r = { ok: true }; break;
      case 'saveTheme': DB.theme = p.theme; r = { ok: true, theme: p.theme }; break;
      case 'testMail': r = { ok: true, quota: 99 }; mail({ kind: 'test', to: ME.gvcn.email, from: 'Sổ hạnh kiểm 11D3', subject: 'Thư thử', html: '<p>Thư thử từ sổ hạnh kiểm (chế độ trải nghiệm).</p>' }); break;
      default: r = { ok: true };
    }
    if (write) DB.rev++;
    save();
    return r;
  }
  window.DEMO = { on: ON, api: api, db: function () { return load(); }, mark: mark, ME: ME, ROLE_T: ROLE_T, reset: function () { DB = build(); save(); } };
  if (!ON) return;

  /* ── chặn fetch tới máy chủ thật ── */
  load();
  var of = window.fetch ? window.fetch.bind(window) : null;
  window.fetch = function (url, o) {
    var u = typeof url === 'string' ? url : (url && url.url) || '';
    if (!/script\.google(usercontent)?\.com/.test(u)) return of(url, o);
    var body = {}; try { body = JSON.parse((o && o.body) || '{}'); } catch (e) {}
    if (!body.action) return Promise.resolve(new Response('{"ok":true}', { status: 200, headers: { 'Content-Type': 'application/json' } }));
    return new Promise(function (res) {
      setTimeout(function () {
        var r; try { r = api(body.action, body.payload, body.token); } catch (e) { r = { ok: false, error: String(e.message || e) }; }
        res(new Response(JSON.stringify(r), { status: 200, headers: { 'Content-Type': 'application/json' } }));
      }, body.action === 'sync' ? 40 : 160);
    });
  };
  document.documentElement.classList.add('demo');
  /* trang phụ huynh: đánh dấu đã mở thông báo từ email */
  if (PAGE === 'ph' && /tb=/.test(location.hash)) mark('phtb');
  if (PAGE === 'ph') { s('hkph_tour', '1'); }
  else { s('hk_tour_gvcn', '1'); s('hk_tour_cb', '1'); }
})();
