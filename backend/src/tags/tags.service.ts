import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tags } from '../entities/tags.entity';
// import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class TagsCrudService extends TypeOrmCrudService<Tags> {
  constructor(@InjectRepository(Tags) repo) {
    super(repo);
  }
}
