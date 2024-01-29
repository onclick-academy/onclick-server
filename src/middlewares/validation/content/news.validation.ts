import joi from 'joi'

export class newsValidation {
  private static baseSchema = {
    adminId: joi.string().required(),
    title: joi.string().required().min(6).max(255),
    description: joi.string().required().min(6),
    images: joi.object(),
    cover: joi.string().required(),
    isDeleted: joi.boolean().default(false),
    isAvailable: joi.boolean().default(true)
  }
  static createNews() {
    return joi.object(this.baseSchema)
  }

  static updateNews() {
    return joi
      .object({ ...this.baseSchema, adminId: joi.string().required() })
      .fork(['title', 'description', 'images', 'cover', 'isDeleted', 'isAvailable'], schema => schema.optional())
  }
}
