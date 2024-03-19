"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoryValidation = void 0;
const joi_1 = __importDefault(require("joi"));
class subCategoryValidation {
    static createSubCategory() {
        return joi_1.default.object(this.baseSchema);
    }
    static updateSubCategory() {
        return joi_1.default
            .object(Object.assign(Object.assign({}, this.baseSchema), { categoryId: joi_1.default.string().required() }))
            .fork(['name', 'description', 'isDeleted'], schema => schema.optional());
    }
}
exports.subCategoryValidation = subCategoryValidation;
subCategoryValidation.baseSchema = {
    categoryId: joi_1.default.string().required(),
    name: joi_1.default.string().required().min(6).max(255),
    description: joi_1.default.string().required().min(6),
    isDeleted: joi_1.default.boolean().default(false)
};
