import prisma from '../prisma/prisma-client'

export class NotificationDao {
  createNotification = async (notificationDto: NotificationDtoI) => {
    const notification = await prisma.notification.create({
      data: {
        id: notificationDto.id,
        recipientId: notificationDto.recipientId,
        message: notificationDto.message,
        title: notificationDto.title,
        type: notificationDto.type
      }
    })
    return notification
  }

  deleteNotification = async (id: string) => {
    const notification = await prisma.notification.delete({
      where: {
        id: id
      }
    })
    return notification
  }
}
