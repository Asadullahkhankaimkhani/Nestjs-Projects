import { TaskStatus } from '../task.model';
import { IsEnum } from 'class-validator';

export class updateTaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
