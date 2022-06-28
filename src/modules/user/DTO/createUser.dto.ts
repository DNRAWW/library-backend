import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, Length, Min } from 'class-validator';

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

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isSubscribed: boolean;
}
