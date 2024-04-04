import joi from 'joi'

export class notificationValidation {
    private static baseSchema = {
        id: joi.string(),
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
        additionalInfo: joi.object(),
        link: joi.string().required().min(6).max(255)
    }
    static createNotification(notificationDto: NotificationDtoI) {
        return joi.object(this.baseSchema).validateAsync(notificationDto)
    }
    static updateNotification(notificationDto: Partial<NotificationDtoI>) {
        return joi
            .object({ ...this.baseSchema, recipientId: joi.string().required() })
            .fork(['title', 'message', 'isRead', 'additionalInfo'], schema => schema.optional())
            .validateAsync(notificationDto)
    }
}
