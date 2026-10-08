# Tạo bộ chibi 3D "cô Thảo" bằng Gemini — siêu cute, cùng một nhân vật
**Gemini tạo được ảnh 3D** (kiểu nhân vật hoạt hình Pixar / đồ chơi đất sét). Bí quyết để mọi ảnh **giống cùng một cô Thảo**:
1. Tạo **1 ảnh gốc** thật ưng (Bước 1).
2. Mọi ảnh sau đều **đính kèm ảnh gốc** + dán **nguyên khung prompt** (mỗi khung đã lặp đủ phần mô tả nhân vật và phong cách — không cần ghép gì).
3. Ảnh động (cô Thảo chạy ở màn chờ, vẫy tay…) làm bằng **Video** của Gemini từ ảnh tĩnh (Bước 3).

Mở **gemini.google.com** (nên dùng Gmail cá nhân — tài khoản trường hay bị tắt tạo ảnh). Chỉ cần **copy khung xám → dán → gửi**.

---

## Bước 1 — Ảnh gốc `goc.png` (làm 1 lần)
Cuộc trò chuyện mới, **không** đính kèm ảnh (Gemini thường từ chối vẽ lại ảnh người thật). Dán khung dưới, gửi. Chưa ưng thì bấm tạo lại, hoặc gửi thêm: `Make her face rounder and cuter, glasses a bit bigger.` Ưng thì tải về, đặt tên **`goc.png`**.

```
Create a 3D image.
CHARACTER — "Ms. Thao", a young Vietnamese high-school homeroom teacher: a very round, chubby, kind face with full rosy cheeks; gentle crescent-shaped smiling eyes behind THICK BLACK ROUND NEARSIGHTED GLASSES (always clearly visible); a small cute nose and a warm sweet smile; long straight dark-brown hair with a warm auburn tint, falling past the shoulders, with soft wispy see-through bangs and face-framing strands.
OUTFIT — black sleeveless V-neck knit vest with a thin gold trim along the neckline, over an ivory long-sleeve blouse; black knee-length skirt; small black flat shoes.
STYLE — super cute 3D chibi figurine, Pixar / Disney-like stylized 3D render, soft matte clay-and-vinyl toy material, big round head (about half of the body height), small body, short arms and legs, big sparkly eyes, smooth soft skin with subtle subsurface glow, soft studio lighting with a gentle rim light, warm pastel color grading, high detail, 4K quality. Full body, centered, plain pure white background, soft round contact shadow under the feet, no text, no letters, no logo, no watermark, square 1:1 image.
POSE — standing straight facing the viewer, hands clasped in front, big friendly smile. This image will be the master character reference.
```

*(Tuỳ chọn)* Bảng 3 góc nhìn giúp các ảnh sau giống hơn — dán kèm `goc.png`:

```
REFERENCE — use the attached image as the exact character reference: keep EXACTLY the same face, glasses, hairstyle, outfit, body proportions, colors and 3D style. Only change the pose and expression described below.
CHARACTER — "Ms. Thao", a young Vietnamese high-school homeroom teacher: a very round, chubby, kind face with full rosy cheeks; gentle crescent-shaped smiling eyes behind THICK BLACK ROUND NEARSIGHTED GLASSES (always clearly visible); a small cute nose and a warm sweet smile; long straight dark-brown hair with a warm auburn tint, falling past the shoulders, with soft wispy see-through bangs and face-framing strands.
OUTFIT — black sleeveless V-neck knit vest with a thin gold trim along the neckline, over an ivory long-sleeve blouse; black knee-length skirt; small black flat shoes.
STYLE — super cute 3D chibi figurine, Pixar / Disney-like stylized 3D render, soft matte clay-and-vinyl toy material, big round head (about half of the body height), small body, short arms and legs, big sparkly eyes, smooth soft skin with subtle subsurface glow, soft studio lighting with a gentle rim light, warm pastel color grading, high detail, 4K quality. Plain pure white background, no text, no logo, no watermark, wide 16:9 image.
POSE — character turnaround sheet: the same character shown three times side by side — front view, three-quarter view, back view — standing neutral with a soft smile.
```

---

## Bước 2 — 17 ảnh biểu cảm (mỗi ảnh: đính kèm `goc.png` + dán 1 khung)
Làm trong **một cuộc trò chuyện**, lần lượt từng khung. Tải mỗi ảnh về, đặt tên theo số ở tiêu đề (ví dụ `4.png`). Ảnh nào lệch mặt / mất kính: gửi `Keep exactly the same face and glasses as the attached reference. Try again.`

### 1 — Vẫy tay chào · dùng khi: Mở app, đăng nhập, chào phụ huynh · file `1.png`
```
REFERENCE — use the attached image as the exact character reference: keep EXACTLY the same face, glasses, hairstyle, outfit, body proportions, colors and 3D style. Only change the pose and expression described below.
CHARACTER — "Ms. Thao", a young Vietnamese high-school homeroom teacher: a very round, chubby, kind face with full rosy cheeks; gentle crescent-shaped smiling eyes behind THICK BLACK ROUND NEARSIGHTED GLASSES (always clearly visible); a small cute nose and a warm sweet smile; long straight dark-brown hair with a warm auburn tint, falling past the shoulders, with soft wispy see-through bangs and face-framing strands.
OUTFIT — black sleeveless V-neck knit vest with a thin gold trim along the neckline, over an ivory long-sleeve blouse; black knee-length skirt; small black flat shoes.
STYLE — super cute 3D chibi figurine, Pixar / Disney-like stylized 3D render, soft matte clay-and-vinyl toy material, big round head (about half of the body height), small body, short arms and legs, big sparkly eyes, smooth soft skin with subtle subsurface glow, soft studio lighting with a gentle rim light, warm pastel color grading, high detail, 4K quality. Full body, centered, plain pure white background, soft round contact shadow under the feet, no text, no letters, no logo, no watermark, square 1:1 image.
POSE — waving hello with her right hand raised high, big warm open smile, head tilted slightly, one foot lifted playfully.
```

