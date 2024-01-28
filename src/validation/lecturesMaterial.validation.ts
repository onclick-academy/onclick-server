import joi from 'joi'

export class lecturesMaterialValidation {
  static createLecturesMaterial() {
    const schema = joi.object({
      title: joi.string().required().min(6).max(255),
      description: joi.string().required().min(6).max(255),
      isDeleted: joi.boolean().default(false)
    })
    return schema
  }

  static updateLecturesMaterial() {
    const schema = joi.object({
      title: joi.string().min(6).max(255),
      description: joi.string().min(6).max(255),
      isDeleted: joi.boolean()
    })
    return schema
  }
}
