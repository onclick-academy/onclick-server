import joi from 'joi'

export class notificationValidation {
  private static baseSchema = {
    recipientId: joi.string().required(),
    type: joi
      .valid(
        'COURSE_ENROLLMENT',
        'COURSE_COMPLETION',
        'NEW_COURSE_AVAILABLE',
        'INSTRUCTOR_FEEDBACK',
        'ADMIN_ANNOUNCEMENT',
        'REVIEW_COURESE'
      )
      .required(),
    title: joi.string().required().min(6).max(255),
    message: joi.string().min(6).max(255),
    isRead: joi.boolean().default(false),
    additionalInfo: joi.object()
  }
  static createNotification() {
    return joi.object(this.baseSchema)
  }

  static updateNotification() {
    return joi
      .object({ ...this.baseSchema, recipientId: joi.string().required() })
      .fork(['title', 'message', 'isRead', 'additionalInfo'], schema => schema.optional())
  }
}
