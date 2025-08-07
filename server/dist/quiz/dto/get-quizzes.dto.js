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
exports.GetQuizzesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const sort_order_enum_1 = require("../../common/enums/sort-order.enum");
class GetQuizzesDto {
    page;
    limit;
    sortBy;
    orderBy;
}
exports.GetQuizzesDto = GetQuizzesDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Page number', default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], GetQuizzesDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Number of items per page', default: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], GetQuizzesDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Field to sort by', enum: ['createdAt', 'updatedAt', 'title'], default: 'createdAt' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['createdAt', 'updatedAt', 'title']),
    __metadata("design:type", String)
], GetQuizzesDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Sort order', enum: sort_order_enum_1.SortOrder, default: sort_order_enum_1.SortOrder.DESC }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)([sort_order_enum_1.SortOrder.ASC, sort_order_enum_1.SortOrder.DESC]),
    __metadata("design:type", String)
], GetQuizzesDto.prototype, "orderBy", void 0);
//# sourceMappingURL=get-quizzes.dto.js.map