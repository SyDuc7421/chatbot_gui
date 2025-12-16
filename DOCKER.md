# Chatbot GUI - Docker Setup

## Build và chạy với Docker

### Build image

```bash
docker build -t chatbot-gui .
```

### Run container

**Với default backend URL:**

```bash
docker run -d \
  --name chatbot-gui \
  -p 3000:3000 \
  chatbot-gui
```

**Với custom backend URL (có thể thay đổi mỗi lần run):**

```bash
docker run -d \
  --name chatbot-gui \
  -p 3000:3000 \
  -e BACKEND_URL=http://your-api-url/api/v1 \
  chatbot-gui
```

### Xem logs

```bash
docker logs -f chatbot-gui
```

### Stop và remove container

```bash
docker stop chatbot-gui
docker rm chatbot-gui
```

### Remove image

```bash
docker rmi chatbot-gui
```

## Environment Variables

**BACKEND_URL** - Backend API endpoint (default: http://localhost:8080/api/v1)

- ✅ Có thể thay đổi lúc runtime qua `-e BACKEND_URL=...`
- ✅ Không cần rebuild image khi đổi URL

## Architecture

App sử dụng server-side proxy:

- Client → `/api/chat` (Next.js API route)
- API route → Backend (dùng `BACKEND_URL`)

Điều này cho phép thay đổi backend URL lúc runtime mà không cần rebuild!

## Truy cập

App sẽ chạy tại: http://localhost:3000

## Notes

- Image sử dụng Node.js 20 Alpine (nhỏ gọn)
- Standalone output mode cho Next.js
- Multi-stage build để optimize kích thước image
- Non-root user để tăng bảo mật
