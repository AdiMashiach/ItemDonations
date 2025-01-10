import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async getUser(userEmail: string) {
    return this.userModel.findByPk(userEmail);
  }

  async postUser(createUserDTO: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDTO);
  }
}
