import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../../common/customDecorators/user.decorator';
import { ActionByIdDto } from '../../common/DTO/actionById.dto';
import { JwtUserPayloadDto } from '../../common/DTO/jwtUserPayload.dto';
import { JwtAuthGuard } from '../../common/guards/jwtAuth.guard';
import { RequireRole, RoleGuard } from '../../common/guards/role.guard';
import { Roles } from '../../user/entities/user.entity';
import { HistorySearchQueryDto } from '../DTO/bookRequestSearchParams.dto';
import { BookRequestsService } from '../services/bookRequests.service';

@ApiTags('Book request')
@Controller('book-requests')
export class BookRequestsController {
  constructor(private readonly bookRequestsService: BookRequestsService) {}

  @ApiOperation({ summary: 'История запросов' })
  @RequireRole(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('history')
  async history(@Query() query: HistorySearchQueryDto) {
    return await this.bookRequestsService.findAll(query);
  }

  @ApiOperation({ summary: 'Создание запроса' })
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body: ActionByIdDto, @User() user: JwtUserPayloadDto) {
    await this.bookRequestsService.createRequest(body.id, user.userId);
  }

  @ApiOperation({ summary: 'Принятие запроса' })
  @RequireRole(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('approve')
  async approveRequest(@Body() body: ActionByIdDto) {
    await this.bookRequestsService.approveRequest(body.id);
  }

  @ApiOperation({ summary: 'Отклонение запроса' })
  @RequireRole(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('decline')
  async declineRequest(@Body() body: ActionByIdDto) {
    await this.bookRequestsService.removeRequest(body.id);
  }
}
