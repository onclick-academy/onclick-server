import joi from 'joi'

export class categoryValidation {
  private static baseSchema = {
    title: joi.string().required(),
    description: joi.string().required(),
    photo: joi.string().required(),
    isDeleted: joi.boolean().default(false),
    subCategories: joi.array().items(joi.string()),
    deletedAt: joi.date().allow(null)
  }

  static createCategory() {
    return joi.object(this.baseSchema)
  }

  static updateCategory() {
    return joi
      .object(this.baseSchema)
      .fork(['title', 'description', 'photo', 'isDeleted', 'subCategories', 'deletedAt'], schema => schema.optional())
  }
}
