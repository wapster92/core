import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { RolesDto } from './dto/roles.dto';
import { Roles } from '../entities/roles.entity';
import { RolesCrudService } from './roles.service';
import { AuthGuard } from '../auth/auth.guard';

@Crud({
  model: {
    type: RolesDto,
  },
  routes: {
    getManyBase: {
      decorators: [AuthGuard(['USER'])],
    },
  },
})
@Controller('roles')
export class RolesController implements CrudController<Roles> {
  constructor(public service: RolesCrudService) {}
}
