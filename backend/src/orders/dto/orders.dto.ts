import { ApiProperty } from '@nestjs/swagger';

import { BaseDto } from '../../dto/base.dto';

export class OrdersDto extends BaseDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  deadline: Date;
  @ApiProperty()
  company: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  completed: boolean;
}
