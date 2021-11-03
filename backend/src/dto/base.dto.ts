import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseDto {
  @ApiProperty()
  id?: string
  @ApiProperty()
  createdAt?: string
  @ApiProperty()
  updatedAt?: string
  @ApiProperty()
  deletedAt?: string
}
