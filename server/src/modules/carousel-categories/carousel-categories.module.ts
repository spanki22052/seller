import { Module } from "@nestjs/common";
import { CarouselCategoriesController } from "./carousel-categories.controller";
import { CarouselCategoriesService } from "./carousel-categories.service";
import { PrismaModule } from "../../shared/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [CarouselCategoriesController],
  providers: [CarouselCategoriesService],
  exports: [CarouselCategoriesService],
})
export class CarouselCategoriesModule {}
