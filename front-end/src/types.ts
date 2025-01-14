import { ItemStatus } from "./enums";

export type Item = {
  id?: number;
  name: string;
  image: string;
  cityId: string;
  description: string;
  publisherMail: string;
  itemStatus: ItemStatus;
};

export type City = {
  id: string;
};

export type Shipment = {
  itemId: number;
  address: string;
  cityId: string;
  addressDetails: string;
};

export type User = {
  email: string;
  password: string;
  phoneNumber: string;
};
