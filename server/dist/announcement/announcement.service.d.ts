import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
export declare class AnnouncementService {
    create(createAnnouncementDto: CreateAnnouncementDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAnnouncementDto: UpdateAnnouncementDto): string;
    remove(id: number): string;
}
