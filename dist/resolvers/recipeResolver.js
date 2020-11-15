"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable new-cap */
var entity_1 = require("../entity");
var typeorm_1 = require("typeorm");
var ingredientsSearchCriteria = function (input) {
    var output = '{';
    input = input.map(function (element) { return "\"" + element + "\""; });
    output = output.concat(input.toString(), '}');
    return output;
};
var validateRecipeInputs = function (name, ingredients, category) {
    var nameValid = name !== undefined && name !== null;
    var categoryValid = category !== undefined && category !== null;
    var ingredientsValid = ingredients !== undefined && ingredients !== null;
    return [nameValid, categoryValid, ingredientsValid];
};
var hasEmptyString = function (input) { return (input.some(function (element) { return element === ''; })); };
var isValidInput = function (input) { return (input !== undefined && input !== null); };
exports.default = {
    Query: {
        getRecipes: function (_, _a, ctx) {
            var filtering = _a.filtering;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, UserRepository, error_1, RecipeRepository, results_1, name, category, ingredients, _b, nameValid, categoryValid, ingredientsValid, results_2, results_3, searchIngredients_1, results_4, results_5, CategoryRepository, categoryExists, searchCategory, results_6, results_7, searchIngredients, results_8, results;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            user = ctx.user;
                            if (!isValidInput(user)) {
                                throw new Error('Error with authentication. Please login again');
                            }
                            UserRepository = typeorm_1.getRepository(entity_1.User);
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, UserRepository.findOne({ id: user.id })];
                        case 2:
                            _c.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _c.sent();
                            throw new Error('The user does not exist');
                        case 4:
                            RecipeRepository = typeorm_1.getRepository(entity_1.Recipe);
                            if (!(filtering === undefined)) return [3 /*break*/, 6];
                            return [4 /*yield*/, RecipeRepository.find({ relations: ['category'] })];
                        case 5:
                            results_1 = _c.sent();
                            return [2 /*return*/, results_1];
                        case 6:
                            name = filtering.name, category = filtering.category, ingredients = filtering.ingredients;
                            _b = validateRecipeInputs(name, ingredients, category), nameValid = _b[0], categoryValid = _b[1], ingredientsValid = _b[2];
                            if (!!categoryValid) return [3 /*break*/, 12];
                            if (!!ingredientsValid) return [3 /*break*/, 8];
                            if (!nameValid) {
                                results_2 = new entity_1.Recipe();
                                return [2 /*return*/, [results_2]];
                            }
                            return [4 /*yield*/, RecipeRepository
                                    .createQueryBuilder('recipe')
                                    .leftJoinAndSelect('recipe.category', 'category')
                                    .where('recipe.name ~~* :name', { name: "%" + name + "%" })
                                    .getMany()];
                        case 7:
                            results_3 = _c.sent();
                            return [2 /*return*/, results_3];
                        case 8:
                            searchIngredients_1 = ingredientsSearchCriteria(ingredients);
                            if (!!nameValid) return [3 /*break*/, 10];
                            return [4 /*yield*/, RecipeRepository
                                    .createQueryBuilder('recipe')
                                    .leftJoinAndSelect('recipe.category', 'category')
                                    .where('recipe.ingredients @> :ingredient', { ingredient: searchIngredients_1 }).getMany()];
                        case 9:
                            results_4 = _c.sent();
                            return [2 /*return*/, results_4];
                        case 10: return [4 /*yield*/, RecipeRepository
                                .createQueryBuilder('recipe')
                                .leftJoinAndSelect('recipe.category', 'category')
                                .where('recipe.name ~~* :name', { name: "%" + name + "%" })
                                .andWhere('recipe.ingredients @> :ingredient', { ingredient: searchIngredients_1 }).getMany()];
                        case 11:
                            results_5 = _c.sent();
                            return [2 /*return*/, results_5];
                        case 12:
                            CategoryRepository = typeorm_1.getRepository(entity_1.Category);
                            return [4 /*yield*/, CategoryRepository.findOne({ id: category })];
                        case 13:
                            categoryExists = _c.sent();
                            if (!categoryExists) {
                                throw new Error('This category does not exists');
                            }
                            searchCategory = categoryExists.id;
                            if (!!ingredientsValid) return [3 /*break*/, 17];
                            if (!!nameValid) return [3 /*break*/, 15];
                            return [4 /*yield*/, RecipeRepository
                                    .createQueryBuilder('recipe')
                                    .leftJoinAndSelect('recipe.category', 'category')
                                    .where('recipe.category = :category', { category: searchCategory })
                                    .getMany()];
                        case 14:
                            results_6 = _c.sent();
                            return [2 /*return*/, results_6];
                        case 15: return [4 /*yield*/, RecipeRepository
                                .createQueryBuilder('recipe')
                                .leftJoinAndSelect('recipe.category', 'category')
                                .where('recipe.name ~~* :name', { name: "%" + name + "%" })
                                .andWhere('recipe.category = :category', { category: searchCategory })
                                .getMany()];
                        case 16:
                            results_7 = _c.sent();
                            return [2 /*return*/, results_7];
                        case 17:
                            searchIngredients = ingredientsSearchCriteria(ingredients);
                            if (!!nameValid) return [3 /*break*/, 19];
                            return [4 /*yield*/, RecipeRepository
                                    .createQueryBuilder('recipe')
                                    .leftJoinAndSelect('recipe.category', 'category')
                                    .where('recipe.category = :category', { category: searchCategory })
                                    .andWhere('recipe.ingredients @> :ingredient', { ingredient: searchIngredients }).getMany()];
                        case 18:
                            results_8 = _c.sent();
                            return [2 /*return*/, results_8];
                        case 19: return [4 /*yield*/, RecipeRepository
                                .createQueryBuilder('recipe')
                                .leftJoinAndSelect('recipe.category', 'category')
                                .where('recipe.name ~~* :name', { name: "%" + name + "%" })
                                .andWhere('recipe.category = :category', { category: searchCategory })
                                .andWhere('recipe.ingredients @> :ingredient', { ingredient: searchIngredients })
                                .getMany()];
                        case 20:
                            results = _c.sent();
                            return [2 /*return*/, results];
                    }
                });
            });
        },
        getOneRecipe: function (_, _a, ctx) {
            var id = _a.id;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, UserRepository, error_2, RecipeRepository, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            user = ctx.user;
                            if (isValidInput(user)) {
                                throw new Error('Error with authentication. Please login again');
                            }
                            UserRepository = typeorm_1.getRepository(entity_1.User);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, UserRepository.findOne({ id: user.id })];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _b.sent();
                            throw new Error('The user does not exist');
                        case 4:
                            RecipeRepository = typeorm_1.getRepository(entity_1.Recipe);
                            return [4 /*yield*/, RecipeRepository.findOne(id)];
                        case 5:
                            result = _b.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        },
        getMyRecipes: function (_, __, ctx) { return __awaiter(void 0, void 0, void 0, function () {
            var user, UserRepository, userExists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = ctx.user;
                        if (isValidInput(user)) {
                            throw new Error('Error with authentication. Please login again');
                        }
                        UserRepository = typeorm_1.getRepository(entity_1.User);
                        return [4 /*yield*/, UserRepository
                                .findOne({ id: user.id }, { relations: ['favorites'] })];
                    case 1:
                        userExists = _a.sent();
                        if (userExists === undefined) {
                            throw new Error('The user does not exist');
                        }
                        return [2 /*return*/, userExists.favorites];
                }
            });
        }); },
    },
    Mutation: {
        createRecipe: function (_, _a, ctx) {
            var input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, name, category, description, ingredients, RecipeRepository, CategoryRepository, UserRepository, userExists, recipeExists, categoryExists, storeData, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            user = ctx.user;
                            name = input.name, category = input.category, description = input.description, ingredients = input.ingredients;
                            if (hasEmptyString([name, description, ingredients[0]])) {
                                throw new Error('name, description, and ingredients are mandatory');
                            }
                            RecipeRepository = typeorm_1.getRepository(entity_1.Recipe);
                            CategoryRepository = typeorm_1.getRepository(entity_1.Category);
                            if (!isValidInput(user)) {
                                throw new Error('Error with authentication. Please login again');
                            }
                            UserRepository = typeorm_1.getRepository(entity_1.User);
                            return [4 /*yield*/, UserRepository.findOne({ id: user.id })];
                        case 1:
                            userExists = _b.sent();
                            if (!userExists) {
                                throw new Error('The user does not exist');
                            }
                            return [4 /*yield*/, RecipeRepository.findOne({ name: name })];
                        case 2:
                            recipeExists = _b.sent();
                            if (recipeExists) {
                                throw new Error('This Recipe exists already');
                            }
                            return [4 /*yield*/, CategoryRepository
                                    .findOne({ id: category })];
                        case 3:
                            categoryExists = _b.sent();
                            if (!categoryExists) {
                                throw new Error('Invalid Category');
                            }
                            storeData = new entity_1.Recipe();
                            storeData.name = name,
                                storeData.description = description;
                            storeData.ingredients = ingredients;
                            storeData.category = categoryExists;
                            return [4 /*yield*/, RecipeRepository.save(storeData)];
                        case 4:
                            result = _b.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        },
        updateRecipe: function (_, _a, ctx) {
            var id = _a.id, input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, category, description, ingredients, name, UserRepository, userExists, CategoryRepository, categoryExists, RecipeRepository, recipeToUpdate;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            user = ctx.user;
                            category = input.category, description = input.description, ingredients = input.ingredients, name = input.name;
                            if (hasEmptyString([name, description, ingredients[0]])) {
                                throw new Error('Name, description, and ingredients are mandatory');
                            }
                            if (!isValidInput(user)) {
                                throw new Error('Error with authentication. Please login again');
                            }
                            UserRepository = typeorm_1.getRepository(entity_1.User);
                            return [4 /*yield*/, UserRepository.findOne({ id: user.id })];
                        case 1:
                            userExists = _b.sent();
                            if (!userExists) {
                                throw new Error('The user does not exist');
                            }
                            CategoryRepository = typeorm_1.getRepository(entity_1.Category);
                            return [4 /*yield*/, CategoryRepository
                                    .findOne({ id: category })];
                        case 2:
                            categoryExists = _b.sent();
                            if (categoryExists === undefined) {
                                throw new Error('Invalid Category');
                            }
                            RecipeRepository = typeorm_1.getRepository(entity_1.Recipe);
                            return [4 /*yield*/, RecipeRepository.findOne({ id: id })];
                        case 3:
                            recipeToUpdate = _b.sent();
                            if (recipeToUpdate === undefined) {
                                throw new Error('The Recipe no longer exists');
                            }
                            if (name !== undefined) {
                                recipeToUpdate.name = name;
                            }
                            if (ingredients !== undefined) {
                                recipeToUpdate.ingredients = ingredients;
                            }
                            if (description !== undefined) {
                                recipeToUpdate.description = description;
                            }
                            recipeToUpdate.category = categoryExists;
                            return [4 /*yield*/, RecipeRepository.save(recipeToUpdate)];
                        case 4:
                            _b.sent();
                            return [2 /*return*/, 'Recipe Updated'];
                    }
                });
            });
        },
        deleteRecipe: function (_, _a, ctx) {
            var id = _a.id;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, UserRepository, userExists, RecipeRepository;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            user = ctx.user;
                            if (!isValidInput(user)) {
                                throw new Error('Error with authentication. Please login again');
                            }
                            UserRepository = typeorm_1.getRepository(entity_1.User);
                            return [4 /*yield*/, UserRepository
                                    .findOne({ id: user.id }, { relations: ['favorites'] })];
                        case 1:
                            userExists = _b.sent();
                            if (!userExists) {
                                throw new Error('The user does not exist');
                            }
                            RecipeRepository = typeorm_1.getRepository(entity_1.Recipe);
                            return [4 /*yield*/, RecipeRepository.delete({ id: id })];
                        case 2:
                            _b.sent();
                            return [2 /*return*/, 'Recipe deleted!'];
                    }
                });
            });
        },
        addToMyRecipes: function (_, _a, ctx) {
            var id = _a.id;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, UserRepository, userExists, RecipeRepository, recipeToFavs, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            user = ctx.user;
                            if (!isValidInput(user)) {
                                throw new Error('Error with authentication. Please login again');
                            }
                            UserRepository = typeorm_1.getRepository(entity_1.User);
                            return [4 /*yield*/, UserRepository
                                    .findOne({ id: user.id }, { relations: ['favorites'] })];
                        case 1:
                            userExists = _b.sent();
                            if (!userExists) {
                                throw new Error('The user does not exist');
                            }
                            RecipeRepository = typeorm_1.getRepository(entity_1.Recipe);
                            return [4 /*yield*/, RecipeRepository.findOne({ id: id })];
                        case 2:
                            recipeToFavs = _b.sent();
                            if (recipeToFavs === undefined) {
                                throw new Error('Recipe not fount');
                            }
                            userExists.favorites.push(recipeToFavs);
                            return [4 /*yield*/, UserRepository.save(userExists)];
                        case 3:
                            result = _b.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        },
        removeFromMyRecipes: function (_, _a, ctx) {
            var id = _a.id;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, UserRepository, userExists;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            user = ctx.user;
                            if (!isValidInput(user)) {
                                throw new Error('Error with authentication. Please login again');
                            }
                            UserRepository = typeorm_1.getRepository(entity_1.User);
                            return [4 /*yield*/, UserRepository
                                    .findOne({ id: user.id }, { relations: ['favorites'] })];
                        case 1:
                            userExists = _b.sent();
                            if (!userExists) {
                                throw new Error('The user does not exist');
                            }
                            userExists.favorites = userExists.favorites
                                .filter(function (element) { return element.id != id; });
                            return [4 /*yield*/, UserRepository.save(userExists)];
                        case 2:
                            _b.sent();
                            return [2 /*return*/, 'The recipe no longer belongs to your recipes'];
                    }
                });
            });
        },
    },
};
//# sourceMappingURL=recipeResolver.js.map