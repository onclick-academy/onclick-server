import { NotificationDao } from '@dao/notification.dao'
import { NotificationDto } from '@dto/notification.dto'
import { Request, Response } from 'express'
import { sendNotificationToUser } from '@utilities/notification'
import PubSub from 'pubsub-js'
import { UserDao } from '@models/dao/user.dao'
import { notificationValidation } from '@middlewares/validation/content/notification.validation'
import { UserRequest } from '../types/user.interface'

export class NotificationController {
    static async createNotification(req: Request, res: Response) {
        try {
            const notificationDto = new NotificationDto(req.body)
            if (!notificationDto.recipientId) {
                return res.status(400).json({ message: 'Recipient ID is required', status: 'failed' })
            }

            const { error } = await notificationValidation.createNotification(notificationDto)
            if (error) {
                return res.status(400).json({ message: error.details[0].message, status: 'failed' })
            }

            const newNotification = await NotificationDao.createNotification(notificationDto)

            try {
                await sendNotificationToUser(notificationDto)
            } catch (sendError) {
                console.error('Error sending notification:', sendError.message)
                // Decide how to handle send errors, e.g., log them, but don't fail the entire request
            }

            PubSub.publish(notificationDto.recipientId, newNotification)

            res.status(200).json({
                status: 'success',
                data: newNotification
            })
        } catch (error: any) {
            console.error('Error creating notification:', error.message)
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

    static async getAllNotifications(req: UserRequest, res: Response) {
        try {
            const { recipientId } = req.params
            const notifications = await NotificationDao.getAllNotifications(
                recipientId,
                req.body.limit,
                req.body.offset
            )


            res.status(200).json({
                status: 'success',
                data: notifications
            })
        } catch (error: any) {
            console.log(error)
            if (error.message.includes('Recipient')) {
                return res.status(400).json({ message: error.message, status: 'failed' })
            }
            res.status(500).json({ message: error, status: 'failed' })
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
            const { recipientId } = req.params
            if (!recipientId) {
                return res.status(400).json({ message: 'Recipient ID is required', status: 'failed' })
            }

            const userDao = new UserDao()
            const user = await userDao.getUserById(recipientId)
            if (!user) {
                return res.status(400).json({ message: 'Recipient not found', status: 'failed' })
            }

            res.setHeader('Content-Type', 'text/event-stream')
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
