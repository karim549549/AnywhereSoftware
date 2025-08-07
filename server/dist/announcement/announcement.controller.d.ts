import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
export declare class AnnouncementController {
    private readonly announcementService;
    constructor(announcementService: AnnouncementService);
    create(createAnnouncementDto: CreateAnnouncementDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAnnouncementDto: UpdateAnnouncementDto): string;
    remove(id: string): string;
}
