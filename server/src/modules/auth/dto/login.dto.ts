import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class LoginDto {
  @ApiProperty({
    description: "Admin login",
    example: "cheatAdmin",
  })
  @IsString()
  @IsNotEmpty()
  login!: string;

  @ApiProperty({
    description: "Admin password",
    example: "cheat777",
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}

