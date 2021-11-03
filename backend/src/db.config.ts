import { ConnectionOptions } from 'typeorm';
import { join } from 'path';
import { config } from 'dotenv-flow';

config({
  purge_dotenv: true,
  silent: true,
  path: join(__dirname, '..', '..')
});

export const dbConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  synchronize: true,
  migrationsRun: false,
  migrationsTableName: 'migrations',
  logging: true,
  logger: 'file',
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default dbConfig;
