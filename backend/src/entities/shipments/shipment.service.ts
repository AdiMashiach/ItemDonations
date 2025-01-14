import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Shipment } from './shipment.model';
import { ShipmentRepository } from './shipment.repository';

@Injectable()
export class ShipmentService {
  constructor(private readonly ShipmentRepository: ShipmentRepository) {}

  async getShipment(itemId: number) {
    return this.ShipmentRepository.getShipment(itemId)
  }
}