### 2 — Đọc hướng dẫn · dùng khi: Hướng dẫn từng bước · file `2.png`
```
REFERENCE — use the attached image as the exact character reference: keep EXACTLY the same face, glasses, hairstyle, outfit, body proportions, colors and 3D style. Only change the pose and expression described below.
CHARACTER — "Ms. Thao", a young Vietnamese high-school homeroom teacher: a very round, chubby, kind face with full rosy cheeks; gentle crescent-shaped smiling eyes behind THICK BLACK ROUND NEARSIGHTED GLASSES (always clearly visible); a small cute nose and a warm sweet smile; long straight dark-brown hair with a warm auburn tint, falling past the shoulders, with soft wispy see-through bangs and face-framing strands.
OUTFIT — black sleeveless V-neck knit vest with a thin gold trim along the neckline, over an ivory long-sleeve blouse; black knee-length skirt; small black flat shoes.
STYLE — super cute 3D chibi figurine, Pixar / Disney-like stylized 3D render, soft matte clay-and-vinyl toy material, big round head (about half of the body height), small body, short arms and legs, big sparkly eyes, smooth soft skin with subtle subsurface glow, soft studio lighting with a gentle rim light, warm pastel color grading, high detail, 4K quality. Full body, centered, plain pure white background, soft round contact shadow under the feet, no text, no letters, no logo, no watermark, square 1:1 image.
POSE — holding an open notebook in one hand and a wooden teacher pointer in the other, explaining kindly, mouth slightly open as if talking.
```

### 3 — Chỉ tay · dùng khi: Chỉ vào nút cần bấm · file `3.png`
```
REFERENCE — use the attached image as the exact character reference: keep EXACTLY the same face, glasses, hairstyle, outfit, body proportions, colors and 3D style. Only change the pose and expression described below.
CHARACTER — "Ms. Thao", a young Vietnamese high-school homeroom teacher: a very round, chubby, kind face with full rosy cheeks; gentle crescent-shaped smiling eyes behind THICK BLACK ROUND NEARSIGHTED GLASSES (always clearly visible); a small cute nose and a warm sweet smile; long straight dark-brown hair with a warm auburn tint, falling past the shoulders, with soft wispy see-through bangs and face-framing strands.
OUTFIT — black sleeveless V-neck knit vest with a thin gold trim along the neckline, over an ivory long-sleeve blouse; black knee-length skirt; small black flat shoes.
STYLE — super cute 3D chibi figurine, Pixar / Disney-like stylized 3D render, soft matte clay-and-vinyl toy material, big round head (about half of the body height), small body, short arms and legs, big sparkly eyes, smooth soft skin with subtle subsurface glow, soft studio lighting with a gentle rim light, warm pastel color grading, high detail, 4K quality. Full body, centered, plain pure white background, soft round contact shadow under the feet, no text, no letters, no logo, no watermark, square 1:1 image.
POSE — pointing to her right side with the wooden pointer, leaning forward a little, winking one eye, encouraging smile.
```

### 4 — Vui · dùng khi: Học sinh được cộng điểm · file `4.png`
```
REFERENCE — use the attached image as the exact character reference: keep EXACTLY the same face, glasses, hairstyle, outfit, body proportions, colors and 3D style. Only change the pose and expression described below.
CHARACTER — "Ms. Thao", a young Vietnamese high-school homeroom teacher: a very round, chubby, kind face with full rosy cheeks; gentle crescent-shaped smiling eyes behind THICK BLACK ROUND NEARSIGHTED GLASSES (always clearly visible); a small cute nose and a warm sweet smile; long straight dark-brown hair with a warm auburn tint, falling past the shoulders, with soft wispy see-through bangs and face-framing strands.
OUTFIT — black sleeveless V-neck knit vest with a thin gold trim along the neckline, over an ivory long-sleeve blouse; black knee-length skirt; small black flat shoes.
STYLE — super cute 3D chibi figurine, Pixar / Disney-like stylized 3D render, soft matte clay-and-vinyl toy material, big round head (about half of the body height), small body, short arms and legs, big sparkly eyes, smooth soft skin with subtle subsurface glow, soft studio lighting with a gentle rim light, warm pastel color grading, high detail, 4K quality. Full body, centered, plain pure white background, soft round contact shadow under the feet, no text, no letters, no logo, no watermark, square 1:1 image.
POSE — happily clapping both hands, small hop with both feet off the ground, tiny golden sparkles around her.
```

