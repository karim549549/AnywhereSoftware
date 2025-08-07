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
exports.QuizService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let QuizService = class QuizService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createQuizDto) {
        const { questions, ...quizData } = createQuizDto;
        return this.prisma.quiz.create({
            data: {
                ...quizData,
                questions: {
                    create: questions,
                },
            },
            include: { questions: true },
        });
    }
    async findAll(page = 1, limit = 10, sortBy = 'createdAt', orderBy = 'desc') {
        const skip = (page - 1) * limit;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.quiz.findMany({
                skip,
                take: limit,
                orderBy: { [sortBy]: orderBy },
                include: { questions: true },
            }),
            this.prisma.quiz.count(),
        ]);
        return {
            data,
            total,
            page,
            limit,
        };
    }
    async findOne(id) {
        const quiz = await this.prisma.quiz.findUnique({
            where: { id },
            include: { questions: true },
        });
        if (!quiz) {
            throw new common_1.NotFoundException(`Quiz with ID ${id} not found`);
        }
        return quiz;
    }
    async update(id, updateQuizDto) {
        const { questions, ...quizData } = updateQuizDto;
        if (questions) {
            await this.prisma.question.deleteMany({ where: { quizId: id } });
        }
        return await this.prisma.quiz.update({
            where: { id },
            data: {
                ...quizData,
                ...(questions && { questions: { create: questions } }),
            },
            include: { questions: true },
        });
    }
    async remove(id) {
        await this.prisma.question.deleteMany({ where: { quizId: id } });
        return await this.prisma.quiz.delete({
            where: { id },
            include: { questions: true },
        });
    }
};
exports.QuizService = QuizService;
exports.QuizService = QuizService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuizService);
//# sourceMappingURL=quiz.service.js.map