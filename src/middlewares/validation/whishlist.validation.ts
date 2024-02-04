import Joi from 'joi'

export class WhishlistValidation {
  private static baseSchema = {
    courseId: Joi.string().required(),
    userId: Joi.string().required(),
    isDeleted: Joi.boolean().required().default(false),
    deletedAt: Joi.date().allow(null)
  }

  static createWhishlist() {
    return Joi.object(this.baseSchema)
  }

  static updateWhishlist() {
    return Joi.object({
      ...this.baseSchema,
      isDeleted: Joi.boolean().required(),
      deletedAt: Joi.date().allow(null)
    })
  }
}
