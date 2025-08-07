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
exports.UpdateQuestionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_question_dto_1 = require("./create-question.dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateQuestionDto extends (0, mapped_types_1.PartialType)(create_question_dto_1.CreateQuestionDto) {
    text;
    options;
    correctAnswer;
}
exports.UpdateQuestionDto = UpdateQuestionDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Text of the question' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateQuestionDto.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Array of possible options for the question', type: [String], minItems: 2, maxItems: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(2),
    (0, class_validator_1.ArrayMaxSize)(10),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateQuestionDto.prototype, "options", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Correct answer for the question' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateQuestionDto.prototype, "correctAnswer", void 0);
//# sourceMappingURL=update-question.dto.js.map