import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ItemDTO } from './item.dto';
import { Item } from './item.model';
import { Op } from 'sequelize';
import { User } from '../users/user.model';

@Injectable()
export class ItemRepository {
  constructor(@InjectModel(Item) private itemModel: typeof Item) {}

  async getMyItems(userEmail: string) {
    return this.itemModel.findAll({
      include: [
        {
          model: User,
        },
      ],
      where: {
        publisherMail: userEmail,
      },
    });
  }

  async getPublishedItems(userEmail: string) {
    return this.itemModel.findAll({
      include: [
        {
          model: User,
        },
      ],
      where: {
        publisherMail: {
          [Op.ne]: userEmail,
        },
      },
    });
  }

  async postItem(createItemDTO: ItemDTO): Promise<Item> {
    return this.itemModel.create(createItemDTO);
  }
}
