import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../dto/base.dto';

export class RolesDto extends BaseDto{
  @ApiProperty()
  role: string
  @ApiProperty()
  name: string
  @ApiProperty()
  description: string
}
