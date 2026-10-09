/* Chụp ảnh cho "Hướng dẫn trải nghiệm" (chế độ Kiểm tra tính năng ứng dụng, dữ liệu mẫu):
   NODE_PATH=$(npm root -g) node tools/guide/cap_demo.js  (cần python3 -m http.server 8768) → tools/guide/shots/dm_*.png
   Chế độ trải nghiệm tự trả lời mọi lệnh máy chủ ngay trên trình duyệt (demo.js) — không cần backend giả lập. */
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const U = 'http://127.0.0.1:8768/', W = ms => new Promise(r => setTimeout(r, ms));
const OUT = path.join(__dirname, 'shots'); fs.mkdirSync(OUT, { recursive: true });
async function mark(p, list) {
  await p.evaluate(list => {
    document.querySelectorAll('.gmk').forEach(x => x.remove());
    list.forEach(([sel, n, corner]) => {
      const all = [...document.querySelectorAll(sel)].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.height; });
      const e = all[0]; if (!e) return; const r = e.getBoundingClientRect();
      const f = document.createElement('div'); f.className = 'gmk';
      f.style.cssText = `position:fixed;z-index:99998;left:${r.left - 3}px;top:${r.top - 3}px;width:${r.width + 6}px;height:${r.height + 6}px;border:2.5px solid #E07B39;border-radius:10px;pointer-events:none`;
      const d = document.createElement('div'); d.className = 'gmk'; d.textContent = n;
      const x = corner === 'tr' ? r.right - 12 : r.left - 12, y = r.top - 12;
      d.style.cssText = `position:fixed;z-index:99999;left:${Math.max(2, Math.min(innerWidth - 28, x))}px;top:${Math.max(2, y)}px;width:26px;height:26px;border-radius:50%;background:#E07B39;color:#fff;font:800 14px Aptos,Inter,sans-serif;display:grid;place-items:center;box-shadow:0 0 0 2.5px #fff`;
      document.body.append(f, d);
    });
  }, list);
}
const shot = async (p, name, marks) => { if (marks) await mark(p, marks); await W(200); await p.screenshot({ path: path.join(OUT, name + '.png') }); await p.evaluate(() => document.querySelectorAll('.gmk').forEach(x => x.remove())); console.log('📸', name); };
const rptPng = async (b, doc, name) => { const f = path.join(OUT, '_' + name + '.html'); fs.writeFileSync(f, doc.replace(/<base href="[^"]*">/, '<base href="' + U + '">'));
  const q = await b.newPage(); await q.goto('file://' + f); await q.waitForLoadState('networkidle'); await W(400); await q.pdf({ path: path.join(OUT, '_' + name + '.pdf'), width: '297mm', height: '210mm', printBackground: true }); await q.close();
  require('child_process').execSync(`pdftoppm -r 90 -png -f 1 -l 1 "${path.join(OUT, '_' + name + '.pdf')}" "${path.join(OUT, name)}" && mv "${path.join(OUT, name + '-1.png')}" "${path.join(OUT, name + '.png')}"`); console.log('📸', name); };
const quiet = p => p.evaluate(() => { const m = document.getElementById('msc'); if (m) m.style.display = 'none'; const t = document.getElementById('dm-toast'); if (t) t.remove(); });
const ready = async p => { await p.waitForSelector('#app.on', { timeout: 20000 }); await W(1800); };
(async () => {
  const b = await chromium.launch();
  const D = await b.newContext({ viewport: { width: 1440, height: 900 }, locale: 'vi-VN' });
  const M = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2, locale: 'vi-VN' });
  for (const c of [D, M]) await c.route(/script\.google\.com/, r => r.abort());
  let p = await D.newPage(); p.on('dialog', d => d.accept());
  await p.goto(U + 'index.html?demo=0'); await W(1200);
  await shot(p, 'dm_login', [['#dm-enter', 1]]);
  await p.click('#dm-enter'); await ready(p);
  await shot(p, 'dm_guide', [['.dm-ov .dm-st', 1], ['.dm-ov [data-k="ghi"]', 2, 'tr']]);
  await p.click('.dm-ov .x'); await W(300); await p.evaluate(() => { const n = document.getElementById('phNew'); if (n) n.remove(); }); await quiet(p);
  await shot(p, 'dm_bar', [['#dm-bar .roles', 1], ['#dm-bar [data-a="guide"]', 2], ['#dm-bar [data-a="mail"]', 3], ['#dm-bar [data-a="reset"]', 4, 'tr']]);
  /* vai lớp trưởng trên điện thoại */
  const pm = await M.newPage(); pm.on('dialog', d => d.accept());
  await pm.goto(U + 'index.html?demo=1'); await ready(pm); await pm.evaluate(() => { const o = document.querySelector('.dm-ov'); if (o) o.remove(); });
  await pm.evaluate(() => { localStorage.setItem('hk_token', 'tok.lt'); ['hk_cache_v3', 'hk_cache_v4'].forEach(k => localStorage.removeItem(k)); });
  await pm.goto(U + 'index.html?demo=1'); await ready(pm); await quiet(pm);
  await shot(pm, 'dm_ghi1', [['#dm-bar select', 1], ['#listGhi .row', 2]]);
  await pm.locator('#listGhi .row').first().click(); await W(500); await quiet(pm);
  await shot(pm, 'dm_ghi2', [['#pBody [data-add="T01"]', 1]]);
  await pm.click('#pBody [data-add="T01"]'); await W(400); await quiet(pm);
  await shot(pm, 'dm_ghi3', [['#gcSkip', 1]]);
  await pm.click('#gcSkip'); await W(2500);
  await shot(pm, 'dm_ghi4', [['#dm-toast', 1], ['#dm-bar [data-a="mail"]', 2, 'tr']]);
  await pm.close();
  /* hộp thư + trang phụ huynh (máy tính) */
  await p.goto(U + 'index.html?demo=1'); await ready(p); await quiet(p); await p.evaluate(() => { const n = document.getElementById('phNew'); if (n) n.remove(); });
  await p.evaluate(() => DEMO.api('addEntries', { thang: 10, tuan: 1, rid: 'cap1', items: [{ maHS: 'HS01', loai: 'Trừ', maMuc: 'T01', noiDung: 'Đi học muộn', diem: -2 }] }, 'tok.lt')); await W(900); await quiet(p);
  await p.click('#dm-bar [data-a="mail"]'); await W(600);
  await shot(p, 'dm_inbox', [['.dm-ib .ls .it', 1], ['.dm-ib a[data-demo-link]', 2]]);
  await p.click('.dm-ib a[data-demo-link]'); await W(2500); await quiet(p);
  await shot(p, 'dm_phtb', [['#dm-bar .roles', 1], ['.tbc', 2], ['#tbPdf', 3]]);
  await p.evaluate(() => { const o = RPT.open; RPT.open = (h, t) => o(h, t, { dry: true }); });
  await p.click('#tbPdf'); await rptPng(b, await p.evaluate(() => RPT.last), 'dm_tbpdf');
  /* phụ huynh đăng ký email (điện thoại) */
  const pp = await M.newPage(); await pp.goto(U + 'phu-huynh.html?demo=1#hs=HS06'); await W(2200); await quiet(pp);
  await pp.fill('#rgE', 'bo.cua.con@gmail.com'); await pp.click('#rgS'); await W(900); await quiet(pp);
  await shot(pp, 'dm_dk1', [['#rgE', 1], ['#rgK', 2], ['#rgV', 3, 'tr']]);
  await pp.fill('#rgK', '123456'); await pp.click('#rgV'); await W(1200); await quiet(pp);
  await shot(pp, 'dm_dk2', [['#rgM', 1]]);
  await pp.close();
  /* cô Thảo: thông báo phụ huynh đăng ký, duyệt, nhận xét, báo cáo, chốt tháng */
  await p.evaluate(() => { localStorage.setItem('hk_token', 'tok.gvcn'); ['hk_cache_v3', 'hk_cache_v4', 'hk_phreg_seen'].forEach(k => localStorage.removeItem(k)); });
  await p.goto(U + 'index.html?demo=1'); await ready(p); await W(1500); await quiet(p);
  await shot(p, 'dm_phnew', [['#phNew', 1], ['#phGo', 2]]);
  await p.click('#phGo'); await W(900); await quiet(p);
  await shot(p, 'dm_duyet', [['#vPH .pend', 1], ['#vPH .pend .ok', 2, 'tr']]);
  await p.locator('#vPH .pend .ok').last().click(); await W(2500); await quiet(p);
  await p.click('#dm-bar [data-a="mail"]'); await W(500);
  await shot(p, 'dm_mailduyet', [['.dm-ib .att', 1]]);
  await p.click('.dm-ov .x'); await W(300);
  await p.evaluate(() => go('bang')); await W(900); await quiet(p);
  await p.evaluate(() => { const c = document.querySelector('#vBang .hkcard[data-ma="HS05"]') || document.querySelector('#vBang .hkcard'); c.scrollIntoView({ block: 'center' }); }); await W(300);
  await p.locator('#vBang .hkcard .mini > div').nth(1).hover(); await W(700);
  await p.screenshot({ path: path.join(OUT, 'dm_tip.png') }); console.log('📸 dm_tip');
  await p.mouse.move(5, 5); await p.evaluate(() => openRemark(S.students[4].ma)); await W(600); await quiet(p);
  await p.fill('#rkNx', 'Em đã tiến bộ, đi học đúng giờ hơn. Cô mong em giữ vững nhé!'); await W(200);
  await shot(p, 'dm_nx', [['#rkXl', 1], ['#rkNx', 2], ['#rkSave', 3, 'tr']]);
  await p.click('#rkSave'); await W(800);
  await p.evaluate(() => go('bc')); await W(1200); await quiet(p);
  await p.fill('#vBC .sq39 input', 'tổ 2 vi phạm'); await W(400);
  await shot(p, 'dm_bc', [['#vBC .bcacts', 1], ['#vBC .sq39', 2], ['#vBC .bccmp', 3]]);
  await p.fill('#vBC .sq39 input', ''); await W(300);
  await p.evaluate(() => { const o = RPT.open; RPT.open = (h, t) => o(h, t, { dry: true }); bcPrint(bcPeriod()); }); await rptPng(b, await p.evaluate(() => RPT.last), 'dm_bcpdf');
  await p.evaluate(() => RPT.open(RPT.student({ cfg: S.cfg, students: S.students, entries: S.entries, remarks: S.remarks }, S.students[4].ma, { k: 'thang', m: S.thang }, {}), 'x', { dry: true }));
  await rptPng(b, await p.evaluate(() => RPT.last), 'dm_hspdf');
  await p.evaluate(() => go('bang')); await W(800); await quiet(p);
  await p.click('#vBang [data-lk="1"]'); await W(1200); await quiet(p);
  await shot(p, 'dm_chot', [['#vBang .lkb', 1], ['#vBang .lkb button', 2, 'tr']]);
  await p.click('#dm-bar [data-a="guide"]'); await W(500);
  await shot(p, 'dm_guide2', [['.dm-ov .dm-pg', 1]]);
  /* v4.5: chọn vai · hướng dẫn từng bước (zoom) · tải file */
  { const q = await D.newPage(); q.on('dialog', d => d.accept());
    await q.evaluate(() => 0).catch(() => {});
    await q.goto(U + 'index.html?demo=1'); await q.evaluate(() => { localStorage.setItem('hk_token', 'tok.gvcn'); ['hk_cache_v3', 'hk_cache_v4'].forEach(k => localStorage.removeItem(k)); });
    await q.goto(U + 'index.html?demo=1'); await ready(q);
    await q.evaluate(() => { document.querySelectorAll('#phNew,.dm-ov').forEach(e => e.remove()); DMG.open(); }); await W(700);
    await shot(q, 'dm_roles', [['.dmg-rc', 1], ['.dmg-rc li button', 2, 'tr'], ['.dmg-note', 3]]);
    await q.evaluate(() => document.querySelectorAll('.dm-ov').forEach(e => e.remove()));
    await q.evaluate(() => { const m = document.getElementById('msc'); if (m) m.style.display = 'none'; DMG.start('gv3', 0); }); await W(2200);
    await q.screenshot({ path: path.join(OUT, 'dm_tut_gv.png') }); console.log('📸 dm_tut_gv');
    await q.keyboard.press('Escape'); await W(300);
    await q.evaluate(() => go('bc')); await W(1000); await q.click('#bcPrint'); await q.waitForSelector('#dl-sh', { timeout: 60000 }); await W(500);
    await shot(q, 'dm_dlsheet', [['#dl-sh', 1], ['#dl-sh [data-a=open]', 2, 'tr']]);
    await q.close(); }
  { const q = await M.newPage(); q.on('dialog', d => d.accept());
    await q.goto(U + 'index.html?demo=1'); await q.evaluate(() => { localStorage.setItem('hk_token', 'tok.lt'); ['hk_cache_v3', 'hk_cache_v4'].forEach(k => localStorage.removeItem(k)); });
    await q.goto(U + 'index.html?demo=1'); await ready(q);
    await q.evaluate(() => { document.querySelectorAll('.dm-ov').forEach(e => e.remove()); const m = document.getElementById('msc'); if (m) m.style.display = 'none'; DMG.start('cb1', 0); }); await W(2200);
    await q.screenshot({ path: path.join(OUT, 'dm_tut_cb.png') }); console.log('📸 dm_tut_cb');
    await q.goto(U + 'phu-huynh.html?demo=1'); await W(2500);
    await q.evaluate(() => { document.querySelectorAll('.dm-ov,.tour,#tourOv').forEach(e => e.remove()); DMG.start('ph3', 0); }); await W(2600);
    await q.fill('#rgE', 'bo.me@vidu.vn'); await W(300);
    await q.screenshot({ path: path.join(OUT, 'dm_tut_ph.png') }); console.log('📸 dm_tut_ph');
    await q.close(); }
  await b.close();
})();
