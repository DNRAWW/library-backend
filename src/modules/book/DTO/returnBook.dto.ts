import { Type } from 'class-transformer';
import { Min } from 'class-validator';

export class ReturnBookDto {
  @Type(() => Number)
  @Min(1)
  bookId: number;
}
