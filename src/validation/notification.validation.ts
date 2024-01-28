import joi from 'joi'

export class notificationValidation {
  static createNotification() {
    const schema = joi.object({
      recipientId: joi.string().required(),
      type: joi.valid(
        'COURSE_ENROLLMENT',
        'COURSE_COMPLETION',
        'NEW_COURSE_AVAILABLE',
        'INSTRUCTOR_FEEDBACK',
        'ADMIN_ANNOUNCEMENT',
        'REVIEW_COURESE'
      ),
      title: joi.string().required().min(6).max(255),
      message: joi.string().min(6).max(255),
      isRead: joi.boolean().default(false),
      additionalInfo: joi.object()
    })
    return schema
  }

  static updateNotification() {
    const schema = joi.object({
      recipientId: joi.string().required(),
      type: joi.valid(
        'COURSE_ENROLLMENT',
        'COURSE_COMPLETION',
        'NEW_COURSE_AVAILABLE',
        'INSTRUCTOR_FEEDBACK',
        'ADMIN_ANNOUNCEMENT',
        'REVIEW_COURESE'
      ),
      title: joi.string().min(6).max(255),
      message: joi.string().min(6).max(255),
      isRead: joi.boolean(),
      additionalInfo: joi.object()
    })
    return schema
  }
}
