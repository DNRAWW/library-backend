import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Min } from 'class-validator';

export class GiveBookDto {
  @ApiProperty()
  @Type(() => Number)
  @Min(1)
  userId: number;

  @ApiProperty()
  @Type(() => Number)
  @Min(1)
  bookId: number;
}
