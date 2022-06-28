import { Length } from 'class-validator';

export class CreateBookDto {
  @Length(5, 200)
  author: string;

  @Length(5, 300)
  title: string;
}
