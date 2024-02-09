import joi from 'joi'

export class CourseValidation {
  private static baseSchema = {
    id: joi.string().allow(null),
    instructorId: joi.string().required(),
    adminId: joi.string().required(),
    categoryId: joi.string().required(),
    subCategoryId: joi.string().required(),
    title: joi.string().min(3).max(255).required(),
    description: joi.string().min(20).required(),
    price: joi.number().positive().required(),
    rate: joi.number().min(0).max(5),
    discount: joi.number().positive(),
    available: joi.boolean().default(false),
    skillsGained: joi.array().items(joi.string().min(2)).required(),
    duration: joi.string().required(),
    photo: joi.string().required(),
    isDeleted: joi.boolean().default(false),
    deletedAt: joi.date().iso().allow(null),
    certificate: joi.string().required(),
    introVideo: joi.string().uri()
  }

  static createCourse(courseDto: CourseDtoI) {
    return joi.object(this.baseSchema).validateAsync(courseDto)
  }

  static updateCourse(courseDto: CourseUpdateI) {
    return joi.object(this.baseSchema).fork(Object.keys(this.baseSchema), schema => schema.optional()).validateAsync(courseDto)
  }
}
