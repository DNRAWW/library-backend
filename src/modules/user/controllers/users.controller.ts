import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ActionByIdDto } from 'src/modules/common/DTO/actionById.dto';
import { ChangeUserDto } from '../DTO/chageUser.dto';
import { CreateUserDto } from '../DTO/createUser.dto';
import { ExtendedUserDto } from '../DTO/extendedUser.dto';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  @Inject()
  private readonly service: UsersService;

  @Get(':id')
  async getOne(@Param() params: ActionByIdDto): Promise<ExtendedUserDto> {
    return await this.service.findOne(params.id);
  }

  @Get()
  async getAll(): Promise<UserEntity[]> {
    return await this.service.findAll();
  }

  @Post('create')
  async create(@Body() body: CreateUserDto): Promise<void> {
    await this.service.create(body);
  }

  @Put()
  async edit(@Body() body: ChangeUserDto): Promise<void> {
    await this.service.edit(body);
  }

  @Delete()
  async delete(@Body() body: ActionByIdDto): Promise<void> {
    await this.service.delete(body.id);
  }

  @Post('subscribe')
  async subscribe(@Body() body: ActionByIdDto): Promise<void> {
    await this.service.subscribe(body.id);
  }
}
