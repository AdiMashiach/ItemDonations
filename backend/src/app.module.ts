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
      dialect: 'postgres',
      host: 'localhost',
      database: 'ItemDonations',
      port: 5432,
      username: 'postgres',
      password: '1234',
      models: [User, Item, City, Shipment],
      autoLoadModels: false,
      synchronize: false,
    }),
    UserModule,
    ItemModule,
    CityModule,
    ShipmentModule
  ],
})
export class AppModule { }
