import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty()
  @Length(5, 300)
  name: string;
}
