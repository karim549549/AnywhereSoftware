import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, ValidateNested, IsArray, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateQuestionDto } from './create-question.dto';

export class CreateQuizDto {
  @ApiProperty({ description: 'Title of the quiz' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Description of the quiz', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: [CreateQuestionDto], description: 'List of questions for the quiz' })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}