import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
// import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class UsersCrudService extends TypeOrmCrudService<Users> {
  constructor(@InjectRepository(Users) repo) {
    super(repo);
  }
}
