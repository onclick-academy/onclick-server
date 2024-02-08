import prisma from '@models/prisma/prisma-client'

export class NotificationDao {
  static async createNotification(notificationDto: NotificationDtoI) {
    const newNotification = await prisma.notification.create({
      data: {
        recipientId: notificationDto.recipientId, // that will be the user id getting from the token
        title: notificationDto.title,
        message: notificationDto.message,
        isRead: notificationDto.isRead,
        type: notificationDto.type,
        additionalInfo: notificationDto.additionalInfo
      }
    })

    return newNotification
  }
}
