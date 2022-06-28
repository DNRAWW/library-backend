import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../user/users.module';
import { BooksController } from './controllers/books.controller';
import { BookEntity } from './entities/book.entity';
import { UserBookEntity } from './entities/userBooks.entity';
import { BooksService } from './services/book.service';
import { UserBooksService } from './services/userBooks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookEntity, UserBookEntity]),
    forwardRef(() => UsersModule),
  ],
  controllers: [BooksController],
  providers: [BooksService, UserBooksService],
  exports: [BooksService, UserBooksService],
})
export class BooksModule {}
