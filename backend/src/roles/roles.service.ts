import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Roles } from '../entities/roles.entity';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Roles) private readonly userEntityRepository: Repository<Roles>) { }
}

export class RolesCrudService extends TypeOrmCrudService<Roles> {
  constructor(@InjectRepository(Roles) repo) {
    super(repo);
  }
}
