import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { City } from '../cities/city.model';

interface IItem {
  id: string;
  name: string;
  descriptio: string;
  cityId: string;
  publisherMail: string;
  image: string;
  itemStatus: number;
  user: User;
}

export enum ItemStatus {
  TO_DONATE,
  TO_SHIP,
  DONATED
}

@Table({ tableName: 'Items', timestamps: false })
export class Item extends Model<IItem> {
  @PrimaryKey
  @Column({
    type: DataType.NUMBER,
    primaryKey: true,
    autoIncrement: true
  })
  id: number;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  description: string;

  @Column(DataType.STRING)
  image: string;

  @Column({
    type: DataType.STRING,
    references: {
      model: User,
      key: 'email',
    },
    field: 'publisher_mail',
  })
  @ForeignKey(() => User)
  publisherMail: string;

  @ForeignKey(() => City)
  @Column({
    type: DataType.STRING,
    references: {
      model: City,
      key: 'id'
    },
    field: 'city_id',
  })
  cityId: string;

  @Column({ type: DataType.NUMBER, field: 'item_status' })
  itemStatus: number;

  @BelongsTo(() => User)
  user: User;
}
