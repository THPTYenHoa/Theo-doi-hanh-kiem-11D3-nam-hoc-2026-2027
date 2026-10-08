/* Thông báo cập nhật — Sổ hạnh kiểm 11D3. Mục mới thêm lên ĐẦU mảng (xem CLAUDE.md). */
window.HK_UPDATES = [
  {
    id: "2026-10-09-v3.2", version: "3.2", date: "2026-10-09",
    title: "Sổ cập nhật trực tiếp, mở nhanh hơn, giao diện sinh động",
    summary: "Ai ghi điểm, các máy khác thấy ngay sau vài giây — không cần tải lại. Thêm / xoá mượt mà, có thẻ tổng quan tuần và avatar từng bạn.",
    items: [
      { type: "new", title: "Cập nhật trực tiếp",
        text: "Khi lớp trưởng hoặc tổ trưởng ghi / xoá điểm, máy của cô <b>tự hiện thay đổi sau vài giây</b>, kèm thông báo nhỏ \"Lớp trưởng vừa ghi…\" ở trên cùng. Nhãn <b>● Trực tiếp</b> màu xanh nghĩa là sổ đang đồng bộ. Trang phụ huynh cũng tự cập nhật.",
        img: "updates/v3.2/truc-tiep.jpg" },
      { type: "new", title: "Thẻ tổng quan tuần",
        text: "Đầu trang Ghi điểm có cô Thảo chào, 4 ô: <b>Lượt trừ · Lượt khen · Cần nhắc nhở · Đạt Tốt</b>. Bấm vào một ô để <b>lọc nhanh</b> các bạn tương ứng; dải \"Vừa cập nhật\" cho biết ai vừa ghi gì.",
        img: "updates/v3.2/tong-quan.jpg" },
      { type: "imp", title: "Thêm / xoá mượt, mở sổ nhanh hơn",
        text: "Mục vừa ghi trượt vào, mục xoá thu gọn lại, điểm thay đổi sẽ nảy lên để dễ nhận ra. Máy chủ đọc Google Sheet ít hơn nên đăng nhập và lưu nhanh hơn; mở lại sổ hiện ngay từ dữ liệu đã lưu trên máy." }
    ]
  },
  {
    id: "2026-10-09-v3.1", version: "3.1", date: "2026-10-09",
    title: "Ảnh bằng chứng, hướng dẫn từng bước và cô Thảo chibi",
    summary: "Đính kèm ảnh chụp / tài liệu cho mỗi lần khen hoặc trừ điểm, hướng dẫn tận tay theo từng vai trò, giao diện sạch hơn và cô Thảo chibi đồng hành.",
    items: [
      { type: "new", title: "Ảnh / tài liệu bằng chứng",
        text: "Khi ghi điểm, ở bước diễn giải bấm <b>Chụp ảnh</b> hoặc <b>Chọn ảnh / tài liệu</b> (biên bản, giấy khen, PDF…). Sau này bấm biểu tượng 📎 cạnh ghi nhận để xem lại hoặc thêm. File lưu trong thư mục Drive riêng của lớp — chỉ GVCN và cán bộ lớp xem được.",
        img: "updates/v3.1/bang-chung.jpg" },
      { type: "new", title: "Hướng dẫn từng bước theo vai trò",
        text: "Lần đầu đăng nhập, cô Thảo chibi chỉ tận tay từng nút: GVCN 11 bước, cán bộ lớp 9 bước, phụ huynh 9 bước. Xem lại bất cứ lúc nào ở nút <b>?</b> ▸ <b>Hướng dẫn từng bước</b>, kèm file PDF hướng dẫn cho từng vai trò.",
        img: "updates/v3.1/huong-dan.jpg" },
      { type: "new", title: "Cô Thảo chibi đồng hành",
        text: "Cô vui khi học sinh được khen, buồn khi trừ điểm, nghiêm khi tái phạm lần 2 và \"giận\" khi vi phạm nhiều lần. Cô có 10 vai (chủ nhiệm, lên lớp, áo dài, Tết, STEM, Trung thu…) tự đổi theo chủ đề; trang phụ huynh cô chào \"các bác\", gọi \"các con\". Đổi vai hoặc tắt ở <b>Giao diện ▸ Nhân vật cô giáo</b>.",
        img: "updates/v3.1/co-giao.jpg" },
      { type: "imp", title: "Giao diện sạch, gọn hơn",
        text: "Thanh trên cùng và các khung chi tiết chuyển sang nền trắng, chữ rõ; trên điện thoại bỏ bớt nút để màn hình thoáng hơn." }
    ]
  },
  {
    id: "2026-10-09-v3.0", version: "3.0", date: "2026-10-09",
    title: "Sổ hạnh kiểm phiên bản mới",
    summary: "Đăng nhập bằng email, ghi điểm không phải chờ, tra cứu học sinh trong 1 giây, đổi màu và hình nền theo ý thích, trang riêng cho phụ huynh.",
    items: [
      { type: "new", title: "Đăng nhập bằng email + mã 6 số",
        text: "Nhập email đã đăng ký với GVCN → nhận mã 6 số qua email → nhập mã là vào sổ. Không còn mật khẩu chung, không ai vào được dưới tên người khác. Máy được ghi nhớ 30 ngày.",
        img: "updates/v3.0/dang-nhap.jpg" },
      { type: "imp", title: "Ghi điểm không phải chờ",
        text: "Chạm lý do là điểm hiện ngay. Chip nhỏ dưới màn hình báo <b>Đang lưu… → Đã lưu vào sổ</b>. Mạng yếu thì app tự gửi lại, không bao giờ ghi trùng.",
        img: "updates/v3.0/ghi-diem.jpg" },
      { type: "new", title: "Tra cứu nhanh & hồ sơ học sinh",
        text: "Bấm kính lúp (hoặc phím <b>/</b>) → gõ tên, không cần dấu → mở hồ sơ cả năm: điểm từng tuần, từng tháng, học kỳ, vi phạm, nhận xét GVCN. Có nút In / PDF và Tải Excel.",
        img: "updates/v3.0/tra-cuu.jpg" },
      { type: "new", title: "Đổi giao diện: 18 chủ đề",
        text: "Bấm biểu tượng bảng màu trên đầu trang → chọn chủ đề (Mận chín, Chàm màu nước, Vở ô ly, Hoa phượng, Hồ Gươm…). GVCN đặt được chủ đề mặc định cho cả lớp.",
        img: "updates/v3.0/giao-dien.jpg" },
      { type: "new", title: "Trang riêng cho phụ huynh",
        text: "Màn đăng nhập → <b>Phụ huynh xem sổ</b>. Tìm tên con, xem xếp loại theo tháng / học kỳ / cả năm, từng lỗi và lần được cộng, tải PDF hoặc Excel. Chỉ xem, không sửa được.",
        img: "updates/v3.0/phu-huynh.jpg" },
      { type: "imp", title: "Mở sổ nhanh hơn, gọn hơn trên điện thoại",
        text: "Sổ lưu dữ liệu cả năm trên máy nên mở là thấy ngay, Thống kê và Lịch sử không còn phải chờ tải. Trên điện thoại mỗi màn hình hiện nhiều học sinh hơn." }
    ]
  }
];
