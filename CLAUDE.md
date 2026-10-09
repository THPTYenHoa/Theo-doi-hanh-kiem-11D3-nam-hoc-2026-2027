# Sổ hạnh kiểm 11D3 — quy tắc làm việc cho Claude

App 1 file `index.html` (GitHub Pages từ `main`) + trang phụ huynh `phu-huynh.html`, dữ liệu ở Google Sheet qua Apps Script.
Người dùng là giáo viên chủ nhiệm (không rành kỹ thuật) — **trả lời và viết nội dung bằng tiếng Việt**. Quy trình giống
MMH Report Hub / CRM (skill `gh-webapp-upgrader`). App dùng để dự thi "Nhà giáo sáng tạo với công nghệ số và AI 2026" (nộp trước 25/10/2026).

## Quyền
- Khi người dùng bảo sửa / gộp: commit → PR → **squash merge `main`**, không cần hỏi lại.

## Mỗi thay đổi người dùng nhìn thấy (cùng PR)
1. Tăng `HK_VER` (khối `<script id="v3-js">`) và tham số `updates/notes.js?v=` ở **cả** `index.html` và `phu-huynh.html`.
2. Thêm mục lên ĐẦU `window.HK_UPDATES` (`updates/notes.js`): `id` `YYYY-MM-DD-vX.Y`, `version`, `date`, `title`, `summary`,
   `items:[{type:"new"|"imp"|"fix", title, text, img}]` — kiểu *bấm vào đâu → làm gì → kết quả*. App tự hiện 7 ngày.
3. Ảnh thật, **dữ liệu giả** (không tên / điểm học sinh thật — repo công khai) ở `updates/vX.Y/*.jpg`: `tools/test/cap.js`.
4. Kiểm thử: `python3 -m http.server 8768` ở thư mục repo → `NODE_PATH=$(npm root -g) node tools/test/run.js`
   (backend giả lập `tools/test/mock.js`; `script.google.com` bị chặn trong môi trường Claude). `node --check` mọi khối `<script>`.

## Backend
- Code `.gs` ở kho riêng tư **`THPTYenHoa/yenhoa-backend`** (`backends/hanh-kiem-11d3/`): sửa → PR → gộp ⇒ GitHub Actions tự deploy,
  URL `/exec` không đổi. **Không** gửi file `.gs` cho người dùng dán. Gộp backend trước, đợi Deploy xanh, rồi mới gộp app.
- Lệnh: `bootstrap` (kèm `theme`), `entries`, `addEntries` (`rid` chống trùng), `updateEntry`, `deleteEntry` (không còn ⇒ ok),
  `saveConfig/Notify/QuyDinh/Catalog/Students/Accounts/Remark`, `saveTheme` (GVCN), `otpStart` / `otpVerify` (đăng nhập),
  `loginKhach` (phụ huynh, chỉ `bootstrap` + `entries`). `login` / `changePin` / `resetPin` đã tắt (v3).
- Vai trò lấy từ sheet `TaiKhoan` (email · tên · vai trò · tổ · (mật khẩu cũ) · hoạt động): GVCN / Quản trị toàn quyền,
  Lớp trưởng ghi cả lớp + cấu hình, Tổ trưởng chỉ ghi tổ mình.

## Ghi chú kỹ thuật (v3.0)
- Vá lớp bằng khối `<style id="v3-css">` + `<script id="v3-js">` cuối `index.html` (`window.fn = …`). Khởi động chạy ở
  `DOMContentLoaded` để các bản vá kịp thay hàm.
- **Đăng nhập** (`lgEmail` / `lgCode`): email → mã 6 số. Mock: email `gvcn@ / loptruong@ / totruong2@example.com`, mã đúng `123456`.
- **Ghi không chờ `HQ`** (`localStorage.hk_outbox_v1`): `ghiThucTe` / `delEntry` cập nhật màn hình ngay (số tạm `tmp-…`), chạy nền
  bằng `rawApi`, lỗi mạng thử lại 2–60 s cùng `rid`, lỗi thật ⇒ trả lại + chip đỏ `#hkq`. `hqOverlay()` áp lại thao tác khi dữ liệu
  từ máy chủ về. Mock: `drop:{addEntries:1}`, `failWrite`, `lag`.
