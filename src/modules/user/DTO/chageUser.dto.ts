import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Min, Length, IsOptional } from 'class-validator';

export class ChangeUserDto {
  @ApiProperty()
  @Type(() => Number)
  @Min(1)
  id: number;

  @ApiProperty({ required: null })
  @IsOptional()
  @Length(5, 50)
  firstName: string;

  @ApiProperty({ required: null })
  @IsOptional()
  @Length(5, 50)
  lastName: string;

  @ApiProperty({ required: null })
  @IsOptional()
  @Length(5, 50)
  surName: string;
}
