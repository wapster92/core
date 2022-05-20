import { Controller } from '@nestjs/common';
import { TagsCrudService } from './tags.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { Tags } from '../entities/tags.entity';

@Crud({
  model: {
    type: Tags,
  },
  query: {
    join: {},
  },
})
@Controller('tags')
export class TagsController implements CrudController<Tags> {
  constructor(public service: TagsCrudService) {}
}
