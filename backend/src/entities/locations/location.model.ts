import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

interface ILocation {
  id: number;
  name: string;
}

@Table({ tableName: 'Cities', timestamps: false })
export class Location extends Model<ILocation> {
  @PrimaryKey
  @Column({
    type: DataType.NUMBER,
    field: 'Id',
  })
  id: number;

  @Column({
    type: DataType.STRING,
    field: 'city_name',
  })
  cityName: string;
}
