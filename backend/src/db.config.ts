import { ConnectionOptions } from 'typeorm';
import { join } from 'path';
import { config } from 'dotenv-flow';

config({
  purge_dotenv: true,
  silent: true,
  path: join(__dirname, '..', '..'),
});

export const dbConfig: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'core',
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  synchronize: true,
  migrationsRun: false,
  migrationsTableName: 'migrations',
  logging: true,
  logger: 'file',
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
    entitiesDir: 'src/entities',
  },
};

export default dbConfig;
