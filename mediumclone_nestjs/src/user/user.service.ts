import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './Dto/createUser.dto';

@Injectable()
export class UserService {
  create(createuserDto: CreateUserDto) {
    return createuserDto;
  }
}
