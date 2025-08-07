import { JwtPayload } from '../auth/factories/token.factory';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
