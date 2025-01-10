import { Injectable } from '@nestjs/common';
import { ItemDTO } from './item.dto';
import { Item } from './item.model';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async getMyItems(userEmail: string) {
    return this.itemRepository.getMyItems(userEmail);
  }

  async getPublishedItems(userEmail: string) {
    return this.itemRepository.getPublishedItems(userEmail);
  }

  async postItem(createItemDTO: ItemDTO): Promise<Item> {
    return this.itemRepository.postItem(createItemDTO);
  }
}
