import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class ReviewDigitalSellerDto {
  @ApiProperty({
    description: "Seller ID in Digital Seller",
    example: "123456",
  })
  @IsString()
  @IsNotEmpty()
  sellerId!: string;

  @ApiProperty({
    description: "Product ID in Digital Seller",
    example: "789012",
  })
  @IsString()
  @IsNotEmpty()
  productId!: string;
}
