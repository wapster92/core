import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRegisterDto, AuthLoginDto } from '../dto/auth.dto';
import { Like, Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from '../entities/roles.entity';
import * as bcrypt from 'bcrypt';
import { RefreshTokens } from '../entities/refreshTokens.entity';
import { JwtService } from '@nestjs/jwt';
import { DateTime } from 'luxon';

const secret = process.env.JWT_SECRET;

console.log(DateTime);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
    @InjectRepository(RefreshTokens)
    private refreshTokensRepository: Repository<RefreshTokens>,
    private readonly jwt: JwtService,
  ) {}

  async login(dto: AuthLoginDto) {
    const user = await this.usersRepository.findOne({
      where: [
        { username: Like(`%${dto.login}%`) },
        { email: Like(`%${dto.login}%`) },
      ],
    });

    if (!user)
      throw new HttpException(
        'Имя пользователя или пароль неверны',
        HttpStatus.UNAUTHORIZED,
      );

    const passwordMatch = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatch)
      throw new HttpException(
        'Имя пользователя или пароль неверны',
        HttpStatus.UNAUTHORIZED,
      );

    const token = await this.createRefreshToken(user);
    console.log(this.jwt.verify(token.token));
    return user;
  }

  async register(dto: AuthRegisterDto) {
    try {
      const candidate = await this.usersRepository.find({
        where: [
          { username: Like(`%${dto.username}%`) },
          { email: Like(`%${dto.email}%`) },
        ],
      });

      if (candidate.length)
        throw new HttpException(
          'Имя пользователя или email заняты',
          HttpStatus.UNAUTHORIZED,
        );

      const roleUser = await this.rolesRepository.findOne({ role: 'USER' });
      const user = new Users();
      user.username = dto.username;
      user.password = dto.password;
      user.email = dto.email;
      user.roles = [roleUser];
      await this.usersRepository.save(user);
      return user;
    } catch (e) {
      throw e;
    }
  }

  async createRefreshToken(user: Users) {
    const expires = DateTime.now()
      .plus({ seconds: Number(process.env.JWT_REFRESH_EXP) })
      .toISO();
    const information = {
      user: { id: user.id, username: user.username },
      expires,
    };
    const token = await this.jwt.sign(information);
    const refreshToken = await this.refreshTokensRepository.create({
      user: user,
      token,
    });

    return await this.refreshTokensRepository.save(refreshToken);
  }
}
