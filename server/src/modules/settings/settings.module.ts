import { Module } from "@nestjs/common";
import { SettingsController } from "./settings.controller";
import { SettingsService } from "./settings.service";
import { PrismaModule } from "../../shared/prisma/prisma.module";
import { MinioModule } from "../../shared/minio/minio.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [PrismaModule, MinioModule, AuthModule],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
