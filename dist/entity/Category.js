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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable require-jsdoc */
/* eslint-disable new-cap */
var typeorm_1 = require("typeorm");
var Recipe_1 = __importDefault(require("./Recipe"));
var Category = /** @class */ (function () {
    function Category() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Category.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ unique: true }),
        __metadata("design:type", String)
    ], Category.prototype, "name", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Recipe_1.default; }, function (recipe) { return recipe.category; }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], Category.prototype, "recipes", void 0);
    Category = __decorate([
        typeorm_1.Entity()
    ], Category);
    return Category;
}());
exports.default = Category;
;
//# sourceMappingURL=Category.js.map