import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus, NotFoundException } from '@nestjs/common';
import * as request from 'supertest';
import { QuizModule } from './quiz.module';
import { PrismaService } from '../prisma/prisma.service';
import { QuizService } from './quiz.service';

describe('QuizController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  const mockQuestion = {
    id: 'q1',
    text: 'Question 1',
    options: ['A', 'B'],
    correctAnswer: 'A',
    quizId: 'quiz1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockQuiz = {
    id: 'quiz1',
    title: 'Test Quiz',
    description: 'A quiz for testing',
    questions: [mockQuestion],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockPrismaService = {
    quiz: {
      create: jest.fn().mockResolvedValue(mockQuiz),
      findMany: jest.fn().mockResolvedValue([mockQuiz]),
      findUnique: jest.fn().mockResolvedValue(mockQuiz),
      update: jest.fn().mockResolvedValue(mockQuiz),
      delete: jest.fn().mockResolvedValue(mockQuiz),
      count: jest.fn().mockResolvedValue(1),
    },
    question: {
      deleteMany: jest.fn().mockResolvedValue({ count: 1 }),
    },
    $transaction: jest.fn((queries) => Promise.all(queries)),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [QuizController],
      providers: [
        QuizService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockPrismaService.quiz.create.mockResolvedValue(mockQuiz);
    mockPrismaService.quiz.findMany.mockResolvedValue([mockQuiz]);
    mockPrismaService.quiz.findUnique.mockResolvedValue(mockQuiz);
    mockPrismaService.quiz.update.mockResolvedValue(mockQuiz);
    mockPrismaService.quiz.delete.mockResolvedValue(mockQuiz);
    mockPrismaService.quiz.count.mockResolvedValue(1);
    mockPrismaService.question.deleteMany.mockResolvedValue({ count: 1 });
  });

  describe('/quiz (POST)', () => {
    it('should create a quiz', () => {
      const createDto = {
        title: 'New Quiz',
        description: 'New Description',
        questions: [
          { text: 'Q1', options: ['1', '2'], correctAnswer: '1' },
        ],
      };
      return request(app.getHttpServer())
        .post('/quiz')
        .send(createDto)
        .expect(HttpStatus.CREATED)
        .expect(mockQuiz);
    });
  });

  describe('/quiz (GET)', () => {
    it('should return all quizzes', () => {
      return request(app.getHttpServer())
        .get('/quiz')
        .expect(HttpStatus.OK)
        .expect({
          data: [mockQuiz],
          total: 1,
          page: 1,
          limit: 10,
        });
    });

    it('should return paginated quizzes with custom sorting', () => {
      mockPrismaService.quiz.findMany.mockResolvedValueOnce([mockQuiz]);
      mockPrismaService.quiz.count.mockResolvedValueOnce(1);

      return request(app.getHttpServer())
        .get('/quiz?page=1&limit=5&sortBy=title&orderBy=asc')
        .expect(HttpStatus.OK)
        .expect({
          data: [mockQuiz],
          total: 1,
          page: 1,
          limit: 5,
        });
    });
  });

  describe('/quiz/:id (GET)', () => {
    it('should return a quiz by ID', () => {
      return request(app.getHttpServer())
        .get(`/quiz/${mockQuiz.id}`)
        .expect(HttpStatus.OK)
        .expect(mockQuiz);
    });

    it('should return 404 if quiz not found', () => {
      mockPrismaService.quiz.findUnique.mockResolvedValueOnce(null);
      return request(app.getHttpServer())
        .get('/quiz/non-existent-id')
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/quiz/:id (PATCH)', () => {
    it('should update a quiz by ID', () => {
      const updateDto = { title: 'Updated Title' };
      return request(app.getHttpServer())
        .patch(`/quiz/${mockQuiz.id}`)
        .send(updateDto)
        .expect(HttpStatus.OK)
        .expect(mockQuiz);
    });

    it('should return 404 if quiz not found', () => {
      mockPrismaService.quiz.update.mockRejectedValueOnce(new NotFoundException());
      return request(app.getHttpServer())
        .patch('/quiz/non-existent-id')
        .send({ title: 'Updated Title' })
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/quiz/:id (DELETE)', () => {
    it('should delete a quiz by ID', () => {
      return request(app.getHttpServer())
        .delete(`/quiz/${mockQuiz.id}`)
        .expect(HttpStatus.NO_CONTENT);
    });

    it('should return 404 if quiz not found', () => {
      mockPrismaService.quiz.delete.mockRejectedValueOnce(new NotFoundException());
      return request(app.getHttpServer())
        .delete('/quiz/non-existent-id')
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});