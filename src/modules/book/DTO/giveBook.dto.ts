import { Type } from 'class-transformer';
import { Min } from 'class-validator';

export class GiveBookDto {
  @Type(() => Number)
  @Min(1)
  userId: number;

  @Type(() => Number)
  @Min(1)
  bookId: number;
}
