import { UserService } from '../user/user.service';
import { TokenFactory } from './factories/token.factory';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly userService;
    private readonly tokenFactory;
    private readonly configService;
    constructor(userService: UserService, tokenFactory: TokenFactory, configService: ConfigService);
    private setAuthCookies;
    register(registerDto: RegisterDto, res: Response): Promise<AuthResponseDto>;
    login(loginDto: LoginDto, res: Response): Promise<AuthResponseDto>;
    refreshToken(userId: string, res: Response): Promise<AuthResponseDto>;
    logout(res: Response): {
        message: string;
    };
}
