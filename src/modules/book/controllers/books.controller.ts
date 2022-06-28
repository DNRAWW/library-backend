import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBookDto } from '../DTO/createBook.dto';
import { GiveBookDto } from '../DTO/giveBook.dto';
import { ReturnBookDto } from '../DTO/returnBook.dto';
import { BookEntity } from '../entities/book.entity';
import { SubscriptionGuard } from '../guards/subscription.guard';
import { BooksService } from '../services/book.service';
import { UserBooksService } from '../services/userBooks.service';

@ApiTags('Book')
@Controller('books')
export class BooksController {
  @Inject()
  private readonly booksService: BooksService;
  @Inject()
  private readonly userBooksService: UserBooksService;

  @ApiOperation({ summary: 'Получить все книги' })
  @Get()
  async getAll(): Promise<BookEntity[]> {
    return await this.booksService.findAll();
  }

  @ApiOperation({ summary: 'Создаёт книгу' })
  @Post()
  async create(@Body() body: CreateBookDto): Promise<void> {
    await this.booksService.create(body);
  }

  @ApiOperation({ summary: 'Выдача книги' })
  @Post('give-book')
  @UseGuards(SubscriptionGuard)
  async giveBook(@Body() body: GiveBookDto) {
    await this.userBooksService.give(body.bookId, body.userId);
  }

  @ApiOperation({ summary: 'Возврат книги' })
  @Post('return-book')
  async returnBook(@Body() body: ReturnBookDto) {
    await this.userBooksService.return(body.bookId);
  }
}
