import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';

export class HistorySearchQueryDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  userId?: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  bookId?: number;
}
