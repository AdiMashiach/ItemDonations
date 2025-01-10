import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('find')
  async getUser(@Query('email') email: string) {
    return this.userService.getUser(email);
  }

  @Post()
  async postUser(@Body() createUserDTO: CreateUserDto): Promise<User> {
    return this.userService.postUser(createUserDTO);
  }
}
