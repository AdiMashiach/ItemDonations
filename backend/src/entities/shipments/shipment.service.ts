import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Shipment } from './shipment.model';
import { ShipmentRepository } from './shipment.repository';
import { ShipmentDTO } from './shipment.dto';

@Injectable()
export class ShipmentService {
  constructor(private readonly ShipmentRepository: ShipmentRepository) { }

  getShipment(itemId: number) {
    return this.ShipmentRepository.getShipment(itemId)
  }

  postShipment(shipmentDTO: ShipmentDTO): Promise<Shipment> {
    return this.ShipmentRepository.postShipment(shipmentDTO);
  }
}
