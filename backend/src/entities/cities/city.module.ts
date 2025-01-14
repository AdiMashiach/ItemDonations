import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CityController } from './city.controller';
import { CityRepository } from './city.repository';
import { CityService } from './city.service';
import { City } from './city.model';

@Module({
  imports: [SequelizeModule.forFeature([City])],
  controllers: [CityController],
  providers: [CityService, CityRepository],
})
export class CityModule {}
