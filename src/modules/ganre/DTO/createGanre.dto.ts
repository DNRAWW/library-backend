import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateGanreDto {
  @ApiProperty()
  @Length(3, 500)
  name: string;
}