### 5 — Khen lớn · dùng khi: Khen thưởng lớn, cả nhóm · file `5.png`
```
REFERENCE — use the attached image as the exact character reference: keep EXACTLY the same face, glasses, hairstyle, outfit, body proportions, colors and 3D style. Only change the pose and expression described below.
CHARACTER — "Ms. Thao", a young Vietnamese high-school homeroom teacher: a very round, chubby, kind face with full rosy cheeks; gentle crescent-shaped smiling eyes behind THICK BLACK ROUND NEARSIGHTED GLASSES (always clearly visible); a small cute nose and a warm sweet smile; long straight dark-brown hair with a warm auburn tint, falling past the shoulders, with soft wispy see-through bangs and face-framing strands.
OUTFIT — black sleeveless V-neck knit vest with a thin gold trim along the neckline, over an ivory long-sleeve blouse; black knee-length skirt; small black flat shoes.
STYLE — super cute 3D chibi figurine, Pixar / Disney-like stylized 3D render, soft matte clay-and-vinyl toy material, big round head (about half of the body height), small body, short arms and legs, big sparkly eyes, smooth soft skin with subtle subsurface glow, soft studio lighting with a gentle rim light, warm pastel color grading, high detail, 4K quality. Full body, centered, plain pure white background, soft round contact shadow under the feet, no text, no letters, no logo, no watermark, square 1:1 image.
POSE — jumping up with both arms raised holding a big shiny gold star, colorful confetti around, huge open-mouth smile.
```

### 6 — Cổ vũ · dùng khi: Học sinh tiến bộ · file `6.png`
```
REFERENCE — use the attached image as the exact character reference: keep EXACTLY the same face, glasses, hairstyle, outfit, body proportions, colors and 3D style. Only change the pose and expression described below.
CHARACTER — "Ms. Thao", a young Vietnamese high-school homeroom teacher: a very round, chubby, kind face with full rosy cheeks; gentle crescent-shaped smiling eyes behind THICK BLACK ROUND NEARSIGHTED GLASSES (always clearly visible); a small cute nose and a warm sweet smile; long straight dark-brown hair with a warm auburn tint, falling past the shoulders, with soft wispy see-through bangs and face-framing strands.
OUTFIT — black sleeveless V-neck knit vest with a thin gold trim along the neckline, over an ivory long-sleeve blouse; black knee-length skirt; small black flat shoes.
STYLE — super cute 3D chibi figurine, Pixar / Disney-like stylized 3D render, soft matte clay-and-vinyl toy material, big round head (about half of the body height), small body, short arms and legs, big sparkly eyes, smooth soft skin with subtle subsurface glow, soft studio lighting with a gentle rim light, warm pastel color grading, high detail, 4K quality. Full body, centered, plain pure white background, soft round contact shadow under the feet, no text, no letters, no logo, no watermark, square 1:1 image.
POSE — cheering pose, one fist pumped in the air, the other hand on her hip, determined happy eyes.
```

### 7 — Buồn · dùng khi: Ghi điểm trừ lần đầu · file `7.png`
```
REFERENCE — use the attached image as the exact character reference: keep EXACTLY the same face, glasses, hairstyle, outfit, body proportions, colors and 3D style. Only change the pose and expression described below.
CHARACTER — "Ms. Thao", a young Vietnamese high-school homeroom teacher: a very round, chubby, kind face with full rosy cheeks; gentle crescent-shaped smiling eyes behind THICK BLACK ROUND NEARSIGHTED GLASSES (always clearly visible); a small cute nose and a warm sweet smile; long straight dark-brown hair with a warm auburn tint, falling past the shoulders, with soft wispy see-through bangs and face-framing strands.
OUTFIT — black sleeveless V-neck knit vest with a thin gold trim along the neckline, over an ivory long-sleeve blouse; black knee-length skirt; small black flat shoes.
STYLE — super cute 3D chibi figurine, Pixar / Disney-like stylized 3D render, soft matte clay-and-vinyl toy material, big round head (about half of the body height), small body, short arms and legs, big sparkly eyes, smooth soft skin with subtle subsurface glow, soft studio lighting with a gentle rim light, warm pastel color grading, high detail, 4K quality. Full body, centered, plain pure white background, soft round contact shadow under the feet, no text, no letters, no logo, no watermark, square 1:1 image.
POSE — slightly sad, shoulders dropped, hugging her notebook to her chest, eyebrows tilted down, one small tear-shaped sweat drop.
```

### 8 — Lo lắng · dùng khi: Học sinh xuống loại Trung bình / Yếu · file `8.png`
```
REFERENCE — use the attached image as the exact character reference: keep EXACTLY the same face, glasses, hairstyle, outfit, body proportions, colors and 3D style. Only change the pose and expression described below.
CHARACTER — "Ms. Thao", a young Vietnamese high-school homeroom teacher: a very round, chubby, kind face with full rosy cheeks; gentle crescent-shaped smiling eyes behind THICK BLACK ROUND NEARSIGHTED GLASSES (always clearly visible); a small cute nose and a warm sweet smile; long straight dark-brown hair with a warm auburn tint, falling past the shoulders, with soft wispy see-through bangs and face-framing strands.
OUTFIT — black sleeveless V-neck knit vest with a thin gold trim along the neckline, over an ivory long-sleeve blouse; black knee-length skirt; small black flat shoes.
STYLE — super cute 3D chibi figurine, Pixar / Disney-like stylized 3D render, soft matte clay-and-vinyl toy material, big round head (about half of the body height), small body, short arms and legs, big sparkly eyes, smooth soft skin with subtle subsurface glow, soft studio lighting with a gentle rim light, warm pastel color grading, high detail, 4K quality. Full body, centered, plain pure white background, soft round contact shadow under the feet, no text, no letters, no logo, no watermark, square 1:1 image.
POSE — worried, one hand on her cheek, small frown, looking down thoughtfully, feet turned inward.
```

