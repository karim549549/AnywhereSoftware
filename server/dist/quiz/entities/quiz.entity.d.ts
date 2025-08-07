import { Quiz as PrismaQuiz } from '@prisma/client';
import { Question } from './question.entity';
export declare class Quiz implements PrismaQuiz {
    id: string;
    title: string;
    description: string | null;
    questions: Question[];
    createdAt: Date;
    updatedAt: Date;
}
