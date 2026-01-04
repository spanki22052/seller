import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../../../shared/prisma/prisma.service";

export interface JwtPayload {
  sub: string;
  login: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>("JWT_SECRET"),
    });
  }

  async validate(payload: JwtPayload) {
    const admin = await this.prisma.admin.findUnique({
      where: { id: payload.sub, deletedAt: null },
    });

    if (!admin) {
      throw new UnauthorizedException("Admin not found");
    }

    return { id: admin.id, login: admin.login };
  }
}

