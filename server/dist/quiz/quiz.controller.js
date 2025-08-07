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
exports.QuizController = void 0;
const common_1 = require("@nestjs/common");
const quiz_service_1 = require("./quiz.service");
const create_quiz_dto_1 = require("./dto/create-quiz.dto");
const update_quiz_dto_1 = require("./dto/update-quiz.dto");
const swagger_1 = require("@nestjs/swagger");
const quiz_entity_1 = require("./entities/quiz.entity");
const get_quizzes_dto_1 = require("./dto/get-quizzes.dto");
const pagination_response_dto_1 = require("../types/pagination-response.dto");
let QuizController = class QuizController {
    quizService;
    constructor(quizService) {
        this.quizService = quizService;
    }
    async create(createQuizDto) {
        return this.quizService.create(createQuizDto);
    }
    async findAll(query) {
        const page = parseInt(query.page || '1', 10);
        const limit = parseInt(query.limit || '10', 10);
        const sortBy = query.sortBy || 'createdAt';
        const orderBy = query.orderBy || 'desc';
        return this.quizService.findAll(page, limit, sortBy, orderBy);
    }
    async findOne(id) {
        return this.quizService.findOne(id);
    }
    async update(id, updateQuizDto) {
        return this.quizService.update(id, updateQuizDto);
    }
    async remove(id) {
        await this.quizService.remove(id);
    }
};
exports.QuizController = QuizController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new quiz' }),
    (0, swagger_1.ApiBody)({ type: create_quiz_dto_1.CreateQuizDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The quiz has been successfully created.',
        type: quiz_entity_1.Quiz,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_quiz_dto_1.CreateQuizDto]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all quizzes' }),
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
        description: 'Returns all quizzes with pagination.',
        type: () => pagination_response_dto_1.PaginationResponseDto,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_quizzes_dto_1.GetQuizzesDto]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a quiz by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the quiz to retrieve' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the quiz with the specified ID.',
        type: quiz_entity_1.Quiz,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Quiz not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a quiz by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the quiz to update' }),
    (0, swagger_1.ApiBody)({ type: update_quiz_dto_1.UpdateQuizDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The quiz has been successfully updated.',
        type: quiz_entity_1.Quiz,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Quiz not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_quiz_dto_1.UpdateQuizDto]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a quiz by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the quiz to delete' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'The quiz has been successfully deleted.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Quiz not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "remove", null);
exports.QuizController = QuizController = __decorate([
    (0, swagger_1.ApiTags)('Quizzes'),
    (0, common_1.Controller)('quiz'),
    __metadata("design:paramtypes", [quiz_service_1.QuizService])
], QuizController);
//# sourceMappingURL=quiz.controller.js.map