import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksService } from 'src/modules/book/services/book.service';
import { UserBooksService } from 'src/modules/book/services/userBooks.service';
import { Repository } from 'typeorm';
import { ChangeUserDto } from '../DTO/chageUser.dto';
import { CreateUserDto } from '../DTO/createUser.dto';
import { ExtendedUserDto } from '../DTO/extendedUser.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {
  @InjectRepository(UserEntity)
  private readonly repository: Repository<UserEntity>;

  @Inject()
  private readonly userBooksService: UserBooksService;

  @Inject()
  private readonly booksService: BooksService;

  async findAll(): Promise<UserEntity[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<ExtendedUserDto> {
    const result = await this.repository.findOne({
      where: {
        id: id,
      },
    });

    if (!result) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const bookLinks = await this.userBooksService.findByUserId(id);

    let books = [];

    if (bookLinks.length > 0) {
      const bookIds = bookLinks.map((bookLink) => bookLink.bookId);

      books = await this.booksService.findByIds(bookIds);
    }

    return {
      ...result,
      books: books,
    };
  }

  async create(user: CreateUserDto): Promise<void> {
    await this.repository.save(user);
  }

  async delete(id: number) {
    const result = await this.repository.findOne({
      where: {
        id: id,
      },
    });

    if (!result) {
      return;
    }

    await this.repository.delete(id);
  }

  async edit(user: ChangeUserDto): Promise<void> {
    const result = await this.repository.findOne({
      where: {
        id: user.id,
      },
    });

    if (!result) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    await this.repository.save(user);
  }

  async subscribe(id: number): Promise<void> {
    const result = await this.repository.findOne({
      where: {
        id: id,
      },
    });

    if (!result) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    if (result.isSubscribed) {
      throw new HttpException(
        'User is already subscribed',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    await this.repository.save({
      id: id,
      isSubscribed: true,
    });
  }
}
