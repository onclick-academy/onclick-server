import joi from 'joi'

export class eventsValidation {
  private static baseSchema = {
    adminId: joi.string().required(),
    title: joi.string().required(),
    description: joi.string().required(),
    subtitle: joi.string().required(),
    images: joi.array().items(joi.string()),
    startDate: joi.date().required(),
    endDate: joi.date().required(),
    isDeleted: joi.boolean().default(false),
    isAvailable: joi.boolean().default(true),
    cover: joi.string().required()
  }

  static createEvents() {
    return joi.object(this.baseSchema)
  }

  static updateEvents() {
    return joi
      .object({
        ...this.baseSchema,
        adminId: joi.string().required()
      })
      .fork(['title', 'description', 'subtitle', 'startDate', 'endDate', 'cover'], schema => schema.optional())
  }
}
