import { Module } from "@nestjs/common";
import { CheatsController } from "./cheats.controller";
import { CheatsService } from "./cheats.service";
import { PrismaModule } from "../../shared/prisma/prisma.module";
import { MinioModule } from "../../shared/minio/minio.module";

@Module({
  imports: [PrismaModule, MinioModule],
  controllers: [CheatsController],
  providers: [CheatsService],
  exports: [CheatsService],
})
export class CheatsModule {}

