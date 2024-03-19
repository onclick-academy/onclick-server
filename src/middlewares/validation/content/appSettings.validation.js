"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appSettingsValidation = void 0;
const joi_1 = __importDefault(require("joi"));
class appSettingsValidation {
    static createAppSettings() {
        return joi_1.default.object(this.baseSchema);
    }
    static updateAppSettings() {
        return joi_1.default.object(this.baseSchema).fork(Object.keys(this.baseSchema), schema => schema.optional());
    }
}
exports.appSettingsValidation = appSettingsValidation;
appSettingsValidation.baseSchema = {
    mainEmail: joi_1.default.string().email().required(),
    contactEmail: joi_1.default.string().email().required(),
    contactPhone: joi_1.default.string().min(10).max(10).required(),
    aboutUs: joi_1.default.string().min(20).required(),
    terms: joi_1.default.string().min(20).required(),
    privacy: joi_1.default.string().min(20).required(),
    logo: joi_1.default.string().required(),
    favicon: joi_1.default.string().required(),
    coverSlides: joi_1.default.object().required(),
    socialMedia: joi_1.default.object().required()
};