- **Dữ liệu cả năm** lưu `localStorage.hk_cache_v4`; tự tải nền cả năm (`preloadYear`); đồng bộ 60 s chỉ tháng đang xem, cả năm 10 phút/lần.
- **Tra cứu** `findOpen` (nút kính lúp, phím `/`, Ctrl+K) → **hồ sơ** `openProfile(ma)` (tháng / HK / cả năm, In, Tải Excel).
  Chạm học sinh ở tab Hạnh kiểm / Thống kê cũng mở hồ sơ.
- **Chủ đề** `THEME` (18 chủ đề, `THEMES[].c` = 8 màu thay biến `--teal…--bg`): ảnh nền `themes/<id>/d.webp` (máy tính) và `m.webp`
  (điện thoại), thiếu ảnh ⇒ hoạ tiết CSS. Người dùng chọn (`localStorage.hk_theme`), GVCN đặt mặc định lớp (`saveTheme`).
  Prompt tạo ảnh: `docs/prompt-hinh-nen.md`. Màu xếp loại (Tốt/Khá/TB/Yếu) giữ cố định.
- **Phụ huynh** `phu-huynh.html`: `loginKhach` → xem cả lớp, hồ sơ từng em, tải PDF (in) / Excel (CSV), dùng chủ đề của lớp.

## v3.1
- **Bằng chứng**: khối `v31-js` — bước diễn giải (`hoiGhiChu`) có Chụp ảnh / Chọn ảnh, tài liệu; ảnh thu nhỏ ≤1600px JPEG; hàng đợi op `ev` / `evdel`
  chạy sau lệnh ghi; cột 13 bản ghi = `fileId|tên|loại;…` (phụ huynh nhận `'1'`); 📎 `evOpen(id)`. Backend `addEvidence` / `getEvidence` / `delEvidence`
  (file ở thư mục Drive riêng tư, cần quyền Drive: chạy `capQuyenBangChung` một lần trong trình soạn). Admin cố định: `ADMIN_EMAILS` (backend).
- **Hướng dẫn từng bước** `tour.js` (`TOUR.run`): GVCN 11 bước, cán bộ lớp 9 bước (`TOURS` trong `v31-js`), phụ huynh 9 bước (`phu-huynh.html`);
  tự chạy lần đầu (`hk_tour_gvcn` / `hk_tour_cb` / `hkph_tour`), mở lại ở nút ?. Mock mặc định đánh dấu đã xem; `{tour:true}` để thử.
- **Nhân vật cô Thảo** `mascot.js` (`MASCOT.say/img`): kính cận gọng đen, mặt tròn phúc hậu; 10 vai `STYLES` (`chu-nhiem` mặc định, `giang-day` cho hướng dẫn,
  `ao-dai` tự bật 14–22/11, …) ghép theo chủ đề `BY_THEME`. **Xưng hô**: với phụ huynh cô xưng "cô", gọi "các bác", học sinh là "các con / con X";
  với cán bộ lớp gọi "em"; GVCN: "Chào cô Thảo!". Ảnh `mascot/<vai>/<biểu-cảm>.webp` (có thể là WebP động), thiếu ⇒ chibi SVG;
  hiệu ứng hành động CSS `.m-<biểu-cảm>`; phản ứng khi ghi điểm (`mReact`: vui / khen-lon / buon / nghiem lần 2 / gian lần 3+ hoặc ≥6 lỗi/tháng).
  Prompt: `docs/prompt-chibi.md` — viết cho người không rành: 3 bước, khung copy-dán sẵn; người dùng gửi `goc.png` + `1.png`…`16.png`
  theo thứ tự chao, huong-dan, chi-tay, vui, khen-lon, co-vu, buon, lo-lang, nghiem, gian, suy-nghi, ngac-nhien, nghi-ngoi, an-mung, chup-anh, cam-on
  (bộ không ghi tên = `chu-nhiem`). Ảnh theo ảnh thật của cô — **không** đưa ảnh thật vào repo). Video Veo nền xanh ⇒
  `ffmpeg -i x.mp4 -vf "chromakey=0x00FF00:0.18:0.08,scale=360:-1" -loop 0 -c:v libwebp_anim -q:v 70 x.webp`.
