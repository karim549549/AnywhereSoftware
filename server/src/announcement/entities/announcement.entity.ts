import { ApiProperty } from '@nestjs/swagger';
import { Announcement as PrismaAnnouncement } from '@prisma/client';

export class Announcement implements PrismaAnnouncement {
  @ApiProperty({ description: 'Unique identifier of the announcement' })
  id: string;

  @ApiProperty({ description: 'Title of the announcement' })
  title: string;

  @ApiProperty({ description: 'Content of the announcement' })
  content: string;

  @ApiProperty({ description: 'Date and time when the announcement was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Date and time when the announcement was last updated' })
  updatedAt: Date;

  @ApiProperty({ description: 'ID of the user who created the announcement' })
  userId: string;
}
