import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '@Summer1190',
      autoLoadEntities: true,
      synchronize: true,
      database: 'task-management',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
  ],
})
export class AppModule {}
