import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus, CanActivate, NotFoundException } from '@nestjs/common';
import * as request from 'supertest';
import { AnnouncementModule } from './announcement.module';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

describe('AnnouncementController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  const mockAnnouncement = {
    id: 'test-id-1',
    title: 'Test Announcement',
    content: 'This is a test announcement content.',
    userId: 'user123',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockPrismaService = {
    announcement: {
      create: jest.fn().mockResolvedValue(mockAnnouncement),
      findMany: jest.fn().mockResolvedValue([mockAnnouncement]),
      findUnique: jest.fn().mockResolvedValue(mockAnnouncement),
      update: jest.fn().mockResolvedValue(mockAnnouncement),
      delete: jest.fn().mockResolvedValue(mockAnnouncement),
      count: jest.fn().mockResolvedValue(1),
    },
    $transaction: jest.fn((queries) => Promise.all(queries)),
  };

  const mockJwtAuthGuard: CanActivate = {
    canActivate: jest.fn((context) => {
      const request = context.switchToHttp().getRequest();
      request.user = { sub: 'user123', username: 'testuser', email: 'test@example.com' }; // Mock authenticated user
      return true;
    }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AnnouncementModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockPrismaService.announcement.create.mockResolvedValue(mockAnnouncement);
    mockPrismaService.announcement.findMany.mockResolvedValue([mockAnnouncement]);
    mockPrismaService.announcement.findUnique.mockResolvedValue(mockAnnouncement);
    mockPrismaService.announcement.update.mockResolvedValue(mockAnnouncement);
    mockPrismaService.announcement.delete.mockResolvedValue(mockAnnouncement);
    mockPrismaService.announcement.count.mockResolvedValue(1);
  });

  describe('/announcement (POST)', () => {
    it('should create an announcement', () => {
      return request(app.getHttpServer())
        .post('/announcement')
        .send({ title: 'New Announcement', content: 'New Content' })
        .expect(HttpStatus.CREATED)
        .expect(mockAnnouncement);
    });
  });

  describe('/announcement (GET)', () => {
    it('should return all announcements', () => {
      return request(app.getHttpServer())
        .get('/announcement')
        .expect(HttpStatus.OK)
        .expect({
          data: [mockAnnouncement],
          total: 1,
          page: 1,
          limit: 10,
        });
    });

    it('should return paginated announcements with custom sorting', () => {
      mockPrismaService.announcement.findMany.mockResolvedValueOnce([mockAnnouncement]);
      mockPrismaService.announcement.count.mockResolvedValueOnce(1);

      return request(app.getHttpServer())
        .get('/announcement?page=1&limit=5&sortBy=title&orderBy=asc')
        .expect(HttpStatus.OK)
        .expect({
          data: [mockAnnouncement],
          total: 1,
          page: 1,
          limit: 5,
        });
    });
  });

  describe('/announcement/user (GET)', () => {
    it('should return announcements for the authenticated user', () => {
      return request(app.getHttpServer())
        .get('/announcement/user')
        .expect(HttpStatus.OK)
        .expect({
          data: [mockAnnouncement],
          total: 1,
          page: 1,
          limit: 10,
        });
    });

    it('should return paginated announcements for the authenticated user with custom sorting', () => {
      mockPrismaService.announcement.findMany.mockResolvedValueOnce([mockAnnouncement]);
      mockPrismaService.announcement.count.mockResolvedValueOnce(1);

      return request(app.getHttpServer())
        .get('/announcement/user?page=1&limit=5&sortBy=title&orderBy=asc')
        .expect(HttpStatus.OK)
        .expect({
          data: [mockAnnouncement],
          total: 1,
          page: 1,
          limit: 5,
        });
    });
  });

  describe('/announcement/:id (GET)', () => {
    it('should return an announcement by ID', () => {
      return request(app.getHttpServer())
        .get(`/announcement/${mockAnnouncement.id}`)
        .expect(HttpStatus.OK)
        .expect(mockAnnouncement);
    });

    it('should return 404 if announcement not found', () => {
      mockPrismaService.announcement.findUnique.mockResolvedValueOnce(null);
      return request(app.getHttpServer())
        .get('/announcement/non-existent-id')
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/announcement/:id (PATCH)', () => {
    it('should update an announcement by ID', () => {
      const updateDto = { title: 'Updated Title' };
      return request(app.getHttpServer())
        .patch(`/announcement/${mockAnnouncement.id}`)
        .send(updateDto)
        .expect(HttpStatus.OK)
        .expect(mockAnnouncement);
    });

    it('should return 404 if announcement not found', () => {
      mockPrismaService.announcement.update.mockRejectedValueOnce(new NotFoundException());
      return request(app.getHttpServer())
        .patch('/announcement/non-existent-id')
        .send({ title: 'Updated Title' })
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/announcement/:id (DELETE)', () => {
    it('should delete an announcement by ID', () => {
      return request(app.getHttpServer())
        .delete(`/announcement/${mockAnnouncement.id}`)
        .expect(HttpStatus.NO_CONTENT);
    });

    it('should return 404 if announcement not found', () => {
      mockPrismaService.announcement.delete.mockRejectedValueOnce(new NotFoundException());
      return request(app.getHttpServer())
        .delete('/announcement/non-existent-id')
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
