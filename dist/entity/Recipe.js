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
/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
var typeorm_1 = require("typeorm");
var _1 = require(".");
var Recipe = /** @class */ (function () {
    function Recipe() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Recipe.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ unique: true }),
        __metadata("design:type", String)
    ], Recipe.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Recipe.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column({ array: true }),
        __metadata("design:type", String)
    ], Recipe.prototype, "ingredients", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return _1.Category; }, function (category) { return category.recipes; }),
        typeorm_1.JoinTable(),
        __metadata("design:type", _1.Category)
    ], Recipe.prototype, "category", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return _1.User; }, function (user) { return user.favorites; }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], Recipe.prototype, "users", void 0);
    Recipe = __decorate([
        typeorm_1.Entity()
    ], Recipe);
    return Recipe;
}());
exports.default = Recipe;
;
//# sourceMappingURL=Recipe.js.map