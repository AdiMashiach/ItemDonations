import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Item } from "../items/item.model";
import { City } from "../cities/city.model";

interface IShipment {
  id: number;
  item_id: number;
  city_id: number;
  address: string;
  address_details: string;
}

@Table({ tableName: 'shipments', timestamps: false })
export class Shipment extends Model<IShipment> {
     @PrimaryKey
     @Column(DataType.NUMBER)
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
      type: DataType.NUMBER,
      references: {
        model: City,
        key: 'id'
      },
      field: 'city_id'
     })
     cityId: number;

     @Column(DataType.STRING)
     address: string;

     @Column({
      type: DataType.STRING,
      field: 'address_details'
    })
     addressDetails: string;
}
