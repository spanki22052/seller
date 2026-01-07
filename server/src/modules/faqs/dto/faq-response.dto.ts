import { ApiProperty } from "@nestjs/swagger";

export class FaqResponseDto {
  @ApiProperty({
    description: "FAQ ID",
    example: "ckp1f8qkz0000abcdefgh",
  })
  id!: string;

  @ApiProperty({
    description: "FAQ question",
    example: "Какие способы оплаты вы принимаете?",
  })
  question!: string;

  @ApiProperty({
    description: "FAQ answer",
    example: "Мы принимаем различные способы оплаты, включая кредитные карты, PayPal и криптовалюту.",
  })
  answer!: string;

  @ApiProperty({
    description: "Is FAQ active",
    example: true,
  })
  isActive!: boolean;

  @ApiProperty({
    description: "Sort order",
    example: 0,
  })
  sortOrder!: number;

  @ApiProperty({
    description: "Creation date",
    example: "2023-01-01T00:00:00.000Z",
  })
  createdAt!: Date;

  @ApiProperty({
    description: "Last update date",
    example: "2023-01-01T00:00:00.000Z",
  })
  updatedAt!: Date;
}
