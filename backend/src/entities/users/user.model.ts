import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

interface IUser {
  email: string;
  password: string;
  phoneNumber: string;
}

@Table({ tableName: 'users', timestamps: false })
export class User extends Model<IUser> {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column(DataType.STRING)
  password: string;

  @Column({ type: DataType.STRING, field: 'phone_number' })
  phoneNumber: string;
}
