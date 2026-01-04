import { Module } from "@nestjs/common";
import { GamesController } from "./games.controller";
import { GamesService } from "./games.service";
import { PrismaModule } from "../../shared/prisma/prisma.module";
import { MinioModule } from "../../shared/minio/minio.module";

@Module({
  imports: [PrismaModule, MinioModule],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesService],
})
export class GamesModule {}

