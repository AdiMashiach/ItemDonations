import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ItemDTO } from './item.dto';
import { Item, ItemStatus } from './item.model';
import { Op } from 'sequelize';

@Injectable()
export class ItemRepository {
  constructor(@InjectModel(Item) private itemModel: typeof Item) { }

  async getItems() {
    return await this.itemModel.findAll({
      where: {
        itemStatus: {
          [Op.ne]: ItemStatus.DONATED
        }
      }
    });
  }

  async getItemsByName(itemName: string) {
    return await this.itemModel.findAll({
      where: {
        name: {
          [Op.iLike]: `$${itemName}%`,
        },
      },
    });
  }

  async getItemsByStatus(itemStatus: number) {
    return await this.itemModel.findAll({
      where: {
        itemStatus: itemStatus
      }
    })
  }

  async postItem(ItemDTO: ItemDTO): Promise<Item> {
    return await this.itemModel.create(ItemDTO);
  }

  async updateItem(itemDTO: ItemDTO, id: number) {
    return await this.itemModel.update(itemDTO, { where: { id } });
  }

  async deleteItem(id: number) {
    const user = await this.itemModel.findByPk(id);

    await user.destroy();
  }
}
