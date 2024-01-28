import Joi from 'joi'

//lecturesContent validation

export class lecturesContentValidation {
  //createLecturesContent()
  static createLecturesContent() {
    const schema = Joi.object({
      materialId: Joi.string().required(),
      lectureId: Joi.string().required(),
      content: Joi.string().required(),
      isDeleted: Joi.boolean().default(false)
    })
    return schema
  }
  //updateLecturesContent()
  static updateLecturesContent() {
    const schema = Joi.object({
      materialId: Joi.string(),
      lectureId: Joi.string(),
      content: Joi.string(),
      isDeleted: Joi.boolean()
    })
    return schema
  }
}
