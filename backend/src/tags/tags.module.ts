import { Module } from '@nestjs/common';
import { TagsCrudService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tags } from '../entities/tags.entity';
// import { UserRolesEntity } from '../entities/userRoles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tags])],
  providers: [TagsCrudService],
  controllers: [TagsController],
})
export class TagsModule {}
