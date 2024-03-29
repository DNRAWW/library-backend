import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ActionByIdDto } from 'src/modules/common/DTO/actionById.dto';
import { ChangeUserDto } from '../DTO/chageUser.dto';
import { CreateUserDto } from '../DTO/createUser.dto';
import { Roles, UserEntity } from '../entities/user.entity';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { LocalAuthGuard } from '../guards/localAuth.guard';
import { JwtAuthGuard } from '../../common/guards/jwtAuth.guard';
import { User } from 'src/modules/common/customDecorators/user.decorator';
import { LoginDto } from '../DTO/login.dto';
import { RequireRole, RoleGuard } from 'src/modules/common/guards/role.guard';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Возвращает пользователя по id' })
  @RequireRole(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('find-one/:id')
  async getOne(@Param() params: ActionByIdDto): Promise<UserEntity> {
    return await this.usersService.findOne(params.id);
  }

  @ApiOperation({ summary: 'Возвращает всех пользователей' })
  @RequireRole(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async getAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Создать пользователя' })
  @Post()
  async create(@Body() body: CreateUserDto): Promise<void> {
    await this.usersService.create(body);
  }

  @ApiOperation({ summary: 'Редактировать пользователя' })
  @UseGuards(JwtAuthGuard)
  @Put()
  async edit(@User() user, @Body() body: ChangeUserDto): Promise<void> {
    await this.usersService.edit(body, user.id);
  }

  @ApiOperation({ summary: 'Удалить пользователя' })
  @Delete()
  async delete(@User() user): Promise<void> {
    await this.usersService.delete(user.id);
  }

  @ApiOperation({ summary: 'Логин' })
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    type: LoginDto,
  })
  @Post('login')
  async login(@Request() req, @Response() res) {
    const token = await this.authService.login(req.user);

    res.cookie('token', token);
    res.send();
  }

  @ApiOperation({ summary: 'Получить пользователя по токену' })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@User() user) {
    return await this.usersService.findOne(user.id);
  }
}
