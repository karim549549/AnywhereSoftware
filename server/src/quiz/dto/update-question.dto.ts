import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsArray, ArrayMinSize, ArrayMaxSize } from 'class-validator';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  @ApiPropertyOptional({ description: 'Text of the question' })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiPropertyOptional({ description: 'Array of possible options for the question', type: [String], minItems: 2, maxItems: 10 })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(10)
  @IsString({ each: true })
  options?: string[];

  @ApiPropertyOptional({ description: 'Correct answer for the question' })
  @IsOptional()
  @IsString()
  correctAnswer?: string;
}