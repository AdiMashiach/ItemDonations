import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/users/user.model';
import { UserModule } from './entities/users/user.module';
import { ItemModule } from './entities/items/item.module';
import { Item } from './entities/items/item.model';
import { Location } from './entities/locations/location.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mssql',
      host: 'vmedu390.mtacloud.co.il',
      port: 1443,
      username: 'website_user',
      models: [User, Location, Item],
      password: '1234',
      database: 'WebProj',
      autoLoadModels: false,
      synchronize: false,
    }),
    UserModule,
    ItemModule,
  ],
})
export class AppModule {}
