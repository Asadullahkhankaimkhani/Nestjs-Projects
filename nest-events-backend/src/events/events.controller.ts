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
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from './DTO/create-event.dto';
import { UpdateEventDto } from './DTO/update-event.dto';
import { Event } from '../entities/events.entity';
import { Like, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';

@Controller('events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  constructor(
    @InjectRepository(Event)
    private readonly respository: Repository<Event>,
  ) {}

  @Get()
  async findAll() {
    this.logger.log(`Hit the findAll route`);
    const events = await this.respository.find();
    this.logger.debug(`Found ${events.length} events`);
    return events;
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
    const event = await this.respository.findOneBy({ id: id });

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return event;
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
