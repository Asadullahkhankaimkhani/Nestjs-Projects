import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { createTaskDto } from './dto/create-task-dto';
import { GetTasksByFilterDto } from './dto/get-tasks-by-filter-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async getAllTasks(): Promise<TaskEntity[]> {
    return await this.taskRepository.find();
  }

  async getTasksByFilter(
    filterDto: GetTasksByFilterDto,
  ): Promise<TaskEntity[]> {
    const { status, search } = filterDto;
    const query = this.taskRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskdto: createTaskDto): Promise<TaskEntity> {
    const { title, description } = createTaskdto;
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.taskRepository.save(task);
    return task;
  }

  async getTaskById(id: string): Promise<TaskEntity> {
    return await this.taskRepository.findOne(id);
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<TaskEntity> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
