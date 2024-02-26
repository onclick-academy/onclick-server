import { expiredPeriod } from '../..' // refer to index.ts on the root directory
import { Request, Response } from 'express'
import joi from 'joi'

import { AuthDao } from '@dao/auth.dao'
import { UserDao } from '@dao/user.dao'
import { LoginValidation } from '@validation/auth/login.auth.validation'
import { RegisterValidation } from '@validation/auth/register.auth.validation'
import { LoginDto } from '@dto/login.dto'
import prisma from '@models/prisma/prisma-client'
import { createToken } from '@utilities/token'
import sendEmail from '@utilities/email'
import { UserRequest } from '../types/user.interface'
import { UserDto } from '@models/dto/user.dto'

export class AuthController {
    static register = async (req: UserRequest | any, res: Response) => {
        const userDto = new UserDto(req.body)
        const userDao = new UserDao()

        if (req.file) {
            userDto.profilePic = req.file.path
        }

        try {
            const isExist = await prisma.user.findUnique({
                where: {
                    email: userDto.email
                }
            })
            if (isExist) return res.status(400).json({ error: 'Email is already in use', status: 'failed' })

            const { error } = await RegisterValidation.createUser(userDto)
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

            const cookiesRules = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            }
            res.cookie('accessToken', accessToken, {
                ...cookiesRules,
                maxAge: 3 * 24 * 60 * 60 * 1000
            })
            res.cookie('refreshToken', refreshToken, {
                ...cookiesRules,
                maxAge: 5 * 24 * 60 * 60 * 1000
            })
            res.status(200).json({
                data: newUser,
                accessToken: accessToken,
                refreshToken: userDto.isRememberMe ? refreshToken : null,
                status: 'success'
            })

            req.user = {
                id: newUser.id,
                role: newUser.role,
                email: newUser.email,
                accessToken: accessToken,
                refreshToken: refreshToken
            }

            await this.sendConfirmationEmail(req, res) // make it last step for its Time complexity
            return
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
            if (!user) throw new Error('User not found')

            await sendEmail(user as any, 'CONFIRM')
        } catch (error: any) {
            if (error.message.includes('Email') || error.message.includes('User')) {
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

            res.redirect('http://localhost:3000/login')
            return res.status(200).json({ data: updatedUser, status: 'success' })
        } catch (error: any) {
            console.log(error.message)
            return res.status(500).json({ error: error.message, status: 'error' })
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
            const refreshToken = createToken(loginDto, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: expiredPeriod.refreshToken
            })

            const cookiesRules = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            }
            res.cookie('accessToken', accessToken, {
                ...cookiesRules,
                maxAge: 3 * 24 * 60 * 60 * 1000
            })
            res.cookie('refreshToken', refreshToken, {
                ...cookiesRules,
                maxAge: 5 * 24 * 60 * 60 * 1000
            })

            return res.status(200).json({
                data: user,
                accessToken,
                refreshToken: loginDto.isRememberMe ? refreshToken : null,
                status: 'success'
            })
        } catch (error: any) {
            return res.status(500).json({ error: error.message, status: 'failed to login' })
        }
    }
}
