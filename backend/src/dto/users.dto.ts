import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseDto } from './base.dto';
import { Roles } from '../entities/roles.entity';

export class UsersDto extends BaseDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  @Exclude()
  password: string;
  @ApiProperty()
  roles: Roles[] = [];
  @ApiProperty()
  refreshTokens?: string[];
}
export class CreateUserDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
