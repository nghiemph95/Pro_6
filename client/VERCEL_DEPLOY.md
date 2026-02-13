# Deploy lên Vercel – Checklist

## 1. Cài đặt project trên Vercel

- **Root Directory**: Trong Vercel Project Settings → General → **Root Directory** chọn **`client`** (chỉ build thư mục client).
- **Framework Preset**: Create React App (đã set trong `vercel.json`).
- **Build Command / Output**: Để mặc định (đã cấu hình trong `vercel.json`).

## 2. Biến môi trường (nếu cần)

- Nếu bạn có backend riêng cho form Liên hệ, thêm biến:
  - `REACT_APP_API_URL` = URL backend (vd: `https://api.xxx.com`).
- Trên Vercel: Project → Settings → Environment Variables.

## 3. File PDF CV

- Để nút "Download CV" hoạt động, đặt file **`Pham_Nguyen_Thanh_Nghiem.pdf`** vào thư mục **`client/public/`**.
- File trong `public/` sẽ được copy vào thư mục build và phục vụ tại `/Pham_Nguyen_Thanh_Nghiem.pdf`.

## 4. Giao diện vẫn là bản cũ sau khi deploy?

Làm lần lượt:

1. **Root Directory phải là `client`**
   - Vercel Dashboard → Project → **Settings** → **General** → **Root Directory**.
   - Phải là **`client`** (không để trống). Nếu để trống, Vercel build từ repo root → không có app React → có thể đang xem bản build cũ hoặc lỗi.

2. **Redeploy và xóa cache**
   - Vercel → **Deployments** → menu ⋮ ở deployment mới nhất → **Redeploy**.
   - Bật **"Clear build cache and redeploy"** (hoặc tương tự) rồi bấm Redeploy.

3. **Đúng branch và code mới nhất**
   - Settings → **Git** → **Production Branch** (thường là `main`). Đảm bảo bạn đang push code vào đúng branch này.
   - Trên máy: `git status`, `git push origin main` (hoặc branch production của bạn) để chắc chắn code mới đã lên.

4. **Kiểm tra đã lên bản mới**
   - Bản mới có: **"Senior Fullstack Engineer"**, **"Download CV"**, **tech badges** (ReactJS, AWS, …), **"Available for Opportunities"**, mô tả "Building scalable web applications...".
   - Bản cũ có: **"Full Stack"** (chữ in nghiêng), **"Get Resume"**, **"Skills: C, JavaScript, TypeScript..."**.
   - Sau khi redeploy, mở site bằng **cửa sổ ẩn danh** hoặc **hard refresh** (Ctrl+Shift+R / Cmd+Shift+R) để tránh cache trình duyệt.

## 5. Đã cấu hình sẵn

- **rewrites** trong `vercel.json` (SPA).
- **`client/.nvmrc`** (Node 20).
- Form contact dùng `REACT_APP_API_URL` khi có.
