"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseValidation = void 0;
const joi_1 = __importDefault(require("joi"));
class CourseValidation {
    static createCourse() {
        return joi_1.default.object(this.baseSchema);
    }
    static updateCourse() {
        return joi_1.default.object(this.baseSchema).fork(Object.keys(this.baseSchema), schema => schema.optional());
    }
}
exports.CourseValidation = CourseValidation;
CourseValidation.baseSchema = {
    instructorId: joi_1.default.string().required(),
    adminId: joi_1.default.string().required(),
    categoryId: joi_1.default.string().required(),
    subCategoryId: joi_1.default.string().required(),
    title: joi_1.default.string().min(3).max(255).required(),
    description: joi_1.default.string().min(20).required(),
    price: joi_1.default.number().positive().required(),
    languages: joi_1.default.string().required(),
    rate: joi_1.default.number().min(0).max(5),
    discount: joi_1.default.number().positive(),
    available: joi_1.default.boolean().default(false),
    skillsGained: joi_1.default.array().items(joi_1.default.string().min(2)).required(),
    duration: joi_1.default.string().required(),
    photo: joi_1.default.string().uri().required(),
    isDeleted: joi_1.default.boolean().default(false),
    deletedAt: joi_1.default.date().iso().allow(null),
    certificate: joi_1.default.string().required(),
    introVideo: joi_1.default.string().uri()
};
