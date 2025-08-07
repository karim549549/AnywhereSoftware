import { Test, TestingModule } from '@nestjs/testing';
import { QuizService } from './quiz.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('QuizService', () => {
  let service: QuizService;
  let prisma: PrismaService;

  const mockQuestion = {
    id: 'q1',
    text: 'Question 1',
    options: ['A', 'B'],
    correctAnswer: 'A',
    quizId: 'quiz1',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockQuiz = {
    id: 'quiz1',
    title: 'Test Quiz',
    description: 'A quiz for testing',
    questions: [mockQuestion],
    createdAt: new Date(),
    updatedAt: new Date(),
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<QuizService>(QuizService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a quiz with questions', async () => {
      const dto = {
        title: 'New Quiz',
        description: 'New Description',
        questions: [
          { text: 'Q1', options: ['1', '2'], correctAnswer: '1' },
        ],
      };
      await service.create(dto);
      expect(prisma.quiz.create).toHaveBeenCalledWith({
        data: {
          title: dto.title,
          description: dto.description,
          questions: { create: dto.questions },
        },
        include: { questions: true },
      });
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of quizzes with default sorting', async () => {
      const result = await service.findAll(1, 10);
      expect(prisma.quiz.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: { questions: true },
      });
      expect(prisma.quiz.count).toHaveBeenCalled();
      expect(result).toEqual({
        data: [mockQuiz],
        total: 1,
        page: 1,
        limit: 10,
      });
    });

    it('should return a paginated list of quizzes with custom sorting', async () => {
      const result = await service.findAll(1, 10, 'title', 'asc');
      expect(prisma.quiz.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        orderBy: { title: 'asc' },
        include: { questions: true },
      });
      expect(prisma.quiz.count).toHaveBeenCalled();
      expect(result).toEqual({
        data: [mockQuiz],
        total: 1,
        page: 1,
        limit: 10,
      });
    });
  });

  describe('findOne', () => {
    it('should return a quiz by ID', async () => {
      const result = await service.findOne('quiz1');
      expect(prisma.quiz.findUnique).toHaveBeenCalledWith({
        where: { id: 'quiz1' },
        include: { questions: true },
      });
      expect(result).toEqual(mockQuiz);
    });

    it('should throw NotFoundException if quiz not found', async () => {
      mockPrismaService.quiz.findUnique.mockResolvedValueOnce(null);
      await expect(service.findOne('quiz2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a quiz', async () => {
      const dto = { title: 'Updated Quiz' };
      const result = await service.update('quiz1', dto);
      expect(prisma.quiz.update).toHaveBeenCalledWith({
        where: { id: 'quiz1' },
        data: dto,
        include: { questions: true },
      });
      expect(result).toEqual(mockQuiz);
    });

    it('should update a quiz with new questions', async () => {
      const dto = {
        title: 'Updated Quiz',
        questions: [
          { text: 'Q2', options: ['3', '4'], correctAnswer: '3' },
        ],
      };
      const result = await service.update('quiz1', dto);
      expect(prisma.question.deleteMany).toHaveBeenCalledWith({ where: { quizId: 'quiz1' } });
      expect(prisma.quiz.update).toHaveBeenCalledWith({
        where: { id: 'quiz1' },
        data: {
          title: dto.title,
          questions: { create: dto.questions },
        },
        include: { questions: true },
      });
      expect(result).toEqual(mockQuiz);
    });

    it('should throw NotFoundException if quiz not found', async () => {
      mockPrismaService.quiz.update.mockRejectedValueOnce(new NotFoundException(`Quiz with ID quiz2 not found`));
      await expect(service.update('quiz2', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a quiz', async () => {
      const result = await service.remove('quiz1');
      expect(prisma.question.deleteMany).toHaveBeenCalledWith({ where: { quizId: 'quiz1' } });
      expect(prisma.quiz.delete).toHaveBeenCalledWith({ where: { id: 'quiz1' }, include: { questions: true } });
      expect(result).toEqual(mockQuiz);
    });

    it('should throw NotFoundException if quiz not found', async () => {
      mockPrismaService.quiz.delete.mockRejectedValueOnce(new NotFoundException(`Quiz with ID quiz2 not found`));
      await expect(service.remove('quiz2')).rejects.toThrow(NotFoundException);
    });
  });
});