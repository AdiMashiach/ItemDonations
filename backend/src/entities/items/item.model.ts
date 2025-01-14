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
  cityId: number;
  publisherMail: string;
  image: string;
  itemStatus: number;
  user: User;
}

@Table({ tableName: 'items', timestamps: false })
export class Item extends Model<IItem> {
  @PrimaryKey
  @Column(DataType.NUMBER)
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
    type: DataType.NUMBER,
    references: {
      model: City,
      key: 'id'
    },
    field: 'city_id',
  })
  cityId: number;

  @Column({ type: DataType.NUMBER, field: 'item_status' })
  itemStatus: number;

  @BelongsTo(() => User)
  user: User;
}
