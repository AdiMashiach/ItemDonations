import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ItemDTO } from './item.dto';
import { Item } from './item.model';
import { ItemService } from './item.service';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('getMyItems')
  async getMyItems(@Query('email') email: string) {
    return this.itemService.getMyItems(email);
  }

  @Get('getPublishedItems')
  async getPublishedItems(@Query('email') email: string) {
    return this.itemService.getPublishedItems(email);
  }

  @Post()
  async postUser(@Body() createItemDTO: ItemDTO): Promise<Item> {
    return this.itemService.postItem(createItemDTO);
  }
}
