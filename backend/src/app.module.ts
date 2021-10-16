import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { dbConfig } from './db.config';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(dbConfig),
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
