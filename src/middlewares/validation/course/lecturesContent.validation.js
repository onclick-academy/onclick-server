"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lecturesContentValidation = void 0;
const joi_1 = __importDefault(require("joi"));
class lecturesContentValidation {
    static createLecturesContent() {
        return joi_1.default.object(this.baseSchema);
    }
    static updateLecturesContent() {
        return joi_1.default.object(Object.assign(Object.assign({}, this.baseSchema), { materialId: joi_1.default.string().required(), lectureId: joi_1.default.string().required(), order: joi_1.default.number().integer().positive().required() })).fork(['content', 'isDeleted', 'deletedAt'], schema => schema.optional());
    }
}
exports.lecturesContentValidation = lecturesContentValidation;
lecturesContentValidation.baseSchema = {
    order: joi_1.default.number().integer().positive().required(),
    materialId: joi_1.default.string().required(),
    lectureId: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
    isDeleted: joi_1.default.boolean().default(false),
    deletedAt: joi_1.default.date().allow(null)
};