### 9 — Nghiêm · dùng khi: Tái phạm lần 2 · file `9.png`
```
REFERENCE — use the attached image as the exact character reference: keep EXACTLY the same face, glasses, hairstyle, outfit, body proportions, colors and 3D style. Only change the pose and expression described below.
CHARACTER — "Ms. Thao", a young Vietnamese high-school homeroom teacher: a very round, chubby, kind face with full rosy cheeks; gentle crescent-shaped smiling eyes behind THICK BLACK ROUND NEARSIGHTED GLASSES (always clearly visible); a small cute nose and a warm sweet smile; long straight dark-brown hair with a warm auburn tint, falling past the shoulders, with soft wispy see-through bangs and face-framing strands.
OUTFIT — black sleeveless V-neck knit vest with a thin gold trim along the neckline, over an ivory long-sleeve blouse; black knee-length skirt; small black flat shoes.
STYLE — super cute 3D chibi figurine, Pixar / Disney-like stylized 3D render, soft matte clay-and-vinyl toy material, big round head (about half of the body height), small body, short arms and legs, big sparkly eyes, smooth soft skin with subtle subsurface glow, soft studio lighting with a gentle rim light, warm pastel color grading, high detail, 4K quality. Full body, centered, plain pure white background, soft round contact shadow under the feet, no text, no letters, no logo, no watermark, square 1:1 image.
POSE — arms crossed, serious but gentle face, one eyebrow raised, tapping one foot, pointer tucked under her arm.
```

### 10 — Giận dễ thương · dùng khi: Vi phạm nhiều lần · file `10.png`
```
REFERENCE — use the attached image as the exact character reference: keep EXACTLY the same face, glasses, hairstyle, outfit, body proportions, colors and 3D style. Only change the pose and expression described below.
CHARACTER — "Ms. Thao", a young Vietnamese high-school homeroom teacher: a very round, chubby, kind face with full rosy cheeks; gentle crescent-shaped smiling eyes behind THICK BLACK ROUND NEARSIGHTED GLASSES (always clearly visible); a small cute nose and a warm sweet smile; long straight dark-brown hair with a warm auburn tint, falling past the shoulders, with soft wispy see-through bangs and face-framing strands.
OUTFIT — black sleeveless V-neck knit vest with a thin gold trim along the neckline, over an ivory long-sleeve blouse; black knee-length skirt; small black flat shoes.
STYLE — super cute 3D chibi figurine, Pixar / Disney-like stylized 3D render, soft matte clay-and-vinyl toy material, big round head (about half of the body height), small body, short arms and legs, big sparkly eyes, smooth soft skin with subtle subsurface glow, soft studio lighting with a gentle rim light, warm pastel color grading, high detail, 4K quality. Full body, centered, plain pure white background, soft round contact shadow under the feet, no text, no letters, no logo, no watermark, square 1:1 image.
POSE — cute chibi anger: puffed cheeks, hands on hips, a small red cartoon anger mark floating near her head, stomping one foot — still adorable, not scary.
```

### 11 — Suy nghĩ · dùng khi: Đang tính điểm · file `11.png`
```
REFERENCE — use the attached image as the exact character reference: keep EXACTLY the same face, glasses, hairstyle, outfit, body proportions, colors and 3D style. Only change the pose and expression described below.
CHARACTER — "Ms. Thao", a young Vietnamese high-school homeroom teacher: a very round, chubby, kind face with full rosy cheeks; gentle crescent-shaped smiling eyes behind THICK BLACK ROUND NEARSIGHTED GLASSES (always clearly visible); a small cute nose and a warm sweet smile; long straight dark-brown hair with a warm auburn tint, falling past the shoulders, with soft wispy see-through bangs and face-framing strands.
OUTFIT — black sleeveless V-neck knit vest with a thin gold trim along the neckline, over an ivory long-sleeve blouse; black knee-length skirt; small black flat shoes.
STYLE — super cute 3D chibi figurine, Pixar / Disney-like stylized 3D render, soft matte clay-and-vinyl toy material, big round head (about half of the body height), small body, short arms and legs, big sparkly eyes, smooth soft skin with subtle subsurface glow, soft studio lighting with a gentle rim light, warm pastel color grading, high detail, 4K quality. Full body, centered, plain pure white background, soft round contact shadow under the feet, no text, no letters, no logo, no watermark, square 1:1 image.
POSE — thinking, finger on her chin, eyes looking up, two small floating question marks.
```

