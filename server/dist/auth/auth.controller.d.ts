import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { Response, Request } from 'express';
import { JwtPayload } from './factories/token.factory';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto, res: Response): Promise<AuthResponseDto>;
    login(loginDto: LoginDto, res: Response): Promise<AuthResponseDto>;
    getMe(req: Request): JwtPayload;
    refresh(req: Request, res: Response): Promise<AuthResponseDto>;
    logout(res: Response): {
        message: string;
    };
}
