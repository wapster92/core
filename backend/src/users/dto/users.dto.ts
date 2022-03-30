import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseDto } from '../../dto/base.dto';
import { Roles } from '../../entities/roles.entity';

interface RefreshTokens {
  id: number;
  token: string;
  userId: number;
}

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
  refreshTokens: RefreshTokens[];
}
export class CreateUserDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
