import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/common/guards/jwtAuth.guard';
import { RequireRole, RoleGuard } from '../../common/guards/role.guard';
import { Roles } from 'src/modules/user/entities/user.entity';
import { CreateGanreDto } from '../DTO/createGanre.dto';
import { GanresService } from '../services/ganre.service';

@ApiTags('Ganre')
@Controller('ganres')
export class GanresController {
  constructor(private readonly ganresService: GanresService) {}

  @ApiOperation({ summary: 'Получить все жанры' })
  @Get()
  async findAll() {
    return await this.ganresService.findAll();
  }

  @ApiOperation({ summary: 'Создать жанр' })
  @RequireRole(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  async create(@Body() body: CreateGanreDto) {
    await this.ganresService.create(body.name);
  }
}
