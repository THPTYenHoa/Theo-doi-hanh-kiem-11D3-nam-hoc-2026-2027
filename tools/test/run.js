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
  await p.evaluate(() => { window.print = () => { window.__pr = 1; }; }); await p.click('#bcPrint'); await W(200);
  const pr = await p.evaluate(() => document.querySelector('#printArea').textContent);
  ok(/CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM/.test(pr) && /Phương hướng cô tự viết/.test(pr) && /GIÁO VIÊN CHỦ NHIỆM/.test(pr), 'bản in: quốc hiệu, nội dung đã sửa, chữ ký GVCN');
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

  // 9. trang phụ huynh
  p = await P({}); await p.goto(PH); await W(1200);
  ok(await p.locator('#lst .st').count() >= 30, 'trang phụ huynh: danh sách học sinh');
  await p.context().close();

  ok(errs.length === 0, 'không lỗi JavaScript' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
  await b.close(); console.log(fail ? '\n' + fail + ' lỗi' : '\nTất cả đạt'); process.exit(fail ? 1 : 0);
})();
