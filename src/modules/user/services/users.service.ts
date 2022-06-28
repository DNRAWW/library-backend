import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangeUserDto } from '../DTO/chageUser.dto';
import { CreateUserDto } from '../DTO/createUser.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {
  @InjectRepository(UserEntity)
  private readonly repository: Repository<UserEntity>;

  async findAll(): Promise<UserEntity[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const result = await this.repository.findOne({
      where: {
        id: id,
      },
    });

    if (!result) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return result;
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
    await this.repository.save(user);
  }

  async subscribe(id: number): Promise<void> {
    await this.repository.save({
      id: id,
      isSubscribed: true,
    });
  }
}
