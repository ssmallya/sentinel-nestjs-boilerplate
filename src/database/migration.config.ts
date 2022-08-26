import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config({
  path: path.join(__dirname, `../../${process.env.NODE_ENV}.env`),
});

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DATABASE,
  schema: process.env.POSTGRES_SCHEMA,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/migrations/**{.ts,.js}`],
  synchronize: false,
};

export = config;
