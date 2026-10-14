/* ══ v5.0 — Máy chủ mô phỏng phần KẾT QUẢ HỌC TẬP / SỔ CHỦ NHIỆM (dữ liệu GIẢ) ══
   Dùng chung cho: demo.js (chế độ "Kiểm tra tính năng ứng dụng") và tools/test/mock.js (kiểm thử Playwright).
   HTDEMO.build(students) ⇒ trạng thái {mon, gv, rule, diem, hoso, scn, mails}
   HTDEMO.api(st, action, p, who, students) ⇒ kết quả như backend HocTap.gs (null nếu không phải lệnh của phần này). */
(function (root) {
  'use strict';
  var MON = [['TOAN', 'Toán', 'd', 4], ['VAN', 'Ngữ văn', 'd', 4], ['ANH', 'Tiếng Anh', 'd', 4], ['SU', 'Lịch sử', 'd', 3], ['DIA', 'Địa lí', 'd', 3],
    ['KTPL', 'Giáo dục kinh tế và pháp luật', 'd', 3], ['QPAN', 'Giáo dục quốc phòng và an ninh', 'd', 2], ['GDTC', 'Giáo dục thể chất', 'nx', 3],
    ['HDTN', 'Hoạt động trải nghiệm, hướng nghiệp', 'nx', 3], ['GDDP', 'Nội dung giáo dục của địa phương', 'nx', 2]];
  var VT = { TOAN: 'Toán', VAN: 'Văn', ANH: 'Anh', SU: 'Sử', DIA: 'Địa', KTPL: 'KTPL', QPAN: 'QP-AN', GDTC: 'GDTC', HDTN: 'HĐTN', GDDP: 'GDĐP' };
  var RULE = { heSoTX: 1, heSoGK: 2, heSoCK: 3, heSoHK2: 2, lamTron: 1, totDiemMoi: 6.5, totSoMon: 6, totDiemCao: 8, khaDiemMoi: 5, khaSoMon: 6, khaDiemCao: 6.5,
    datSoMon: 6, datDiem: 5, datSan: 3.5, datToiDaCD: 1, xsSoMon: 6, xsDiem: 9, nxTiLeDat: 0.6667 };
  var GV = [['GV1', 'Phạm Thu Hà', ['TOAN'], 'gvtoan@example.com', '0900 000 001'], ['GV2', 'Lê Minh Châu', ['VAN'], 'gvvan@example.com', '0900 000 002'],
    ['GV3', 'Trần Ngọc Anh', ['ANH'], 'gvanh@example.com', '0900 000 003'], ['GV4', 'Đỗ Quang Huy', ['SU', 'DIA'], '', '0900 000 004'],
    ['GV5', 'Vũ Thanh Mai', ['KTPL', 'HDTN'], '', '0900 000 005'], ['GV6', 'Bùi Đức Long', ['QPAN', 'GDTC'], '', '0900 000 006'], ['GV7', 'Ngô Hải Yến', ['GDDP'], '', '']];
  function rnd(seed) { var s = seed; return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }
  function build(students) {
    var r = rnd(11), diem = [];
    students.forEach(function (s, i) {
      var lv = 5.6 + r() * 3.6 + (i % 7 === 0 ? 0.6 : 0) - (i % 11 === 3 ? 1.2 : 0);
      MON.forEach(function (m) {
        [1].forEach(function (hk) {
          if (m[2] === 'nx') { for (var k = 1; k <= m[3]; k++) diem.push([s.ma, m[0], hk, 'TX' + k, r() < 0.93 ? 'Đ' : 'CĐ']); diem.push([s.ma, m[0], hk, 'GK', 'Đ']); diem.push([s.ma, m[0], hk, 'CK', r() < 0.95 ? 'Đ' : 'CĐ']); return; }
          var cl = function (x) { return Math.max(2, Math.min(10, Math.round(x * 4) / 4)); };
          for (var k2 = 1; k2 <= m[3]; k2++) diem.push([s.ma, m[0], hk, 'TX' + k2, String(cl(lv + (r() - 0.45) * 2.4))]);
          diem.push([s.ma, m[0], hk, 'GK', String(cl(lv + (r() - 0.5) * 2))]);
          diem.push([s.ma, m[0], hk, 'CK', String(cl(lv + (r() - 0.5) * 2))]);
        });
      });
    });
    var hoso = students.map(function (s, i) {
      return { ma: s.ma, ten: s.ten, gt: i % 3 === 0 ? 'Nam' : 'Nữ', ns: '', dv: i % 5 === 4 ? '' : 'x', dc: 'Phường Yên Hòa, Hà Nội (địa chỉ mẫu)', dt: '', dien: i === 6 ? 'Đặc biệt' : '',
        lb: '', tt: '', cn: i % 9 === 0 ? 'Năng động, tích cực' : '', gd: '', db: i === 6 ? 'x' : '', bh: i === 6 ? 'Hoàn cảnh gia đình khó khăn (dữ liệu mẫu)' : '',
        bp: i === 6 ? 'Quan tâm, phối hợp thường xuyên với gia đình' : '', rl0: 'Tốt', ht0: i % 8 === 5 ? 'Khá' : 'Tốt', kt0: i % 4 === 0 ? 'Học sinh Xuất sắc' : '', gc: '' };
    });
    return { mon: MON.map(function (m, i) { return { ma: m[0], ten: m[1], ht: m[2], tx: m[3], tt: i + 1, on: true, vt: VT[m[0]] }; }),
      gv: GV.map(function (g) { return { ma: g[0], ten: g[1], mon: g[2], email: g[3], dt: g[4], dc: '', gc: '', on: true }; }),
      rule: JSON.parse(JSON.stringify(RULE)), diem: diem.map(function (d) { return d.concat(['Giáo viên bộ môn', '2026-10-10 08:00']); }),
      hoso: hoso, scn: { 'cfg.bgh_email': 'bgh@example.com' }, mails: [] };
  }
  var GV_EMAIL = { 'tok.gvtoan': ['TOAN'] };
  function api(st, a, p, who, students) {
    var gvcn = who === 'gvcn', gvMon = who === 'gvtoan' ? ['TOAN'] : null;
    var need = function () { if (!gvcn) throw new Error('Chỉ giáo viên chủ nhiệm được thực hiện thao tác này.'); };
    try {
      switch (a) {
        case 'htBoot':
          if (!gvcn && !gvMon) return { ok: false, error: 'Chỉ giáo viên chủ nhiệm và giáo viên bộ môn xem được kết quả học tập.' };
          var o = { ok: true, mon: st.mon, gv: st.gv, rule: st.rule, diem: gvMon ? st.diem.filter(function (d) { return gvMon.indexOf(d[1]) >= 0; }) : st.diem };
          if (gvMon) o.myMon = gvMon; else { o.hoso = st.hoso; o.scn = st.scn; o.mailQuota = 90; }
          return o;
        case 'htSaveMon': need(); st.mon = p.mon; return { ok: true, mon: st.mon };
        case 'htSaveGV': need(); st.gv = p.gv; return { ok: true, gv: st.gv };
        case 'htSaveRule': need(); Object.keys(p.rule || {}).forEach(function (k) { st.rule[k] = p.rule[k]; }); return { ok: true, rule: st.rule };
        case 'htSaveDiem':
          if (!gvcn && !gvMon) throw new Error('Không có quyền nhập điểm.');
          var items = p.items || [];
          if (gvMon && items.some(function (it) { return gvMon.indexOf(it.mon) < 0; })) throw new Error('Thầy/cô chỉ nhập được điểm môn mình dạy.');
          if (p.replace && p.replace.mon) { var dds = p.replace.dds || []; st.diem = st.diem.filter(function (d) { return !(d[1] === p.replace.mon && d[2] === +p.replace.hk && (!dds.length || dds.indexOf(d[3]) >= 0)); }); }
          items.forEach(function (it) {
            var i = -1; st.diem.forEach(function (d, k) { if (d[0] === it.ma && d[1] === it.mon && d[2] === +it.hk && d[3] === it.dd) i = k; });
            if (it.v === '') { if (i >= 0) st.diem.splice(i, 1); return; }
            if (i >= 0) st.diem[i][4] = it.v; else st.diem.push([it.ma, it.mon, +it.hk, it.dd, it.v, 'Người nhập', '']);
          });
          return { ok: true, them: items.length };
        case 'htSaveHoSo': need();
          (p.rows || []).forEach(function (o2) { var h = st.hoso.filter(function (x) { return x.ma === o2.ma; })[0]; if (h) Object.keys(o2).forEach(function (k) { h[k] = o2[k]; }); else st.hoso.push(o2); });
          return { ok: true, hoso: st.hoso };
        case 'scnSave': need(); Object.keys(p.kv || {}).forEach(function (k) { if (p.kv[k] == null) delete st.scn[k]; else st.scn[k] = String(p.kv[k]); }); return { ok: true };
        case 'scnImg': need();
          st.img = st.img || {}; var id = 'IMG' + (Object.keys(st.img).length + 1); st.img[id] = { n: p.name, m: p.mime, data: p.data };
          var list = (p.thay ? [] : JSON.parse(st.scn['img.' + p.key] || '[]')).concat([{ id: id, n: p.name, m: p.mime, w: p.w, h: p.h }]);
          st.scn['img.' + p.key] = JSON.stringify(list); return { ok: true, list: list };
        case 'scnImgDel': need(); var l2 = JSON.parse(st.scn['img.' + p.key] || '[]').filter(function (x) { return x.id !== p.id; }); st.scn['img.' + p.key] = JSON.stringify(l2); return { ok: true, list: l2 };
        case 'scnImgGet': need(); var f = (st.img || {})[p.id]; return f ? { ok: true, name: f.n, mime: f.m, data: f.data } : { ok: false, error: 'Không tìm thấy ảnh.' };
        case 'htMailBGH': need(); st.mails.push({ kind: 'bgh', to: p.to || st.scn['cfg.bgh_email'], subject: p.subject, html: p.html, files: (p.files || []).map(function (x) { return x.name; }) }); return { ok: true, to: [p.to || st.scn['cfg.bgh_email']] };
        case 'htMailGV': need(); var n = st.gv.filter(function (g) { return (p.gv || []).indexOf(g.ma) >= 0 && g.email; });
          n.forEach(function (g) { st.mails.push({ kind: 'gv', to: g.email, subject: p.subject, html: p.html }); }); return { ok: true, n: n.length };
        case 'htMailPH': need(); var gui = 0, bo = [];
          (p.items || []).forEach(function (it) { var s = (students || []).filter(function (x) { return x.ma === it.ma; })[0]; if (!s || !/@/.test(s.email || '')) { bo.push(s ? s.ten : it.ma); return; } gui++; st.mails.push({ kind: 'ph', to: s.email, subject: it.subject, html: it.html }); });
          return { ok: true, gui: gui, bo: bo };
      }
    } catch (e) { return { ok: false, error: e.message }; }
    return null;
  }
  var HTDEMO = { build: build, api: api };
  if (typeof module !== 'undefined' && module.exports) module.exports = HTDEMO; else root.HTDEMO = HTDEMO;
})(typeof window !== 'undefined' ? window : this);
