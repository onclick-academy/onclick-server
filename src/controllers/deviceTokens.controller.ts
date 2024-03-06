import { UserDao } from '@models/dao/user.dao'
import prisma from '@models/prisma/prisma-client'
import { Request, Response } from 'express'
import joi from 'joi'

export class DeviceTokenController {
    static async fetchUserTokens(userId: string) {
        try {
            const deviceTokens = await prisma.devicesTokens.findMany({
                where: {
                    userId: userId
                }
            })
            return deviceTokens
        } catch (error: any) {
            console.error('error on getting device tokens\nwith error message: ' + error.message)
        }
    }

    static async getUserTokens(req: Request, res: Response) {
        const { userId } = req.params

        try {
            const userTokens = await this.fetchUserTokens(userId)
            return res.status(200).json({ status: 'success', data: userTokens })
        } catch (error: any) {
            console.error('error on getting device tokens\nwith error message: ' + error.message)
            return res.status(500).json({ message: error.message, status: 'failed' })
        }
    }

    static async create(req: Request, res: Response) {
        const { token, userId } = req.body
        const userDao = new UserDao()
        const isExist = await userDao.getUserById(userId)
        if (!isExist) {
            return res.status(400).json({ message: 'User not found', status: 'failed' })
        }

        try {
            const deviceToken = await prisma.devicesTokens.create({
                data: {
                    token: token,
                    userId: userId
                }
            })

            return res.status(200).json({ status: 'success', data: deviceToken })
        } catch (error: any) {
            console.error(
                'error on sending notiification to device ' + token + '\nwith error message: ' + error.message
            )
            return res.status(500).json({ message: error.message, status: 'failed' })
        }
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params
        const schema = joi.object({
            isEnabled: joi.boolean().optional()
        })

        try {
            const { error } = schema.validate(req.body)
            if (error) {
                return res.status(400).json({ message: error.message, status: 'failed' })
            }

            const deviceToken = await prisma.devicesTokens.update({
                where: {
                    id: id
                },
                data: {
                    isEnabled: req.body.isEnabled,
                    lastSuccessfullDelivery: req.body.token
                }
            })

            return res.status(200).json({ status: 'success', data: deviceToken })
        } catch (error: any) {
            console.error('error on updating device token ' + id + '\nwith error message: ' + error.message)
            return res.status(500).json({ message: error.message, status: 'failed' })
        }
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params

        try {
            await prisma.devicesTokens.delete({
                where: {
                    id: id
                }
            })

            return res.status(200).json({ status: 'success' })
        } catch (error: any) {
            console.error('error on deleting device token ' + id + '\nwith error message: ' + error.message)
            return res.status(500).json({ message: error.message, status: 'failed' })
        }
    }
}
