import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

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
  findOne(@Param('id') id) {
    return id;
  }

  @Post()
  create() {}

  @Put('/:id')
  update(@Param('id') id) {}

  @Delete('/:id')
  remove(@Param('id') id) {}
}
