import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // This guard will automatically extract the JWT from the cookie
  // because the JwtStrategy is configured to do so.
}
