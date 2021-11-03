import { Module } from '@nestjs/common';
import { RolesCrudService, RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from '../entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
  providers: [RolesService, RolesCrudService],
  controllers: [RolesController]
})
export class RolesModule {}
