import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GanresController } from './controllers/ganre.controller';
import { GanreEntity } from './entities/ganre.entity';
import { GanresService } from './services/ganre.service';

@Module({
  imports: [TypeOrmModule.forFeature([GanreEntity])],
  controllers: [GanresController],
  providers: [GanresService],
  exports: [GanresService],
})
export class GanresModule {}
