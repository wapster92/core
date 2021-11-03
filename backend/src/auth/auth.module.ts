import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { Roles } from '../entities/roles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Roles])
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