### 12 — Ngạc nhiên · dùng khi: Lỗi mạng, chưa lưu được · file `12.png`
```
REFERENCE — use the attached image as the exact character reference: keep EXACTLY the same face, glasses, hairstyle, outfit, body proportions, colors and 3D style. Only change the pose and expression described below.
CHARACTER — "Ms. Thao", a young Vietnamese high-school homeroom teacher: a very round, chubby, kind face with full rosy cheeks; gentle crescent-shaped smiling eyes behind THICK BLACK ROUND NEARSIGHTED GLASSES (always clearly visible); a small cute nose and a warm sweet smile; long straight dark-brown hair with a warm auburn tint, falling past the shoulders, with soft wispy see-through bangs and face-framing strands.
OUTFIT — black sleeveless V-neck knit vest with a thin gold trim along the neckline, over an ivory long-sleeve blouse; black knee-length skirt; small black flat shoes.
STYLE — super cute 3D chibi figurine, Pixar / Disney-like stylized 3D render, soft matte clay-and-vinyl toy material, big round head (about half of the body height), small body, short arms and legs, big sparkly eyes, smooth soft skin with subtle subsurface glow, soft studio lighting with a gentle rim light, warm pastel color grading, high detail, 4K quality. Full body, centered, plain pure white background, soft round contact shadow under the feet, no text, no letters, no logo, no watermark, square 1:1 image.
POSE — surprised, eyes wide open behind the glasses, both hands up near her face, small exclamation mark floating.
```

### 13 — Nghỉ ngơi · dùng khi: Không có dữ liệu · file `13.png`
```
REFERENCE — use the attached image as the exact character reference: keep EXACTLY the same face, glasses, hairstyle, outfit, body proportions, colors and 3D style. Only change the pose and expression described below.
CHARACTER — "Ms. Thao", a young Vietnamese high-school homeroom teacher: a very round, chubby, kind face with full rosy cheeks; gentle crescent-shaped smiling eyes behind THICK BLACK ROUND NEARSIGHTED GLASSES (always clearly visible); a small cute nose and a warm sweet smile; long straight dark-brown hair with a warm auburn tint, falling past the shoulders, with soft wispy see-through bangs and face-framing strands.
OUTFIT — black sleeveless V-neck knit vest with a thin gold trim along the neckline, over an ivory long-sleeve blouse; black knee-length skirt; small black flat shoes.
STYLE — super cute 3D chibi figurine, Pixar / Disney-like stylized 3D render, soft matte clay-and-vinyl toy material, big round head (about half of the body height), small body, short arms and legs, big sparkly eyes, smooth soft skin with subtle subsurface glow, soft studio lighting with a gentle rim light, warm pastel color grading, high detail, 4K quality. Full body, centered, plain pure white background, soft round contact shadow under the feet, no text, no letters, no logo, no watermark, square 1:1 image.
POSE — relaxed, sitting on a small stool holding a cup of hot tea with gentle steam, peaceful closed-eye smile.
```

### 14 — Ăn mừng · dùng khi: Cả lớp loại Tốt, cuối kỳ · file `14.png`
```
REFERENCE — use the attached image as the exact character reference: keep EXACTLY the same face, glasses, hairstyle, outfit, body proportions, colors and 3D style. Only change the pose and expression described below.
CHARACTER — "Ms. Thao", a young Vietnamese high-school homeroom teacher: a very round, chubby, kind face with full rosy cheeks; gentle crescent-shaped smiling eyes behind THICK BLACK ROUND NEARSIGHTED GLASSES (always clearly visible); a small cute nose and a warm sweet smile; long straight dark-brown hair with a warm auburn tint, falling past the shoulders, with soft wispy see-through bangs and face-framing strands.
OUTFIT — black sleeveless V-neck knit vest with a thin gold trim along the neckline, over an ivory long-sleeve blouse; black knee-length skirt; small black flat shoes.
STYLE — super cute 3D chibi figurine, Pixar / Disney-like stylized 3D render, soft matte clay-and-vinyl toy material, big round head (about half of the body height), small body, short arms and legs, big sparkly eyes, smooth soft skin with subtle subsurface glow, soft studio lighting with a gentle rim light, warm pastel color grading, high detail, 4K quality. Full body, centered, plain pure white background, soft round contact shadow under the feet, no text, no letters, no logo, no watermark, square 1:1 image.
POSE — celebrating, jumping high waving a small triangle pennant flag, confetti and streamers around.
```

### 15 — Chụp ảnh · dùng khi: Chụp / đính kèm bằng chứng · file `15.png`
```
REFERENCE — use the attached image as the exact character reference: keep EXACTLY the same face, glasses, hairstyle, outfit, body proportions, colors and 3D style. Only change the pose and expression described below.
CHARACTER — "Ms. Thao", a young Vietnamese high-school homeroom teacher: a very round, chubby, kind face with full rosy cheeks; gentle crescent-shaped smiling eyes behind THICK BLACK ROUND NEARSIGHTED GLASSES (always clearly visible); a small cute nose and a warm sweet smile; long straight dark-brown hair with a warm auburn tint, falling past the shoulders, with soft wispy see-through bangs and face-framing strands.
OUTFIT — black sleeveless V-neck knit vest with a thin gold trim along the neckline, over an ivory long-sleeve blouse; black knee-length skirt; small black flat shoes.
STYLE — super cute 3D chibi figurine, Pixar / Disney-like stylized 3D render, soft matte clay-and-vinyl toy material, big round head (about half of the body height), small body, short arms and legs, big sparkly eyes, smooth soft skin with subtle subsurface glow, soft studio lighting with a gentle rim light, warm pastel color grading, high detail, 4K quality. Full body, centered, plain pure white background, soft round contact shadow under the feet, no text, no letters, no logo, no watermark, square 1:1 image.
POSE — holding up a smartphone with both hands taking a photo, focused friendly expression, tiny camera-flash sparkle.
```

