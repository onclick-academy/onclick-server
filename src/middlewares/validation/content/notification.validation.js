"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationValidation = void 0;
const joi_1 = __importDefault(require("joi"));
class notificationValidation {
    static createNotification() {
        return joi_1.default.object(this.baseSchema);
    }
    static updateNotification() {
        return joi_1.default
            .object(Object.assign(Object.assign({}, this.baseSchema), { recipientId: joi_1.default.string().required() }))
            .fork(['title', 'message', 'isRead', 'additionalInfo'], schema => schema.optional());
    }
}
exports.notificationValidation = notificationValidation;
notificationValidation.baseSchema = {
    recipientId: joi_1.default.string().required(),
    type: joi_1.default
        .valid('COURSE_ENROLLMENT', 'COURSE_COMPLETION', 'NEW_COURSE_AVAILABLE', 'INSTRUCTOR_FEEDBACK', 'ADMIN_ANNOUNCEMENT', 'REVIEW_COURESE')
        .required(),
    title: joi_1.default.string().required().min(6).max(255),
    message: joi_1.default.string().min(6).max(255),
    isRead: joi_1.default.boolean().default(false),
    additionalInfo: joi_1.default.object()
};
