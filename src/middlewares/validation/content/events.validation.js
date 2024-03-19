"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsValidation = void 0;
const joi_1 = __importDefault(require("joi"));
class eventsValidation {
    static createEvents() {
        return joi_1.default.object(this.baseSchema);
    }
    static updateEvents() {
        return joi_1.default
            .object(Object.assign(Object.assign({}, this.baseSchema), { adminId: joi_1.default.string().required() }))
            .fork(['title', 'description', 'subtitle', 'startDate', 'endDate', 'cover'], schema => schema.optional());
    }
}
exports.eventsValidation = eventsValidation;
eventsValidation.baseSchema = {
    adminId: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    subtitle: joi_1.default.string().required(),
    images: joi_1.default.array().items(joi_1.default.string()),
    startDate: joi_1.default.date().required(),
    endDate: joi_1.default.date().required(),
    isDeleted: joi_1.default.boolean().default(false),
    isAvailable: joi_1.default.boolean().default(true),
    cover: joi_1.default.string().required()
};
