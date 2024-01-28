import joi from 'joi'

export class RateValidation {
  private static baseSchema = {
    targetId: joi.string().required(),
    targetType: joi.string().valid('COURSE', 'INSTRUCTOR').required(),
    rate: joi.number().min(1).max(5).required(),
    comment: joi.string().optional().max(255),
    isDeleted: joi.boolean().default(false),
    courseId: joi.string().when('targetType', {
      is: 'COURSE',
      then: joi.string().required(),
      otherwise: joi.string().allow(null)
    }),
    userId: joi.string().required()
  }

  static createRate() {
    return joi.object(this.baseSchema)
  }

  static updateRate() {
    return joi.object(this.baseSchema).fork(['rate', 'comment', 'isDeleted', 'courseId'], field => field.optional())
  }
}
