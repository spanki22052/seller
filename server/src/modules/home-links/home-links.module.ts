import { Module } from "@nestjs/common";
import { HomeLinksController } from "./home-links.controller";
import { HomeLinksService } from "./home-links.service";
import { PrismaModule } from "../../shared/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [HomeLinksController],
  providers: [HomeLinksService],
  exports: [HomeLinksService],
})
export class HomeLinksModule {}
