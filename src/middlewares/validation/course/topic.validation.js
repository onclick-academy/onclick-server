"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicValidation = void 0;
const joi_1 = __importDefault(require("joi"));
class topicValidation {
    static createTopic() {
        return joi_1.default.object(this.baseSchema);
    }
    static updateTopic() {
        return joi_1.default
            .object(this.baseSchema)
            .fork(['title', 'isDeleted', 'deletedAt'], schema => schema.optional());
    }
}
exports.topicValidation = topicValidation;
topicValidation.baseSchema = {
    title: joi_1.default.string().required(),
    isDeleted: joi_1.default.boolean().default(false),
    deletedAt: joi_1.default.date().allow(null),
    courses: joi_1.default.array().items(joi_1.default.string()).allow(null)
};
