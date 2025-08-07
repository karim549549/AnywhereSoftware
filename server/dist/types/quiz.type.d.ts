import { IQuestion, ICreateQuestionDto, IUpdateQuestionDto } from './question.type';
export interface IQuiz {
    id: string;
    title: string;
    description?: string | null;
    questions?: IQuestion[];
    createdAt: Date;
    updatedAt: Date;
}
export interface ICreateQuizDto {
    title: string;
    description?: string;
    questions?: ICreateQuestionDto[];
}
export interface IUpdateQuizDto {
    title?: string;
    description?: string;
    questions?: IUpdateQuestionDto[];
}
