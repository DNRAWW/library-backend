import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Min } from 'class-validator';

export class ActionByIdDto {
  @ApiProperty()
  @Type(() => Number)
  @Min(1)
  id: number;
}
