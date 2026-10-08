# Prompt tạo bộ nhân vật chibi "Cô Thảo — chủ nhiệm 11D3" (Gemini)

Cô Thảo (chibi) xuất hiện xuyên suốt app:
- đọc hướng dẫn từng bước;
- vui khi các con được khen;
- buồn khi có lỗi;
- nghiêm khắc khi tái phạm;
- chụp ảnh bằng chứng;
- chào các bác phụ huynh…

Nét nhận diện **luôn giữ** ở mọi ảnh: **kính cận gọng đen**, **mặt tròn phúc hậu, má hồng, cười hiền — thật kute**, tóc dài nâu ánh đỏ, mái thưa.
Cô Thảo có **10 "vai" (bộ trang phục)** — mỗi vai là một bộ **16 biểu cảm**, đổi theo chủ đề giao diện / dịp lễ (xem bảng ghép ở dưới).

## Cách làm để nhân vật GIỐNG NHAU trong mọi ảnh (quan trọng)
1. **Bước 1 — Tạo "bảng nhân vật".** **Đính kèm ảnh thật của cô**, dán *Mô tả nhân vật* + prompt *Bảng nhân vật* của một vai, chọn ảnh ưng nhất. Đây là ảnh **gốc**. (Mở đầu prompt bằng: *"Turn the woman in the attached photo into a chibi character."*)
2. **Bước 2 — Tạo từng biểu cảm.** Mở cuộc trò chuyện mới, **đính kèm ảnh gốc**. Dán **Câu mở đầu chung** + **mô tả biểu cảm** (bảng ở dưới).
   - Gemini sẽ giữ đúng mặt, tóc, quần áo theo ảnh đính kèm.
   - Nên làm lần lượt trong **cùng một cuộc trò chuyện** đó, mỗi lần thay mô tả biểu cảm.
3. Nền ảnh: **trắng trơn** (Gemini chưa xuất nền trong suốt ổn định). Claude sẽ tự tách nền, cắt và nén lại.
4. Ảnh vuông **1024 × 1024**, nhân vật đứng giữa, thấy **nửa người trên** (đầu to, thân nhỏ — đúng tỉ lệ chibi). Chừa lề khoảng 8%.
5. Đặt tên file đúng **tên file** trong bảng (ví dụ `vui.png`). Gửi cả thư mục cho Claude và ghi rõ đó là vai nào (tên thư mục).

> Nhân vật luôn **hiền, đáng yêu, không đáng sợ**. Kể cả khi "tức giận", cô chỉ phồng má hoặc khoanh tay nghiêm khắc, kiểu tức giận dễ thương của chibi. Không có cử chỉ bạo lực, không có chữ trong ảnh.

---

## Mô tả nhân vật — cô Thảo (dùng chung cho mọi vai)
```
CHARACTER: "Ms. Thao", a chibi version of the young Vietnamese woman in the attached photo — a kind, cheerful high-school homeroom teacher.
MUST KEEP in every image: thick black rectangular-round NEARSIGHTED GLASSES (clearly visible, slightly large on her face);
a very ROUND, soft, chubby, kind face ("phuc hau") with full rosy cheeks, gentle crescent-shaped smiling eyes behind the glasses,
a warm sweet smile — extremely cute and lovable; long straight hair past the shoulders, dark brown with a warm auburn / reddish-brown
tint, soft see-through wispy bangs and face-framing strands. Chibi proportions: big round head (about half of the body), small body,
short limbs, small hands. Personality: warm, motherly, caring, a little strict but always kind.
Default outfit (role "homeroom"): black sleeveless V-neck knit vest with a thin cream-gold stripe along the V-neck, over an ivory
long-sleeve blouse; black cuff bands with gold stripes.
```

> **Ảnh thật chỉ dùng ở Bước 1** (đính kèm cùng prompt "Bảng nhân vật"). Từ bước 2 trở đi chỉ đính kèm **ảnh chibi gốc** của vai đó.
> Không đưa ảnh thật của cô lên repo (repo đang công khai) — chỉ dùng ảnh chibi.
> Mẹo: tạo **vai Chủ nhiệm trước**, chọn ảnh giống cô nhất, rồi dùng chính ảnh chibi đó làm tham chiếu khuôn mặt khi tạo các vai khác
> (thêm câu *"Same face, same glasses, same hair as the attached chibi — only change the outfit."*).