- **PDF hướng dẫn**: `tools/guide/cap.js` (ảnh, dữ liệu giả) → `tools/guide/build.js` → `docs/HDSD_GVCN.pdf`, `HDSD_Can_bo_lop.pdf`, `HDSD_Phu_huynh.pdf`.
  + **`docs/HDSD_Day_du.pdf`** (bìa, mục lục, 3 phần có trang phân cách — ghép tự động từ 3 bộ trang trong `build.js`). Mock GVCN tên "Nguyễn Thu Thảo"
  (ảnh hiện "Chào cô Thảo!"); vai Quản trị không gọi "cô".

## v3.2 — trực tiếp & nhanh
- **Đồng bộ trực tiếp `LIVE`** (khối `v32-js`): backend `sync` {rev, thangs} (file `DongBo.gs`): mọi lần ghi gọi `cacheClear` ⇒ đổi `rev`;
  `rev` không đổi ⇒ trả `same` ngay (không đọc Sheet). App hỏi 4 giây/lần khi đang mở (15 giây nếu không thao tác 2 phút, dừng khi ẩn tab,
  chờ khi hàng đợi ghi đang chạy); có thay đổi ⇒ thay dữ liệu tháng đang xem, `hqOverlay`, mục mới của người khác hiện hiệu ứng + `#v32pop`.
  Backend cũ ("Không nhận ra yêu cầu") ⇒ `LIVE.off`, quay về làm mới 60 s. Trang phụ huynh: `sync` 15 giây/lần.
- Backend: `ss()` / `sheet()` mở 1 lần mỗi lượt gọi; đệm `hk_e_<k?><rev>_<tháng>` (khoá gắn rev, phụ huynh đệm riêng — không lộ mã file bằng chứng);
  `cacheClear()` (ghi điểm) chỉ đổi rev, `cacheClear(true)` (cấu hình, danh mục, HS, tài khoản) xoá thêm `hk_static` / `hk_acc` / `hk_boot2`.
- **Hiệu ứng**: `FRESH` (id → lúc thêm) ⇒ lớp `.fresh` + `animation-delay` âm (vẽ lại không giật); xoá ⇒ `.out` 220 ms rồi mới xoá;
  điểm tuần đổi ⇒ `.row.bump`. Phần tử ghi nhận có `data-eid`.
- **Thẻ tổng quan** `#v32h` (`v32Hero`): ô bấm để lọc (`S.v32f` bọc `visibleStudents`), dải "Vừa cập nhật", nhãn `#v32live`. Avatar `.av32.t<tổ>`.
- Mock: `p.M.ext(ma, nộiDung, điểm)` / `p.M.extDel(id)` giả lập người khác ghi / xoá; `{oldBackend:true}` = backend chưa có `sync`.

## v3.3 — Báo cáo
- Menu **Báo cáo** (`#vBC`, khối `v33-js`, `NAV` thêm `bc`, ẩn với phụ huynh): kỳ `S.bcKy` tuần / tháng / hk / nam theo tháng-tuần đang chọn
  (`bcPeriod`, kỳ trước `prev`), số liệu `bcStats` (xếp loại dùng `xlOf` ⇒ tôn trọng xếp loại GVCN đã chốt), so kỳ trước `dl()`.