### 16 — Cảm ơn · dùng khi: Kết thúc hướng dẫn, 20/11 · file `16.png`
```
REFERENCE — use the attached image as the exact character reference: keep EXACTLY the same face, glasses, hairstyle, outfit, body proportions, colors and 3D style. Only change the pose and expression described below.
CHARACTER — "Ms. Thao", a young Vietnamese high-school homeroom teacher: a very round, chubby, kind face with full rosy cheeks; gentle crescent-shaped smiling eyes behind THICK BLACK ROUND NEARSIGHTED GLASSES (always clearly visible); a small cute nose and a warm sweet smile; long straight dark-brown hair with a warm auburn tint, falling past the shoulders, with soft wispy see-through bangs and face-framing strands.
OUTFIT — black sleeveless V-neck knit vest with a thin gold trim along the neckline, over an ivory long-sleeve blouse; black knee-length skirt; small black flat shoes.
STYLE — super cute 3D chibi figurine, Pixar / Disney-like stylized 3D render, soft matte clay-and-vinyl toy material, big round head (about half of the body height), small body, short arms and legs, big sparkly eyes, smooth soft skin with subtle subsurface glow, soft studio lighting with a gentle rim light, warm pastel color grading, high detail, 4K quality. Full body, centered, plain pure white background, soft round contact shadow under the feet, no text, no letters, no logo, no watermark, square 1:1 image.
POSE — bowing slightly with both hands together, grateful smile, holding a small bouquet of pink flowers.
```

### 17 — Đang chạy (màn chờ) · dùng khi: Thanh loading khi đăng nhập · file `17.png`
```
REFERENCE — use the attached image as the exact character reference: keep EXACTLY the same face, glasses, hairstyle, outfit, body proportions, colors and 3D style. Only change the pose and expression described below.
CHARACTER — "Ms. Thao", a young Vietnamese high-school homeroom teacher: a very round, chubby, kind face with full rosy cheeks; gentle crescent-shaped smiling eyes behind THICK BLACK ROUND NEARSIGHTED GLASSES (always clearly visible); a small cute nose and a warm sweet smile; long straight dark-brown hair with a warm auburn tint, falling past the shoulders, with soft wispy see-through bangs and face-framing strands.
OUTFIT — black sleeveless V-neck knit vest with a thin gold trim along the neckline, over an ivory long-sleeve blouse; black knee-length skirt; small black flat shoes.
STYLE — super cute 3D chibi figurine, Pixar / Disney-like stylized 3D render, soft matte clay-and-vinyl toy material, big round head (about half of the body height), small body, short arms and legs, big sparkly eyes, smooth soft skin with subtle subsurface glow, soft studio lighting with a gentle rim light, warm pastel color grading, high detail, 4K quality. Full body, centered, plain pure white background, soft round contact shadow under the feet, no text, no letters, no logo, no watermark, square 1:1 image.
POSE — running happily to the right in side three-quarter view, mid-stride with one leg forward and one back, arms swinging, hair and vest bouncing, a few small dust puffs behind her feet, cheerful determined smile.
```

---

## Bước 3 — Ảnh động (Video Gemini / Veo)
Trong Gemini chọn **Video** (biểu tượng máy quay), **đính kèm ảnh tĩnh** tương ứng, dán khung, gửi. Tải video MP4 về, đặt tên như tiêu đề. Nền xanh lá để Claude tách nền và chuyển thành ảnh động trong app.

### Cô Thảo chạy — màn chờ đăng nhập (QUAN TRỌNG NHẤT) · đính kèm `17.png` · lưu `chay.mp4`
```
Animate the attached image.
REFERENCE — use the attached image as the exact character reference: keep EXACTLY the same face, glasses, hairstyle, outfit, body proportions, colors and 3D style. Only add the motion described below.
CHARACTER — "Ms. Thao", a young Vietnamese high-school homeroom teacher: a very round, chubby, kind face with full rosy cheeks; gentle crescent-shaped smiling eyes behind THICK BLACK ROUND NEARSIGHTED GLASSES (always clearly visible); a small cute nose and a warm sweet smile; long straight dark-brown hair with a warm auburn tint, falling past the shoulders, with soft wispy see-through bangs and face-framing strands.
OUTFIT — black sleeveless V-neck knit vest with a thin gold trim along the neckline, over an ivory long-sleeve blouse; black knee-length skirt; small black flat shoes.
STYLE — super cute 3D chibi figurine, Pixar / Disney-like stylized 3D render, soft matte clay-and-vinyl toy material, big round head (about half of the body height), small body, short arms and legs, big sparkly eyes, smooth soft skin with subtle subsurface glow, soft studio lighting with a gentle rim light, warm pastel color grading, high detail, 4K quality. Full body, centered, solid pure bright green (#00FF00) chroma-key background with no other objects, no shadow on the background, no text, no letters, no logo, no watermark, square 1:1 video.
MOTION — she runs happily in place toward the right in a smooth seamless loop, legs and arms swinging, hair and vest bouncing, small dust puffs behind her feet; the camera follows so she stays centered. Static camera, character fully inside the frame, 2–3 second seamless loop (last frame matches the first), smooth 24 fps.
```

