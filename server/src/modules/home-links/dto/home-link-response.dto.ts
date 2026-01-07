import { ApiProperty } from "@nestjs/swagger";

export class HomeLinkResponseDto {
  @ApiProperty({
    description: "Home link ID",
    example: "cm0q8x8x8x8x8x8x8x8x8",
  })
  id!: string;

  @ApiProperty({
    description: "Link title",
    example: "Новые релизы",
  })
  title!: string;

  @ApiProperty({
    description: "Link URL",
    example: "/new-releases",
  })
  url!: string;

  @ApiProperty({
    description: "Link description",
    example: "Посмотрите наши свежие обновления",
  })
  description!: string | null;

  @ApiProperty({
    description: "Is link active",
    example: true,
  })
  isActive!: boolean;

  @ApiProperty({
    description: "Sort order",
    example: 0,
  })
  sortOrder!: number;

  @ApiProperty({
    description: "Link creation date",
    example: "2023-12-01T10:00:00.000Z",
  })
  createdAt!: Date;

  @ApiProperty({
    description: "Link last update date",
    example: "2023-12-01T10:00:00.000Z",
  })
  updatedAt!: Date;
}
