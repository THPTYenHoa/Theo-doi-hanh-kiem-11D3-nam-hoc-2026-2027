# Prompt tạo bộ nhân vật chibi "Cô giáo 11D3" (Gemini)

Nhân vật cô giáo chủ nhiệm xuất hiện xuyên suốt app:
- đọc hướng dẫn từng bước;
- vui khi học sinh được khen;
- buồn khi có lỗi;
- nghiêm khắc khi tái phạm;
- chụp ảnh bằng chứng;
- chào phụ huynh…

Mỗi **phong cách** là một bộ **16 biểu cảm** dùng chung một khuôn mặt, kiểu tóc và trang phục. Màu trang phục khớp với chủ đề giao diện tương ứng.

## Cách làm để nhân vật GIỐNG NHAU trong mọi ảnh (quan trọng)
1. **Bước 1 — Tạo "bảng nhân vật".** **Đính kèm ảnh thật của cô**, dán *Mô tả nhân vật* + prompt *Bảng nhân vật* của một phong cách, chọn ảnh ưng nhất. Đây là ảnh **gốc**. (Mở đầu prompt bằng: *"Turn the woman in the attached photo into a chibi character."*)
2. **Bước 2 — Tạo từng biểu cảm.** Mở cuộc trò chuyện mới, **đính kèm ảnh gốc**. Dán **Câu mở đầu chung** + **mô tả biểu cảm** (bảng ở dưới).
   - Gemini sẽ giữ đúng mặt, tóc, quần áo theo ảnh đính kèm.
   - Nên làm lần lượt trong **cùng một cuộc trò chuyện** đó, mỗi lần thay mô tả biểu cảm.
3. Nền ảnh: **trắng trơn** (Gemini chưa xuất nền trong suốt ổn định). Claude sẽ tự tách nền, cắt và nén lại.
4. Ảnh vuông **1024 × 1024**, nhân vật đứng giữa, thấy **nửa người trên** (đầu to, thân nhỏ — đúng tỉ lệ chibi). Chừa lề khoảng 8%.
5. Đặt tên file đúng **tên file** trong bảng (ví dụ `vui.png`). Gửi cả thư mục cho Claude và ghi rõ đó là phong cách nào.

> Nhân vật luôn **hiền, đáng yêu, không đáng sợ**. Kể cả khi "tức giận", cô chỉ phồng má hoặc khoanh tay nghiêm khắc, kiểu tức giận dễ thương của chibi. Không có cử chỉ bạo lực, không có chữ trong ảnh.

---

## Mô tả nhân vật — theo ảnh thật của cô (dùng chung cho mọi phong cách)
```
CHARACTER: a chibi version of the young Vietnamese woman in the attached photo — she is a cheerful high-school homeroom teacher.
Keep her recognisable features: long straight hair falling past the shoulders, dark brown with a warm auburn / reddish-brown tint,
soft see-through full bangs and face-framing strands; thin round black metal glasses; a round soft face with a big bright open smile
showing teeth, rosy cheeks, friendly dark eyes. Signature outfit: a black sleeveless V-neck knit pinafore dress / vest with a thin
cream-gold stripe along the V-neck, over an ivory long-sleeve blouse with a white collar; black cuff bands with gold stripes on the
sleeves; a small black crossbody bag (optional). Chibi proportions: big head (about half of the body), small body, short limbs.
Personality: warm, energetic, caring, a little strict but always kind.
```

> **Ảnh thật chỉ dùng ở Bước 1** (đính kèm cùng prompt "Bảng nhân vật"). Từ bước 2 trở đi chỉ đính kèm **ảnh chibi gốc** vừa tạo.
> Không đưa ảnh thật của cô lên repo (repo đang công khai) — chỉ dùng ảnh chibi.

## Câu mở đầu chung cho bước 2 (đính kèm ảnh gốc)
```
Use the attached image as the exact character reference. Keep EXACTLY the same face, hairstyle, glasses, outfit, colours and art style.
Draw ONE new illustration of this same chibi teacher, half-body, centered, on a plain pure white background, no shadow on the background,
no text, no letters, no speech bubbles, no watermark, square 1024x1024. Expression and pose:
```
…rồi dán **mô tả biểu cảm** (cột tiếng Anh trong bảng dưới).

## 16 biểu cảm (giống nhau cho mọi phong cách)

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

## Phong cách 1 — MẬN CHÍN (hợp chủ đề "Mận chín", đề cương lớp 12) · thư mục `man-chin`
**Bảng nhân vật:**
```
Character reference sheet of [CHARACTER above]. Outfit: her signature black V-neck pinafore vest over the ivory blouse (as in the photo), plus a
mustard-yellow (#F2C230) scarf / ribbon accent and a tiny burgundy-plum (#7A1E3A) brooch. Art style: warm semi-realistic chibi digital painting, soft brush texture,
gentle golden-hour lighting, warm palette of plum, blush pink (#F8E9ED), cream (#F8F4E6) and mustard yellow, nostalgic and cosy.
Show 3 views (front, three-quarter, back) and 4 small face expressions (happy, sad, serious, surprised) on a plain white background.
No text, no labels, no watermark.
```

## Phong cách 2 — CHÀM MÀU NƯỚC (hợp chủ đề "Chàm màu nước", đề cương lớp 11) · thư mục `mau-nuoc`
```
Character reference sheet of [CHARACTER above]. Outfit: an elegant indigo (#302663) Vietnamese ao dai with tiny coral (#D9482B) flower
embroidery at the collar, white trousers. Art style: delicate watercolour and fine ink-line chibi illustration on textured paper, loose
soft washes, lavender (#E6E1F5) shadows, coral accents, poetic and gentle. Show 3 views (front, three-quarter, back) and 4 small face
expressions (happy, sad, serious, surprised) on a plain white background. No text, no labels, no watermark.
```

