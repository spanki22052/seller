import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsEnum, IsOptional, ValidateIf } from "class-validator";

export enum PriceCurrency {
  RUB = "RUB",
  USD = "USD",
}

export class CheatPriceDto {
  @ApiProperty({
    description: "Price amount (null for 'coming soon' items)",
    example: 170,
    required: false,
    nullable: true,
  })
  @ValidateIf((o) => o.amount !== null)
  @IsNumber()
  @IsOptional()
  amount!: number | null;

  @ApiProperty({
    description: "Price currency",
    enum: PriceCurrency,
    example: PriceCurrency.RUB,
  })
  @IsEnum(PriceCurrency)
  currency!: PriceCurrency;
}

