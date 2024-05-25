import { NotificationDao } from '../models/dao/notification.dao'

describe('NotificationDao', () => {
    describe('createNotification', () => {
        it('should create a new notification', async () => {
            // Mock the necessary dependencies and data
            const notificationDto = {
                recipientId: 'user123',
                message: 'New notification'
            }
            const user = {
                id: 'user123',
                name: 'John Doe'
            }
            const prismaMock = {
                user: {
                    findUnique: jest.fn().mockResolvedValue(user)
                },
                notification: {
                    create: jest.fn().mockResolvedValue(notificationDto)
                }
            }
            jest.mock('../models/prisma/prisma-client', () => ({
                default: prismaMock
            }))

            // Call the method
            const result = await NotificationDao.createNotification(notificationDto)

            // Assertions
            expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
                where: {
                    id: notificationDto.recipientId
                }
            })
            expect(prismaMock.notification.create).toHaveBeenCalledWith({
                data: {
                    ...notificationDto
                }
            })
            expect(result).toEqual(notificationDto)
        })

        it('should throw an error if recipient is not found', async () => {
            // Mock the necessary dependencies and data
            const notificationDto = {
                recipientId: 'user123',
                message: 'New notification'
            }
            const prismaMock = {
                user: {
                    findUnique: jest.fn().mockResolvedValue(null)
                }
            }
            jest.mock('@models/prisma/prisma-client', () => ({
                default: prismaMock
            }))

            // Call the method and expect it to throw an error
            await expect(NotificationDao.createNotification(notificationDto)).rejects.toThrow('Recipient not found')
        })
    })
})
