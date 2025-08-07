import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { Announcement } from './entities/announcement.entity';
import { GetAnnouncementsDto } from './dto/get-announcements.dto';
import { PaginationResponse } from '../types/pagination.type';
import { Request } from 'express';
export declare class AnnouncementController {
    private readonly announcementService;
    constructor(announcementService: AnnouncementService);
    create(createAnnouncementDto: CreateAnnouncementDto, req: Request): Promise<Announcement>;
    findAll(query: GetAnnouncementsDto): Promise<PaginationResponse<Announcement>>;
    findAnnouncementsForUser(req: Request, query: GetAnnouncementsDto): Promise<PaginationResponse<Announcement>>;
    findOne(id: string): Promise<Announcement>;
    update(id: string, updateAnnouncementDto: UpdateAnnouncementDto): Promise<Announcement>;
    remove(id: string): Promise<void>;
}
