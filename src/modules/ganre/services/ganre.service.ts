import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GanreEntity } from '../entities/ganre.entity';

@Injectable()
export class GanresService {
  constructor(
    @InjectRepository(GanreEntity)
    private readonly repository: Repository<GanreEntity>,
  ) {}

  async findAll() {
    return await this.repository.find();
  }

  async create(name: string) {
    await this.repository.save({ name });
  }
}
