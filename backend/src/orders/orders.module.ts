import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from '../entities/orders.entity';
import { OrdersCrudService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Orders])],
  providers: [OrdersCrudService],
  controllers: [OrdersController],
})
export class OrdersModule {}
