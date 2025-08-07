"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnouncementService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AnnouncementService = class AnnouncementService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAnnouncementDto, userId) {
        return this.prisma.announcement.create({
            data: { ...createAnnouncementDto, userId },
        });
    }
    async findAll(page = 1, limit = 10, sortBy = 'createdAt', orderBy = 'desc') {
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
    async findByUserId(userId, page = 1, limit = 10, sortBy = 'createdAt', orderBy = 'desc') {
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
    async findOne(id) {
        const announcement = await this.prisma.announcement.findUnique({
            where: { id },
        });
        if (!announcement) {
            throw new common_1.NotFoundException(`Announcement with ID ${id} not found`);
        }
        return announcement;
    }
    async update(id, updateAnnouncementDto) {
        return this.prisma.announcement.update({
            where: { id },
            data: updateAnnouncementDto,
        });
    }
    async remove(id) {
        return this.prisma.announcement.delete({ where: { id } });
    }
};
exports.AnnouncementService = AnnouncementService;
exports.AnnouncementService = AnnouncementService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnnouncementService);
//# sourceMappingURL=announcement.service.js.map