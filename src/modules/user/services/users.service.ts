import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangeUserDto } from '../DTO/chageUser.dto';
import { CreateUserDto } from '../DTO/createUser.dto';
import { Roles, UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.repository.find({
      select: {
        id: true,
        email: true,
        dateOfBirth: true,
        firstName: true,
        lastName: true,
        surName: true,
        role: true,
      },
    });
  }

  async findOne(id: number): Promise<UserEntity> {
    const result = await this.repository.findOne({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
        dateOfBirth: true,
        firstName: true,
        lastName: true,
        surName: true,
        role: true,
      },
    });

    if (!result) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async create(user: CreateUserDto): Promise<void> {
    const isEmailTaken = await this.repository.findOne({
      where: {
        email: user.email,
      },
    });

    if (isEmailTaken !== null) {
      throw new HttpException('Email is already taken', HttpStatus.CONFLICT);
    }

    await this.repository.save({
      ...user,
      role: Roles.REGULAR,
    });
  }

  async delete(id: number): Promise<void> {
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

  async findByEmail(email: string) {
    return await this.repository.findOne({
      where: {
        email: email,
      },
    });
  }
}