- Lời văn `bcAuto` (nhận xét chung + phương hướng theo nhóm lỗi `GOI_Y`), GVCN sửa được, lưu `localStorage.hk_bc_<kỳ>`; đang gõ thì không vẽ lại.
- Xuất: `bcPrint` (mẫu văn bản: quốc hiệu, mục I–VII, chữ ký, phụ lục) · `bcExcel` (CSV) · `bcCopy` (tóm tắt Zalo — KHÔNG nêu tên học sinh vi phạm).

## v3.4 — Quản lý lớp & phân quyền
- **Chỉ GVCN / Quản trị** (`isGVCN()`, backend kiểm lại): `saveAccounts` (cấp quyền email khác, khoá / xoá), `saveStudents` (thêm, đổi tổ, xoá HS).
  Lớp trưởng: ghi cả lớp + danh mục + cấu hình; Tổ trưởng: ghi tổ mình. Bảng `QUYEN` (`v34-js`) hiện trong Cài đặt (`#qTbl`; cán bộ lớp thấy "Quyền của bạn").
- Backend `apiSaveAccounts` gọi `cacheClear(true)` (trước đó thiếu ⇒ đệm `hk_acc` 30 phút). Không tự xoá tài khoản của mình; xoá HS có lựa chọn
  "Đánh dấu nghỉ học / chuyển lớp" (giữ lịch sử). Mock `saveStudents` / `saveAccounts` chặn khi không phải GVCN.
- HDSD: bìa và trang phân cách **không** có chibi; **không nhắc vai Quản trị / admin, tên hay email người quản trị** (người dùng yêu cầu). Trên app, dòng "Quản trị" (bảng quyền, chọn vai trò) chỉ hiện với chính tài khoản Quản trị.

## v3.5 — Màn chờ + chibi 3D
- `MASCOT.loader(host,{msgs,every})` (mascot.js): thanh tiến trình + cô Thảo chạy (`img('chay')`, CSS `.mld-*`; ảnh `mascot/<vai>/chay.webp` động nếu có).
  App: khối `v35-js` vẽ vào `#loader` lúc mở sổ và lúc `lgVerify`; lời nhắn theo vai (`LD_MSG`, vai lấy từ `hk_cache_v4.me` / `hk_last_role`):
  cán bộ lớp "Mạng lag xíu, các con chờ chút nha…", GVCN "Cô Thảo chờ chút xíu nhé…". Trang phụ huynh: `#ld` "Các bác chờ chút ạ…".
- Prompt chibi **3D**: `docs/prompt-chibi-3d.md` — mỗi khung lặp đủ REFERENCE + CHARACTER + OUTFIT + STYLE (người dùng yêu cầu lặp lại);
  file `goc.png`, `1.png`…`17.png` (17 = `chay`), video `chay.mp4` (màn chờ), `chao/vui/khen-lon/buon/gian/cam-on.mp4`, nền xanh ⇒ ffmpeg chromakey.

## v3.6 — Bộ ảnh 3D cô Thảo
- `mascot/chu-nhiem/*.webp` (360×360, nền trong suốt, ~8–12 KB): 16 biểu cảm + `goc` + `chay` (đã lật để chạy sang phải). Tách nền từ ảnh Gemini nền trắng:
  flood-fill vùng trắng/xám trung tính nối với mép ảnh (PIL, nhớ `.copy()` ảnh từ numpy), bóng chân giữ mờ, cắt theo nhân vật + 6% lề.
- mascot.js: `READY` = các vai đã có bộ 3D (hiện chỉ `chu-nhiem`); vai khác dùng bộ 3D này (không trộn 2D/3D); ảnh lỗi ⇒ SVG dự phòng; tải sẵn sau 300 ms.
  `MASCOT.STYLES` chỉ trả vai `READY` (bảng chọn nhân vật). Muốn thêm vai (áo dài…): thêm thư mục + khoá vào `READY`.
