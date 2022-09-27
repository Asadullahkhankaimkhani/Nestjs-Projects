import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('events')
export class EventsController {
  @Get()
  findAll() {
    return {
      events: [
        {
          id: 1,
          name: 'Event 1',
          description: 'Event 1 description',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    };
  }

  @Get('/:id')
  findOne() {}

  @Post()
  create() {}

  @Put('/:id')
  update() {}

  @Delete('/:id')
  remove() {}
}
