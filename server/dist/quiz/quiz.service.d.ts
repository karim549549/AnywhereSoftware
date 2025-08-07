import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './entities/quiz.entity';
import { PaginationResponse } from '../types/pagination.type';
export declare class QuizService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createQuizDto: CreateQuizDto): Promise<Quiz>;
    findAll(page?: number, limit?: number, sortBy?: string, orderBy?: 'asc' | 'desc'): Promise<PaginationResponse<Quiz>>;
    findOne(id: string): Promise<Quiz>;
    update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz>;
    remove(id: string): Promise<Quiz>;
}
