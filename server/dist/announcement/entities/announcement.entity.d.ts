import { Announcement as PrismaAnnouncement } from '@prisma/client';
export declare class Announcement implements PrismaAnnouncement {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}
