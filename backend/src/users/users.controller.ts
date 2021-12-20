import { Controller, Get } from '@nestjs/common';
import { UsersCrudService } from './users.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { Users } from '../entities/users.entity';
import { UsersDto, CreateUserDto } from '../dto/users.dto';

@Crud({
  model: {
    type: UsersDto,
  },
  dto: {
    create: CreateUserDto,
  },
  query: {
    join: {
      roles: {
        eager: true,
      },
    },
  },
})
@Controller('users')
export class UsersController implements CrudController<Users> {
  constructor(public service: UsersCrudService) {}
}
