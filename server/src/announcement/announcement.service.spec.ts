import { Test, TestingModule } from '@nestjs/testing';
import { AnnouncementService } from './announcement.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('AnnouncementService', () => {
  let service: AnnouncementService;
  let prisma: PrismaService;

  const mockAnnouncement = {
    id: '1',
    title: 'Test Announcement',
    content: 'This is a test announcement.',
    userId: 'user123',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    announcement: {
      create: jest.fn().mockResolvedValue(mockAnnouncement),
      findMany: jest.fn().mockResolvedValue([mockAnnouncement]),
      findUnique: jest.fn().mockResolvedValue(mockAnnouncement),
      update: jest.fn().mockResolvedValue(mockAnnouncement),
      delete: jest.fn().mockResolvedValue(mockAnnouncement),
      count: jest.fn().mockResolvedValue(1),
    },
    $transaction: jest.fn((queries) => Promise.all(queries)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnnouncementService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<AnnouncementService>(AnnouncementService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an announcement with userId', async () => {
      const dto = { title: 'New Announcement', content: 'New Content' };
      const userId = 'user123';
      await service.create(dto, userId);
      expect(prisma.announcement.create).toHaveBeenCalledWith({ data: { ...dto, userId } });
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of all announcements with default sorting', async () => {
      const result = await service.findAll(1, 10);
      expect(prisma.announcement.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        orderBy: { createdAt: 'desc' },
      });
      expect(prisma.announcement.count).toHaveBeenCalled();
      expect(result).toEqual({
        data: [mockAnnouncement],
        total: 1,
        page: 1,
        limit: 10,
      });
    });

    it('should return a paginated list of all announcements with custom sorting', async () => {
      const result = await service.findAll(1, 10, 'title', 'asc');
      expect(prisma.announcement.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        orderBy: { title: 'asc' },
      });
      expect(prisma.announcement.count).toHaveBeenCalled();
      expect(result).toEqual({
        data: [mockAnnouncement],
        total: 1,
        page: 1,
        limit: 10,
      });
    });
  });

  describe('findByUserId', () => {
    it('should return a paginated list of announcements for a specific user with default sorting', async () => {
      const userId = 'user123';
      const result = await service.findByUserId(userId, 1, 10);
      expect(prisma.announcement.findMany).toHaveBeenCalledWith({
        where: { userId },
        skip: 0,
        take: 10,
        orderBy: { createdAt: 'desc' },
      });
      expect(prisma.announcement.count).toHaveBeenCalledWith({ where: { userId } });
      expect(result).toEqual({
        data: [mockAnnouncement],
        total: 1,
        page: 1,
        limit: 10,
      });
    });

    it('should return a paginated list of announcements for a specific user with custom sorting', async () => {
      const userId = 'user123';
      const result = await service.findByUserId(userId, 1, 10, 'title', 'asc');
      expect(prisma.announcement.findMany).toHaveBeenCalledWith({
        where: { userId },
        skip: 0,
        take: 10,
        orderBy: { title: 'asc' },
      });
      expect(prisma.announcement.count).toHaveBeenCalledWith({ where: { userId } });
      expect(result).toEqual({
        data: [mockAnnouncement],
        total: 1,
        page: 1,
        limit: 10,
      });
    });
  });

  describe('findOne', () => {
    it('should return an announcement by ID', async () => {
      const result = await service.findOne('1');
      expect(prisma.announcement.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(result).toEqual(mockAnnouncement);
    });

    it('should throw NotFoundException if announcement not found', async () => {
      mockPrismaService.announcement.findUnique.mockResolvedValueOnce(null);
      await expect(service.findOne('2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an announcement', async () => {
      const dto = { title: 'Updated Announcement' };
      const result = await service.update('1', dto);
      expect(prisma.announcement.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: dto,
      });
      expect(result).toEqual(mockAnnouncement);
    });

    it('should throw NotFoundException if announcement not found', async () => {
      mockPrismaService.announcement.update.mockRejectedValueOnce(new NotFoundException(`Announcement with ID 2 not found`));
      await expect(service.update('2', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an announcement', async () => {
      const result = await service.remove('1');
      expect(prisma.announcement.delete).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(result).toEqual(mockAnnouncement);
    });

    it('should throw NotFoundException if announcement not found', async () => {
      mockPrismaService.announcement.delete.mockRejectedValueOnce(new NotFoundException(`Announcement with ID 2 not found`));
      await expect(service.remove('2')).rejects.toThrow(NotFoundException);
    });
  });
});
