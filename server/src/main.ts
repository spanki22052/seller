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

  // CORS configuration with manual middleware
  const corsOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
    : [
        "http://62.181.53.211:3000", // Client (Production - HTTP)
        "https://62.181.53.211:3000", // Client (Production - HTTPS)
        "http://62.181.53.211:3001", // Client Admin (Production - HTTP)
        "https://62.181.53.211:3001", // Client Admin (Production - HTTPS)
        "http://62.181.53.211:3002", // Server (for Swagger)
        "http://localhost:3000", // Client (Development)
        "http://localhost:3001", // Client Admin (Development)
        "http://localhost:3002", // Server (Development)
      ];

  // Ensure development origins are always included in development
  if (configService.get<string>("NODE_ENV") === "development") {
    const devOrigins = ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"];
    devOrigins.forEach((origin) => {
      if (!corsOrigins.includes(origin)) {
        corsOrigins.push(origin);
      }
    });
  }

  // Manual CORS middleware - handle preflight and actual requests
  // IMPORTANT: Access-Control-Allow-Credentials can ONLY be set when Access-Control-Allow-Origin is also set
  app.use((req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;
    const isOriginAllowed = origin && corsOrigins.includes(origin);

    // For preflight OPTIONS requests
    if (req.method === "OPTIONS") {
      if (isOriginAllowed) {
        // Set all CORS headers together - credentials MUST be set with origin
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
        res.header(
          "Access-Control-Allow-Headers",
          "Content-Type,Authorization,X-Requested-With,Accept,Origin",
        );
        res.header("Access-Control-Expose-Headers", "Content-Type,Authorization");
        res.header("Access-Control-Max-Age", "86400"); // Cache preflight for 24 hours
        res.sendStatus(204);
      } else {
        // For OPTIONS requests from non-allowed origins, respond without CORS headers
        console.warn(`CORS: Blocking OPTIONS request from disallowed origin: ${origin}`);
        res.sendStatus(204);
      }
      return;
    }

    // For actual requests, set CORS headers if origin is allowed
    if (isOriginAllowed) {
      // Set all CORS headers together - credentials MUST be set with origin
      res.header("Access-Control-Allow-Origin", origin);
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type,Authorization,X-Requested-With,Accept,Origin",
      );
      res.header("Access-Control-Expose-Headers", "Content-Type,Authorization");
    }

    next();
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
