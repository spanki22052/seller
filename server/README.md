# Seller Server

NestJS backend application with Prisma, PostgreSQL, and MinIO.

## Tech Stack

- **Framework**: NestJS 10+
- **Database**: PostgreSQL 16 with Prisma ORM
- **Object Storage**: MinIO
- **Language**: TypeScript (strict mode)
- **Documentation**: Swagger/OpenAPI

## Prerequisites

- Node.js 20+
- Docker & Docker Compose
- npm

## Quick Start

### 1. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

The `.env.example` file contains secure default passwords. For production, change all passwords.

### 2. Run with Docker Compose (Recommended)

Start all services (Postgres, MinIO, and Backend):

```bash
docker-compose up
```

This will:

- Start PostgreSQL on port `5432`
- Start MinIO on port `9000` (API) and `9001` (Console)
- Start NestJS backend on port `3000`
- Automatically create required MinIO buckets
- Run database migrations

### 3. Access Services

- **API**: http://localhost:3000
- **Swagger Docs**: http://localhost:3000/api/docs
- **MinIO Console**: http://localhost:9001
  - Username: `admin` (from .env.example)
  - Password: `minio_secure_password_2024` (from .env.example)

### 4. Database Migrations

When running in Docker, migrations run automatically. For manual migration:

```bash
# Inside Docker container
docker-compose exec backend npm run prisma:migrate

# Or locally (requires local Postgres)
npm run prisma:migrate
```

### 5. Prisma Studio

View and edit database data:

```bash
npm run prisma:studio
```

## Development

### Local Development (without Docker)

1. **Start Postgres and MinIO**:

```bash
docker-compose up postgres minio
```

2. **Install dependencies**:

```bash
npm install
```

3. **Generate Prisma Client**:

```bash
npm run prisma:generate
```

4. **Run migrations**:

```bash
npm run prisma:migrate
```

5. **Start development server**:

```bash
npm run start:dev
```

## Project Structure

```
server/
├── src/
│   ├── common/           # Shared utilities, decorators, filters
│   ├── modules/          # Feature modules
│   ├── shared/           # Infrastructure (Prisma, MinIO)
│   │   ├── prisma/
│   │   └── minio/
│   └── main.ts
├── prisma/
│   └── schema.prisma     # Database schema
├── docker-compose.yml    # Docker orchestration
├── Dockerfile           # Multi-stage build
└── .env.example         # Environment template
```

## Environment Variables

### Required Variables

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT token signing (required for authentication)
- `JWT_EXPIRES_IN`: JWT token expiration time (default: "24h")
- `MINIO_ENDPOINT`: MinIO endpoint (localhost or minio for Docker)
- `MINIO_PORT`: MinIO port (9000)
- `MINIO_ACCESS_KEY`: MinIO access key
- `MINIO_SECRET_KEY`: MinIO secret key
- `MINIO_BUCKET_PUBLIC`: Public bucket name
- `MINIO_BUCKET_PRIVATE`: Private bucket name

See `.env.example` for all available variables.

## Database

### Default Credentials (Development)

- **Database**: `seller_db`
- **User**: `seller_user`
- **Password**: `seller_secure_password_2024`

**⚠️ Change these in production!**

## MinIO

### Default Credentials (Development)

- **Access Key**: `admin`
- **Secret Key**: `minio_secure_password_2024`

**⚠️ Change these in production!**

### Buckets

The service automatically creates three buckets on startup:

- `public`: Publicly accessible files
- `private`: Private files (requires presigned URLs)
- `media`: Large media files (videos, etc.)

## Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start:prod` - Start production server
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Production Deployment

1. Build the Docker image:

```bash
docker build --target production -t seller-backend .
```

2. Use production environment variables
3. Run migrations:

```bash
npm run prisma:migrate:deploy
```

4. Start the server:

```bash
npm run start:prod
```

## Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running: `docker-compose ps`
- Check connection string in `.env`
- Verify health check: `docker-compose logs postgres`

### MinIO Connection Issues

- Ensure MinIO is running: `docker-compose ps`
- Check MinIO console: http://localhost:9001
- Verify credentials in `.env`

### Port Conflicts

If ports are already in use, modify them in `docker-compose.yml` and `.env`.

## License

MIT