## Câu mở đầu chung cho bước 2 (đính kèm ảnh gốc)
```
Use the attached image as the exact character reference. Keep EXACTLY the same face, hairstyle, glasses, outfit, colours and art style.
Draw ONE new illustration of this same chibi teacher, half-body, centered, on a plain pure white background, no shadow on the background,
no text, no letters, no speech bubbles, no watermark, square 1024x1024. Expression and pose:
```
…rồi dán **mô tả biểu cảm** (cột tiếng Anh trong bảng dưới).

## 16 biểu cảm (giống nhau cho mọi vai)

| # | Tên file | Khi nào hiện trong app | Mô tả biểu cảm (dán sau câu mở đầu) |
|---|---|---|---|
| 1 | `chao.png` | Mở app, đăng nhập, chào phụ huynh | waving hello with one hand, bright warm smile, eyes closed happily |
| 2 | `huong-dan.png` | Đọc hướng dẫn từng bước | holding an open notebook in one hand and a pointer in the other, explaining kindly, mouth slightly open as if talking |
| 3 | `chi-tay.png` | Chỉ vào nút cần bấm (hướng dẫn) | pointing to the right side with the teacher's pointer, encouraging smile, one eye winking |
| 4 | `vui.png` | Học sinh được cộng điểm | happy smile, small sparkles around her, clapping hands gently |
| 5 | `khen-lon.png` | Khen thưởng lớn (≥ 3 điểm, cả nhóm) | very proud, both arms raised holding a gold star, tiny confetti, big open-mouth smile |
| 6 | `co-vu.png` | Học sinh tiến bộ, gần lên loại | cheering "you can do it" pose, one fist raised, determined happy eyes |
| 7 | `buon.png` | Ghi điểm trừ lần đầu | slightly sad face, eyebrows tilted down, holding the notebook to her chest, small sweat drop |
| 8 | `lo-lang.png` | Học sinh đang xuống loại Trung bình / Yếu | worried, hand on cheek, small frown, thinking about the student |
| 9 | `nghiem.png` | Tái phạm lần 2 trong tháng | arms crossed, serious but gentle face, one eyebrow raised, pointer tucked under arm |
| 10 | `gian.png` | Vi phạm nhiều lần (lần 3 trở lên) | cute chibi anger: puffed cheeks, small anime anger mark on her head, hands on hips — still adorable, not scary |
| 11 | `suy-nghi.png` | Đang tải / đang tính điểm | thinking, finger on chin, looking up, small question marks floating |
| 12 | `ngac-nhien.png` | Lỗi mạng, chưa lưu được | surprised, eyes wide, hands up near face, small exclamation mark |
| 13 | `nghi-ngoi.png` | Không có dữ liệu / tuần trống | relaxed, holding a cup of tea with steam, peaceful closed-eye smile |
| 14 | `an-mung.png` | Cả lớp xếp loại Tốt, cuối kỳ | celebrating, jumping slightly, holding a small flag, colorful confetti around |
| 15 | `chup-anh.png` | Chụp / đính kèm bằng chứng | holding a smartphone up taking a photo, focused friendly expression |
| 16 | `cam-on.png` | Kết thúc hướng dẫn, ngày 20/11 | bowing slightly with hands together, grateful smile, holding a small bouquet of flowers |

---

## 10 vai của cô Thảo — prompt "Bảng nhân vật" (Bước 1) · tên thư mục = tên trong app

### Vai 1 — Cô Thảo chủ nhiệm (mặc định) · thư mục `chu-nhiem`
Dùng khi: Mọi chủ đề chưa ghép riêng, Hè hoa phượng.
```
Turn the woman in the attached photo into a chibi character. Character reference sheet of [CHARACTER above].
Outfit for this role: her signature outfit exactly as in the photo: black sleeveless V-neck knit vest with a cream-gold stripe over an ivory blouse, black cuff bands with gold stripes, holding a small class record book. Keep her thick black nearsighted glasses and round kind chubby face.
Art style: warm soft digital painting chibi, clean lines, gentle light, palette of black, cream-gold (#E2C27A) and ivory (#F4EEE2). Show 3 views (front, three-quarter, back) and 4 small face expressions (happy, sad, serious, surprised)
on a plain white background. No text, no labels, no watermark.
```

### Vai 2 — Cô Thảo lên lớp · thư mục `giang-day`
Dùng khi: Hướng dẫn từng bước, Vở ô ly, Bảng phấn, Origami, Lá xanh.
```
Turn the woman in the attached photo into a chibi character. Character reference sheet of [CHARACTER above].
Outfit for this role: a teal (#0E7C86) cardigan over a white blouse, holding a wooden teacher pointer and an open lesson notebook, a small name badge. Keep her thick black nearsighted glasses and round kind chubby face.
Art style: kawaii flat vector sticker, thick white outline, flat pastel colours with one soft shade, glossy eye highlights (like a Zalo sticker). Show 3 views (front, three-quarter, back) and 4 small face expressions (happy, sad, serious, surprised)
on a plain white background. No text, no labels, no watermark.
```

