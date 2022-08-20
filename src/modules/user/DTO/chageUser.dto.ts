import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Min, Length, IsOptional, IsEmail, Max } from 'class-validator';

export class ChangeUserDto {
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

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @Min(new Date('1950').getTime() / 1000)
  dateOfbirth: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @Min(1000000000)
  @Max(9999999999)
  passport: number;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @Min(8)
  @Max(30)
  password: string;
}
