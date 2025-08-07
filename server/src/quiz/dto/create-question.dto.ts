import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray, ArrayMinSize, ArrayMaxSize } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({ description: 'Text of the question' })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({ description: 'Array of possible options for the question', type: [String], minItems: 2, maxItems: 10 })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(10)
  @IsString({ each: true })
  options: string[];

  @ApiProperty({ description: 'Correct answer for the question' })
  @IsNotEmpty()
  @IsString()
  correctAnswer: string;
}