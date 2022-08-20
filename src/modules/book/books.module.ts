import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRequestsController } from '../bookRequest/controllers/bookRequests.controller';
import { BooksController } from './controllers/books.controller';
import { BookEntity } from './entities/book.entity';
import { BookRequestEntity } from '../bookRequest/entities/bookRequest.entity';
import { BooksService } from './services/book.service';
import { BookRequestsService } from '../bookRequest/services/bookRequests.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
