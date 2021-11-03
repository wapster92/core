import { Module } from '@nestjs/common';
import { UsersCrudService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { Roles } from '../entities/roles.entity';
// import { UserRolesEntity } from '../entities/userRoles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users])
  ],
  providers: [UsersCrudService],
  controllers: [UsersController]
})
export class UsersModule {}
