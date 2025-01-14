import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Item } from "../items/item.model";
import { City } from "../cities/city.model";

interface IShipment {
  id: number;
  itemId: number;
  cityId: string;
  address: string;
  address_details: string;
}

@Table({ tableName: 'Shipments', timestamps: false })
export class Shipment extends Model<IShipment> {
     @PrimaryKey
     @Column({
      type: DataType.NUMBER,
      primaryKey: true,
      autoIncrement: true
    })
     id: number;

     @ForeignKey(() => Item)
     @Column({
      type: DataType.NUMBER,
      references: {
        model: Item,
        key: 'id'
      },
      field: 'item_id'
     })
     itemId: number;

     @ForeignKey(() => City)
     @Column({
      type: DataType.STRING,
      references: {
        model: City,
        key: 'id'
      },
      field: 'city_id'
     })
     cityId: string;

     @Column(DataType.STRING)
     address: string;

     @Column({
      type: DataType.STRING,
      field: 'address_details'
    })
     addressDetails: string;
}
