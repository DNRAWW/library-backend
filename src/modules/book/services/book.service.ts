import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateBookDto } from '../DTO/createBook.dto';
import { BookEntity } from '../entities/book.entity';

@Injectable()
export class BooksService {
  @InjectRepository(BookEntity)
  private readonly repository: Repository<BookEntity>;

  async findAll(): Promise<BookEntity[]> {
    return await this.repository.find();
  }

  async create(book: CreateBookDto): Promise<void> {
    await this.repository.save(book);
  }

  async findOne(id: number): Promise<BookEntity> {
    const result = await this.repository.findOne({
      where: {
        id: id,
      },
    });

    if (!result) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async findByIds(ids: number[]): Promise<BookEntity[]> {
    return this.repository.find({
      where: {
        id: In(ids),
      },
    });
  }
}
