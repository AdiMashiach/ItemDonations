import { ItemStatus } from "./enums";

export type Item = {
  id?: number;
  name: string;
  image: string;
  location: string;
  description: string;
  timePublished: Date;
  publisherMail: string;
  itemStatus: ItemStatus;
};

export type City = {
  id: number;
  name: string;
};

export type Shipment = {
  itemId: number;
  address: string;
  loadingCity: number;
  addressDetails: string;
};

export type User = {
  email: string;
  password: string;
  phoneNumber: string;
};
