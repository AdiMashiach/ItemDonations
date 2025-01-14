import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { User } from './user.model';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(email: string, password: string) {
    return this.userRepository.getUser(email, password);
  }

  async postUser(createUserDTO: CreateUserDto): Promise<User> {
    return this.userRepository.postUser(createUserDTO);
  }
}
