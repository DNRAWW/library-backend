import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorEntity } from '../entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly repository: Repository<AuthorEntity>,
  ) {}

  async findAll() {
    return await this.repository.find();
  }

  async create(name: string) {
    await this.repository.save({ name });
  }
}
