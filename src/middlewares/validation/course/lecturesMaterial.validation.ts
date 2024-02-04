import joi from 'joi'

export class lecturesMaterialValidation {
  private static baseSchema = {
    title: joi.string().required().min(6).max(255),
    description: joi.string().required().min(6),
    isDeleted: joi.boolean().default(false)
  }
  static createLecturesMaterial() {
    return joi.object(this.baseSchema)
  }

  static updateLecturesMaterial() {
    return joi.object(this.baseSchema).fork(Object.keys(this.baseSchema), schema => schema.optional())
  }
}
