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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnouncementController = void 0;
const common_1 = require("@nestjs/common");
const announcement_service_1 = require("./announcement.service");
const create_announcement_dto_1 = require("./dto/create-announcement.dto");
const update_announcement_dto_1 = require("./dto/update-announcement.dto");
const swagger_1 = require("@nestjs/swagger");
const announcement_entity_1 = require("./entities/announcement.entity");
const get_announcements_dto_1 = require("./dto/get-announcements.dto");
const pagination_response_dto_1 = require("../types/pagination-response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let AnnouncementController = class AnnouncementController {
    announcementService;
    constructor(announcementService) {
        this.announcementService = announcementService;
    }
    async create(createAnnouncementDto, req) {
        const userId = req.user.sub;
        return this.announcementService.create(createAnnouncementDto, userId);
    }
    async findAll(query) {
        const page = parseInt(query.page || '1', 10);
        const limit = parseInt(query.limit || '10', 10);
        const sortBy = query.sortBy || 'createdAt';
        const orderBy = query.orderBy || 'desc';
        return this.announcementService.findAll(page, limit, sortBy, orderBy);
    }
    async findAnnouncementsForUser(req, query) {
        const userId = req.user.sub;
        const page = parseInt(query.page || '1', 10);
        const limit = parseInt(query.limit || '10', 10);
        const sortBy = query.sortBy || 'createdAt';
        const orderBy = query.orderBy || 'desc';
        return this.announcementService.findByUserId(userId, page, limit, sortBy, orderBy);
    }
    async findOne(id) {
        return this.announcementService.findOne(id);
    }
    async update(id, updateAnnouncementDto) {
        return this.announcementService.update(id, updateAnnouncementDto);
    }
    async remove(id) {
        await this.announcementService.remove(id);
    }
};
exports.AnnouncementController = AnnouncementController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new announcement' }),
    (0, swagger_1.ApiBody)({ type: create_announcement_dto_1.CreateAnnouncementDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The announcement has been successfully created.',
        type: announcement_entity_1.Announcement,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_announcement_dto_1.CreateAnnouncementDto, Object]),
    __metadata("design:returntype", Promise)
], AnnouncementController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all announcements' }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of items per page',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sortBy',
        required: false,
        type: String,
        description: 'Field to sort by (e.g., createdAt, title)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'orderBy',
        required: false,
        enum: ['asc', 'desc'],
        description: 'Sort order (asc or desc)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns all announcements with pagination.',
        type: () => pagination_response_dto_1.PaginationResponseDto,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_announcements_dto_1.GetAnnouncementsDto]),
    __metadata("design:returntype", Promise)
], AnnouncementController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('user'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve announcements for the authenticated user',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of items per page',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sortBy',
        required: false,
        type: String,
        description: 'Field to sort by (e.g., createdAt, title)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'orderBy',
        required: false,
        enum: ['asc', 'desc'],
        description: 'Sort order (asc or desc)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns announcements for the authenticated user with pagination.',
        type: () => pagination_response_dto_1.PaginationResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_announcements_dto_1.GetAnnouncementsDto]),
    __metadata("design:returntype", Promise)
], AnnouncementController.prototype, "findAnnouncementsForUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve an announcement by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the announcement to retrieve' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the announcement with the specified ID.',
        type: announcement_entity_1.Announcement,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Announcement not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnnouncementController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an announcement by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the announcement to update' }),
    (0, swagger_1.ApiBody)({ type: update_announcement_dto_1.UpdateAnnouncementDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The announcement has been successfully updated.',
        type: announcement_entity_1.Announcement,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Announcement not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_announcement_dto_1.UpdateAnnouncementDto]),
    __metadata("design:returntype", Promise)
], AnnouncementController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an announcement by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the announcement to delete' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'The announcement has been successfully deleted.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Announcement not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnnouncementController.prototype, "remove", null);
exports.AnnouncementController = AnnouncementController = __decorate([
    (0, swagger_1.ApiTags)('Announcements'),
    (0, common_1.Controller)('announcement'),
    __metadata("design:paramtypes", [announcement_service_1.AnnouncementService])
], AnnouncementController);
//# sourceMappingURL=announcement.controller.js.map