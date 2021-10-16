import { ConnectionOptions } from 'typeorm';
import { join } from 'path';

export const dbConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'WapSter',
  password: 'WapSter',
  database: 'core',
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  synchronize: true,
  migrationsRun: false,
  logging: true,
  logger: 'file',
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
}

module.exports = dbConfig
