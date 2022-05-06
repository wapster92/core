import { Controller, Get } from '@nestjs/common';
import { OrdersCrudService } from './orders.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { OrdersDto } from './dto/orders.dto';
import { Orders } from '../entities/orders.entity';

@Crud({
  model: {
    type: OrdersDto,
  },
  // query: {
  //   alwaysPaginate: true,
  // }
})
@Controller('orders')
export class OrdersController implements CrudController<Orders> {
  constructor(public service: OrdersCrudService) {}
}
