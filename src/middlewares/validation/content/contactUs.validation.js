"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactUsValidation = void 0;
const joi_1 = __importDefault(require("joi"));
// validation of the contactUs
class contactUsValidation {
    static createContactUs() {
        return joi_1.default.object(this.baseSchema);
    }
    static updateContactUs() {
        return joi_1.default.object(this.baseSchema).fork(Object.keys(this.baseSchema), schema => schema.optional());
    }
}
exports.contactUsValidation = contactUsValidation;
contactUsValidation.baseSchema = {
    name: joi_1.default.string().required().min(6).max(255),
    email: joi_1.default.string().required().email(),
    phone: joi_1.default.string().required().min(6),
    message: joi_1.default.string().required().min(6),
    isRead: joi_1.default.boolean().default(false)
};
