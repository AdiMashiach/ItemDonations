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
import { SendGridModule } from './api/send-grid/send-grid.module';
import { ConfigModule } from '@nestjs/config';
import { LocationModule } from './api/location/location.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      database: 'ItemDonations',
      port: 5432,
      username: 'postgres',
      password: '1234',
      models: [City, User, Item, Shipment],
      autoLoadModels: false,
      synchronize: false,
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule,
    ItemModule,
    CityModule,
    ShipmentModule,
    SendGridModule,
    LocationModule
  ],
})
export class AppModule { }
