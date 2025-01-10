import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { User } from './user.model';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(userEmail: string) {
    return this.userRepository.getUser(userEmail);
  }

  async postUser(createUserDTO: CreateUserDto): Promise<User> {
    return this.userRepository.postUser(createUserDTO);
  }
}
