import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRegisterDto, AuthLoginDto } from '../dto/auth.dto';
import { Like, Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from '../entities/roles.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>
  ) {}
  login(dto: AuthLoginDto) {
    console.log(dto)
    return true
  }
  async register(dto: AuthRegisterDto) {
    try {
      const candidate = await this.usersRepository.find({
        where: [
          {username: Like(`%${dto.username}%`)},
          {email: Like(`%${dto.email}%`)}
        ]
      });
      if (candidate.length) {
        throw new HttpException(
          'Имя пользователя или email заняты',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const roleUser = await this.rolesRepository.findOne({ role: "USER" })
      const user = new Users()
      user.username = dto.username;
      user.password = dto.password;
      user.email = dto.email
      user.roles = [roleUser];
      await this.usersRepository.save(user);
      return user;
    } catch (e) {
      throw e;
    }
  }
}
