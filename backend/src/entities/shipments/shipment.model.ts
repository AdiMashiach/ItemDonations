import { Model, Table } from "sequelize-typescript";

interface IShipment {

}

@Table({ tableName: 'Shipments', timestamps: false })
export class Shipment extends Model<IShipment> {
     
}