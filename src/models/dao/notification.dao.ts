import prisma from '@models/prisma/prisma-client'

export class NotificationDao {
    static async createNotification(notificationDto: any) {
        const user = await prisma.user.findUnique({
            where: {
                id: notificationDto.recipientId
            }
        })
        if (!user) throw new Error('Recipient not found')

        const newNotification = await prisma.notification.create({
            data: {
                ...notificationDto
            }
        })

        return newNotification
    }

    static async createMany(notifications: NotificationDtoI[]) {
        const createdNotifications = await prisma.notification.createMany({
            data: notifications,
            skipDuplicates: true
        })

        return createdNotifications
    }

    static async getNotificationById(notificationId: string) {
        const notification = await prisma.notification.findUnique({
            where: {
                id: notificationId
            }
        })
        if (!notification) throw new Error('Notification not found')

        return notification
    }

    static async getUnreadNotifications(recipientId: string) {
        const isExist = await prisma.user.findUnique({
            where: {
                id: recipientId
            }
        })
        if (!isExist) throw new Error('Recipient not found')

        const user = await prisma.user.findFirst({
            where: {
                id: recipientId
            },
            include: {
                notifications: {
                    where: {
                        isRead: false
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        })
        if (!user) throw new Error('User not found')

        return user.notifications
    }

    static async getAllNotifications(recipientId: string, offset?: number, limit?: number) {
        if (!recipientId) throw new Error('Recipient not found')

        const notifications = await prisma.notification.findMany({
            where: {
                recipientId
            },
            orderBy: {
                createdAt: 'desc'
            },
            skip: offset || 5,
            take: limit || 10
        })
        if (!notifications) throw new Error('notifications not found')

        return notifications
    }

    static async markAsRead(notificationId: string) {
        const notification = await prisma.notification.findUnique({
            where: {
                id: notificationId
            }
        })
        if (!notification) throw new Error('Notification not found')

        const updatedNotification = await prisma.notification.update({
            where: {
                id: notificationId
            },
            data: {
                isRead: true
            }
        })

        return updatedNotification
    }

    static async deleteNotification(notificationId: string) {
        const notification = await prisma.notification.findUnique({
            where: {
                id: notificationId
            }
        })
        if (!notification) throw new Error('Notification not found')

        const deletedNotification = await prisma.notification.delete({
            where: {
                id: notificationId
            }
        })

        return deletedNotification
    }
}