### Vai 3 — Cô Thảo áo dài · thư mục `ao-dai`
Dùng khi: Khai giảng, tuần lễ 20/11 (app tự đổi 14–22/11), Văn Miếu, Hồ Gươm, Nhà giáo.
```
Turn the woman in the attached photo into a chibi character. Character reference sheet of [CHARACTER above].
Outfit for this role: an elegant ivory-white Vietnamese ao dai with delicate gold (#C9A36A) lotus embroidery, white trousers, a non la hat in one hand (optional). Keep her thick black nearsighted glasses and round kind chubby face.
Art style: soft gouache chibi illustration, warm festive light, palette of ivory, gold and lotus pink. Show 3 views (front, three-quarter, back) and 4 small face expressions (happy, sad, serious, surprised)
on a plain white background. No text, no labels, no watermark.
```

### Vai 4 — Cô Thảo áo dài Tết · thư mục `ao-dai-do`
Dùng khi: Tết, Xuân hoa đào.
```
Turn the woman in the attached photo into a chibi character. Character reference sheet of [CHARACTER above].
Outfit for this role: a red (#C0392B) Vietnamese ao dai with yellow (#F2C230) apricot-blossom (hoa mai) pattern, a small peach-blossom hair clip, holding a lucky red envelope. Keep her thick black nearsighted glasses and round kind chubby face.
Art style: bright festive chibi illustration, warm red and gold palette, tiny blossoms floating. Show 3 views (front, three-quarter, back) and 4 small face expressions (happy, sad, serious, surprised)
on a plain white background. No text, no labels, no watermark.
```

### Vai 5 — Cô Thảo STEM · thư mục `stem`
Dùng khi: Biển và mây, giờ học STEM / trải nghiệm.
```
Turn the woman in the attached photo into a chibi character. Character reference sheet of [CHARACTER above].
Outfit for this role: a white lab coat over a light-blue (#3D86CF) blouse, holding a tablet, a tiny friendly robot companion beside her. Keep her thick black nearsighted glasses and round kind chubby face.
Art style: clean 3D chibi figurine, soft clay / vinyl toy material, smooth studio lighting (original design). Show 3 views (front, three-quarter, back) and 4 small face expressions (happy, sad, serious, surprised)
on a plain white background. No text, no labels, no watermark.
```

### Vai 6 — Cô Thảo mận chín · thư mục `man-chin`
Dùng khi: Mận chín, Thu vàng, Giấy kraft (đề cương lớp 12).
```
Turn the woman in the attached photo into a chibi character. Character reference sheet of [CHARACTER above].
Outfit for this role: her black V-neck vest over the ivory blouse plus a mustard-yellow (#F2C230) scarf and a tiny burgundy-plum (#7A1E3A) brooch. Keep her thick black nearsighted glasses and round kind chubby face.
Art style: warm semi-realistic chibi digital painting, soft brush texture, golden-hour light, plum, blush pink (#F8E9ED), cream and mustard palette. Show 3 views (front, three-quarter, back) and 4 small face expressions (happy, sad, serious, surprised)
on a plain white background. No text, no labels, no watermark.
```

### Vai 7 — Cô Thảo màu nước · thư mục `mau-nuoc`
Dùng khi: Chàm màu nước (đề cương lớp 11).
```
Turn the woman in the attached photo into a chibi character. Character reference sheet of [CHARACTER above].
Outfit for this role: an indigo (#302663) Vietnamese ao dai with tiny coral (#D9482B) flower embroidery at the collar, white trousers. Keep her thick black nearsighted glasses and round kind chubby face.
Art style: delicate watercolour and fine ink-line chibi on textured paper, loose soft washes, lavender shadows, coral accents. Show 3 views (front, three-quarter, back) and 4 small face expressions (happy, sad, serious, surprised)
on a plain white background. No text, no labels, no watermark.
```

### Vai 8 — Cô Thảo mùa đông · thư mục `mua-dong`
Dùng khi: Đông Hà Nội.
```
Turn the woman in the attached photo into a chibi character. Character reference sheet of [CHARACTER above].
Outfit for this role: a slate-blue (#4A6378) wool coat, a chunky red (#C0392B) knitted scarf, holding a warm cup of tea. Keep her thick black nearsighted glasses and round kind chubby face.
Art style: cosy chibi illustration, soft grain, cool winter palette with warm red accents, tiny snowflakes. Show 3 views (front, three-quarter, back) and 4 small face expressions (happy, sad, serious, surprised)
on a plain white background. No text, no labels, no watermark.
```

