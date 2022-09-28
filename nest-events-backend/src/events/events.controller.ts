import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateEventDto } from './DTO/create-event.dto';
import { UpdateEventDto } from './DTO/update-event.dto';
import { Event } from '../entities/events.entity';
import { Repository } from 'typeorm';
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

  @Get('/:id')
  async findOne(@Param('id') id) {
    return await this.respository.findOne(id);
  }

  @Post()
  async create(@Body() input: CreateEventDto) {
    // return await this.respository.save({
    //   ...input,
    //   // when: Date.now(),
    // });
  }

  @Put('/:id')
  async update(@Param('id') id, @Body() input: UpdateEventDto) {
    const event = await this.respository.findOne(id);
    return await this.respository.save({
      ...event,
      ...input,
      //   when: input.when ? Date.now().toString() : event.when,
    });
  }

  @Delete('/:id')
  @HttpCode(204)
  async remove(@Param('id') id) {
    const event = await this.respository.findOne(id);
    return await this.respository.remove(event);
  }
}
