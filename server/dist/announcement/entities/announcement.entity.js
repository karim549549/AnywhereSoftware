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
exports.Announcement = void 0;
const swagger_1 = require("@nestjs/swagger");
class Announcement {
    id;
    title;
    content;
    createdAt;
    updatedAt;
    userId;
}
exports.Announcement = Announcement;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier of the announcement' }),
    __metadata("design:type", String)
], Announcement.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Title of the announcement' }),
    __metadata("design:type", String)
], Announcement.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Content of the announcement' }),
    __metadata("design:type", String)
], Announcement.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date and time when the announcement was created' }),
    __metadata("design:type", Date)
], Announcement.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date and time when the announcement was last updated' }),
    __metadata("design:type", Date)
], Announcement.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the user who created the announcement' }),
    __metadata("design:type", String)
], Announcement.prototype, "userId", void 0);
//# sourceMappingURL=announcement.entity.js.map