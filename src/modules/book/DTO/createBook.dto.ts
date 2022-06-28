import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @Length(5, 200)
  author: string;

  @ApiProperty()
  @Length(5, 300)
  title: string;
}
