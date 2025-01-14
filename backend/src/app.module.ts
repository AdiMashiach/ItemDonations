import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/users/user.model';
import { UserModule } from './entities/users/user.module';
import { ItemModule } from './entities/items/item.module';
import { Item } from './entities/items/item.model';
import { City } from './entities/cities/city.model';
import { Shipment } from './entities/shipments/shipment.model';
import { CityModule } from './entities/cities/city.module';
import { ShipmentModule } from './entities/shipments/shipment.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'website_user',
      models: [User, Item, City, Shipment],
      password: '1234',
      database: 'WebProj',
      autoLoadModels: false,
      synchronize: false,
    }),
    UserModule,
    ItemModule,
    CityModule,
    ShipmentModule
  ],
})
export class AppModule {}
