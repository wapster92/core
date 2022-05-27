import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../dto/base.dto';

export class Tag {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  color: string;
}

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
  @ApiProperty()
  tags: Tag[];
}
