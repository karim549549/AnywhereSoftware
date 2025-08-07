import { CreateQuizDto } from './create-quiz.dto';
import { CreateQuestionDto } from './create-question.dto';
declare const UpdateQuizDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateQuizDto>>;
export declare class UpdateQuizDto extends UpdateQuizDto_base {
    title?: string;
    description?: string;
    questions?: CreateQuestionDto[];
}
export {};
