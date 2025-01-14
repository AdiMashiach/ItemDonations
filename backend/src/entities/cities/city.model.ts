import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

interface ICities {
  id: string;
}

@Table({ tableName: 'Cities', timestamps: false })
export class City extends Model<ICities> {
  @PrimaryKey
  @Column(DataType.STRING)
  id: string;
}
