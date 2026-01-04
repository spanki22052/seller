import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    rawBody: false,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT") || 3002;

  // Note: File upload size limits are configured in:
  // 1. Multer FileInterceptor (per route) - see files.controller.ts
  // 2. Nginx client_max_body_size - see client_admin/nginx.conf

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

  // CORS configuration
  const corsOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
    : [
        "http://62.181.53.211:3000", // Client (Production)
        "http://62.181.53.211:3001", // Client Admin (Production)
        "http://62.181.53.211:3002", // Server (for Swagger)
        "http://localhost:3000", // Client (Development)
        "http://localhost:3001", // Client Admin (Development)
        "http://localhost:3002", // Server (Development)
      ];

  const isDevelopment = process.env.NODE_ENV !== "production";

  // Simplified CORS configuration following NestJS best practices
  // https://docs.nestjs.com/security/cors
  app.enableCors({
    origin: isDevelopment
      ? (origin, callback) => {
          // In development: allow all localhost origins and requests with no origin
          if (!origin || origin.includes("localhost") || origin.includes("127.0.0.1")) {
            callback(null, true);
          } else if (corsOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error(`Not allowed by CORS: ${origin}`));
          }
        }
      : corsOrigins, // In production: strict origin list
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
    exposedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

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
