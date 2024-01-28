import Joi from 'joi'

//Course review validation

export class courseReviewValidation {
  //createCourseReview()
  static createCourseReview() {
    const schema = Joi.object({
      courseId: Joi.string().required(),
      studentId: Joi.string().required(),
      Comment: Joi.string().required(),
      isDeleted: Joi.boolean().default(false)
    })
    return schema
  }
  //updateCourseReview()
  static updateCourseReview() {
    const schema = Joi.object({
      courseId: Joi.string(),
      studentId: Joi.string(),
      Comment: Joi.string(),
      isDeleted: Joi.boolean()
    })
    return schema
  }
}
