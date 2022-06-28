import { BookEntity } from 'src/modules/book/entities/book.entity';

export class ExtendedUserDto {
  id: number;

  firstName: string;

  lastName: string;

  surName: string;

  isSubscribed: boolean;

  books: BookEntity[];
}
