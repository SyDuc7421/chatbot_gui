# Self-RAG Chatbot GUI

A modern chatbot application built with Next.js 15, featuring Retrieval-Augmented Generation (RAG) capabilities.

## Prerequisites

- Node.js 20 or higher
- pnpm (recommended) or npm
- Docker (optional, for containerized deployment)

## Local Development

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment

Create a `.env` file:

```env
BACKEND_URL=http://localhost:8080/api/v1
```

### 3. Run development server

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production

```bash
pnpm run build
pnpm run start
```

## Docker Deployment

### Build Docker image

```bash
docker build -t chatbot-gui .
```

### Run with Docker

**Using environment file:**

```bash
docker run -d \
  --name chatbot-gui \
  -p 3000:3000 \
  --env-file .env \
  chatbot-gui
```

**Using inline environment variable:**

```bash
docker run -d \
  --name chatbot-gui \
  -p 3000:3000 \
  -e BACKEND_URL=http://your-backend-url/api/v1 \
  chatbot-gui
```

### Docker with Network (for multi-container setup)

```bash
# Create network
docker network create chatbot-network

# Run backend
docker run -d \
  --name backend-api \
  --network chatbot-network \
  -p 8080:8080 \
  your-backend-image

# Run frontend
docker run -d \
  --name chatbot-gui \
  --network chatbot-network \
  -p 3000:3000 \
  -e BACKEND_URL=http://backend-api:8080/api/v1 \
  chatbot-gui
```

### Docker commands

```bash
# View logs
docker logs -f chatbot-gui

# Stop and remove
docker stop chatbot-gui
docker rm chatbot-gui

# Restart
docker restart chatbot-gui
```

## Environment Variables

| Variable      | Description          | Default                        |
| ------------- | -------------------- | ------------------------------ |
| `BACKEND_URL` | Backend API endpoint | `http://localhost:8080/api/v1` |

**Note**:

- When running in Docker, use `http://host.docker.internal:8080/api/v1` to access host machine
- When using Docker networks, use container name: `http://backend-api:8080/api/v1`

## Troubleshooting

**Backend connection issues:**

- Verify `BACKEND_URL` in `.env`
- If using Docker, use `host.docker.internal` instead of `localhost`

**Port already in use:**

```bash
# Use different port
docker run -d --name chatbot-gui -p 8080:3000 chatbot-gui
```

---

Made with Next.js 15 and TypeScript
