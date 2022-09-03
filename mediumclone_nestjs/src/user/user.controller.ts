import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './Dto/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async create(@Body('user') createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
