import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistorySearchQueryDto } from '../DTO/bookRequestSearchParams.dto';
import { BookRequestEntity } from '../entities/bookRequest.entity';
import { BooksService } from '../../book/services/book.service';

@Injectable()
export class BookRequestsService {
  constructor(
    @InjectRepository(BookRequestEntity)
    private readonly repository: Repository<BookRequestEntity>,
    private readonly booksService: BooksService,
  ) {}

  async createRequest(bookId: number, userId: number): Promise<void> {
    // Проверяем есть ли книга с bookId
    await this.booksService.findOne(bookId);

    const bookRequest = await this.repository.findOne({
      where: {
        bookId: bookId,
      },
    });

    if (bookRequest !== null) {
      throw new HttpException('Book is already taken', HttpStatus.CONFLICT);
    }

    await this.repository.save({
      bookId: bookId,
      userId: userId,
    });

    return;
  }

  async removeRequest(id: number): Promise<void> {
    const requestToDelete = await this.repository.findOne({
      where: {
        id: id,
      },
    });

    if (!requestToDelete) {
      throw new HttpException('Request not found', HttpStatus.BAD_REQUEST);
    }

    await this.repository.softDelete({
      id: id,
    });
  }

  async findAll(params?: HistorySearchQueryDto) {
    return await this.repository.find({
      where: {
        ...params,
      },
      withDeleted: true,
    });
  }

  async approveRequest(id: number) {
    const requestToApprove = await this.repository.findOne({
      where: {
        id: id,
      },
    });

    if (!requestToApprove) {
      throw new HttpException('Request not found', HttpStatus.NOT_FOUND);
    }

    await this.repository.save({
      id: id,
      approvedAt: new Date(),
    });
  }
}