### Vẫy tay chào · đính kèm `1.png` · lưu `chao.mp4`
```
Animate the attached image.
REFERENCE — use the attached image as the exact character reference: keep EXACTLY the same face, glasses, hairstyle, outfit, body proportions, colors and 3D style. Only add the motion described below.
CHARACTER — "Ms. Thao", a young Vietnamese high-school homeroom teacher: a very round, chubby, kind face with full rosy cheeks; gentle crescent-shaped smiling eyes behind THICK BLACK ROUND NEARSIGHTED GLASSES (always clearly visible); a small cute nose and a warm sweet smile; long straight dark-brown hair with a warm auburn tint, falling past the shoulders, with soft wispy see-through bangs and face-framing strands.
OUTFIT — black sleeveless V-neck knit vest with a thin gold trim along the neckline, over an ivory long-sleeve blouse; black knee-length skirt; small black flat shoes.
STYLE — super cute 3D chibi figurine, Pixar / Disney-like stylized 3D render, soft matte clay-and-vinyl toy material, big round head (about half of the body height), small body, short arms and legs, big sparkly eyes, smooth soft skin with subtle subsurface glow, soft studio lighting with a gentle rim light, warm pastel color grading, high detail, 4K quality. Full body, centered, solid pure bright green (#00FF00) chroma-key background with no other objects, no shadow on the background, no text, no letters, no logo, no watermark, square 1:1 video.
MOTION — she waves her right hand side to side twice with a big smile, small happy head tilt, then returns to the start pose. Static camera, character fully inside the frame, 2–3 second seamless loop (last frame matches the first), smooth 24 fps.
```

### Vỗ tay vui · đính kèm `4.png` · lưu `vui.mp4`
```
Animate the attached image.
REFERENCE — use the attached image as the exact character reference: keep EXACTLY the same face, glasses, hairstyle, outfit, body proportions, colors and 3D style. Only add the motion described below.
CHARACTER — "Ms. Thao", a young Vietnamese high-school homeroom teacher: a very round, chubby, kind face with full rosy cheeks; gentle crescent-shaped smiling eyes behind THICK BLACK ROUND NEARSIGHTED GLASSES (always clearly visible); a small cute nose and a warm sweet smile; long straight dark-brown hair with a warm auburn tint, falling past the shoulders, with soft wispy see-through bangs and face-framing strands.
OUTFIT — black sleeveless V-neck knit vest with a thin gold trim along the neckline, over an ivory long-sleeve blouse; black knee-length skirt; small black flat shoes.
STYLE — super cute 3D chibi figurine, Pixar / Disney-like stylized 3D render, soft matte clay-and-vinyl toy material, big round head (about half of the body height), small body, short arms and legs, big sparkly eyes, smooth soft skin with subtle subsurface glow, soft studio lighting with a gentle rim light, warm pastel color grading, high detail, 4K quality. Full body, centered, solid pure bright green (#00FF00) chroma-key background with no other objects, no shadow on the background, no text, no letters, no logo, no watermark, square 1:1 video.
MOTION — she claps her hands three times and does a small happy hop, sparkles pop around her. Static camera, character fully inside the frame, 2–3 second seamless loop (last frame matches the first), smooth 24 fps.
```

### Khen lớn · đính kèm `5.png` · lưu `khen-lon.mp4`
```
Animate the attached image.
REFERENCE — use the attached image as the exact character reference: keep EXACTLY the same face, glasses, hairstyle, outfit, body proportions, colors and 3D style. Only add the motion described below.
CHARACTER — "Ms. Thao", a young Vietnamese high-school homeroom teacher: a very round, chubby, kind face with full rosy cheeks; gentle crescent-shaped smiling eyes behind THICK BLACK ROUND NEARSIGHTED GLASSES (always clearly visible); a small cute nose and a warm sweet smile; long straight dark-brown hair with a warm auburn tint, falling past the shoulders, with soft wispy see-through bangs and face-framing strands.
OUTFIT — black sleeveless V-neck knit vest with a thin gold trim along the neckline, over an ivory long-sleeve blouse; black knee-length skirt; small black flat shoes.
STYLE — super cute 3D chibi figurine, Pixar / Disney-like stylized 3D render, soft matte clay-and-vinyl toy material, big round head (about half of the body height), small body, short arms and legs, big sparkly eyes, smooth soft skin with subtle subsurface glow, soft studio lighting with a gentle rim light, warm pastel color grading, high detail, 4K quality. Full body, centered, solid pure bright green (#00FF00) chroma-key background with no other objects, no shadow on the background, no text, no letters, no logo, no watermark, square 1:1 video.
MOTION — she jumps up raising the gold star with both hands, confetti bursts, she lands smiling. Static camera, character fully inside the frame, 2–3 second seamless loop (last frame matches the first), smooth 24 fps.
```

