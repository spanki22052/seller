import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, Min } from "class-validator";

export class CreateFaqDto {
  @ApiProperty({
    description: "FAQ question",
    example: "Какие способы оплаты вы принимаете?",
  })
  @IsString()
  @IsNotEmpty()
  question!: string;

  @ApiProperty({
    description: "FAQ answer",
    example:
      "Мы принимаем различные способы оплаты, включая кредитные карты, PayPal и криптовалюту.",
  })
  @IsString()
  @IsNotEmpty()
  answer!: string;

  @ApiProperty({
    description: "Is FAQ active",
    example: true,
    required: false,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    description: "Sort order",
    example: 0,
    required: false,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  sortOrder?: number;
}
