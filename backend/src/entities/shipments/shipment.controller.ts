import { Controller, Get, Query } from '@nestjs/common';
import { ShipmentService } from './shipment.service';

@Controller('shipments')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Get('')
  async getShipment(@Query('itemId') itemId: number) {
    return this.shipmentService.getShipment(itemId)
  }
}
