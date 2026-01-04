import { Module } from "@nestjs/common";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { PrismaModule } from "../../shared/prisma/prisma.module";

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => {
        const expiresIn = configService.get<string>("JWT_EXPIRES_IN") || "24h";
        return {
          secret: configService.getOrThrow<string>("JWT_SECRET"),
          signOptions: {
            expiresIn: expiresIn as any,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
