import joi from 'joi'

export class appSettingsValidation {
  private static baseSchema = {
    mainEmail: joi.string().email().required(),
    contactEmail: joi.string().email().required(),
    contactPhone: joi.string().min(10).max(10).required(),
    aboutUs: joi.string().min(20).required(),
    terms: joi.string().min(20).required(),
    privacy: joi.string().min(20).required(),
    logo: joi.string().required(),
    favicon: joi.string().required(),
    coverSlides: joi.object().required(),
    socialMedia: joi.object().required()
  }

  static createAppSettings() {
    return joi.object(this.baseSchema)
  }

  static updateAppSettings() {
    return joi.object(this.baseSchema).fork(Object.keys(this.baseSchema), schema => schema.optional())
  }
}
