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
  UseGuards,
  Req,
} from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { Announcement } from './entities/announcement.entity';
import { GetAnnouncementsDto } from './dto/get-announcements.dto';
import { PaginationResponse } from '../types/pagination.type';
import { PaginationResponseDto } from '../types/pagination-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { JwtPayload } from '../auth/factories/token.factory';

@ApiTags('Announcements')
@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new announcement' })
  @ApiBody({ type: CreateAnnouncementDto })
  @ApiResponse({
    status: 201,
    description: 'The announcement has been successfully created.',
    type: Announcement,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(
    @Body() createAnnouncementDto: CreateAnnouncementDto,
    @Req() req: Request,
  ): Promise<Announcement> {
    const userId = (req.user as JwtPayload).sub;
    return this.announcementService.create(createAnnouncementDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all announcements' })
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
    description: 'Returns all announcements with pagination.',
    type: () => PaginationResponseDto<Announcement>,
  })
  async findAll(
    @Query() query: GetAnnouncementsDto,
  ): Promise<PaginationResponse<Announcement>> {
    const page = parseInt(query.page || '1', 10);
    const limit = parseInt(query.limit || '10', 10);
    const sortBy = query.sortBy || 'createdAt';
    const orderBy = query.orderBy || 'desc';
    return this.announcementService.findAll(page, limit, sortBy, orderBy);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Retrieve announcements for the authenticated user',
  })
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
    description:
      'Returns announcements for the authenticated user with pagination.',
    type: () => PaginationResponseDto<Announcement>,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAnnouncementsForUser(
    @Req() req: Request,
    @Query() query: GetAnnouncementsDto,
  ): Promise<PaginationResponse<Announcement>> {
    const userId = (req.user as JwtPayload).sub;
    const page = parseInt(query.page || '1', 10);
    const limit = parseInt(query.limit || '10', 10);
    const sortBy = query.sortBy || 'createdAt';
    const orderBy = query.orderBy || 'desc';
    return this.announcementService.findByUserId(
      userId,
      page,
      limit,
      sortBy,
      orderBy,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an announcement by ID' })
  @ApiParam({ name: 'id', description: 'ID of the announcement to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'Returns the announcement with the specified ID.',
    type: Announcement,
  })
  @ApiResponse({ status: 404, description: 'Announcement not found' })
  async findOne(@Param('id') id: string): Promise<Announcement> {
    return this.announcementService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an announcement by ID' })
  @ApiParam({ name: 'id', description: 'ID of the announcement to update' })
  @ApiBody({ type: UpdateAnnouncementDto })
  @ApiResponse({
    status: 200,
    description: 'The announcement has been successfully updated.',
    type: Announcement,
  })
  @ApiResponse({ status: 404, description: 'Announcement not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async update(
    @Param('id') id: string,
    @Body() updateAnnouncementDto: UpdateAnnouncementDto,
  ): Promise<Announcement> {
    return this.announcementService.update(id, updateAnnouncementDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an announcement by ID' })
  @ApiParam({ name: 'id', description: 'ID of the announcement to delete' })
  @ApiResponse({
    status: 204,
    description: 'The announcement has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Announcement not found' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.announcementService.remove(id);
  }
}
