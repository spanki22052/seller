import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { Request, Response, NextFunction } from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    rawBody: false,
  });

  const configService = app.get(ConfigService);
  const port =
    configService.get<number>("PORT") || (process.env.NODE_ENV === "development" ? 3005 : 3002);

  // Note: File upload size limits are configured in:
  // 1. Multer FileInterceptor (per route) - see files.controller.ts
  // 2. Nginx client_max_body_size - see client_admin/nginx.conf

  // Enable CORS using NestJS built-in support - MUST be before global prefix
  const defaultCorsOrigins = [
    "http://62.181.53.211:3000", // Client (Production - HTTP)
    "https://62.181.53.211:3000", // Client (Production - HTTPS)
    "http://62.181.53.211:3001", // Client Admin (Production - HTTP)
    "https://62.181.53.211:3001", // Client Admin (Production - HTTPS)
    "http://62.181.53.211:3002", // Server (for Swagger)
    "http://localhost:3000", // Client (Development)
    "http://localhost:3001", // Client Admin (Development)
    "http://localhost:3002", // Server (Development)
  ];

  const corsOrigins = process.env.CORS_ORIGIN
    ? [...defaultCorsOrigins, ...process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())]
    : defaultCorsOrigins;

  // Ensure development origins are always included in development
  if (configService.get<string>("NODE_ENV") === "development") {
    const devOrigins = ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"];
    devOrigins.forEach((origin) => {
      if (!corsOrigins.includes(origin)) {
        corsOrigins.push(origin);
      }
    });
  }

  console.log(`CORS: Enabling CORS for origins: ${corsOrigins.join(', ')}`);

  // Use NestJS built-in CORS support with proper origin checking
  app.enableCors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    exposedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400, // 24 hours
  });

  // Global API prefix
  app.setGlobalPrefix("api");

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle("Seller API")
    .setDescription("Seller API documentation")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  // Graceful shutdown
  process.on("SIGTERM", async () => {
    await app.close();
  });

  process.on("SIGINT", async () => {
    await app.close();
  });

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/api/docs`);
}

bootstrap();
