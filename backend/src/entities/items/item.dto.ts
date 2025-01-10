import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ItemDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  image: string;

  @IsEmail()
  publisherMail: string;

  locationId: number;

  itemStatus: number;
}