import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from '../entities/orders.entity';
// import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class OrdersCrudService extends TypeOrmCrudService<Orders> {
  constructor(@InjectRepository(Orders) repo) {
    super(repo);
  }
}
