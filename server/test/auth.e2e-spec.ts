import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthService } from '../src/auth/auth.service';
import { AuthResponseDto } from '../src/auth/dto/auth-response.dto';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AuthService)
      .useValue({
        register: jest.fn(),
        login: jest.fn(),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    authService = moduleFixture.get<AuthService>(AuthService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/register (POST) should register a user', () => {
    const registerDto = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'Password123!',
    };
    const authResponse: AuthResponseDto = {
      id: '1',
      email: 'test@example.com',
      username: 'testuser',
    };

    jest.spyOn(authService, 'register').mockResolvedValue(authResponse);

    return request(app.getHttpServer())
      .post('/auth/register')
      .send(registerDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(authResponse);
        expect(authService.register).toHaveBeenCalledWith(
          registerDto, expect.anything()
        );
      });
  });

  it('/auth/login (POST) should log in a user', () => {
    const loginDto = {
      email: 'test@example.com',
      password: 'Password123!',
    };
    const authResponse: AuthResponseDto = {
      id: '1',
      email: 'test@example.com',
      username: 'testuser',
    };

    jest.spyOn(authService, 'login').mockResolvedValue(authResponse);

    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(authResponse);
        expect(authService.login).toHaveBeenCalledWith(
          loginDto, expect.anything()
        );
      });
  });

  it('/auth/register (POST) should return 409 if user already exists', () => {
    const registerDto = {
      email: 'existing@example.com',
      username: 'existinguser',
      password: 'Password123!',
    };

    jest.spyOn(authService, 'register').mockImplementation(() => {
      throw new ConflictException('User with this email already exists');
    });

    return request(app.getHttpServer())
      .post('/auth/register')
      .send(registerDto)
      .expect(409)
      .expect((res) => {
        expect(res.body.message).toEqual('User with this email already exists');
      });
  });

  it('/auth/login (POST) should return 401 for invalid credentials', () => {
    const loginDto = {
      email: 'invalid@example.com',
      password: 'wrongpassword',
    };

    jest.spyOn(authService, 'login').mockImplementation(() => {
      throw new UnauthorizedException('Invalid credentials');
    });

    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toEqual('Invalid credentials');
      });
  });
});
