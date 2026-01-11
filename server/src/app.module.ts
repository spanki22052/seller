import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./shared/prisma/prisma.module";
import { MinioModule } from "./shared/minio/minio.module";
import { AuthModule } from "./modules/auth/auth.module";
import { GamesModule } from "./modules/games/games.module";
import { BrandsModule } from "./modules/brands/brands.module";
import { CategoriesModule } from "./modules/categories/categories.module";
import { CarouselCategoriesModule } from "./modules/carousel-categories/carousel-categories.module";
import { CheatsModule } from "./modules/cheats/cheats.module";
import { FilesModule } from "./modules/files/files.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { SettingsModule } from "./modules/settings/settings.module";
import { HomeLinksModule } from "./modules/home-links/home-links.module";
import { FaqsModule } from "./modules/faqs/faqs.module";
import { SeoPagesModule } from "./modules/seo-pages/seo-pages.module";
import { HealthModule } from "./modules/health/health.module";

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
    BrandsModule,
    CategoriesModule,
    CarouselCategoriesModule,
    CheatsModule,
    FilesModule,
    DashboardModule,
    SettingsModule,
    HomeLinksModule,
    FaqsModule,
    SeoPagesModule,
    HealthModule,
  ],
})
export class AppModule {}
