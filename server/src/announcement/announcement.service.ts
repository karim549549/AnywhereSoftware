import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Announcement } from './entities/announcement.entity';
import { PaginationResponse } from '../types/pagination.type';

@Injectable()
export class AnnouncementService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createAnnouncementDto: CreateAnnouncementDto,
    userId: string,
  ): Promise<Announcement> {
    return this.prisma.announcement.create({
      data: { ...createAnnouncementDto, userId },
    });
  }

  async findAll(
    page = 1,
    limit = 10,
    sortBy: string = 'createdAt',
    orderBy: 'asc' | 'desc' = 'desc',
  ): Promise<PaginationResponse<Announcement>> {
    const skip = (page - 1) * limit;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.announcement.findMany({
        skip,
        take: limit,
        orderBy: { [sortBy]: orderBy },
      }),
      this.prisma.announcement.count(),
    ]);
    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findByUserId(
    userId: string,
    page = 1,
    limit = 10,
    sortBy: string = 'createdAt',
    orderBy: 'asc' | 'desc' = 'desc',
  ): Promise<PaginationResponse<Announcement>> {
    const skip = (page - 1) * limit;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.announcement.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { [sortBy]: orderBy },
      }),
      this.prisma.announcement.count({ where: { userId } }),
    ]);
    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<Announcement> {
    const announcement = await this.prisma.announcement.findUnique({
      where: { id },
    });
    if (!announcement) {
      throw new NotFoundException(`Announcement with ID ${id} not found`);
    }
    return announcement;
  }

  async update(
    id: string,
    updateAnnouncementDto: UpdateAnnouncementDto,
  ): Promise<Announcement> {
    return this.prisma.announcement.update({
      where: { id },
      data: updateAnnouncementDto,
    });
  }

  async remove(id: string): Promise<Announcement> {
    return this.prisma.announcement.delete({ where: { id } });
  }
}
