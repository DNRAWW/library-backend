import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Length, Min } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @Type(() => Number)
  @Min(1)
  authorId: number;

  @ApiProperty()
  @Type(() => Number)
  @Min(1)
  ganreId: number;

  @ApiProperty()
  @Length(5, 300)
  title: string;
}
