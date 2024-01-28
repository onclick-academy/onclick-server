import Joi from 'joi'


export class lecturesContentValidation {

  static createLecturesContent() {
    const schema = Joi.object({
      order: Joi.number().integer().positive().required(),
      materialId: Joi.string().required(),
      lectureId: Joi.string().required(),
      content: Joi.string().required(),
      isDeleted: Joi.boolean().default(false),
      deletedAt: joi.date().allow(null)
    })
    return schema
  }

  static updateLecturesContent() {
    const schema = Joi.object({
      order: Joi.number().integer().positive().required(),
      materialId: Joi.string(),
      lectureId: Joi.string(),
      content: Joi.string(),
      isDeleted: Joi.boolean(),
      deletedAt: joi.date()
    })
    return schema
  }
}
