import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './entities/quiz.entity';
import { PaginationResponse } from '../types/pagination.type';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const { questions, ...quizData } = createQuizDto;
    return this.prisma.quiz.create({
      data: {
        ...quizData,
        questions: {
          create: questions,
        },
      },
      include: { questions: true },
    });
  }

  async findAll(
    page = 1,
    limit = 10,
    sortBy: string = 'createdAt',
    orderBy: 'asc' | 'desc' = 'desc',
  ): Promise<PaginationResponse<Quiz>> {
    const skip = (page - 1) * limit;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.quiz.findMany({
        skip,
        take: limit,
        orderBy: { [sortBy]: orderBy },
        include: { questions: true },
      }),
      this.prisma.quiz.count(),
    ]);
    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<Quiz> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: { questions: true },
    });
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }
    return quiz;
  }

  async update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    const { questions, ...quizData } = updateQuizDto;

    // Handle nested questions update: delete existing and create new ones
    // This is a common strategy for nested arrays in NoSQL databases with Prisma
    if (questions) {
      await this.prisma.question.deleteMany({ where: { quizId: id } });
    }

    return await this.prisma.quiz.update({
      where: { id },
      data: {
        ...quizData,
        ...(questions && { questions: { create: questions } }),
      },
      include: { questions: true },
    });
  }

  async remove(id: string): Promise<Quiz> {
    // Delete associated questions first
    await this.prisma.question.deleteMany({ where: { quizId: id } });
    return await this.prisma.quiz.delete({
      where: { id },
      include: { questions: true },
    });
  }
}
