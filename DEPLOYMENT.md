# Deployment Instructions

This guide provides instructions for deploying the Jiaminie Info Desk application, including the Next.js web server and the background worker process.

## Prerequisites

- **Node.js** (v18 or later)
- **npm**
- **Docker** & **Docker Compose** (for Docker deployment)
- **PostgreSQL Database** (e.g., Neon, AWS RDS, or local)
- **Environment Variables**: Ensure you have a `.env` file with the following:
  ```env
  DATABASE_URL="postgresql://..."
  GOOGLE_API_KEY="AIza..."
  FACEBOOK_PAGE_ACCESS_TOKEN="EAAG..."
  NEXT_PUBLIC_APP_URL="https://your-domain.com"
  ```

---

## Option 1: Docker Deployment (Recommended)

This method uses Docker Compose to run both the web application and the background worker in separate containers.

### 1. Build and Run
Run the following command in the root directory:

```bash
docker-compose up --build -d
```

This will:
- Build the Docker image.
- Start the `app` container (Next.js) on port `3000`.
- Start the `worker` container (Background process).

### 2. Verify Deployment
- **Web App**: Visit `http://localhost:3000`.
- **Logs**: Check logs with `docker-compose logs -f`.

### 3. Stopping
To stop the containers:
```bash
docker-compose down
```

---

## Option 2: Manual Deployment (Without Docker)

If you prefer to run the application directly on a server (e.g., Ubuntu, Vercel + Worker).

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Prisma Client
```bash
npx prisma generate
```

### 3. Build the Application
```bash
npm run build
```

### 4. Start the Web Server
You can use a process manager like `pm2` to keep the app running.

```bash
# Using npm
npm start

# OR using PM2 (Recommended for production)
npm install -g pm2
pm2 start npm --name "jiaminie-web" -- start
```

### 5. Start the Worker
The worker needs to run alongside the web server to handle background tasks (like publishing posts).

```bash
# Using tsx directly (Development/Simple)
npx tsx src/worker/index.ts

# OR using PM2 (Recommended for production)
pm2 start "npx tsx src/worker/index.ts" --name "jiaminie-worker"
```

### 6. Save PM2 List (Optional)
To ensure processes restart on reboot:
```bash
pm2 save
pm2 startup
```

---

## Database Migrations

Regardless of the deployment method, ensure your production database schema is up to date.

```bash
npx prisma migrate deploy
```
