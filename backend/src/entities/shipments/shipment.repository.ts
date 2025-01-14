import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Shipment } from './shipment.model';
import { ShipmentDTO } from './shipment.dto';

@Injectable()
export class ShipmentRepository {
  constructor(@InjectModel(Shipment) private shipmentModel: typeof Shipment) { }

  async getShipment(itemId: number) {
    return this.shipmentModel.findOne({
      where: {
        itemId: itemId
      }
    });
  }

  async postShipment(shipmentDTO: ShipmentDTO): Promise<Shipment> {
    return await this.shipmentModel.create(shipmentDTO);
  }
}
