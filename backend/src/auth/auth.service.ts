import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRegisterDto, AuthLoginDto } from './dto/auth.dto';
import { Like, Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from '../entities/roles.entity';
import * as bcrypt from 'bcrypt';
import { RefreshTokens } from '../entities/refreshTokens.entity';
import { JwtService } from '@nestjs/jwt';
import { DateTime } from 'luxon';
import { AuthUpdateTokenDto } from './dto/updateToken.dto';

const maxRefreshTokens = Number(process.env.JWT_MAX_REFRESH_TOKENS);
type TypeToken = 'REFRESH' | 'ACCESS';

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
      relations: ['roles'],
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

    const { token } = await this.createRefreshToken(user);
    const accessToken = this.createToken(user, 'ACCESS');
    return {
      ...user,
      refreshToken: token,
      accessToken,
    };
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

  private async createRefreshToken(user: Users) {
    // Если токенов больше допустимых то удаляем все и создаем новый
    const tokens = await this.refreshTokensRepository.find({ user });
    if (tokens.length >= maxRefreshTokens) {
      await this.refreshTokensRepository.remove(tokens);
    }
    const token = this.createToken(user, 'REFRESH');
    const refreshToken = await this.refreshTokensRepository.create({
      user: user,
      token,
    });
    return await this.refreshTokensRepository.save(refreshToken);
  }

  async updateTokens(dto: AuthUpdateTokenDto) {
    const dt = DateTime.now();
    const { refreshToken } = dto;
    console.log(this.jwt.verify(refreshToken));
    const { expires, user } = this.jwt.verify(refreshToken);
    if (dt.toISO() > expires)
      throw new HttpException('refresh-token expires', HttpStatus.UNAUTHORIZED);
    const candidateRefreshToken = await this.refreshTokensRepository.findOne({
      token: refreshToken,
    });
    if (!Object.keys(candidateRefreshToken).length)
      throw new HttpException(
        'refresh-token not find',
        HttpStatus.UNAUTHORIZED,
      );
    const currentUser = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: ['roles'],
    });
    const newRefreshToken = this.createToken(currentUser, 'REFRESH');
    this.refreshTokensRepository
      .save({
        ...candidateRefreshToken,
        token: newRefreshToken,
      })
      .then();
    const accessToken = this.createToken(user, 'ACCESS');
    return { refreshToken: newRefreshToken, accessToken };
  }

  private createToken(user: Users, type: TypeToken) {
    const expires = DateTime.now()
      .plus({ seconds: Number(process.env[`JWT_${type}_EXP`]) })
      .toISO();
    const information = {
      user: { id: user.id, username: user.username, roles: user.roles },
      expires,
    };
    return this.jwt.sign(information);
  }
}
