import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { TokenFactory } from './factories/token.factory';
import { ConfigService } from '@nestjs/config';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

// Mock bcrypt.compare and bcrypt.hash
jest.mock('bcrypt', () => ({
  hash: jest.fn((password) => `hashed_${password}`),
  compare: jest.fn(
    (password, hash) => password === hash.replace('hashed_', ''),
  ),
}));

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let tokenFactory: TokenFactory;
  let configService: ConfigService;

  const mockResponse = {
    cookie: jest.fn(),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
          },
        },
        {
          provide: TokenFactory,
          useValue: {
            createToken: jest.fn((payload) => `access_token_${payload.sub}`),
            createRefreshToken: jest.fn(
              (payload) => `refresh_token_${payload.sub}`,
            ),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              switch (key) {
                case 'NODE_ENV':
                  return 'development';
                case 'JWT_ACCESS_TOKEN_EXPIRATION_TIME':
                  return 900;
                case 'JWT_REFRESH_TOKEN_EXPIRATION_TIME':
                  return 604800;
                case 'JWT_SECRET':
                  return 'test_secret';
                default:
                  return null;
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    tokenFactory = module.get<TokenFactory>(TokenFactory);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    const registerDto = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'Password123!',
    };
    const newUser = {
      id: '1',
      email: 'test@example.com',
      username: 'testuser',
      hashedPassword: 'hashed_Password123!',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should successfully register a new user', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(userService, 'create').mockResolvedValue(newUser);

      const result = await service.register(registerDto, mockResponse);

      expect(userService.findByEmail).toHaveBeenCalledWith(registerDto.email);
      expect(bcrypt.hash).toHaveBeenCalledWith(registerDto.password, 10);
      expect(userService.create).toHaveBeenCalledWith({
        email: registerDto.email,
        username: registerDto.username,
        hashedPassword: 'hashed_Password123!',
      });
      expect(tokenFactory.createToken).toHaveBeenCalledWith({
        sub: newUser.id,
        username: newUser.username,
        email: newUser.email,
      });
      expect(tokenFactory.createRefreshToken).toHaveBeenCalledWith({
        sub: newUser.id,
        username: newUser.username,
        email: newUser.email,
      });
      expect(mockResponse.cookie).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      });
    });

    it('should throw ConflictException if user email already exists', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(newUser);

      await expect(service.register(registerDto, mockResponse)).rejects.toThrow(
        ConflictException,
      );
      expect(userService.findByEmail).toHaveBeenCalledWith(registerDto.email);
      expect(userService.create).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    const loginDto = {
      email: 'test@example.com',
      password: 'Password123!',
    };
    const existingUser = {
      id: '1',
      email: 'test@example.com',
      username: 'testuser',
      hashedPassword: 'hashed_Password123!',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should successfully log in a user', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(existingUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.login(loginDto, mockResponse);

      expect(userService.findByEmail).toHaveBeenCalledWith(loginDto.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginDto.password,
        existingUser.hashedPassword,
      );
      expect(tokenFactory.createToken).toHaveBeenCalledWith({
        sub: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
      });
      expect(tokenFactory.createRefreshToken).toHaveBeenCalledWith({
        sub: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
      });
      expect(mockResponse.cookie).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
      });
    });

    it('should throw UnauthorizedException for invalid email', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);

      await expect(service.login(loginDto, mockResponse)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(userService.findByEmail).toHaveBeenCalledWith(loginDto.email);
      expect(bcrypt.compare).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException for invalid password', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(existingUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(loginDto, mockResponse)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(userService.findByEmail).toHaveBeenCalledWith(loginDto.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginDto.password,
        existingUser.hashedPassword,
      );
      expect(mockResponse.cookie).not.toHaveBeenCalled();
    });
  });

  describe('refreshToken', () => {
    const userId = '1';
    const existingUser = {
      id: userId,
      email: 'test@example.com',
      username: 'testuser',
      hashedPassword: 'hashed_Password123!',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should successfully refresh tokens', async () => {
      jest.spyOn(userService, 'findById').mockResolvedValue(existingUser);

      const result = await service.refreshToken(userId, mockResponse);

      expect(userService.findById).toHaveBeenCalledWith(userId);
      expect(tokenFactory.createToken).toHaveBeenCalledWith({
        sub: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
      });
      expect(tokenFactory.createRefreshToken).toHaveBeenCalledWith({
        sub: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
      });
      expect(mockResponse.cookie).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
      });
    });

    it('should throw UnauthorizedException if user not found', async () => {
      jest.spyOn(userService, 'findById').mockResolvedValue(null);

      await expect(service.refreshToken(userId, mockResponse)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(userService.findById).toHaveBeenCalledWith(userId);
      expect(tokenFactory.createToken).not.toHaveBeenCalled();
      expect(tokenFactory.createRefreshToken).not.toHaveBeenCalled();
      expect(mockResponse.cookie).not.toHaveBeenCalled();
    });
  });
});
