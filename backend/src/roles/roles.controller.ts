import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { RolesDto } from '../dto/roles.dto';
import { Roles } from '../entities/roles.entity';
import { RolesCrudService } from './roles.service';


@Crud({
  model: {
    type: RolesDto,
  },
})
@Controller('roles')
export class RolesController implements CrudController<Roles>{
  constructor(public service: RolesCrudService) {}
}
