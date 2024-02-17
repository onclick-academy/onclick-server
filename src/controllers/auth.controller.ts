import { expiredPeriod } from '../..' // refer to index.ts on the root directory
import { Request, Response } from 'express'
import joi from 'joi'

import { RegisterDto } from '@models/dto/register.dto'
import { AuthDao } from '@dao/auth.dao'
import { UserDao } from '@dao/user.dao'
import { LoginValidation } from '@validation/auth/login.auth.validation'
import { registerValidation } from '@validation/auth/register.auth.validation'
import { LoginDto } from '@dto/login.dto'
import prisma from '@models/prisma/prisma-client'
import { createToken } from '@utilities/token'
import sendEmail from '@utilities/email'
import { AdminDao } from '@models/dao/admin.dao'

export class AuthController {
    static register = async (req: any, res: Response) => {
        const userDto = new RegisterDto(req.body)

        if (req.file) {
            userDto.profilePic = req.file.path
        }

        const userDao = new UserDao()

        try {
            const isExist = await prisma.admin.findUnique({
                where: {
                    email: userDto.email
                }
            })
            if (isExist) return res.status(400).json({ error: 'Email is already in use', status: 'failed' })

            const { error } = await registerValidation.createUser(userDto)
            if (error) {
                return res.status(400).json({ error: 'Error when creating user' })
            }

            const newUser = await userDao.createUser(userDto)

            const accessToken = createToken(newUser, process.env.JWT_SECRET_KEY, {
                expiresIn: expiredPeriod.accessToken
            })
            const refreshToken = createToken(newUser, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: expiredPeriod.refreshToken
            })

            await this.sendConfirmationEmail(req, res)

            req.user = {
                id: newUser.id,
                role: newUser.role,
                email: newUser.email
            }

            return res.status(200).json({
                data: newUser,
                accessToken: accessToken,
                refreshToken: userDto.isRememberMe ? refreshToken : null,
                status: 'success'
            })
        } catch (error: any) {
            if (
                error.message.includes('Email is already in use') ||
                error.message.includes('Username is not available')
            )
                return res.status(400).json({ error: error.message, status: 'failed' })

            console.log(error.message)
            return res.status(500).json({ error: error.message, status: 'failed' })
        }
    }

    static sendConfirmationEmail = async (req: Request, res: Response) => {
        const userEmail = req.body.email
        const authDao = new AuthDao()

        const schema = joi.object({
            email: joi.string().email().required()
        })

        try {
            const { error } = schema.validate({ email: userEmail })
            if (error) {
                return res.status(400).json({ error: 'Email is not valid' })
            }

            let user = await authDao.getUserByEmail({ email: userEmail })

            if (!user) {
                const admin = await prisma.admin.findUnique({
                    where: {
                        email: userEmail
                    }
                })
                if (!admin) throw new Error('User not found')
                await sendEmail(admin, 'CONFIRM')
            }
            await sendEmail(user as any, 'CONFIRM')
        } catch (error: any) {
            if (error.message.includes('Email')) {
                return res.status(400).json({ error: error.message })
            }
            return res.status(500).json({ error: error.message })
        }
    }

    static emailUserConfirmation = async (req: Request, res: Response) => {
        const { userId, token } = req.params
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                },
                include: {
                    confirmToken: true
                }
            })
            if (!user) throw new Error('User not found')
            if (!user.confirmToken) throw new Error('Token not found')
            if (user.confirmToken.expiresAt < new Date()) throw new Error('Token has expired')
            if (user.confirmToken.token !== token) throw new Error('Token is not valid')

            const userDao = new UserDao()
            const updatedUser = await userDao.updateUser({ id: user.id, isEmailConfirm: true })

            return res.status(200).json({ data: updatedUser, status: 'success' })
        } catch (error: any) {
            console.log(error.message)
            return res.status(500).json({ error: error.message })
        }
    }

    static emailAdminConfirmation = async (req: Request, res: Response) => {
        const { adminId, token } = req.params
        try {
            const admin = await prisma.admin.findUnique({
                where: {
                    id: adminId
                },
                include: {
                    confirmToken: true
                }
            })
            if (!admin) throw new Error('Admin not found')
            if (!admin.confirmToken) throw new Error('Token not found')
            if (admin.confirmToken.expiresAt < new Date()) throw new Error('Token has expired')
            if (admin.confirmToken.token !== token) throw new Error('Token is not valid')
            if (admin.isEmailConfirm) throw new Error('Email is already confirmed')

            const adminDao = new AdminDao()
            const updatedAdmin = await adminDao.updateAdmin({ id: admin.id, isEmailConfirm: true })

            return res.status(200).json({ data: updatedAdmin, status: 'success' })
        } catch (error: any) {
            console.log(error.message)
            return res.status(500).json({ error: error.message })
        }
    }

    static login = async (req: any, res: Response) => {
        const loginDto = new LoginDto(req.body as unknown as LoginDto)
        const authDao = new AuthDao()
        try {
            const { error } = await LoginValidation.validateLoginInput(loginDto)

            if (error) {
                return res.status(400).json({ message: 'Error when validating the login', error })
            }

            const user: loginDtoI | undefined = await authDao.login(loginDto)
            const accessToken = createToken(loginDto, process.env.JWT_SECRET_KEY, {
                expiresIn: expiredPeriod.accessToken
            })
            const refreshtoken = createToken(loginDto, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: expiredPeriod.refreshToken
            })

            req.user = {
                id: user?.id,
                role: user?.role,
                email: user?.email
            }

            return res.status(200).json({
                data: user,
                accessToken,
                refreshToken: loginDto.isRememberMe ? refreshtoken : null,
                status: 'success'
            })
        } catch (error: any) {
            return res.status(500).json({ error: error.message, status: 'failed to login' })
        }
    }
}
