import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { ShipmentDTO } from './shipment.dto';
import { Shipment } from './shipment.model';

@Controller('shipments')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Get('')
  getShipment(@Query('itemId') itemId: number) {
    return this.shipmentService.getShipment(itemId)
  }

  @Post('')
  postShipment(@Body() shipmentDTO: ShipmentDTO): Promise<Shipment> {
    return this.shipmentService.postShipment(shipmentDTO)
  }
}
