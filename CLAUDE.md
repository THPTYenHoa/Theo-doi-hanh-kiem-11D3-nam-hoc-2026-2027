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
