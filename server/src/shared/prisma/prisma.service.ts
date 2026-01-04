import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log("Database connection established");

    // Soft delete middleware implementation
    this.$use(async (params, next) => {
      if (["findUnique", "findMany", "findFirst"].includes(params.action)) {
        if (!params.args) {
          params.args = {};
        }
        if (!params.args.where) {
          params.args.where = {};
        }
        // Only add deletedAt filter if not already specified
        if (params.args.where.deletedAt === undefined) {
          params.args.where.deletedAt = null;
        }
      }
      return next(params);
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log("Database connection closed");
  }
}

