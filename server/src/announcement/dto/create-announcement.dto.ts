import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateAnnouncementDto {
  @ApiProperty({ description: 'Title of the announcement', minLength: 3, maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @ApiProperty({ description: 'Content of the announcement', minLength: 10, maxLength: 1000 })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  content: string;
}