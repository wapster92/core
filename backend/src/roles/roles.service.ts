import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Roles } from '../entities/roles.entity';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Roles) private readonly userEntityRepository: Repository<Roles>) { }
}
