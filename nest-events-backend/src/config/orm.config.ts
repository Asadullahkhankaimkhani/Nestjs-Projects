import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Event } from 'src/entities/events.entity';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.APP_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    entities: [Event],
    synchronize: true,
  }),
);
