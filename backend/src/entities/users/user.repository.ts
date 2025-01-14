import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async getUser(email: string, password: string) {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(user.password, password))) {
      throw new HttpException({ code: 1001 }, HttpStatus.CONFLICT);
    }

    return user;
  }

  async postUser(createUserDTO: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({
      where: { email: createUserDTO.email },
    });

    if (existingUser) {
      throw new HttpException({ code: 1002 }, HttpStatus.UNAUTHORIZED);
    }

    return this.userModel.create(createUserDTO);
  }
}
