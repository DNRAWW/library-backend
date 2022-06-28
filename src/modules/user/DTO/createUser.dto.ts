import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, Length, Min } from 'class-validator';

export class CreateUserDto {
  @Length(2, 50)
  firstName: string;

  @Length(2, 50)
  lastName: string;

  @Length(2, 50)
  surName: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isSubscribed: boolean;
}
