import { ApiProperty } from '@nestjs/swagger';
import { Question as PrismaQuestion } from '@prisma/client';

export class Question implements PrismaQuestion {
  @ApiProperty({ description: 'Unique identifier of the question' })
  id: string;

  @ApiProperty({ description: 'Text of the question' })
  text: string;

  @ApiProperty({ description: 'Array of possible options for the question' })
  options: string[];

  @ApiProperty({ description: 'Correct answer for the question' })
  correctAnswer: string;

  @ApiProperty({ description: 'ID of the quiz this question belongs to' })
  quizId: string;

  @ApiProperty({ description: 'Date and time when the question was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Date and time when the question was last updated' })
  updatedAt: Date;
}