### Buồn · đính kèm `7.png` · lưu `buon.mp4`
```
Animate the attached image.
REFERENCE — use the attached image as the exact character reference: keep EXACTLY the same face, glasses, hairstyle, outfit, body proportions, colors and 3D style. Only add the motion described below.
CHARACTER — "Ms. Thao", a young Vietnamese high-school homeroom teacher: a very round, chubby, kind face with full rosy cheeks; gentle crescent-shaped smiling eyes behind THICK BLACK ROUND NEARSIGHTED GLASSES (always clearly visible); a small cute nose and a warm sweet smile; long straight dark-brown hair with a warm auburn tint, falling past the shoulders, with soft wispy see-through bangs and face-framing strands.
OUTFIT — black sleeveless V-neck knit vest with a thin gold trim along the neckline, over an ivory long-sleeve blouse; black knee-length skirt; small black flat shoes.
STYLE — super cute 3D chibi figurine, Pixar / Disney-like stylized 3D render, soft matte clay-and-vinyl toy material, big round head (about half of the body height), small body, short arms and legs, big sparkly eyes, smooth soft skin with subtle subsurface glow, soft studio lighting with a gentle rim light, warm pastel color grading, high detail, 4K quality. Full body, centered, solid pure bright green (#00FF00) chroma-key background with no other objects, no shadow on the background, no text, no letters, no logo, no watermark, square 1:1 video.
MOTION — her shoulders drop, she hugs her notebook and sighs softly, a small sweat drop slides down. Static camera, character fully inside the frame, 2–3 second seamless loop (last frame matches the first), smooth 24 fps.
```

### Giận dễ thương · đính kèm `10.png` · lưu `gian.mp4`
```
Animate the attached image.
REFERENCE — use the attached image as the exact character reference: keep EXACTLY the same face, glasses, hairstyle, outfit, body proportions, colors and 3D style. Only add the motion described below.
CHARACTER — "Ms. Thao", a young Vietnamese high-school homeroom teacher: a very round, chubby, kind face with full rosy cheeks; gentle crescent-shaped smiling eyes behind THICK BLACK ROUND NEARSIGHTED GLASSES (always clearly visible); a small cute nose and a warm sweet smile; long straight dark-brown hair with a warm auburn tint, falling past the shoulders, with soft wispy see-through bangs and face-framing strands.
OUTFIT — black sleeveless V-neck knit vest with a thin gold trim along the neckline, over an ivory long-sleeve blouse; black knee-length skirt; small black flat shoes.
STYLE — super cute 3D chibi figurine, Pixar / Disney-like stylized 3D render, soft matte clay-and-vinyl toy material, big round head (about half of the body height), small body, short arms and legs, big sparkly eyes, smooth soft skin with subtle subsurface glow, soft studio lighting with a gentle rim light, warm pastel color grading, high detail, 4K quality. Full body, centered, solid pure bright green (#00FF00) chroma-key background with no other objects, no shadow on the background, no text, no letters, no logo, no watermark, square 1:1 video.
MOTION — she puffs her cheeks, stomps one foot twice with hands on hips, the cute anger mark pulses — adorable, not scary. Static camera, character fully inside the frame, 2–3 second seamless loop (last frame matches the first), smooth 24 fps.
```

### Cảm ơn · đính kèm `16.png` · lưu `cam-on.mp4`
```
Animate the attached image.
REFERENCE — use the attached image as the exact character reference: keep EXACTLY the same face, glasses, hairstyle, outfit, body proportions, colors and 3D style. Only add the motion described below.
CHARACTER — "Ms. Thao", a young Vietnamese high-school homeroom teacher: a very round, chubby, kind face with full rosy cheeks; gentle crescent-shaped smiling eyes behind THICK BLACK ROUND NEARSIGHTED GLASSES (always clearly visible); a small cute nose and a warm sweet smile; long straight dark-brown hair with a warm auburn tint, falling past the shoulders, with soft wispy see-through bangs and face-framing strands.
OUTFIT — black sleeveless V-neck knit vest with a thin gold trim along the neckline, over an ivory long-sleeve blouse; black knee-length skirt; small black flat shoes.
STYLE — super cute 3D chibi figurine, Pixar / Disney-like stylized 3D render, soft matte clay-and-vinyl toy material, big round head (about half of the body height), small body, short arms and legs, big sparkly eyes, smooth soft skin with subtle subsurface glow, soft studio lighting with a gentle rim light, warm pastel color grading, high detail, 4K quality. Full body, centered, solid pure bright green (#00FF00) chroma-key background with no other objects, no shadow on the background, no text, no letters, no logo, no watermark, square 1:1 video.
MOTION — she bows slightly with hands together, then holds up the small bouquet and smiles. Static camera, character fully inside the frame, 2–3 second seamless loop (last frame matches the first), smooth 24 fps.
```

**Không làm được video?** Làm 4 ảnh tĩnh cho động tác chạy: dùng khung số 17, thêm cuối câu POSE lần lượt `Running cycle keyframe 1 of 4: right leg forward.` / `2 of 4: both feet passing, body up.` / `3 of 4: left leg forward.` / `4 of 4: both feet passing, body down.` → lưu `chay-1.png` … `chay-4.png`. Claude ghép thành ảnh động.

---

## Bước 4 — Gửi cho Claude
Gửi `goc.png`, các ảnh `1.png` … `17.png` và các video (`chay.mp4`, …) vào khung chat. Claude sẽ tách nền, thu nhỏ (ảnh 30–60 KB, ảnh động 150–300 KB) và thay toàn bộ chibi 2D hiện tại. **Chưa đủ cũng gửi được** — ảnh nào thiếu, app tạm dùng hình vẽ cũ.

> Ưu tiên làm trước: `goc.png` → `17.png` + `chay.mp4` (màn chờ) → `1.png` (chào) → `4.png`, `7.png`, `10.png` (vui / buồn / giận).
