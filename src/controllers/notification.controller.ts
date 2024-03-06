import { NotificationDao } from '@dao/notification.dao'
import { NotificationDto } from '@dto/notification.dto'
import { Request, Response } from 'express'
import { sendNotificationToUser } from '@utilities/notification'
import PubSub from 'pubsub-js'

export class NotificationController {
    static async createNotification(req: Request, res: Response) {
        try {
            const notificationDto = new NotificationDto(req.body)
            const newNotification = await NotificationDao.createNotification(notificationDto)
            await sendNotificationToUser(notificationDto)
            PubSub.publish(notificationDto.recipientId, newNotification)

            res.status(200).json({
                status: 'success',
                data: newNotification
            })
        } catch (error: any) {
            console.log(error.message)
            return res.status(500).json({ message: error.message, status: 'failed' })
        }
    }

    static async getNotificationById(req: Request, res: Response) {
        try {
            const { notificationId } = req.params
            const notification = await NotificationDao.getNotificationById(notificationId)

            res.status(200).json({
                status: 'success',
                data: notification
            })
        } catch (error: any) {
            res.status(500).json({ message: error.message, status: 'failed' })
        }
    }

    static async getAllNotifications(req: Request, res: Response) {
        try {
            const { recipientId } = req.params
            const notifications = await NotificationDao.getAllNotifications(recipientId)

            res.status(200).json({
                status: 'success',
                data: notifications
            })
        } catch (error: any) {
            if (error.message.includes('Recipient')) {
                return res.status(400).json({ message: error.message, status: 'failed' })
            }
            res.status(500).json({ message: error.message, status: 'failed' })
        }
    }

    static async getUnreadNotifications(req: Request, res: Response) {
        try {
            const { recipientId } = req.params
            const notifications = await NotificationDao.getUnreadNotifications(recipientId)

            res.status(200).json({
                status: 'success',
                data: notifications
            })
        } catch (error: any) {
            if (error.message.includes('User') || error.message.includes('Recipient')) {
                return res.status(400).json({ message: error.message, status: 'failed' })
            }
            res.status(500).json({ message: error.message, status: 'failed' })
        }
    }

    static async markAsRead(req: Request, res: Response) {
        try {
            const { notificationId } = req.params
            const notification = await NotificationDao.markAsRead(notificationId)

            res.status(200).json({
                status: 'success',
                data: notification
            })
        } catch (error: any) {
            if (error.message.includes('Notification')) {
                return res.status(400).json({ message: error.message, status: 'failed' })
            }
            res.status(500).json({ message: error.message, status: 'failed' })
        }
    }

    static async deleteNotification(req: Request, res: Response) {
        try {
            const { notificationId } = req.params
            const notification = await NotificationDao.deleteNotification(notificationId)

            res.status(200).json({
                status: 'success',
                data: notification
            })
        } catch (error: any) {
            if (error.message.includes('Notification')) {
                return res.status(400).json({ message: error.message, status: 'failed' })
            }
            res.status(500).json({ message: error.message, status: 'failed' })
        }
    }

    static async createRealTimeNotification(req: Request, res: Response) {
        try {
            const { recipientId } = req.body
            res.setHeader('Content-Type', 'text/event-stream')
            res.setHeader('Cache-Control', 'no-cache')
            res.setHeader('Connection', 'keep-alive')

            const mySubscriber = async function (_: string, data: NotificationDtoI) {
                try {
                    res.write(`data: ${JSON.stringify(data)}\n\n`)
                } catch (error) {
                    console.error('Error fetching notifications:', error)
                }
            }

            const token = PubSub.subscribe(recipientId, mySubscriber)

            req.on('close', () => {
                PubSub.unsubscribe(token)
                res.end()
            })
        } catch (error: any) {
            console.log(error.message)
            return res.status(500).json({ message: error.message, status: 'failed' })
        }
    }
}
