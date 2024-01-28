import joi from 'joi'

export class lectureValidation {
  private static baseSchema = {
    title: joi.string().required(),
    description: joi.string().required(),
    videoUrl: joi.string().required(),
    duration: joi.number().required(),
    isDeleted: joi.boolean().default(false),
    deletedAt: joi.date().allow(null)
  }

  static createLecture() {
    return joi.object(this.baseSchema)
  }

  static updateLecture() {
    return joi
      .object(this.baseSchema)
      .fork(['title', 'description', 'videoUrl', 'duration', 'isDeleted', 'deletedAt'], schema => schema.optional())
  }
}
