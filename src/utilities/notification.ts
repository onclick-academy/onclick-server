import { NotificationDao } from '@models/dao/notification.dao'
import { UserDao } from '@models/dao/user.dao'
import { NOTIFICATION_TYPE } from '@prisma/client'

/**
 * sendNotificationToAll: Send notification to all users
 * @param notificationDto
 */
const sendNotificationToAll = async (notificationDto: {
    title: string
    message?: string
    type: NOTIFICATION_TYPE
    additionalInfo?: any
}) => {
    try {
        const userDao = new UserDao()
        const allUsers = await userDao.getAllUsers()

        const notifications = allUsers.map(user => {
            return {
                recipientId: user.id,
                title: notificationDto.title,
                message: notificationDto.message,
                isRead: false,
                type: notificationDto.type,
                additionalInfo: notificationDto.additionalInfo
            }
        })

        return await NotificationDao.createMany(notifications)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

/**
 * sendNotificationToUser: Send notification to a specific user
 * @param notificationDto
 * @returns newNotification
 */
const sendNotificationToUser = async (notificationDto: NotificationDtoI) => {
    try {
        const newNotification = await NotificationDao.createNotification(notificationDto)
        return newNotification
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export { sendNotificationToAll, sendNotificationToUser }
