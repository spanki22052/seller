import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../shared/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto/login.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { JwtPayload } from "./strategies/jwt.strategy";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    console.log(loginDto);
    const admin = await this.prisma.admin.findFirst({
      where: { login: loginDto.login, deletedAt: null },
    });

    if (!admin) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, admin.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload: JwtPayload = {
      sub: admin.id,
      login: admin.login,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      login: admin.login,
    };
  }

  async validateAdmin(adminId: string) {
    const admin = await this.prisma.admin.findFirst({
      where: { id: adminId, deletedAt: null },
    });

    if (!admin) {
      throw new UnauthorizedException("Admin not found");
    }

    return admin;
  }
}
