import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ItemController } from './item.controller';
import { Item } from './item.model';
import { ItemRepository } from './item.repository';
import { ItemService } from './item.service';

@Module({
  imports: [SequelizeModule.forFeature([Item])],
  controllers: [ItemController],
  providers: [ItemService, ItemRepository],
})
export class ItemModule {}
