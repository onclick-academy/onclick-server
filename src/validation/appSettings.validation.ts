import { stat } from 'fs'
import joi from 'joi'

export class appSettingsValidation {
  static createAppSettings() {
    const schema = joi.object({
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
    })

    return schema
  }

  static updateAppSettings() {
    const schema = joi.object({
      mainEmail: joi.string().email(),
      contactEmail: joi.string().email(),
      contactPhone: joi.string().min(10).max(10),
      aboutUs: joi.string().min(20),
      terms: joi.string().min(20),
      privacy: joi.string().min(20),
      logo: joi.string(),
      favicon: joi.string(),
      coverSlides: joi.object(),
      socialMedia: joi.object()
    })

    return schema
  }
}
