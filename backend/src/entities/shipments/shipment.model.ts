import { Model, Table } from "sequelize-typescript";

interface IShipment {

}

@Table({ tableName: 'shipments', timestamps: false })
export class Shipment extends Model<IShipment> {
     
}