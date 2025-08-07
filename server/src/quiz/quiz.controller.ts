import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { Quiz } from './entities/quiz.entity';
import { GetQuizzesDto } from './dto/get-quizzes.dto';
import { PaginationResponse } from '../types/pagination.type';
import { PaginationResponseDto } from '../types/pagination-response.dto';

@ApiTags('Quizzes')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new quiz' })
  @ApiBody({ type: CreateQuizDto })
  @ApiResponse({
    status: 201,
    description: 'The quiz has been successfully created.',
    type: Quiz,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createQuizDto: CreateQuizDto): Promise<Quiz> {
    return this.quizService.create(createQuizDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all quizzes' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    type: String,
    description: 'Field to sort by (e.g., createdAt, title)',
  })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    enum: ['asc', 'desc'],
    description: 'Sort order (asc or desc)',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all quizzes with pagination.',
    type: () => PaginationResponseDto<Quiz>,
  })
  async findAll(
    @Query() query: GetQuizzesDto,
  ): Promise<PaginationResponse<Quiz>> {
    const page = parseInt(query.page || '1', 10);
    const limit = parseInt(query.limit || '10', 10);
    const sortBy = query.sortBy || 'createdAt';
    const orderBy = query.orderBy || 'desc';
    return this.quizService.findAll(page, limit, sortBy, orderBy);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a quiz by ID' })
  @ApiParam({ name: 'id', description: 'ID of the quiz to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'Returns the quiz with the specified ID.',
    type: Quiz,
  })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  async findOne(@Param('id') id: string): Promise<Quiz> {
    return this.quizService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a quiz by ID' })
  @ApiParam({ name: 'id', description: 'ID of the quiz to update' })
  @ApiBody({ type: UpdateQuizDto })
  @ApiResponse({
    status: 200,
    description: 'The quiz has been successfully updated.',
    type: Quiz,
  })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async update(
    @Param('id') id: string,
    @Body() updateQuizDto: UpdateQuizDto,
  ): Promise<Quiz> {
    return this.quizService.update(id, updateQuizDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a quiz by ID' })
  @ApiParam({ name: 'id', description: 'ID of the quiz to delete' })
  @ApiResponse({
    status: 204,
    description: 'The quiz has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.quizService.remove(id);
  }
}
