import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserBookEntity } from '../entities/userBooks.entity';
import { BooksService } from './book.service';

@Injectable()
export class UserBooksService {
  @InjectRepository(UserBookEntity)
  private readonly repository: Repository<UserBookEntity>;

  @Inject()
  private readonly booksService: BooksService;

  async give(bookId: number, userId: number): Promise<void> {
    // Проверяем есть ли книга с bookId
    await this.booksService.findOne(bookId);

    if (await this.isBookTaken(bookId)) {
      throw new HttpException(
        'Book is already taken',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const userBooksCount = await this.repository.count({
      where: {
        userId: userId,
      },
    });

    if (userBooksCount < 5) {
      await this.repository.save({
        bookId: bookId,
        userId: userId,
      });

      return;
    }

    throw new HttpException(
      'User can only take 5 books',
      HttpStatus.NOT_ACCEPTABLE,
    );
  }

  async return(bookId: number): Promise<void> {
    // Проверяем есть ли книга с bookId
    await this.booksService.findOne(bookId);

    if (!(await this.isBookTaken(bookId))) {
      return;
    }

    await this.repository.delete({
      bookId: bookId,
    });
  }

  async isBookTaken(bookId: number): Promise<boolean> {
    const isBookTaken = await this.repository.findOne({
      where: {
        bookId: bookId,
      },
    });

    if (isBookTaken) {
      return true;
    } else {
      return false;
    }
  }

  async findByUserId(userId: number) {
    const result = await this.repository.find({
      where: {
        userId: userId,
      },
    });

    return result;
  }
}
