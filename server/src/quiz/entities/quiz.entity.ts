import { ApiProperty } from '@nestjs/swagger';
import { Quiz as PrismaQuiz } from '@prisma/client';
import { Question } from './question.entity';

export class Quiz implements PrismaQuiz {
  @ApiProperty({ description: 'Unique identifier of the quiz' })
  id: string;

  @ApiProperty({ description: 'Title of the quiz' })
  title: string;

  @ApiProperty({ description: 'Description of the quiz', required: false })
  description: string | null;

  @ApiProperty({ type: [Question], description: 'List of questions in the quiz' })
  questions: Question[];

  @ApiProperty({ description: 'Date and time when the quiz was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Date and time when the quiz was last updated' })
  updatedAt: Date;
}