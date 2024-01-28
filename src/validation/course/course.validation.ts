import joi from 'joi'

export class CourseValidation {
  private static baseSchema = {
    instructorId: joi.string().required(),
    adminId: joi.string().required(),
    categoryId: joi.string().required(),
    subCategoryId: joi.string().required(),
    title: joi.string().min(3).max(255).required(),
    description: joi.string().min(20).max(1000).required(),
    price: joi.number().positive().required(),
    languages: joi.string().required(),
    rate: joi.number().min(0).max(5),
    discount: joi.number().min(0).max(100),
    available: joi.boolean().default(false),
    skillsGained: joi.array().items(joi.string().min(2)).required(),
    duration: joi.string().required(),
    photo: joi.string().uri().required(),
    isDeleted: joi.boolean().default(false),
    deletedAt: joi.date().iso().allow(null),
    certificate: joi.string().required(),
    introVideo: joi.string().uri()
  }

  static createCourse() {
    return joi.object(this.baseSchema)
  }

  static updateCourse() {
    return joi.object(this.baseSchema).fork(Object.keys(this.baseSchema), schema => schema.optional())
  }
}
