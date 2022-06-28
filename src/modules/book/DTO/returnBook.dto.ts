import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Min } from 'class-validator';

export class ReturnBookDto {
  @ApiProperty()
  @Type(() => Number)
  @Min(1)
  bookId: number;
}
