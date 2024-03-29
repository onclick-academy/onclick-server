import express from 'express'
import { NotificationController } from '@controllers/notification.controller'

const router = express.Router()

router.post('/', NotificationController.createNotification)

// real-time events
router
    .get('/realtime/:recipientId', NotificationController.createRealTimeNotification)
    .get('/:recipientId', NotificationController.getAllNotifications)
router
    .get('/:recipientId', NotificationController.getAllNotifications)
    .get('/unread/:recipientId', NotificationController.getUnreadNotifications)
    .get('/:notificationId', NotificationController.getNotificationById)

router.put('/:notificationId', NotificationController.markAsRead)

router.delete('/:notificationId', NotificationController.deleteNotification)

export default router
