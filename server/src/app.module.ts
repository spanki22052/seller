import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./shared/prisma/prisma.module";
import { MinioModule } from "./shared/minio/minio.module";
import { AuthModule } from "./modules/auth/auth.module";
import { GamesModule } from "./modules/games/games.module";
import { CheatsModule } from "./modules/cheats/cheats.module";
import { FilesModule } from "./modules/files/files.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { SettingsModule } from "./modules/settings/settings.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.local", ".env"],
    }),
    PrismaModule,
    MinioModule,
    AuthModule,
    GamesModule,
    CheatsModule,
    FilesModule,
    DashboardModule,
    SettingsModule,
  ],
})
export class AppModule {}

