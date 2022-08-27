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
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksByFilterDto): Task[] {
    return Object.keys(filterDto).length
      ? this.tasksService.getTasksByFilter(filterDto)
      : this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskdto: createTaskDto): Task {
    return this.tasksService.createTask(createTaskdto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }

  @Put('/:id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
