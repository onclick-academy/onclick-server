import joi from 'joi'
import nodemailer from 'nodemailer'
import prisma from '@models/prisma/prisma-client'

import { hashPassword } from '@utilities/hash'
import { UserDao } from '@models/dao/user.dao'
import { Request, Response } from 'express'
import { AuthDao } from '@models/dao/auth.dao'
import redis from '@models/redis'

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

            // geenerate 6 digits
            const resetCode = Math.floor(100000 + Math.random() * 900000)

            const transporter = nodemailer.createTransport({
                auth: {
                    user: process.env.APP_EMAIL,
                    pass: process.env.APP_PASSWORD
                },
                service: 'gmail'
            })

            const user = await authDao.getUserByEmail({ email: userEmail })
            if (!user) {
                return res.status(200).json({ error: 'Email sent', status: 'success' })
            }

            const mailOptions = {
                from: process.env.APP_EMAIL,
                to: user.email,
                subject: 'no-reply OnClick Academy',
                html: `
                <h1>Reset Password</h1>
                <p>Type the code bellow</p>
                <h2>${resetCode}</h2>
                `
            }
            await transporter.sendMail(mailOptions)
            const token = await redis.set(`reset ${user.id}`, resetCode.toString(), 'EX', 60 * 5)
            console.log(token)
            return res.status(200).json({
                message: 'Email sent',
                status: 'success'
            })
        } catch (error: any) {
            return res.status(200).json({ error: 'Email sent', status: 'success' })
        }
    }

    static verifyResetCode = async (req: Request, res: Response) => {
        const { code, email } = req.body
        const authDao = new AuthDao()
        const user = await authDao.getUserByEmail({ email })
        if (!user) {
            return res.status(400).json({ error: 'Code is not valid', status: 'error' })
        }
        const userId = user.id

        const resetCode = await redis.get(`reset ${userId}`)
        if (resetCode === code) {
            return res.status(200).json({ message: 'Code is valid', status: 'success' })
        }
        return res.status(400).json({ error: 'Code is not valid', status: 'error' })
    }

    static resetPassword = async (req: Request, res: Response) => {
        try {
            const { password, code, email } = req.body

            const authDao = new AuthDao()
            const user = await authDao.getUserByEmail({ email })
            if (!user) {
                return res.status(400).json({ error: 'Invalid Code', status: 'error' })
            }

            const redisCode = await redis.get(`reset ${user.id}`)
            if (redisCode !== code) {
                return res.status(400).json({ error: 'Invalid Code', status: 'error' })
            }

            const hashedPassword = await hashPassword(password)
            const userDao = new UserDao()
            const updatedUser = await userDao.updateUser({ id: user.id, password: hashedPassword })
            if (!updatedUser) throw new Error('Error when updating user')
            await redis.del(`reset ${user.id}`)

            return res.status(200).json({ message: 'Password Changed', data: updatedUser, status: 'success' })
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