- HDSD: `build.js` lấy ảnh 3D (`chibi()`) cho phần mẹo **và góc dưới trái mọi trang nội dung** (`.mc`, biểu cảm theo chủ đề trang `POSE`, `pose:` để chọn riêng, `noMc` để tắt; tự bỏ nếu chạm chữ). Bìa và trang phân cách không có. Ảnh động (video Veo) người dùng gửi sau ⇒ thay `<emo>.webp` bằng WebP động cùng tên.

## v3.7 — Chốt tháng, báo cáo ngang, email phụ huynh
- **Chốt tháng** (khối `v37-js`): backend `lockMonth` (GVCN), trạng thái `khoa` {tháng:{by,at}} trong bootstrap / `sync`; `kiemKhoa_` (backend `KhoaThang.gs`) chặn
  `addEntries` / `saveRemark` / `updateEntry` / `deleteEntry` / `addEvidence` / `delEvidence` của tháng đã chốt. App: `g37()` chặn trước, dải `.lkb`, `body.hk-lk`. GVCN mở khoá được.
- **PDF khổ ngang** `baocao.js` (`window.RPT`): `student(D,ma,ky,{aud:'ph'|'gv'})`, `notice(D,ma,ids)`, `open(html,title,{dry})` (iframe ẩn ▸ in; iOS mở cửa sổ mới);
  biểu đồ SVG `line` / `bars2` / `donut` / `hb`, cô Thảo `mc(emo)` — ít ảnh, biểu cảm theo kết quả. `bcPrint` (báo cáo lớp) **không có quốc hiệu**.
  Test: `RPT.open` với `{dry:true}` ⇒ `RPT.last`; `run.js` mục 16 dựng PDF ra `tools/test/out/` và kiểm không trang nào tràn.
- **Email phụ huynh**: gửi tới cột Email (F) của học sinh sau mỗi `addEntries` (`guiPhuHuynh_`, ảnh `mascot/chu-nhiem/png/*.png`, link `phu-huynh.html#hs=MA&tb=ids` ⇒
  thẻ "Thông báo mới" + PDF thông báo). Phụ huynh **tự đăng ký** (`phDangKy` mã 6 số ▸ `phXacNhan` ▸ GVCN `phDuyet` trong Cài đặt), hủy nhận bằng link ký HMAC.
  Cài đặt `savePhMail` {on, cong}. Mock: `{khoa:{10:{…}}, phReg:[…]}`, mã đúng `123456`.

## v3.8 — Báo cô khi phụ huynh đăng ký
- Backend `phXacNhan` ⇒ email báo các tài khoản vai trò **GVCN** (không báo quản trị), link `APP_URL#duyet`; `sync` trả `phReg` cho GVCN.
- App (`v38-js`): `phCheck` ⇒ thẻ `#phNew` (Duyệt ngay / Để sau) + chấm đỏ `.navbdg` ở Cài đặt; đã thấy lưu `hk_phreg_seen`; `#duyet` ⇒ `phOpen()`.
- Duyệt: `phDuyet` gửi `pdfVer` (`PH_PDF_VER`, **tăng khi dựng lại `docs/HDSD_Phu_huynh.pdf`**); máy chủ chưa có bản đúng ⇒ lỗi "Cần gửi kèm file hướng dẫn"
  ⇒ app gửi `pdf` (base64), máy chủ lưu vào thư mục Drive bằng chứng (`hk_ph_pdf`) và đính kèm thư duyệt. Không dùng UrlFetchApp (tránh xin quyền mới).
  Mock: `M.phNew(ma,email)` giả lập phụ huynh đăng ký.
- **Bộ trang phục khác của cô Thảo**: prompt `docs/prompt-chibi-3d.md` ▸ Bước 5 (9 bộ × ảnh gốc + 8 biểu cảm: `1..8.png` = chao, vui, khen-lon, co-vu, buon, nghiem,
  chi-tay, cam-on). Nhận ảnh ⇒ tách nền như v3.6 vào `mascot/<vai>/` + khai báo `READY['<vai>']=[…]` (mascot.js; thiếu biểu cảm ⇒ dùng `chu-nhiem`).
