import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShipmentController } from './shipment.controller';
import { Shipment } from './shipment.model';
import { ShipmentRepository } from './shipment.repository';
import { ShipmentService } from './shipment.service';

@Module({
  imports: [SequelizeModule.forFeature([Shipment])],
  controllers: [ShipmentController],
  providers: [ShipmentService, ShipmentRepository],
})
export class ShipmentModule {}
