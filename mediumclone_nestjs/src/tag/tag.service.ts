import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity) private tagRepository: Repository<TagEntity>,
  ) {}

  async findAll(): Promise<TagEntity[]> {
    return await this.tagRepository.find();
  }

  async create(tag: TagEntity): Promise<TagEntity> {
    return await this.tagRepository.save(tag);
  }

  async findOne(id: number): Promise<TagEntity> {
    return await this.tagRepository.findOne({ where: { id } });
  }

  async update(id: number, tag: TagEntity): Promise<TagEntity> {
    await this.tagRepository.update(id, tag);
    return await this.tagRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<TagEntity> {
    const tag = await this.tagRepository.findOne({ where: { id } });
    await this.tagRepository.delete(id);
    return tag;
  }
}
