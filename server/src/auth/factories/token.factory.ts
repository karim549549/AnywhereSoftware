import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
  sub: string; // User ID
  username: string;
  email: string;
}

@Injectable()
export class TokenFactory {
  constructor(private readonly jwtService: JwtService) {}

  createToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  createRefreshToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }
}
