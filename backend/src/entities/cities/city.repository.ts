import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { City } from './city.model';

@Injectable()
export class CityRepository {
  constructor(@InjectModel(City) private cityModel: typeof City) {}

  async getCities() {
    return this.cityModel.findAll();
  }
}
