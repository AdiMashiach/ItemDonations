import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ItemDTO } from './item.dto';
import { Item } from './item.model';

@Injectable()
export class ItemRepository {
  constructor(@InjectModel(Item) private itemModel: typeof Item) { }

  async getItems() {
    return await this.itemModel.findAll({});
  }

  async postItem(ItemDTO: ItemDTO): Promise<Item> {
    return await this.itemModel.create(ItemDTO);
  }

  async updateItem(itemDTO: ItemDTO, id: number) {
    return await this.itemModel.update(itemDTO, { where: { id } })
  }

  async deleteItem(id: number) {
    const user = await this.itemModel.findByPk(id)

    await user.destroy()
  }
}
