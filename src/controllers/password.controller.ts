import joi from 'joi'
import prisma from '@models/prisma/prisma-client'

import { hashPassword } from '@utilities/hash'
import { UserDao } from '@models/dao/user.dao'
import { Request, Response } from 'express'
import { AuthDao } from '@models/dao/auth.dao'
import sendEmail from '@utilities/email'

export class PasswordController {
    static forgetPassword = async (req: Request, res: Response) => {
        const userEmail = req.body.email
        const authDao = new AuthDao()

        const schema = joi.object({
            email: joi.string().email().required()
        })

        try {
            const { error } = schema.validate({ email: userEmail })
            if (error) {
                return res.status(400).json({ error: error.details[0].message, status: 'error' })
            }

            const user = await authDao.getUserByEmail({ email: userEmail })

            if (!user) throw new Error('User not found')

            await sendEmail(user, 'RESET')
        } catch (error: any) {
            if (error.message.includes('Email')) {
                return res.status(400).json({ error: error.message, status: 'error' })
            }
            return res.status(500).json({ error: error.message, status: 'error' })
        }
    }

    static resetPassword = async (req: Request, res: Response) => {
        const { password, passwordConfirm } = req.body
        const { userId, token } = req.params
        const hashedPassword = await hashPassword(password)

        if (password !== passwordConfirm) {
            return res.status(400).json({ error: 'Passwords are not the same', status: 'error' })
        }

        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                    isDeleted: false
                },
                include: {
                    resetToken: true
                }
            })

            if (!user) throw new Error('User not found')
            if (!user.resetToken) throw new Error('User has not requested to reset password')

            if (user.resetToken.expiresAt < new Date()) throw new Error('Token has expired')

            if (user.resetToken.token !== token) throw new Error('Token is not valid')

            const schema = joi.object({
                password: joi.string().required().min(6).max(255),
                passwordConfirm: joi.ref('password')
            })

            const { error } = schema.validate({ password, passwordConfirm })
            if (error) {
                return res.status(400).json({ error: error.details[0].message, status: 'error' })
            }

            const userDao = new UserDao()
            const updatedUser = await userDao.updateUser({ id: user.id, password: hashedPassword })

            if (!updatedUser) throw new Error('Error when updating user')

            const deletedToken = await prisma.resetToken.delete({
                where: {
                    id: user.resetToken.id
                }
            })

            return res
                .status(200)
                .json({ message: 'Password Changed', data: updatedUser, status: 'success', deletedToken })
        } catch (error: any) {
            return res.status(500).json({ error: error.message, status: 'failed' })
        }
    }

    static changePassword = async (req: Request, res: Response) => {
        const { password, passwordConfirm } = req.body
        const { userId } = req.params
        const hashedPassword = await hashPassword(password)

        if (password !== passwordConfirm) {
            return res.status(400).json({ error: 'Passwords are not the same' })
        }

        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                    isDeleted: false
                }
            })
            if (!user) throw new Error('User not found')

            const schema = joi.object({
                password: joi.string().required().min(6).max(255),
                passwordConfirm: joi.ref('password')
            })

            const { error } = schema.validate({ password, passwordConfirm })
            if (error) {
                return res.status(400).json({ error: error.details[0].message })
            }

            const userDao = new UserDao()
            const updatedUser = await userDao.updateUser({ id: user.id, password: hashedPassword })

            if (!updatedUser) throw new Error('Error when updating user')

            return res.status(200).json({ message: 'Password Changed', data: updatedUser, status: 'success' })
        } catch (error: any) {
            return res.status(500).json({ error: error.message, status: 'failed' })
        }
    }
}
