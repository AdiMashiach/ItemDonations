import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/users/user.model';
import { UserModule } from './entities/users/user.module';
import { ItemModule } from './entities/items/item.module';
import { Item } from './entities/items/item.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      database: 'ItemDonations',
      port: 5432,
      username: 'postgres',
      password: '1234',
      models: [User, Item],
      autoLoadModels: false,
      synchronize: false,
    }),
    UserModule,
    ItemModule,
  ],
})
export class AppModule { }
