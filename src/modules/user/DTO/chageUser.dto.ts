import { Type } from 'class-transformer';
import { Min, Length, IsOptional } from 'class-validator';

export class ChangeUserDto {
  @Type(() => Number)
  @Min(1)
  id: number;

  @IsOptional()
  @Length(5, 50)
  firstName: string;

  @IsOptional()
  @Length(5, 50)
  lastName: string;

  @IsOptional()
  @Length(5, 50)
  surName: string;
}
