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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActionByIdDto } from 'src/modules/common/DTO/actionById.dto';
import { ChangeUserDto } from '../DTO/chageUser.dto';
import { CreateUserDto } from '../DTO/createUser.dto';
import { ExtendedUserDto } from '../DTO/extendedUser.dto';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@ApiTags('User')
@Controller('users')
export class UsersController {
  @Inject()
  private readonly service: UsersService;

  @ApiOperation({ summary: 'Возвращает пользователя по id' })
  @Get(':id')
  async getOne(@Param() params: ActionByIdDto): Promise<ExtendedUserDto> {
    return await this.service.findOne(params.id);
  }

  @ApiOperation({ summary: 'Возвращает всех пользователей' })
  @Get()
  async getAll(): Promise<UserEntity[]> {
    return await this.service.findAll();
  }

  @ApiOperation({ summary: 'Создаёт пользователя' })
  @Post('create')
  async create(@Body() body: CreateUserDto): Promise<void> {
    await this.service.create(body);
  }

  @ApiOperation({ summary: 'Редактирует пользователя' })
  @Put()
  async edit(@Body() body: ChangeUserDto): Promise<void> {
    await this.service.edit(body);
  }

  @ApiOperation({ summary: 'Удаляет пользователя' })
  @Delete()
  async delete(@Body() body: ActionByIdDto): Promise<void> {
    await this.service.delete(body.id);
  }

  @ApiOperation({ summary: 'Покупка абонемента' })
  @Post('subscribe')
  async subscribe(@Body() body: ActionByIdDto): Promise<void> {
    await this.service.subscribe(body.id);
  }
}
