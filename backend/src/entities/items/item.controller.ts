import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ItemDTO } from './item.dto';
import { Item } from './item.model';
import { ItemService } from './item.service';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('')
  getItems() {
    return this.itemService.getItems();
  }

  @Post('')
  postItem(@Body() ItemDTO: ItemDTO): Promise<Item> {
    return this.itemService.postItem(ItemDTO);
  }

  @Put(':id')
  updateItem(@Body() itemDTO: ItemDTO, @Param('id') id: number) {
    return this.itemService.updateItem(itemDTO, id)
  }
}
