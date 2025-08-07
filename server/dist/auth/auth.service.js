"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const token_factory_1 = require("./factories/token.factory");
const bcrypt = require("bcrypt");
const config_1 = require("@nestjs/config");
const auth_constants_1 = require("../common/constants/auth.constants");
let AuthService = class AuthService {
    userService;
    tokenFactory;
    configService;
    constructor(userService, tokenFactory, configService) {
        this.userService = userService;
        this.tokenFactory = tokenFactory;
        this.configService = configService;
    }
    setAuthCookies(res, accessToken, refreshToken) {
        const accessTokenExpiration = this.configService.get(auth_constants_1.JWT_ACCESS_TOKEN_EXPIRATION_TIME_KEY);
        const refreshTokenExpiration = this.configService.get(auth_constants_1.JWT_REFRESH_TOKEN_EXPIRATION_TIME_KEY);
        if (accessTokenExpiration === undefined || accessTokenExpiration === null) {
            throw new common_1.InternalServerErrorException('JWT_ACCESS_TOKEN_EXPIRATION_TIME is not configured.');
        }
        if (refreshTokenExpiration === undefined ||
            refreshTokenExpiration === null) {
            throw new common_1.InternalServerErrorException('JWT_REFRESH_TOKEN_EXPIRATION_TIME is not configured.');
        }
        res.cookie(auth_constants_1.ACCESS_TOKEN_COOKIE_KEY, accessToken, {
            httpOnly: true,
            secure: this.configService.get('NODE_ENV') === 'production',
            sameSite: 'strict',
            maxAge: accessTokenExpiration * 1000,
        });
        res.cookie(auth_constants_1.REFRESH_TOKEN_COOKIE_KEY, refreshToken, {
            httpOnly: true,
            secure: this.configService.get('NODE_ENV') === 'production',
            sameSite: 'strict',
            maxAge: refreshTokenExpiration * 1000,
        });
    }
    async register(registerDto, res) {
        const existingUserByEmail = await this.userService.findByEmail(registerDto.email);
        if (existingUserByEmail) {
            throw new common_1.ConflictException('User with this emai cdl already exists');
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const newUser = await this.userService.create({
            email: registerDto.email,
            username: registerDto.username,
            hashedPassword: hashedPassword,
        });
        const payload = {
            sub: newUser.id,
            username: newUser.username,
            email: newUser.email,
        };
        const accessToken = this.tokenFactory.createToken(payload);
        const refreshToken = this.tokenFactory.createRefreshToken(payload);
        this.setAuthCookies(res, accessToken, refreshToken);
        return { id: newUser.id, username: newUser.username, email: newUser.email };
    }
    async login(loginDto, res) {
        const user = await this.userService.findByEmail(loginDto.email);
        if (!user || !user.hashedPassword) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = (await bcrypt.compare(loginDto.password, user.hashedPassword)) ?? false;
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = {
            sub: user.id,
            username: user.username,
            email: user.email,
        };
        const accessToken = this.tokenFactory.createToken(payload);
        const refreshToken = this.tokenFactory.createRefreshToken(payload);
        this.setAuthCookies(res, accessToken, refreshToken);
        return { id: user.id, username: user.username, email: user.email };
    }
    async refreshToken(userId, res) {
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const payload = {
            sub: user.id,
            username: user.username,
            email: user.email,
        };
        const accessToken = this.tokenFactory.createToken(payload);
        const refreshToken = this.tokenFactory.createRefreshToken(payload);
        this.setAuthCookies(res, accessToken, refreshToken);
        return { id: user.id, username: user.username, email: user.email };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        token_factory_1.TokenFactory,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map