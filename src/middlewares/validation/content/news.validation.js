"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsValidation = void 0;
const joi_1 = __importDefault(require("joi"));
class newsValidation {
    static createNews() {
        return joi_1.default.object(this.baseSchema);
    }
    static updateNews() {
        return joi_1.default
            .object(Object.assign(Object.assign({}, this.baseSchema), { adminId: joi_1.default.string().required() }))
            .fork(['title', 'description', 'images', 'cover', 'isDeleted', 'isAvailable'], schema => schema.optional());
    }
}
exports.newsValidation = newsValidation;
newsValidation.baseSchema = {
    adminId: joi_1.default.string().required(),
    title: joi_1.default.string().required().min(6).max(255),
    description: joi_1.default.string().required().min(6),
    images: joi_1.default.object(),
    cover: joi_1.default.string().required(),
    isDeleted: joi_1.default.boolean().default(false),
    isAvailable: joi_1.default.boolean().default(true)
};
