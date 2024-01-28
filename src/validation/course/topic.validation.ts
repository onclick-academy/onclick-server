import joi from 'joi'

export class topicValidation {
  private static baseSchema = {
    title: joi.string().required(),
    isDeleted: joi.boolean().default(false),
    deletedAt: joi.date().allow(null),
    courses: joi.array().items(joi.string()).allow(null)
  }

  static createTopic() {
    return joi.object(this.baseSchema)
  }

  static updateTopic() {
    return joi
      .object(this.baseSchema)
      .fork(['title', 'isDeleted', 'deletedAt'], schema => schema.optional())
  }
}

