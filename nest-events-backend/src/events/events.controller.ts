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
  create(@Body() input: CreateEventDto) {
    return input;
  }

  @Put('/:id')
  update(@Param('id') id, @Body() input) {}

  @Delete('/:id')
  @HttpCode(204)
  remove(@Param('id') id) {}
}
