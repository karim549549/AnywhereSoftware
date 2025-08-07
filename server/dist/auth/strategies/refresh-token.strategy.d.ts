import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';
import { JwtPayload } from '../factories/token.factory';
import { User } from '@prisma/client';
declare const RefreshTokenStrategy_base: new (...args: any) => any;
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    private readonly configService;
    private readonly userService;
    constructor(configService: ConfigService, userService: UserService);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
