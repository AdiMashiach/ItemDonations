import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/user.model';

interface IItem {
  id: string;
  name: string;
  descriptio: string;
  locationId: number;
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

  @Column({
    type: DataType.NUMBER,
    field: 'location_id',
  })
  locationId: number;

  @Column({ type: DataType.NUMBER, field: 'item_status' })
  itemStatus: number;

  @BelongsTo(() => User)
  user: User;
}
