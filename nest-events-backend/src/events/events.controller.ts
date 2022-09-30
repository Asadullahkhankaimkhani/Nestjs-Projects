import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateEventDto } from './DTO/create-event.dto';
import { UpdateEventDto } from './DTO/update-event.dto';
import { Event } from '../entities/events.entity';
import { Like, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('events')
export class EventsController {
  constructor(
    @InjectRepository(Event)
    private readonly respository: Repository<Event>,
  ) {}

  @Get()
  async findAll() {
    return await this.respository.find();
  }

  @Get('/practice')
  async practice() {
    return await this.respository.find({
      where: [
        {
          id: MoreThan(3),
        },
        {
          description: Like('%meet%'),
        },
      ],
      take: 2,
      order: {
        id: 'DESC',
      },
    });
  }

  @Get(':id')
  async findSingle(@Param('id', ParseIntPipe) id: number) {
    return await this.respository.findOneBy({ id: id });
  }

  @Post()
  async create(@Body() input: CreateEventDto) {
    return await this.respository.save({
      ...input,
      when: new Date(input.when),
    });
  }

  @Put(':id')
  async update(@Param('id') id, @Body() input: UpdateEventDto) {
    const event = await this.respository.findOneBy({ id: id });

    return await this.respository.save({
      ...event,
      ...input,
      when: input.when ? new Date(input.when) : event.when,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id) {
    const event = await this.respository.findOneBy({ id: id });
    return await this.respository.remove(event);
  }
}
