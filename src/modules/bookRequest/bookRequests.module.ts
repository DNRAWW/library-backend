import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from '../book/books.module';
import { BookRequestsController } from './controllers/bookRequests.controller';
import { BookRequestEntity } from './entities/bookRequest.entity';
import { BookRequestsService } from './services/bookRequests.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookRequestEntity]), BooksModule],
  controllers: [BookRequestsController],
  providers: [BookRequestsService],
  exports: [BookRequestsService],
})
export class BookRequestsModule {}
