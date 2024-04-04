import { DeviceTokenController } from '@controllers/deviceTokens.controller'
import { NotificationDao } from '@models/dao/notification.dao'
import { UserDao } from '@models/dao/user.dao'
import admin from '@models/firebase'
import prisma from '@models/prisma/prisma-client'
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
    link: string
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
                additionalInfo: notificationDto.additionalInfo,
                link: notificationDto.link
            }
        })

        return await NotificationDao.createMany(notifications)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

/**
 * sendNotificationToUser: Send notification to a specific user devices
 * @param notificationDto
 * @returns void
 */
const sendNotificationToUser = async (notificationDto: NotificationDtoI) => {
    try {
        const userDeviceTokens = await DeviceTokenController.fetchUserTokens(notificationDto.recipientId)
        if (userDeviceTokens.length <= 0) {
            console.log('No device token found for user')
            return 'No device token found for user'
        }
        const tokens = userDeviceTokens.filter(token => token.isEnabled).map(token => token.token)
        if (tokens.length <= 0) {
            console.log('No enabled device token found for user')
            return 'No enabled device token found for user'
        }
        console.log('List of tokens: ' + tokens)

        const message = {
            notification: {
                title: notificationDto.title,
                body: notificationDto.message
            },
            tokens: tokens
        }

        const response = await admin.messaging().sendEachForMulticast(message)
        console.log('Successfully sent message:', response)
        const successfulTokens = []
        const failedTokens = []
        response.responses.forEach((resp, idx) => {
            if (resp.success) {
                console.log('Successfully sent message to device token: ' + tokens[idx])
                successfulTokens.push(tokens[idx])
            } else {
                console.log('Failed to send message to device token: ' + tokens[idx])
                failedTokens.push(tokens[idx])
            }
        })
        if (successfulTokens.length > 0) {
            await prisma.devicesTokens.updateMany({
                where: {
                    token: {
                        in: successfulTokens
                    }
                },
                data: {
                    isEnabled: true,
                    lastSuccessfullDelivery: new Date()
                }
            })
        }
        if (failedTokens.length > 0) {
            await prisma.devicesTokens.updateMany({
                where: {
                    token: {
                        in: failedTokens
                    }, // check lastsuccessfullDevlivery date if it's more than 7 days, then disable the token
                    lastSuccessfullDelivery: {
                        lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                    }
                },
                data: {
                    isEnabled: false
                }
            })
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export { sendNotificationToAll, sendNotificationToUser }
