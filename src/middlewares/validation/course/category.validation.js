"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidation = void 0;
const joi_1 = __importDefault(require("joi"));
class categoryValidation {
    static createCategory() {
        return joi_1.default.object(this.baseSchema);
    }
    static updateCategory() {
        return joi_1.default
            .object(this.baseSchema)
            .fork(['title', 'description', 'photo', 'isDeleted', 'deletedAt'], schema => schema.optional());
    }
}
exports.categoryValidation = categoryValidation;
categoryValidation.baseSchema = {
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    photo: joi_1.default.string().required(),
    isDeleted: joi_1.default.boolean().default(false),
    deletedAt: joi_1.default.date().allow(null)
};
