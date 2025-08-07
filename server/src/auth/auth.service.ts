import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TokenFactory, JwtPayload } from './factories/token.factory';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import {
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
  JWT_ACCESS_TOKEN_EXPIRATION_TIME_KEY,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME_KEY,
} from '../common/constants/auth.constants';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenFactory: TokenFactory,
    private readonly configService: ConfigService,
  ) {}

  private setAuthCookies(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ) {
    const accessTokenExpiration = this.configService.get<number>(
      JWT_ACCESS_TOKEN_EXPIRATION_TIME_KEY,
    );
    const refreshTokenExpiration = this.configService.get<number>(
      JWT_REFRESH_TOKEN_EXPIRATION_TIME_KEY,
    );

    if (accessTokenExpiration === undefined || accessTokenExpiration === null) {
      throw new InternalServerErrorException(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME is not configured.',
      );
    }
    if (
      refreshTokenExpiration === undefined ||
      refreshTokenExpiration === null
    ) {
      throw new InternalServerErrorException(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME is not configured.',
      );
    }

    res.cookie(ACCESS_TOKEN_COOKIE_KEY, accessToken, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge: accessTokenExpiration * 1000,
    });
    res.cookie(REFRESH_TOKEN_COOKIE_KEY, refreshToken, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge: refreshTokenExpiration * 1000,
    });
  }

  async register(
    registerDto: RegisterDto,
    res: Response,
  ): Promise<AuthResponseDto> {
    const existingUserByEmail = await this.userService.findByEmail(
      registerDto.email,
    );
    if (existingUserByEmail) {
      throw new ConflictException('User with this emai cdl already exists');
    }

    const hashedPassword: string = await bcrypt.hash(registerDto.password, 10);

    const newUser = await this.userService.create({
      email: registerDto.email,
      username: registerDto.username,
      hashedPassword: hashedPassword,
    });

    const payload: JwtPayload = {
      sub: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };
    const accessToken = this.tokenFactory.createToken(payload);
    const refreshToken = this.tokenFactory.createRefreshToken(payload);

    this.setAuthCookies(res, accessToken, refreshToken);

    return { id: newUser.id, username: newUser.username, email: newUser.email };
  }

  async login(loginDto: LoginDto, res: Response): Promise<AuthResponseDto> {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user || !user.hashedPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid =
      (await bcrypt.compare(loginDto.password, user.hashedPassword)) ?? false;
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };
    const accessToken = this.tokenFactory.createToken(payload);
    const refreshToken = this.tokenFactory.createRefreshToken(payload);

    this.setAuthCookies(res, accessToken, refreshToken);

    return { id: user.id, username: user.username, email: user.email };
  }

  async refreshToken(userId: string, res: Response): Promise<AuthResponseDto> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };
    const accessToken = this.tokenFactory.createToken(payload);
    const refreshToken = this.tokenFactory.createRefreshToken(payload);

    this.setAuthCookies(res, accessToken, refreshToken);

    return { id: user.id, username: user.username, email: user.email };
  }

  logout(res: Response) {
    res.clearCookie(ACCESS_TOKEN_COOKIE_KEY);
    res.clearCookie(REFRESH_TOKEN_COOKIE_KEY);
    return { message: 'Logged out successfully' };
  }
}
