"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var userResolver_1 = __importDefault(require("./userResolver"));
var categoryResolver_1 = __importDefault(require("./categoryResolver"));
var recipeRespolver_1 = __importDefault(require("./recipeRespolver"));
exports.default = [
    userResolver_1.default,
    categoryResolver_1.default,
    recipeRespolver_1.default,
];
//# sourceMappingURL=index.js.map