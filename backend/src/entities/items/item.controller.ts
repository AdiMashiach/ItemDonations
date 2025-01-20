import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
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

  @Get('')
  getItemsByName(@Query('itemName') itemName: string) {
    this.itemService.getItemsByName(itemName);
  }

  @Get('')
  getItemsByStatus(@Query('itemStatus') itemStatus: number) {
    this.itemService.getItemsByStatus(itemStatus);
  }

  @Post('')
  postItem(@Body() ItemDTO: ItemDTO): Promise<Item> {
    return this.itemService.postItem(ItemDTO);
  }

  @Put(':id')
  updateItem(@Body() itemDTO: ItemDTO, @Param('id') id: number) {
    return this.itemService.updateItem(itemDTO, id);
  }

  @Delete(':id')
  deleteItem(@Param('id') id: number) {
    return this.itemService.deleteItem(id)
  }
}
