import { CreateQuestionDto } from './create-question.dto';
export declare class CreateQuizDto {
    title: string;
    description?: string;
    questions: CreateQuestionDto[];
}
