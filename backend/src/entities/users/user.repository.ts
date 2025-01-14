import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async getUser(email: string, password: string) {
    const user = await this.userModel.findOne({ where: { email }})
    if(!user || !(await bcrypt.compare(user.password, password))) {
      throw new UnauthorizedException('invalid user');
    }

    return user;
  }

  async postUser(createUserDTO: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({ where: { email: createUserDTO.email }})
    if (existingUser) throw new ConflictException('User already exists')

    return this.userModel.create(createUserDTO);
  }
}
