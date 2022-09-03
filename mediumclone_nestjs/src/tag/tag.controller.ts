import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TagEntity } from './tag.entity';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Get('/')
  async findAll(): Promise<TagEntity[]> {
    return await this.tagService.findAll();
  }

  @Post('/')
  async create(@Body() tag: TagEntity): Promise<TagEntity> {
    return await this.tagService.create(tag);
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<TagEntity> {
    return await this.tagService.findOne(id);
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() tag: TagEntity,
  ): Promise<TagEntity> {
    return await this.tagService.update(id, tag);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<TagEntity> {
    return await this.tagService.delete(id);
  }
}
