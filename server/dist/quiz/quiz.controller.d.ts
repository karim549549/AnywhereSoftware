import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './entities/quiz.entity';
import { GetQuizzesDto } from './dto/get-quizzes.dto';
import { PaginationResponse } from '../types/pagination.type';
export declare class QuizController {
    private readonly quizService;
    constructor(quizService: QuizService);
    create(createQuizDto: CreateQuizDto): Promise<Quiz>;
    findAll(query: GetQuizzesDto): Promise<PaginationResponse<Quiz>>;
    findOne(id: string): Promise<Quiz>;
    update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz>;
    remove(id: string): Promise<void>;
}
