import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: Number(configService.get('POSTGRES_PORT')),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        schema: configService.get('POSTGRES_SCHEMA'),
        synchronize: false,
        entities: [`${__dirname}/**/**.entity{.ts,.js}`],
        migrations: [`${__dirname}/migrations/**{.ts,.js}`],
        logging: true,
        keepConnectionAlive: configService.get('POSTGRES_CONN_ALIVE') || false,
      }),
    }),
  ],
})
export class DatabaseModule {}
