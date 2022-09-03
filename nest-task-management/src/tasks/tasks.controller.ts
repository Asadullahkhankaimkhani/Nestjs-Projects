import {
  Body,
  Controller,
  Delete,
  Put,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { createTaskDto } from './dto/create-task-dto';
import { GetTasksByFilterDto } from './dto/get-tasks-by-filter-dto';
import { updateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksByFilterDto): Promise<Task[]> {
    return this.tasksService.getTasksByFilter(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskdto: createTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskdto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Put('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskDto: updateTaskDto,
  ): Promise<Task> {
    const { status } = updateTaskDto;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
