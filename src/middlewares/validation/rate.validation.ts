import joi from 'joi'

export class RateValidation {
  private static baseSchema = {
    id: joi.string().allow(null),
    targetId: joi.string().required(),
    userId: joi.string().required(),
    targetType: joi.string().valid('COURSE', 'INSTRUCTOR').required(),
    rate: joi.number().min(1).max(5).required(),
    comment: joi.string().optional().max(255),
    isDeleted: joi.boolean().default(false),
    courseId: joi.string().when('targetType', {
      is: 'COURSE',
      then: joi.string().required(),
      otherwise: joi.string().allow(null)
    }),
    instructorId: joi.string().when('targetType', {
      is: 'INSTRUCTOR',
      then: joi.string().required(),
      otherwise: joi.string().allow(null)
    }),
  }

  static createRate(ratingDto: RatingDtoI) {
    return joi.object(this.baseSchema).validateAsync(ratingDto)
  }

  static updateRate(ratingDto: RatingUpdateDtoI) {
    return joi.object(this.baseSchema).fork(['rate', 'comment', 'isDeleted', 'targetType'], field => field.optional()).validateAsync(ratingDto)
  }
}
