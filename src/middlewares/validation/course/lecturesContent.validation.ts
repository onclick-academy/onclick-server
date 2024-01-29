import Joi from 'joi'

export class lecturesContentValidation {
  private static baseSchema = {
    order: Joi.number().integer().positive().required(),
    materialId: Joi.string().required(),
    lectureId: Joi.string().required(),
    content: Joi.string().required(),
    isDeleted: Joi.boolean().default(false),
    deletedAt: Joi.date().allow(null)
  }

  static createLecturesContent() {
    return Joi.object(this.baseSchema)
  }

  static updateLecturesContent() {
    return Joi.object({
      ...this.baseSchema,
      materialId: Joi.string().required(),
      lectureId: Joi.string().required(),
      order: Joi.number().integer().positive().required()
    }).fork(['content', 'isDeleted', 'deletedAt'], schema => schema.optional())
  }
}
