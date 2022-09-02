import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
  getTags(): string[] {
    return ['tag1', 'tag2', 'tag3'];
  }
}
