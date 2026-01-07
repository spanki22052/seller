import { Module } from "@nestjs/common";
import { FaqsController } from "./faqs.controller";
import { FaqsService } from "./faqs.service";
import { PrismaModule } from "../../shared/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [FaqsController],
  providers: [FaqsService],
  exports: [FaqsService],
})
export class FaqsModule {}
