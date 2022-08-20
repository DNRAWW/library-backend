import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  Length,
  Max,
  Min,
  MinDate,
} from 'class-validator';
import { Roles } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty()
  @Length(2, 50)
  firstName: string;

  @ApiProperty()
  @Length(2, 50)
  lastName: string;

  @ApiProperty()
  @Length(2, 50)
  surName: string;

  @ApiProperty()
  @IsDateString()
  dateOfBirth: number;

  @ApiProperty()
  @Type(() => Number)
  @Min(1000000000)
  @Max(9999999999)
  passport: number;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Length(8, 30)
  password: string;
}
