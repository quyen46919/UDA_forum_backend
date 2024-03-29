import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

// import { UserSubscriber } from './src/entity-subscribers/user-subscriber';
const SnakeNamingStrategy =
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('typeorm-naming-strategies').SnakeNamingStrategy;

const configs: TypeOrmModuleOptions & { seeds: string[]; factories: string[] } =
  {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
      'src/entities/**/*.entity{.ts,.js}',
      'src/entities/**/*.view-entity{.ts,.js}',
    ],
    logging: true,
    autoLoadEntities: true,
    migrations: ['src/database/migrations/*{.ts,.js}'],
    seeds: ['src/database/seeds/**/*{.ts,.js}'],
    factories: ['src/database/factories/**/*{.ts,.js}'],
    namingStrategy: new SnakeNamingStrategy(),
  };

module.exports = configs;
