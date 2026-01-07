import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, Min } from "class-validator";

export class UpdateFaqDto {
  @ApiProperty({
    description: "FAQ question",
    example: "Какие способы оплаты вы принимаете?",
    required: false,
  })
  @IsString()
  @IsOptional()
  question?: string;

  @ApiProperty({
    description: "FAQ answer",
    example: "Мы принимаем различные способы оплаты, включая кредитные карты, PayPal и криптовалюту.",
    required: false,
  })
  @IsString()
  @IsOptional()
  answer?: string;

  @ApiProperty({
    description: "Is FAQ active",
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    description: "Sort order",
    example: 0,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  sortOrder?: number;
}
