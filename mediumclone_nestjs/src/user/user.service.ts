import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  create() {
    return 'create from service';
  }
}
