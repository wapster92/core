import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private readonly userEntityRepository: Repository<Users>) { }
  async create() {
    let user = new Users()
    user.username = 'WapSter';
    user.email = 'wapster92@gmail.com'
    user.password = '0392'
    return await this.userEntityRepository.save(user);
  }
}
