import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task.model';

export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
