import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ShipmentDTO {
  @IsNumber()
  @IsNotEmpty()
  item_id: string;

  @IsString()
  address: string;

  @IsString()
  addressDetails: string;

  @IsString()
  cityId: string;
}