### Vai 9 — Cô Thảo Trung thu · thư mục `trung-thu`
Dùng khi: Trung thu.
```
Turn the woman in the attached photo into a chibi character. Character reference sheet of [CHARACTER above].
Outfit for this role: an orange (#E07B2E) blouse with a yellow (#F2C230) ribbon, holding a five-pointed star lantern (den ong sao). Keep her thick black nearsighted glasses and round kind chubby face.
Art style: warm glowing chibi illustration, lantern light, orange, gold and deep night-blue palette. Show 3 views (front, three-quarter, back) and 4 small face expressions (happy, sad, serious, surprised)
on a plain white background. No text, no labels, no watermark.
```

### Vai 10 — Cô Thảo cuối tuần · thư mục `doi-thuong`
Dùng khi: Lo-fi hoàng hôn, ngày nghỉ.
```
Turn the woman in the attached photo into a chibi character. Character reference sheet of [CHARACTER above].
Outfit for this role: an oversized lavender (#9B7BC4) knit sweater, headphones around her neck, a book under her arm. Keep her thick black nearsighted glasses and round kind chubby face.
Art style: lo-fi chibi illustration, muted purple, peach and teal palette, soft grain, cosy dusk mood. Show 3 views (front, three-quarter, back) and 4 small face expressions (happy, sad, serious, surprised)
on a plain white background. No text, no labels, no watermark.
```

---

## Vai nào hợp chủ đề nào (app tự ghép, người dùng đổi được)
App chọn vai theo chủ đề giao diện đang dùng (`BY_THEME` trong `mascot.js`); người dùng đổi ở **🎨 Chủ đề ▸ Nhân vật cô giáo** (hoặc tắt).
Hướng dẫn từng bước luôn dùng vai **Lên lớp**; tuần lễ 14–22/11 tự dùng **Áo dài**.

| Chủ đề giao diện | Vai mặc định |
|---|---|
| Mặc định, Hè hoa phượng | `chu-nhiem` |
| Vở ô ly, Bảng phấn, Origami, Lá xanh (và hướng dẫn) | `giang-day` |
| Văn Miếu, Hồ Gươm, 20/11 Nhà giáo | `ao-dai` |
| Xuân hoa đào | `ao-dai-do` |
| Biển và mây | `stem` |
| Mận chín, Thu vàng, Giấy kraft | `man-chin` |
| Chàm màu nước | `mau-nuoc` |
| Đông Hà Nội | `mua-dong` |
| Trung thu | `trung-thu` |
| Lo-fi hoàng hôn | `doi-thuong` |

---

## Cô Thảo nói gì — xưng hô theo người xem
| Người xem | Cô xưng | Gọi người xem | Gọi học sinh |
|---|---|---|---|
| **Phụ huynh** (trang phụ huynh) | cô | **các bác** | **các con** / con + tên |
| Cán bộ lớp (lớp trưởng, tổ trưởng) | cô | em | các bạn |
| Cô Thảo (GVCN) tự dùng | — | "Chào cô Thảo!" | các em |

Câu mẫu (đã có trong app — trang phụ huynh):

| Biểu cảm | Câu cô Thảo nói với phụ huynh |
|---|---|
| `chao` | "Cô Thảo chào các bác ạ! Các bác xem tình hình các con ở đây nhé." |
| `vui` / `khen-lon` | "Con **Minh** tháng này ngoan lắm, được cộng điểm đấy ạ. Các bác yên tâm nhé!" |
| `co-vu` | "Con đang tiến bộ rồi ạ, các bác động viên con thêm nhé!" |
| `buon` | "Con có một lỗi nhỏ, các bác nhắc nhẹ con giúp cô nhé." |
| `lo-lang` | "Tháng này con hơi nhiều lỗi, các bác trò chuyện với con giúp cô ạ." |
| `nghiem` / `gian` | "Con tái phạm mấy lần rồi ạ — các bác phối hợp cùng cô nhắc con nhé." |
| `cam-on` | "Cảm ơn các bác đã đồng hành cùng cô và các con ạ!" |

Nếu muốn video có tiếng / chữ, dùng đúng các câu trên. Còn ảnh chibi thì **không có chữ** (app tự hiện câu nói trong bong bóng).

