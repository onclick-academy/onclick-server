"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lecturesMaterialValidation = void 0;
const joi_1 = __importDefault(require("joi"));
class lecturesMaterialValidation {
    static createLecturesMaterial() {
        return joi_1.default.object(this.baseSchema);
    }
    static updateLecturesMaterial() {
        return joi_1.default.object(this.baseSchema).fork(Object.keys(this.baseSchema), schema => schema.optional());
    }
}
exports.lecturesMaterialValidation = lecturesMaterialValidation;
lecturesMaterialValidation.baseSchema = {
    title: joi_1.default.string().required().min(6).max(255),
    description: joi_1.default.string().required().min(6),
    isDeleted: joi_1.default.boolean().default(false)
};
