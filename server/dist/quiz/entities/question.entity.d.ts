import { Question as PrismaQuestion } from '@prisma/client';
export declare class Question implements PrismaQuestion {
    id: string;
    text: string;
    options: string[];
    correctAnswer: string;
    quizId: string;
    createdAt: Date;
    updatedAt: Date;
}