## Gửi ảnh cho Claude
- Mỗi vai là 1 thư mục: `chu-nhiem/`, `giang-day/`, `ao-dai/`… (đúng 10 tên ở trên). Trong mỗi thư mục có 16 file đặt tên như bảng biểu cảm.
- Không cần làm đủ 10 vai ngay: nên làm `chu-nhiem` và `giang-day` trước (dùng nhiều nhất), vai còn thiếu app tự vẽ chibi đơn giản.
- Thiếu biểu cảm nào thì app tạm dùng chibi vẽ sẵn (kính cận, mặt tròn) cho biểu cảm đó.
- Claude sẽ tách nền, cắt vuông, nén WebP khoảng 30–60 KB mỗi ảnh và đặt vào `mascot/<vai>/<biểu-cảm>.webp`.

---

## ẢNH ĐỘNG — biểu cảm kèm hành động (tay, chân, đạo cụ)
App đã sẵn sàng cho ảnh động: file `mascot/<vai>/<biểu-cảm>.webp` có thể là **WebP động** (lặp lại). Khi chưa có ảnh động,
app tự cho ảnh tĩnh "cử động" bằng hiệu ứng (nhún, vẫy, lắc đầu, rung khi giận…) theo đúng biểu cảm.

**Cách tạo — chọn 1 trong 2:**

**Cách A — Video bằng Gemini (Veo), dễ nhất.** Trong Gemini chọn **Video**, đính kèm **ảnh chibi tĩnh** của biểu cảm đó, dán:
```
Animate this exact chibi character "Ms. Thao" (keep the same round kind face, thick black glasses, hair, outfit and art style). Solid pure green (#00FF00) chroma-key
background, no other objects, no text, static camera, character stays centered and fully inside the frame. 2–3 second seamless loop
(the last frame matches the first). Action:
```
…rồi dán **mô tả hành động** ở bảng dưới. Tải file MP4 về và gửi Claude: Claude tách nền xanh, cắt vuông và chuyển thành WebP động
khoảng 150–300 KB.

**Cách B — 4 khung hình.** Dùng *Câu mở đầu chung* (ở trên) + mô tả hành động, thêm câu *"Draw keyframe 1 of 4 of this action"*.
Lặp lại cho khung 2, 3, 4 và đặt tên `vui-1.png` … `vui-4.png`. Claude ghép thành ảnh động.

### 16 hành động — khớp với thao tác trong app
| Tên file | Lúc app hiện | Mô tả hành động (dán sau câu mở đầu) |
|---|---|---|
| `chao` | Mở app / đăng nhập / phụ huynh vào trang | waves her right hand side to side twice with a big smile, small happy head tilt, hair bouncing slightly |
| `huong-dan` | Đọc hướng dẫn từng bước | holds an open notebook, taps the page with a pointer while talking, nods gently |
| `chi-tay` | Chỉ vào nút cần bấm | swings the pointer to point to her right, leans forward a little, winks once |
| `vui` | Cộng điểm (+1, +2) | claps her hands three times, small hop on the spot, sparkles pop around her |
| `khen-lon` | Khen lớn (≥ +3 / cả nhóm) | jumps up raising a gold star with both hands, confetti bursts, lands with a big smile |
| `co-vu` | Học sinh tiến bộ | pumps her fist up twice ("you can do it!"), determined happy face |
| `buon` | Trừ điểm lần đầu | shoulders drop, hugs her notebook, small sigh, a tiny sweat drop slides down |
| `lo-lang` | Học sinh xuống loại Trung bình / Yếu | rests hand on cheek, looks down worriedly, small head shake |
| `nghiem` | Tái phạm lần 2 | crosses arms, taps one foot, wags her index finger "no, no" |
| `gian` | Vi phạm lần 3 trở lên | puffs cheeks, stomps one foot twice, a cute anger mark pulses on her head, hands on hips — adorable, not scary |
| `suy-nghi` | Đang tải / tính điểm | taps her chin with a finger, eyes look up and side to side, question marks float up |
| `ngac-nhien` | Lỗi mạng / chưa lưu | jumps back slightly in surprise, hands up near face, an exclamation mark pops |
| `nghi-ngoi` | Không có dữ liệu | sips tea, steam rises, eyes closed peacefully, slow gentle breathing |
| `an-mung` | Cả lớp loại Tốt / cuối kỳ | jumps and waves a small flag, confetti falls, spins once |
| `chup-anh` | Chụp / đính kèm bằng chứng | raises a smartphone, taps the screen, a camera flash blinks, she gives a thumbs up |
| `cam-on` | Kết thúc hướng dẫn / 20-11 | bows slightly with hands together, then holds up a small bouquet of flowers and smiles |
