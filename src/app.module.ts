import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from './modules/author/authors.module';
import { BooksModule } from './modules/book/books.module';
import { BookRequestsModule } from './modules/bookRequest/bookRequests.module';
import { getOrmConfig } from './modules/config/typeorm';
import { GanresModule } from './modules/ganre/ganres.modules';
import { UsersModule } from './modules/user/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(getOrmConfig()),
    UsersModule,
    AuthorsModule,
    GanresModule,
    BooksModule,
    BookRequestsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
