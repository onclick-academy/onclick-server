import joi from 'joi'

export class newsValidation {
  static createNews() {
    const schema = joi.object({
      adminId: joi.string().required(),
      title: joi.string().required().min(6).max(255),
      description: joi.string().required().min(6).max(255),
      images: joi.object(),
      cover: joi.string().required(),
      isDeleted: joi.boolean().default(false),
      isAvailable: joi.boolean().default(true)
    })
    return schema
  }

  static updateNews() {
    const schema = joi.object({
      adminId: joi.string().required(),
      title: joi.string().min(6).max(255),
      description: joi.string().min(6).max(255),
      images: joi.object(),
      cover: joi.string(),
      isDeleted: joi.boolean(),
      isAvailable: joi.boolean()
    })
    return schema
  }
}
