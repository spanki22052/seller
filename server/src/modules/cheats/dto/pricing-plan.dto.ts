import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsEnum, IsBoolean, IsNotEmpty, IsOptional } from "class-validator";
import { PriceCurrency } from "./cheat-price.dto";

export class PricingPlanDto {
  @ApiProperty({
    description: "Pricing plan ID",
    example: "plan-1-day",
  })
  @IsString()
  @IsNotEmpty()
  id!: string;

  @ApiProperty({
    description: "Duration display text",
    example: "1 день",
  })
  @IsString()
  @IsNotEmpty()
  duration!: string;

  @ApiProperty({
    description: "Duration in days",
    example: 1,
  })
  @IsNumber()
  durationDays!: number;

  @ApiProperty({
    description: "Price amount",
    example: 170,
  })
  @IsNumber()
  price!: number;

  @ApiProperty({
    description: "Price currency",
    enum: PriceCurrency,
    example: PriceCurrency.RUB,
  })
  @IsEnum(PriceCurrency)
  currency!: PriceCurrency;

  @ApiProperty({
    description: "Plan image URL",
    example: "/images/pricing/1-day.png",
    required: false,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: "Whether the plan is available",
    example: true,
  })
  @IsBoolean()
  isAvailable!: boolean;

  @ApiProperty({
    description: "Redirect URL for purchase button",
    example: "https://example.com/buy",
    required: false,
  })
  @IsString()
  @IsOptional()
  redirectUrl?: string;

  @ApiProperty({
    description: "Plan description",
    example: "Best value for long-term use",
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
