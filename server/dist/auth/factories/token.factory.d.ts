import { JwtService } from '@nestjs/jwt';
export interface JwtPayload {
    sub: string;
    username: string;
    email: string;
}
export declare class TokenFactory {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    createToken(payload: JwtPayload): string;
    createRefreshToken(payload: JwtPayload): string;
}
