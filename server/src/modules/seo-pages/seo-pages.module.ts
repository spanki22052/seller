import { Module } from "@nestjs/common";
import { SeoPagesController } from "./seo-pages.controller";
import { SeoPagesService } from "./seo-pages.service";
import { PrismaModule } from "../../shared/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [SeoPagesController],
  providers: [SeoPagesService],
  exports: [SeoPagesService],
})
export class SeoPagesModule {}
