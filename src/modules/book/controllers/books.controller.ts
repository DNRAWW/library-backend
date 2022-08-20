import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwtAuth.guard';
import { RequireRole, RoleGuard } from '../../common/guards/role.guard';
import { Roles } from '../../user/entities/user.entity';
import { CreateBookDto } from '../DTO/createBook.dto';
import { SearchBooksDto } from '../DTO/search.dto';
import { BookEntity } from '../entities/book.entity';
import { BooksService } from '../services/book.service';

@ApiTags('Book')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'Получить все книги' })
  @Get()
  async getAll(@Query() query: SearchBooksDto): Promise<BookEntity[]> {
    return await this.booksService.findAll(query);
  }

  @ApiOperation({ summary: 'Создать книгу' })
  @Post()
  @RequireRole(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async create(@Body() body: CreateBookDto): Promise<void> {
    await this.booksService.create(body);
  }
}
