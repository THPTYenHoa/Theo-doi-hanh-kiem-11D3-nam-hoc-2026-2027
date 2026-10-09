/* Kiểm thử v3.0 — chạy: python3 -m http.server 8768 (thư mục repo) rồi NODE_PATH=$(npm root -g) node tools/test/run.js */
const { chromium } = require('playwright'); const { newPage } = require('./mock');
const U = 'http://127.0.0.1:8768/index.html', PH = 'http://127.0.0.1:8768/phu-huynh.html';
let fail = 0; const ok = (c, m) => { console.log((c ? '✅ ' : '❌ ') + m); if (!c) fail++; };
const W = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await chromium.launch(); const errs = [];
  const P = async o => { const p = await newPage(b, o); p.on('pageerror', e => errs.push(e.message)); return p; };

  // 1. đăng nhập email + mã
  let p = await P({});
  await p.goto(U); await W(600);
  ok(await p.isVisible('#lgEm'), 'màn đăng nhập: ô email (không còn chọn tên / mật khẩu)');
  ok(!(await p.isVisible('#lgPin')) && !p.M.CALLS.some(c => c.a === 'roster'), 'không gọi danh sách thành viên, không ô mật khẩu');
  ok(await p.isVisible('a.lgph[href="phu-huynh.html"]'), 'có lối vào trang phụ huynh');
  await p.fill('#lgEm', 'la@example.com'); await p.click('#lgGo'); await W(300);
  ok(/chưa có trong danh sách/.test(await p.textContent('#lgErr3')), 'email lạ ⇒ báo chưa có trong danh sách');
  await p.fill('#lgEm', 'TOTRUONG2@example.com'); await p.click('#lgGo'); await p.waitForSelector('#lgCode');
  ok(/Trần Hải Bình/.test(await p.textContent('.lgcard h3')), 'chào đúng tên người nhận mã');
  await p.fill('#lgCode', '111111'); await W(400);
  ok(/chưa đúng/.test(await p.textContent('#lgErr3')), 'mã sai ⇒ báo lỗi');
  await p.fill('#lgCode', '123456'); await W(1200);
  ok(await p.isVisible('#app.on'), 'mã đúng ⇒ vào sổ');
  ok(/Tổ trưởng/.test(await p.textContent('#rlRole')), 'vai trò tổ trưởng lấy từ tài khoản');
  ok(await p.isVisible('#hkupd.on'), 'hiện thông báo cập nhật v3.0');
  await p.click('#updOk');
  await p.context().close();

  // 2. ghi điểm không chờ (máy chủ chậm 2,5 s)
  p = await P({ as: 'lt', lag: 2500 }); await p.goto(U); await p.waitForSelector('#app.on', { timeout: 15000 }); await W(3500);
  await p.evaluate(() => { const c = document.querySelector('#updOk'); c && c.click(); });
  const n0 = p.M.D.entries.length;
  await p.locator('#listGhi .row').nth(3).click(); await W(300);
  await p.click('#pBody [data-add="T02"]'); await W(200);
  const t = await p.evaluate(() => { const a = performance.now(); document.querySelector('#gcSkip').click(); return performance.now() - a; });
  await W(150);
  const shown = await p.evaluate(() => S.entries.some(e => /^tmp-/.test(e[0])));
  ok(shown && t < 200, 'ghi điểm: hiện ngay (' + Math.round(t) + ' ms), không chờ máy chủ');
  ok(/Đang lưu/.test(await p.textContent('#hkq')), 'chip "Đang lưu…"');
  await W(4500);
  ok(p.M.D.entries.length === n0 + 1, 'máy chủ (giả lập) nhận đúng 1 dòng');
  ok(await p.evaluate(() => !S.entries.some(e => /^tmp-/.test(e[0]))), 'số tạm đã đổi sang số thật');
  const add = p.M.CALLS.find(c => c.a === 'addEntries'); ok(add && add.p.rid, 'lệnh ghi có mã chống trùng rid');
  await p.context().close();

  // 3. mất phản hồi ⇒ gửi lại cùng rid, không trùng
  p = await P({ as: 'lt', drop: { addEntries: 1 } }); await p.goto(U); await p.waitForSelector('#app.on'); await W(1500);
  await p.evaluate(() => { const c = document.querySelector('#updOk'); c && c.click(); });
  const n1 = p.M.D.entries.length;
  await p.locator('#listGhi .row').nth(2).click(); await W(200); await p.click('#pBody [data-add="T04"]'); await W(200); await p.click('#gcSkip'); await W(5000);
  ok(p.M.D.entries.length === n1 + 1, 'mạng rớt giữa chừng ⇒ tự gửi lại, không ghi trùng');
  ok(p.M.CALLS.filter(c => c.a === 'addEntries').length >= 2, 'đã tự thử lại');
  await p.context().close();

  // 4. lỗi thật ⇒ trả lại như cũ + chip đỏ
  p = await P({ as: 'lt', failWrite: true }); await p.goto(U); await p.waitForSelector('#app.on'); await W(1500);
  await p.evaluate(() => { const c = document.querySelector('#updOk'); c && c.click(); });
  await p.locator('#listGhi .row').nth(1).click(); await W(200); await p.click('#pBody [data-add="T01"]'); await W(200); await p.evaluate(() => { const b = document.querySelector('#pBody .btn.ghost, #pBody button'); }); if (await p.isVisible('#gcSkip')) await p.click('#gcSkip'); else { const o = await p.$('#pBody button'); o && await o.click(); await W(200); if (await p.isVisible('#gcSkip')) await p.click('#gcSkip'); } await W(1500);
  ok(await p.isVisible('#hkq.err'), 'lỗi ghi ⇒ chip đỏ Thử lại / Bỏ');
  ok(await p.evaluate(() => !S.entries.some(e => /^tmp-/.test(e[0]))), 'dòng chưa lưu được gỡ khỏi màn hình');
  await p.context().close();

  // 5. xoá không chờ + mở lại nhanh từ dữ liệu cả năm
  p = await P({ as: 'gvcn' }); await p.goto(U); await p.waitForSelector('#app.on'); await W(4500);
  await p.evaluate(() => { const c = document.querySelector('#updOk'); c && c.click(); });
  ok(await p.evaluate(() => S.allLoaded), 'tự tải nền dữ liệu cả năm');
  const id = await p.evaluate(() => S.entries.find(e => e[2] === 10)[0]);
  const nD = p.M.D.entries.length;
  await p.evaluate(id => delEntry(id), id); await W(100);
  ok(await p.evaluate(id => !S.entries.some(e => e[0] === id), id), 'xoá: biến mất ngay');
  await W(1500); ok(p.M.D.entries.length === nD - 1, 'máy chủ đã xoá');
  await p.route(/script\.google\.com/, async r => { await W(5000); r.fallback(); });
  const t0 = Date.now(); await p.reload(); await p.waitForSelector('#app.on'); const dt = Date.now() - t0;
  ok(dt < 2500, 'mở lại sổ: hiện ngay từ dữ liệu lưu (' + dt + ' ms, máy chủ chậm 5 s)');
  await p.evaluate(() => go('tk')); await W(300);
  ok(!(await p.textContent('#vTK')).includes('Đang tải dữ liệu cả năm'), 'Thống kê mở ngay, không chờ tải cả năm');
  await p.context().close();

  // 6. tra cứu nhanh + hồ sơ
  p = await P({ as: 'gvcn' }); await p.goto(U); await p.waitForSelector('#app.on'); await W(3500);
  await p.evaluate(() => { const c = document.querySelector('#updOk'); c && c.click(); });
  await p.keyboard.press('/'); await W(200);
  ok(await p.isVisible('#hkfind.on'), 'phím / mở Tra cứu');
  await p.keyboard.type('khoa'); await W(200);
  ok(await p.locator('#fls .it').count() >= 1, 'gõ không dấu vẫn tìm được');
  await p.keyboard.press('Enter'); await W(600);
  ok(await p.isVisible('#panel.on') && /hồ sơ hạnh kiểm/.test(await p.textContent('#pSub')), 'Enter ⇒ mở hồ sơ học sinh');
  await p.click('#pBody [data-pk="hk1"]'); await W(300);
  ok(/Học kỳ 1/.test(await p.textContent('#pBody .pf-res')), 'hồ sơ: đổi sang Học kỳ 1');
  await p.context().close();

  // 7. chủ đề
  p = await P({ as: 'gvcn' }); await p.goto(U); await p.waitForSelector('#app.on'); await W(1500);
  await p.evaluate(() => { const c = document.querySelector('#updOk'); c && c.click(); });
  await p.click('#hTheme'); await W(200);
  ok(await p.locator('#pBody .thc').count() >= 15, 'bảng chọn có ' + await p.locator('#pBody .thc').count() + ' chủ đề');
  await p.click('#pBody [data-th="man-chin"]'); await W(200);
  ok(await p.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--teal').trim().toUpperCase() === '#A3264B'), 'đổi sang Mận chín ngay');
  await p.click('#thClass'); await W(500);
  ok(p.M.CALLS.some(c => c.a === 'saveTheme' && c.p.theme === 'man-chin'), 'GVCN đặt chủ đề mặc định cho lớp');
  await p.reload(); await p.waitForSelector('#app.on'); await W(500);
  ok(await p.evaluate(() => THEME.cur().id === 'man-chin'), 'tải lại vẫn giữ chủ đề');
  await p.context().close();

  // 8. điện thoại
  p = await P({ as: 'tt', mobile: true }); await p.goto(U); await p.waitForSelector('#app.on'); await W(1500);
  await p.evaluate(() => { const c = document.querySelector('#updOk'); c && c.click(); });
  ok(await p.evaluate(() => document.documentElement.scrollWidth) <= 390, 'điện thoại: không cuộn ngang');
  const rows = await p.evaluate(() => { const r = [...document.querySelectorAll('#listGhi .row')].filter(x => x.getBoundingClientRect().top < innerHeight); return r.length; });
  ok(rows >= 6, 'điện thoại: thấy ' + rows + ' học sinh trên một màn hình');
  await p.context().close();

  // 10. bằng chứng: chọn ảnh khi ghi điểm ⇒ gửi sau lệnh ghi
  p = await P({ as: 'lt' }); await p.goto(U); await p.waitForSelector('#app.on'); await W(1500);
  await p.evaluate(() => { const c = document.querySelector('#updOk'); c && c.click(); });
  await p.locator('#listGhi .row').nth(5).click(); await W(200); await p.click('#pBody [data-add="T06"]'); await W(250);
  if (!(await p.isVisible('#gcSkip'))) { const o = await p.$('#pBody .item, #pBody button.btn'); if (o) await o.click(); await W(250); }
  ok(await p.isVisible('#evFile'), 'bước diễn giải có nút Chọn ảnh / tài liệu');
  const [fc] = await Promise.all([p.waitForEvent('filechooser'), p.click('#evFile')]);
  await fc.setFiles({ name: 'bien-ban.png', mimeType: 'image/png', buffer: Buffer.from(require('./mock').TINY, 'base64') }); await W(400);
  ok(await p.locator('#evThumbs .evt').count() === 1, 'hiện ảnh xem trước');
  await p.click('#gcSave'); await W(2500);
  const evc = p.M.CALLS.filter(c => c.a === 'addEvidence'), addc = p.M.CALLS.filter(c => c.a === 'addEntries');
  ok(evc.length === 1 && /^E/.test(evc[0].p.entryIds[0]) && p.M.CALLS.indexOf(evc[0]) > p.M.CALLS.indexOf(addc[addc.length - 1]), 'bằng chứng gửi SAU lệnh ghi, gắn đúng số thật');
  ok(evc[0] && evc[0].p.mime === 'image/jpeg', 'ảnh được thu nhỏ sang JPEG trước khi gửi');
  const eid = evc[0] && evc[0].p.entryIds[0];
  await p.evaluate(id => evOpen(id), eid); await W(500);
  ok(await p.locator('#pBody .evcard').count() === 1, 'mở 📎: thấy bằng chứng đã lưu');
  await p.evaluate(() => closePanel()); await W(200);
  ok(await p.locator('#listGhi .evchip').count() >= 1, 'danh sách có biểu tượng 📎 cạnh ghi nhận');
  await p.context().close();

  // 11. hướng dẫn từng bước
  p = await P({ as: 'gvcn', tour: true }); await p.goto(U); await p.waitForSelector('#app.on'); await W(1500);
  await p.evaluate(() => { const c = document.querySelector('#updOk'); c && c.click(); }); await W(3500);
  ok(await p.isVisible('#tg-card'), 'GVCN đăng nhập lần đầu ⇒ tự mở hướng dẫn từng bước');
  ok(/GVCN · Bước 1\/11/.test(await p.textContent('#tg-card')), 'hướng dẫn GVCN có 11 bước');
  for (let i = 0; i < 10; i++) { await p.click('#tg-card [data-a=n]'); await W(350); }
  ok(/Xem lại hướng dẫn/.test(await p.textContent('#tg-card')), 'đi hết đến bước cuối');
  await p.click('#tg-card [data-a=n]'); await W(300);
  ok(!(await p.isVisible('#tg-card')) && await p.evaluate(() => localStorage.getItem('hk_tour_gvcn') === '1'), 'xong ⇒ không tự hiện lại');
  await p.click('#hHelp'); await W(300); await p.click('#gTour'); await W(800);
  ok(await p.isVisible('#tg-card'), 'nút ? ▸ Hướng dẫn từng bước mở lại được');
  await p.context().close();
  p = await P({ as: 'tt', tour: true, mobile: true }); await p.goto(U); await p.waitForSelector('#app.on'); await W(1500);
  await p.evaluate(() => { const c = document.querySelector('#updOk'); c && c.click(); }); await W(3500);
  ok(/Cán bộ lớp/.test(await p.textContent('#tg-card')) && /tổ trưởng tổ 2/.test(await p.textContent('#tg-card')), 'tổ trưởng: hướng dẫn riêng cho cán bộ lớp (điện thoại)');
  await p.context().close();
  p = await P({ tour: true }); await p.goto(PH); await W(2500);
  ok(await p.isVisible('#tg-card') && /Phụ huynh/.test(await p.textContent('#tg-card')), 'trang phụ huynh: hướng dẫn riêng tự mở lần đầu');
  for (let i = 0; i < 5; i++) { await p.click('#tg-card [data-a=n]'); await W(450); }
  ok(await p.isVisible('.res'), 'hướng dẫn phụ huynh tự mở hồ sơ một học sinh để chỉ');
  await p.context().close();

  // 12. v3.2 — đồng bộ trực tiếp + hiệu ứng + thẻ tổng quan
  p = await P({ as: 'gvcn' }); await p.goto(U); await p.waitForSelector('#app.on'); await W(1500);
  await p.evaluate(() => { const c = document.querySelector('#updOk'); c && c.click(); });
  ok(await p.isVisible('#v32h') && await p.locator('#v32h .tl').count() === 4, 'thẻ tổng quan tuần có 4 ô số');
  ok(await p.locator('#listGhi .row .av32').count() >= 30, 'avatar theo tổ cạnh tên học sinh');
  await W(1500); ok(/Trực tiếp/.test(await p.textContent('#v32live')), 'nhãn "Trực tiếp" khi đồng bộ chạy');
  const nSame = p.M.CALLS.filter(c => c.a === 'sync').length; ok(nSame >= 1, 'app hỏi sync định kỳ');
  const xid = p.M.ext('HS05', 'Đi học muộn', -2);
  const tX = Date.now(); await p.waitForFunction(id => S.entries.some(e => e[0] === id), xid, { timeout: 9000 }).catch(() => {});
  const dtX = Date.now() - tX;
  ok(await p.evaluate(id => S.entries.some(e => e[0] === id), xid), 'người khác ghi ⇒ máy này thấy sau ' + dtX + ' ms (không cần tải lại)');
  await W(200); ok(await p.locator('#v32pop.on').count() === 1 && /Lớp trưởng/.test(await p.textContent('#v32pop')), 'hiện thông báo nhỏ "Lớp trưởng vừa ghi…"');
  ok(await p.locator(`#listGhi .ev.fresh[data-eid="${xid}"]`).count() === 1, 'mục mới trượt vào (hiệu ứng)');
  p.M.extDel(xid); await p.waitForFunction(id => !S.entries.some(e => e[0] === id), xid, { timeout: 9000 }).catch(() => {});
  ok(await p.evaluate(id => !S.entries.some(e => e[0] === id), xid), 'người khác xoá ⇒ máy này tự gỡ');
  const syncN = p.M.CALLS.filter(c => c.a === 'sync').length, entN = p.M.CALLS.filter(c => c.a === 'entries' || c.a === 'bootstrap').length;
  await W(4500); ok(p.M.CALLS.filter(c => c.a === 'sync').length > syncN && p.M.CALLS.filter(c => c.a === 'entries' || c.a === 'bootstrap').length === entN, 'không có gì mới ⇒ chỉ hỏi sync nhẹ, không tải lại dữ liệu');
  await p.click('#v32h [data-f=bad]'); await W(200);
  const nb = await p.locator('#listGhi .row').count(); ok(nb > 0 && nb < 40 && await p.isVisible('#v32clr'), 'bấm ô "Lượt trừ điểm" ⇒ lọc ' + nb + ' bạn');
  await p.click('#v32clr'); await W(200); ok(await p.locator('#listGhi .row').count() === 40, 'bỏ lọc ⇒ đủ cả lớp');
  const did = await p.evaluate(() => { const e = document.querySelector('#listGhi .ev[data-eid]'); return e && e.dataset.eid; });
  await p.evaluate(id => { delEntry(id); }, did); await W(80);
  ok(await p.locator(`#listGhi .ev.out[data-eid="${did}"]`).count() === 1, 'xoá: mục thu gọn mượt trước khi biến mất');
  await W(400); ok(await p.evaluate(id => !S.entries.some(e => e[0] === id), did), 'xoá xong');
  await p.context().close();
  p = await P({ as: 'gvcn', oldBackend: true }); await p.goto(U); await p.waitForSelector('#app.on'); await W(2500);
  ok(/1 phút/.test(await p.textContent('#v32live')), 'backend cũ (chưa có sync) ⇒ tự quay về cập nhật 1 phút, không lỗi');
  await p.context().close();

  // 13. v3.3 — báo cáo
  p = await P({ as: 'gvcn' }); await p.goto(U); await p.waitForSelector('#app.on'); await W(1200);
  await p.evaluate(() => { const c = document.querySelector('#updOk'); c && c.click(); });
  await p.click('#railNav [data-v=bc]'); await W(1200);
  ok(await p.isVisible('#vBC .bchead') && /Tháng 10\/2026/.test(await p.textContent('#vBC .bchead')), 'menu Báo cáo: báo cáo tháng đang chọn');
  ok(/so kỳ trước/.test(await p.textContent('#vBC .kpis')), 'có so sánh với tháng trước');
  ok(await p.locator('#vBC .bct tr').count() >= 5 && /Nhất/.test(await p.textContent('#vBC')), 'bảng thi đua tổ có xếp hạng');
  ok(/Trong tháng 10\/2026, lớp/.test(await p.inputValue('#bcNx')), 'nhận xét chung tự soạn từ số liệu');
  await p.fill('#bcPh', 'Phương hướng cô tự viết'); await p.evaluate(() => { document.activeElement.blur(); renderAll(); });
  ok(await p.inputValue('#bcPh') === 'Phương hướng cô tự viết', 'nội dung cô sửa được giữ lại');
  await p.evaluate(() => { const o = RPT.open; RPT.open = (h, t) => o(h, t, { dry: true }); }); await p.click('#bcPrint'); await W(200);
  const pr = await p.evaluate(() => RPT.last || '');
  ok(!/CỘNG HÒA XÃ HỘI CHỦ NGHĨA/.test(pr) && /Phương hướng cô tự viết/.test(pr) && /chủ nhiệm/i.test(pr), 'bản in (v3.7 khổ ngang): không quốc hiệu, có nội dung cô sửa, chữ ký GVCN');
  for (const k of ['tuan', 'hk', 'nam']) { await p.click(`#vBC [data-bk=${k}]`); await W(250); }
  ok(/Cả năm học/.test(await p.textContent('#vBC .bchead')), 'đổi kỳ: tuần / học kỳ / cả năm');
  const [dl] = await Promise.all([p.waitForEvent('download'), p.click('#bcXls')]);
  ok(/Bao_cao_hanh_kiem_nam/.test(dl.suggestedFilename()), 'tải Excel báo cáo');
  await p.context().close();
  p = await P({ as: 'tt', mobile: true }); await p.goto(U); await p.waitForSelector('#app.on'); await W(1200);
  await p.evaluate(() => { const c = document.querySelector('#updOk'); c && c.click(); });
  await p.click('#tabbar [data-v=bc]'); await W(1200);
  ok(await p.evaluate(() => document.querySelector('#bcNx').readOnly), 'tổ trưởng xem được báo cáo, không sửa lời nhận xét');
  ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1 && [...document.querySelectorAll('#vBC .panelbox')].every(e => e.getBoundingClientRect().right <= innerWidth + 1)), 'điện thoại: báo cáo không tràn ngang');
  await p.context().close();

  // 14. v3.4 — quản lý lớp & phân quyền
  p = await P({ as: 'gvcn' }); p.on('dialog', d => d.accept()); await p.goto(U); await p.waitForSelector('#app.on'); await W(1200);
  await p.evaluate(() => { const c = document.querySelector('#updOk'); c && c.click(); go('cai'); }); await W(500);
  await p.click('[data-ct="quyen"]'); await W(200); const q1 = await p.isVisible('#qTbl') && await p.isVisible('#accAdd'); await p.click('[data-ct="lop"]'); await W(200);
  ok(q1 && await p.isVisible('#hsTo') && await p.isVisible('.cai39 .ctabs'), 'GVCN: thấy bảng phân quyền, tài khoản, đổi tổ, danh sách lớp');
  await p.click('[data-ct="quyen"]'); await W(200); await p.click('#accAdd'); await W(300); await p.fill('#aEm', 'totruong3@example.com'); await p.fill('#aTen', 'Tổ trưởng 3'); await p.selectOption('#aRole', 'Tổ trưởng'); await p.selectOption('#aTo', '3');
  await p.click('#aSave'); await W(500);
  const sa = p.M.CALLS.filter(c => c.a === 'saveAccounts').pop();
  ok(sa && sa.p.accounts.some(a => a.email === 'totruong3@example.com' && a.role === 'Tổ trưởng' && a.to === '3'), 'GVCN cấp quyền cho email mới (tổ trưởng tổ 3)');
  await p.click('[data-ct="lop"]'); await W(200); await p.click('#hsTo'); await W(300); for (const i of [0, 1]) { await p.locator('#pBody [data-p]').nth(i).click(); await W(150); }
  await p.selectOption('#btTo', '4'); await p.click('#btSave'); await W(500);
  ok(p.M.D.students.filter(s => s.to === '4').length === 12, 'đổi tổ hàng loạt: 2 bạn sang tổ 4');
  const ma0 = await p.evaluate(() => S.students[5].ma);
  await p.evaluate(ma => openStudentForm(ma), ma0); await W(300);
  ok(await p.isVisible('#fNghi'), 'có nút "Đánh dấu nghỉ học / chuyển lớp" (giữ lịch sử)');
  await p.click('#fDel'); await W(600);
  ok(!p.M.D.students.some(s => s.ma === ma0), 'GVCN xoá được học sinh');
  await p.context().close();
  p = await P({ as: 'lt' }); await p.goto(U); await p.waitForSelector('#app.on'); await W(1000);
  await p.evaluate(() => { const c = document.querySelector('#updOk'); c && c.click(); go('cai'); }); await W(500);
  ok(!(await p.isVisible('#accAdd')) && !(await p.isVisible('#hsTo')) && /Quyền của bạn/.test(await p.textContent('#vCai')), 'lớp trưởng: không có tài khoản / đổi tổ / xoá học sinh, thấy "Quyền của bạn"');
  await p.context().close();

  // 15. v3.5 — màn chờ cô Thảo chạy
  p = await P({ as: 'tt', mobile: true, lag: 5000 }); await p.addInitScript(() => { try { localStorage.setItem('hk_last_role', 'Tổ trưởng'); } catch (_) {} });
  await p.goto(U); await W(2500);
  ok(await p.isVisible('#loader .mld-run') && /các con chờ chút nha/.test(await p.textContent('#loader')), 'màn chờ: cô Thảo chạy + "Mạng lag xíu, các con chờ chút nha…"');
  const pc = await p.evaluate(() => parseFloat(document.querySelector('#loader .mld-pct').textContent)); ok(pc > 20 && pc < 100, 'thanh tiến trình đang chạy (' + pc + '%)');
  await p.waitForSelector('#app.on', { timeout: 15000 }); ok(!(await p.isVisible('#loader')), 'mở sổ xong ⇒ màn chờ tắt');
  await p.context().close();
  p = await P({ mobile: true, lag: 5000 }); await p.goto(PH); await W(2500);
  ok(/Các bác chờ chút ạ/.test(await p.textContent('#main')) && await p.isVisible('.mld-run'), 'trang phụ huynh: "Các bác chờ chút ạ…"');
  await p.context().close();

  // 16. v3.7 — chốt tháng, báo cáo ngang, email phụ huynh
  const fs = require('fs'), path = require('path'), OUT = path.join(__dirname, 'out'); fs.mkdirSync(OUT, { recursive: true });
  const dry = pg => pg.evaluate(() => { const o = RPT.open; RPT.open = (h, t) => o(h, t, { dry: true }); });
  const pdf = async (doc, name) => { const f = path.join(OUT, name + '.html'); fs.writeFileSync(f, doc.replace(/<base href="[^"]*">/, '<base href="http://127.0.0.1:8768/">'));
    const q = await b.newPage(); await q.goto('file://' + f); await q.waitForLoadState('networkidle'); await W(400);
    await q.pdf({ path: path.join(OUT, name + '.pdf'), width: '297mm', height: '210mm', printBackground: true });
    const n = await q.evaluate(() => document.querySelectorAll('.pg').length);
    const over = await q.evaluate(() => [...document.querySelectorAll('.pg')].filter(g => g.scrollHeight > g.clientHeight + 2).length);
    await q.setViewportSize({ width: 1123, height: 794 }); await q.screenshot({ path: path.join(OUT, name + '.png'), fullPage: true }); await q.close(); return { n, over }; };
  p = await P({ as: 'gvcn' }); p.on('dialog', d => d.accept()); await p.goto(U); await p.waitForSelector('#app.on'); await W(1200);
  await p.evaluate(() => { const c = document.querySelector('#updOk'); c && c.click(); go('bang'); }); await W(600);
  ok(await p.isVisible('#vBang .lkb.go [data-lk="1"]'), 'GVCN: thanh "Chốt tháng 10" ở Bảng tổng hợp');
  await p.click('#vBang [data-lk="1"]'); await W(700);
  ok(p.M.khoa[10] && await p.isVisible('#vBang .lkb:not(.go)') && /đã chốt/.test(await p.textContent('#vBang .lkb')), 'chốt tháng ⇒ máy chủ lưu + dải "đã chốt hạnh kiểm"');
  const id10 = await p.evaluate(() => S.entries.find(e => e[E_THANG] === 10)[E_ID]);
  const nE = p.M.D.entries.length;
  await p.evaluate(id => delEntry(id), id10); await W(500);
  ok(p.M.D.entries.length === nE && !p.M.CALLS.some(c => c.a === 'deleteEntry'), 'tháng đã chốt: không xoá được ghi nhận (chặn ngay trên máy)');
  await p.evaluate(() => { go('ghi'); }); await W(400);
  ok(await p.isVisible('#vGhi .lkb'), 'màn Ghi điểm báo tháng đã chốt');
  await p.evaluate(() => addEntry && addEntry()); await W(300);
  ok(!p.M.CALLS.some(c => c.a === 'addEntries'), 'tháng đã chốt: không thêm được điểm');
  await p.evaluate(() => go('bang')); await W(400); await p.click('#vBang [data-lk="0"]'); await W(700);
  ok(!p.M.khoa[10], 'GVCN mở khoá được tháng');
  // báo cáo
  await p.evaluate(() => go('bc')); await W(700);
  ok(await p.isVisible('#vBC .bccmp') && await p.isVisible('#vBC .totop'), 'Báo cáo: thẻ so sánh kỳ trước + tổ dẫn đầu / cố lên');
  ok(await p.locator('#vBC .bccmp img').count() >= 1, 'Báo cáo: có cô Thảo theo kết quả lớp');
  await dry(p); await p.click('#bcPrint'); await W(300);
  let doc = await p.evaluate(() => RPT.last || '');
  ok(doc && !/CỘNG HÒA|Độc lập/i.test(doc) && /landscape/.test(doc) && (doc.match(/<svg|class="cmp"|class="hb"/g) || []).length >= 4 && /mascot\/chu-nhiem/.test(doc), 'PDF báo cáo lớp: khổ ngang, có biểu đồ + cô Thảo, không quốc hiệu');
  ok(/Tuyên dương/i.test(doc) && /Nhắc nhở/i.test(doc) && /Xếp hạng tổ|thi đua/i.test(doc), 'PDF báo cáo lớp: xếp hạng tổ, tuyên dương, nhắc nhở');
  let r = await pdf(doc, 'bao-cao-lop'); ok(r.n >= 4 && r.over === 0, 'PDF lớp ' + r.n + ' trang, không trang nào tràn');
  // hồ sơ học sinh
  await p.evaluate(() => openProfile('HS03')); await W(600);
  await p.click('#pfPr'); await W(300); doc = await p.evaluate(() => RPT.last || '');
  ok(/Báo cáo hạnh kiểm học sinh/.test(doc) && /Lỗi thường mắc/.test(doc) && (doc.match(/<svg/g) || []).length >= 2, 'PDF hồ sơ học sinh: biểu đồ, lỗi thường mắc, khen thưởng');
  r = await pdf(doc, 'hoc-sinh'); ok(r.over === 0, 'PDF học sinh ' + r.n + ' trang, không tràn');
  doc = await p.evaluate(() => RPT.open(RPT.student({ cfg: S.cfg, students: S.students, entries: S.entries, remarks: S.remarks }, 'HS03', { k: 'hk', n: 1 }, {}), 'x', { dry: true }));
  r = await pdf(doc, 'hoc-sinh-hk1'); ok(r.over === 0 && /Học kỳ I/.test(doc), 'PDF học sinh theo học kỳ');
  // cài đặt email phụ huynh + duyệt
  p.M.phReg.push({ id: 'R9', ma: 'HS05', ten: 'Hoàng Bảo Hằng', email: 'bo.hs05@example.com', at: '2026-10-08 09:00' });
  await p.evaluate(() => closePanel()); await W(300); await p.evaluate(() => boot(true)); await W(500); await p.evaluate(() => go('ph')); await W(600);
  ok(await p.isVisible('#phOn') && await p.isVisible('#vPH [data-ok="R9"]'), 'trang Phụ huynh: email phụ huynh + danh sách chờ duyệt');
  await p.click('#vPH [data-ok="R9"]'); await W(2500);
  ok(/bo\.hs05@example\.com/.test(p.M.D.students.find(s => s.ma === 'HS05').email) && !(await p.isVisible('#vPH [data-ok="R9"]')), 'GVCN duyệt ⇒ email vào ô Email phụ huynh của học sinh');
  await p.context().close();
  // tổ trưởng không thấy nút chốt; máy chủ cũng chặn
  p = await P({ as: 'tt', khoa: { 10: { by: 'Nguyễn Thu Thảo', at: '2026-10-31 16:00' } } }); await p.goto(U); await p.waitForSelector('#app.on'); await W(1200);
  await p.evaluate(() => { const c = document.querySelector('#updOk'); c && c.click(); go('ghi'); }); await W(500);
  ok(await p.isVisible('#vGhi .lkb') && !(await p.isVisible('#vGhi [data-lk]')), 'tổ trưởng: thấy tháng đã chốt, không có nút mở khoá');
  await p.context().close();
  // trang phụ huynh: đăng ký email, link thông báo, PDF
  p = await P({ mobile: true }); await p.goto(PH + '#hs=HS03&tb=E1'); await W(1500);
  const e1 = p.M.D.entries.find(e => e[0] === 'E1');
  p.M.D.entries.forEach(e => { if (e[4] === 'HS03' && !p.M.tb) { p.M.tb = e[0]; } });
  await p.evaluate(t => { location.hash = 'hs=HS03&tb=' + t; }, p.M.tb); await W(700);
  ok(await p.isVisible('.tbc') && await p.isVisible('#tbPdf'), 'phụ huynh mở link email ⇒ thẻ "Thông báo mới từ cô Thảo" + Tải PDF');
  await dry(p); await p.click('#tbPdf'); await W(300); doc = await p.evaluate(() => RPT.last || '');
  ok(/Cô Thảo xin cập nhật cho bác/.test(doc) && /mascot\/chu-nhiem/.test(doc) && /landscape/.test(doc), 'PDF thông báo phụ huynh: ngang, lời cô Thảo, ảnh cô');
  r = await pdf(doc, 'thong-bao'); ok(r.n === 1 && r.over === 0, 'PDF thông báo: 1 trang, không tràn');
  await p.click('#pdf'); await W(300); doc = await p.evaluate(() => RPT.last || '');
  ok(/Báo cáo hạnh kiểm học sinh/.test(doc) && /Cô cảm ơn bác|Cô mong bác/.test(doc), 'phụ huynh: PDF báo cáo của con (lời gửi các bác)');
  await p.fill('#rgE', 'me.hs03@example.com'); await p.click('#rgS'); await W(500);
  ok(await p.isVisible('#rgK'), 'đăng ký email: gửi mã ⇒ hiện ô nhập mã');
  await p.fill('#rgK', '111111'); await p.click('#rgV'); await W(400); ok(/chưa đúng/.test(await p.textContent('#rgM')), 'mã sai ⇒ báo lỗi');
  await p.fill('#rgK', '123456'); await p.click('#rgV'); await W(500);
  ok(/duyệt/.test(await p.textContent('#rgM')) && p.M.phReg.some(x => x.email === 'me.hs03@example.com' && x.ma === 'HS03'), 'mã đúng ⇒ vào danh sách chờ cô Thảo duyệt');
  await p.screenshot({ path: path.join(OUT, 'ph-dangky.png'), fullPage: true });
  await p.context().close();

  // 17. v3.8 — phụ huynh đăng ký ⇒ báo cô Thảo; duyệt ⇒ gửi kèm PDF hướng dẫn
  p = await P({ as: 'gvcn' }); await p.goto(U); await p.waitForSelector('#app.on'); await W(1500);
  await p.evaluate(() => { const c = document.querySelector('#updOk'); c && c.click(); }); await W(300);
  p.M.phNew('HS07', 'me.hs07@example.com'); await p.waitForSelector('#phNew', { timeout: 20000 }).catch(() => {});
  ok(await p.isVisible('#phNew') && /HS07|đăng ký/.test(await p.textContent('#phNew')), 'phụ huynh đăng ký ⇒ màn hình cô hiện thẻ "Phụ huynh vừa đăng ký" (không cần tải lại)');
  ok(/1/.test(await p.textContent('#railNav [data-v="cai"] .navbdg').catch(() => '')), 'chấm đỏ số đăng ký chờ duyệt ở menu Cài đặt');
  await p.screenshot({ path: path.join(OUT, 'ph-new.png') });
  await p.click('#phGo'); await W(900);
  ok(await p.evaluate(() => S.view === 'ph') && await p.isVisible('#vPH [data-ok]'), '"Duyệt ngay" ⇒ mở trang Phụ huynh ▸ đăng ký chờ duyệt');
  const rid = await p.evaluate(() => S.phReg[0].id);
  await p.click(`#vPH [data-ok="${rid}"]`); await W(2500);
  const dc = p.M.CALLS.filter(c => c.a === 'phDuyet');
  ok(dc.length === 2 && !dc[0].p.pdf && dc[1].p.pdf && p.M.pdfLen > 100000, 'duyệt: máy chủ chưa có hướng dẫn ⇒ app tự gửi kèm PDF hướng dẫn phụ huynh');
  ok(!(await p.isVisible('#railNav [data-v="cai"] .navbdg')) && /hướng dẫn/.test(await p.textContent('#toast').catch(() => '')), 'duyệt xong: hết chấm đỏ, báo đã gửi email kèm hướng dẫn');
  p.M.phNew('HS08', 'me.hs08@example.com'); await W(7000); await p.evaluate(() => { const r = S.phReg[0]; if (r) document.querySelector(`#vPH [data-ok="${r.id}"]`).click(); }); await W(2000);
  ok(p.M.CALLS.filter(c => c.a === 'phDuyet').length === 3, 'lần duyệt sau: máy chủ đã có PDF ⇒ không gửi lại file');
  await p.context().close();
  p = await P({ as: 'gvcn', phReg: [{ id: 'R1', ma: 'HS02', ten: 'Trần Gia Chi', email: 'x@example.com', at: '2026-10-09 09:00' }] }); await p.goto(U + '#duyet'); await p.waitForSelector('#app.on'); await W(2500);
  ok(await p.evaluate(() => S.view === 'ph') && await p.isVisible('#vPH [data-ok="R1"]'), 'link "Mở sổ để duyệt" trong email ⇒ vào thẳng mục duyệt');
  await p.context().close();

  // 18. v3.9 — menu tài khoản, tìm kiếm thông minh, chú thích, dải điểm tuần, Cài đặt chia tab
  p = await P({ as: 'gvcn' }); p.on('dialog', d => d.accept()); await p.goto(U); await p.waitForSelector('#app.on'); await W(1800);
  await p.evaluate(() => { const c = document.querySelector('#updOk'); c && c.click(); }); await W(300);
  ok(await p.locator('#tk39 .it').count() >= 1 && /lượt/.test(await p.textContent('#tk39 .ct')), 'màn chính: dải "Điểm tuần" hiện các lượt cộng / trừ của tuần');
  const k0 = await p.evaluate(() => document.querySelector('#tk39 .it').dataset.id); await p.mouse.move(2, 2); await W(6800);
  ok(await p.evaluate(() => document.querySelector('#tk39 .it').dataset.id) !== k0, 'dải điểm tuần tự lật sang lượt khác (6 giây / lần)');
  await p.locator('#tk39 .it').first().click(); await W(300);
  ok(/Sửa \/ xoá/.test(await p.textContent('#tkm39')) && /Nhận xét/.test(await p.textContent('#tkm39')), 'bấm 1 lượt ⇒ menu Xem hồ sơ / Sửa / Nhận xét (theo quyền GVCN)');
  await p.click('#tkm39 [data-k="pf"]'); await W(700); await p.evaluate(() => closePanel()); await W(200);
  await p.click('#hAva'); await W(250);
  ok(await p.isVisible('#ava39 [data-a="out"]') && await p.isVisible('#ava39 [data-a="ph"]'), 'avatar góc phải: menu tài khoản có Phụ huynh + Đăng xuất');
  await p.click('#ava39 [data-a="cai"]'); await W(600);
  ok(await p.isVisible('.cai39 .ctabs') && !/Tài khoản của tôi/.test(await p.textContent('#vCai')), 'Cài đặt chia tab; phần tài khoản chuyển lên menu avatar');
  await p.evaluate(() => go('bang')); await W(700); await p.fill('.sq39 input', 'tổ 2 vi phạm'); await W(300);
  const vis = await p.evaluate(() => [...document.querySelectorAll('#vBang .hkcard[data-ma]')].filter(x => !x.classList.contains('hid39')).map(x => { const s = stu(x.dataset.ma); return String(s.to) === '2' && hkEntriesOf(s.ma).some(e => e[E_DIEM] < 0); }));
  ok(vis.length > 0 && vis.every(Boolean), 'tìm kiếm thông minh: "tổ 2 vi phạm" chỉ còn học sinh tổ 2 có lỗi (' + vis.length + ')');
  await p.fill('.sq39 input', ''); await W(200);
  await p.locator('#vBang .hkcard .mini > div').nth(2).hover(); await W(500);
  ok(await p.evaluate(() => document.getElementById('tip39').classList.contains('on')) && /Bị trừ|Được cộng|Không có ghi nhận/.test(await p.textContent('#tip39')), 'rê chuột vào ô điểm ⇒ hiện cộng / trừ từ đâu');
  await p.evaluate(() => go('bc')); await W(900); await p.fill('#vBC .sq39 input', 'khá'); await W(300);
  ok(/\d+\/\d+ học sinh/.test(await p.textContent('#vBC .sq39 .ct')), 'Báo cáo cũng có tìm kiếm thông minh');
  await p.context().close();

  // 9. trang phụ huynh
  p = await P({}); await p.goto(PH); await W(1200);
  ok(await p.locator('#lst .st').count() >= 30, 'trang phụ huynh: danh sách học sinh');
  await p.context().close();

  ok(errs.length === 0, 'không lỗi JavaScript' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
  await b.close(); console.log(fail ? '\n' + fail + ' lỗi' : '\nTất cả đạt'); process.exit(fail ? 1 : 0);
})();
