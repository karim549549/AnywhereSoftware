import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Announcement } from './entities/announcement.entity';
import { PaginationResponse } from '../types/pagination.type';
export declare class AnnouncementService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createAnnouncementDto: CreateAnnouncementDto, userId: string): Promise<Announcement>;
    findAll(page?: number, limit?: number, sortBy?: string, orderBy?: 'asc' | 'desc'): Promise<PaginationResponse<Announcement>>;
    findByUserId(userId: string, page?: number, limit?: number, sortBy?: string, orderBy?: 'asc' | 'desc'): Promise<PaginationResponse<Announcement>>;
    findOne(id: string): Promise<Announcement>;
    update(id: string, updateAnnouncementDto: UpdateAnnouncementDto): Promise<Announcement>;
    remove(id: string): Promise<Announcement>;
}
