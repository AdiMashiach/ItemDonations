import { Injectable } from '@nestjs/common';
import { ItemDTO } from './item.dto';
import { Item } from './item.model';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) { }

  getItems() {
    return this.itemRepository.getItems();
  }

  postItem(ItemDTO: ItemDTO): Promise<Item> {
    return this.itemRepository.postItem(ItemDTO);
  }

  updateItem(itemDTO: ItemDTO, id: number) {
    return this.itemRepository.updateItem(itemDTO, id)
  }

  deleteItem(id: number) {
    return this.itemRepository.deleteItem(id)
  }
}
