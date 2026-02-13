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

## 4. Sau khi chỉnh

- Đã thêm **rewrites** trong `vercel.json` để SPA chạy đúng (mọi route trả về `index.html`).
- Đã thêm **`client/.nvmrc`** (Node 20) để build dùng đúng phiên bản Node.
- Form contact dùng `REACT_APP_API_URL` khi có; không set thì gọi relative `/contact` (chỉ hoạt động nếu có proxy/backend).

Sau khi set Root Directory = `client` và deploy lại, giao diện trên Vercel sẽ khớp với khi chạy local (build từ cùng thư mục `client`).
