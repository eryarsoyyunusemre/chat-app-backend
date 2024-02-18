/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';

const db = config.get('db');

export const typeOrmDatabase = [
  TypeOrmModule.forRoot({
    type: db.type,
    port: db.port,
    username: db.username,
    password: db.password,
    database: db.database,
    host: db.host,
    name: db.name,
    schema: db.schema,
    entities: [
      __dirname + '/../*.entity{.ts,.js}',
      __dirname + '/../**/*.entity{.ts,.js}',
      __dirname + '/../**/**/*.entity{.ts,.js}',
      __dirname + '/../**/**/**/*.entity{.ts,.js}',
    ],
    subscribers: [
      // subscriber alacagi klasor
      __dirname + '/../**/**/**/*.subscriber.{js, ts}',
      __dirname + '/../**/**/*.subscriber.{js, ts}',
    ],

    synchronize: db.synchronize,
  }),
];
