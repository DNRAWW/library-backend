import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, Length, Min } from 'class-validator';

export class SearchBooksDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  authorId?: number | undefined;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  title?: string | undefined;
}
