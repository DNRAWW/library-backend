import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwtAuth.guard';
import { RequireRole, RoleGuard } from '../../common/guards/role.guard';
import { Roles } from '../../user/entities/user.entity';
import { CreateAuthorDto } from '../DTO/createAuthor.dto';
import { AuthorsService } from '../services/authors.service';

@ApiTags('Author')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({ summary: 'Получить всех авторов' })
  @Get()
  async findAll() {
    return await this.authorsService.findAll();
  }

  @ApiOperation({ summary: 'Создать автора' })
  @RequireRole(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  async create(@Body() body: CreateAuthorDto) {
    await this.authorsService.create(body.name);
  }
}
