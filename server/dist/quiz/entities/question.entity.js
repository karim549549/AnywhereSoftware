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
exports.Question = void 0;
const swagger_1 = require("@nestjs/swagger");
class Question {
    id;
    text;
    options;
    correctAnswer;
    quizId;
    createdAt;
    updatedAt;
}
exports.Question = Question;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier of the question' }),
    __metadata("design:type", String)
], Question.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Text of the question' }),
    __metadata("design:type", String)
], Question.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Array of possible options for the question' }),
    __metadata("design:type", Array)
], Question.prototype, "options", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Correct answer for the question' }),
    __metadata("design:type", String)
], Question.prototype, "correctAnswer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the quiz this question belongs to' }),
    __metadata("design:type", String)
], Question.prototype, "quizId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date and time when the question was created' }),
    __metadata("design:type", Date)
], Question.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date and time when the question was last updated' }),
    __metadata("design:type", Date)
], Question.prototype, "updatedAt", void 0);
//# sourceMappingURL=question.entity.js.map