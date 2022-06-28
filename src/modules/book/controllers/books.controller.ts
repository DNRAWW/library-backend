import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { CreateBookDto } from '../DTO/createBook.dto';
import { GiveBookDto } from '../DTO/giveBook.dto';
import { ReturnBookDto } from '../DTO/returnBook.dto';
import { SubscriptionGuard } from '../guards/subscription.guard';
import { BooksService } from '../services/book.service';
import { UserBooksService } from '../services/userBooks.service';

@Controller('books')
export class BooksController {
  @Inject()
  private readonly booksService: BooksService;
  @Inject()
  private readonly userBooksService: UserBooksService;

  @Post()
  async create(@Body() body: CreateBookDto): Promise<void> {
    await this.booksService.create(body);
  }

  @Post('give-book')
  @UseGuards(SubscriptionGuard)
  async giveBook(@Body() body: GiveBookDto) {
    await this.userBooksService.give(body.bookId, body.userId);
  }

  @Post('return-book')
  async returnBook(@Body() body: ReturnBookDto) {
    await this.userBooksService.return(body.bookId);
  }
}