## Phong cách 3 — KAWAII STICKER (dễ thương, hợp mọi chủ đề sáng) · thư mục `kawaii`
```
Character reference sheet of [CHARACTER above]. Outfit: a teal (#0E7C86) cardigan over a white blouse, light grey skirt, a small name
badge. Art style: kawaii flat vector sticker, thick clean white outline around the whole character, flat pastel colours with one soft
shade, simple shapes, glossy eye highlights, like a LINE / Zalo sticker. Show 3 views and 4 small expressions on a plain white
background. No text, no labels, no watermark.
```

## Phong cách 4 — 3D ĐẤT SÉT (kiểu hoạt hình 3D) · thư mục `3d`
```
Character reference sheet of [CHARACTER above]. Outfit: a soft coral blouse and a navy cardigan, beige trousers. Art style: cute 3D
chibi figurine, soft clay / vinyl toy material, smooth subsurface lighting, gentle studio light, rounded shapes, high quality 3D render
like a modern animated film character (original design, not copying any studio). Show 3 views and 4 small expressions on a plain white
background. No text, no labels, no watermark.
```

## Phong cách 5 — VỞ Ô LY BÚT CHÌ (nét vẽ tay học trò) · thư mục `but-chi`
```
Character reference sheet of [CHARACTER above]. Outfit: a white shirt and a blue (#2B6CB0) cardigan, dark skirt. Art style: hand-drawn
chibi doodle with pencil and coloured-pencil texture, slightly wobbly lines, light hatching, like a student's sketch in a school notebook,
cheerful and simple. Show 3 views and 4 small expressions on a plain white background. No text, no labels, no watermark.
```

## Phong cách 6 — ANIME TƯƠI SÁNG · thư mục `anime`
```
Character reference sheet of [CHARACTER above]. Outfit: a white ao dai with a light sky-blue pattern at the hem, or a sky-blue blouse
with a white ribbon. Art style: clean anime cel-shading chibi, crisp line art, two-tone shading, bright fresh colours (sky blue, white,
leaf green, sunny yellow), sparkling eyes. Original character, not copying any existing anime. Show 3 views and 4 small expressions on a
plain white background. No text, no labels, no watermark.
```

## Phong cách 7 — HOA PHƯỢNG MÙA HÈ · thư mục `hoa-phuong`
```
Character reference sheet of [CHARACTER above]. Outfit: a cream blouse with a vermilion-red (#C23B22) scarf and a red flame-tree flower
(hoa phượng) hair clip. Art style: soft gouache chibi illustration, warm summer light, palette of vermilion, leaf green, sunny cream.
Show 3 views and 4 small expressions on a plain white background. No text, no labels, no watermark.
```

## Phong cách 8 — LO-FI HOÀNG HÔN · thư mục `lo-fi`
```
Character reference sheet of [CHARACTER above]. Outfit: an oversized lavender (#6B4C9A) knit sweater, headphones around her neck.
Art style: lo-fi chibi illustration, muted purple, peach and teal palette, soft grain texture, cosy dusk mood. Show 3 views and 4 small
expressions on a plain white background. No text, no labels, no watermark.
```

---

## Phong cách nào hợp chủ đề nào (app tự ghép, người dùng đổi được)
| Chủ đề giao diện | Nhân vật mặc định |
|---|---|
| Mận chín, Văn Miếu, Thu vàng, Giấy kraft | `man-chin` |
| Chàm màu nước, Trung thu, Đông Hà Nội | `mau-nuoc` |
| Xanh ngọc, Biển và mây, Lá màu nước, Hồ Gươm, Origami | `kawaii` |
| Vở ô ly, Bảng phấn | `but-chi` |
| Hè hoa phượng, Xuân hoa đào, 20/11 Nhà giáo | `hoa-phuong` |
| Lo-fi hoàng hôn | `lo-fi` |
| (tuỳ chọn) | `3d`, `anime` |

## Gửi ảnh cho Claude
- Mỗi phong cách là 1 thư mục: `man-chin/`, `mau-nuoc/`, `kawaii/`… Trong mỗi thư mục có 16 file đặt tên như bảng ở trên.
- Thiếu biểu cảm nào thì app tạm dùng hình vẽ đơn giản cho biểu cảm đó.
- Claude sẽ tách nền, cắt vuông, nén WebP khoảng 30–60 KB mỗi ảnh và đặt vào `mascot/<phong-cách>/<biểu-cảm>.webp`.

---

## ẢNH ĐỘNG — biểu cảm kèm hành động (tay, chân, đạo cụ)
App đã sẵn sàng cho ảnh động: file `mascot/<phong-cách>/<biểu-cảm>.webp` có thể là **WebP động** (lặp lại). Khi chưa có ảnh động,
app tự cho ảnh tĩnh "cử động" bằng hiệu ứng (nhún, vẫy, lắc đầu, rung khi giận…) theo đúng biểu cảm.

**Cách tạo — chọn 1 trong 2:**

**Cách A — Video bằng Gemini (Veo), dễ nhất.** Trong Gemini chọn **Video**, đính kèm **ảnh chibi tĩnh** của biểu cảm đó, dán:
```
Animate this exact chibi character (keep the same face, hair, glasses, outfit and art style). Solid pure green (#00FF00) chroma-key
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
