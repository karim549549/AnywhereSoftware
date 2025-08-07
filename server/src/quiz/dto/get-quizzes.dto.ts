import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumberString, IsString, IsIn } from 'class-validator';
import { SortOrder } from '../../common/enums/sort-order.enum';

export class GetQuizzesDto {
  @ApiPropertyOptional({ description: 'Page number', default: 1 })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ description: 'Number of items per page', default: 10 })
  @IsOptional()
  @IsNumberString()
  limit?: string;

  @ApiPropertyOptional({ description: 'Field to sort by', enum: ['createdAt', 'updatedAt', 'title'], default: 'createdAt' })
  @IsOptional()
  @IsString()
  @IsIn(['createdAt', 'updatedAt', 'title'])
  sortBy?: string;

  @ApiPropertyOptional({ description: 'Sort order', enum: SortOrder, default: SortOrder.DESC })
  @IsOptional()
  @IsIn([SortOrder.ASC, SortOrder.DESC])
  orderBy?: SortOrder;
}