import { expiredPeriod } from '../index' // refer to index.ts on the root directory
import { Request, Response } from 'express'
import joi from 'joi'
import fs from 'fs'
import handlebars from 'handlebars'

import { AuthDao } from '@models/dao/auth.dao'
import { UserDao } from '@models/dao/user.dao'
import { LoginValidation } from '@validation/auth/login.auth.validation'
import { RegisterValidation } from '@validation/auth/register.auth.validation'
import { LoginDto } from '@dto/login.dto'
import prisma from '@models/prisma/prisma-client'
import { createToken } from '@utilities/token'
import { UserRequest } from '../types/user.interface'
import { UserDto } from '@models/dto/user.dto'
import redis from '@models/redis'
import { randomUUID } from 'crypto'
import { sendEmail } from '@utilities/email'

export class AuthController {
    static register = async (req: UserRequest | any, res: Response) => {
        const userDto = new UserDto(req.body)
        const userDao = new UserDao()
        console.log(userDto)

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

            let refreshToken = null
            if (userDto.isRememberMe) {
                createToken(newUser, process.env.REFRESH_TOKEN_SECRET, {
                    expiresIn: expiredPeriod.refreshToken
                })
            }

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24 * 7
            })
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24 * 7
            })

            res.status(200).json({
                data: newUser,
                accessToken: accessToken,
                refreshToken: refreshToken,
                status: 'success'
            })

            req.user = {
                id: newUser.id,
                role: newUser.role,
                email: newUser.email,
                accessToken: accessToken,
                refreshToken: refreshToken
            }

            await this.sendConfirmationEmail(req, res)
            return
        } catch (error: any) {
            console.log(error)
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

            const newUuid = randomUUID()
            await redis.set(`confirm ${newUuid}`, user.id, 'ex', 60 * 10)
            const url = `${process.env.SERVER_URL}/auth/email/user/${newUuid}`

            const htmlContent = await fs.promises.readFile('src/views/confirm-email.html', 'utf8') // this will not block the event loop
            // const htmlContent = fs.readFileSync('src/views/confirm-email.html', 'utf8') // TODO change to asyn reading html file
            const template = handlebars.compile(htmlContent)
            const html = template({ url, username: user.username })
            await sendEmail(html, userEmail)
        } catch (error: any) {
            return res.status(500).json({ error: error.message, status: 'failed' })
        }
    }

    static emailUserConfirmation = async (req: Request, res: Response) => {
        const { uuid } = req.params

        try {
            const userId = await redis.get(`confirm ${uuid}`)
            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            })
            if (!user) throw new Error('Invalid user')
            if (user.isEmailConfirm) throw new Error('Email is already confirmed')

            const userDao = new UserDao()
            await userDao.updateUser({ id: user.id, isEmailConfirm: true })
            return res.send(`
                <script>
                    window.location.href = 'http://localhost:3001/';
                </script>
            `)
        } catch (error: any) {
            console.log(error.message)
            return res.status(500).json({ error: error.message, status: 'error' })
        }
    }

    static login = async (req: any, res: Response) => {
        const loginDto = new LoginDto(req.body as unknown as LoginDto)

        if (req.body.email.includes('@')) {
            loginDto.email = req.body.email
            loginDto.username = ''
        } else if (!req.body.email.includes('@')) {
            loginDto.username = req.body.email
            loginDto.email = ''
        }
        const authDao = new AuthDao()

        console.log('object :>> ', loginDto)
        try {
            // const { error } = await LoginValidation.validateLoginInput(loginDto)

            // if (error) {
            //     return res.status(400).json({ message: 'Error when validating the login', error })
            // }

            const user: loginDtoI | undefined = await authDao.login(loginDto)
            const accessToken = createToken(loginDto, process.env.JWT_SECRET_KEY, {
                expiresIn: expiredPeriod.accessToken
            })
            let refreshToken = null
            refreshToken = createToken(loginDto, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: expiredPeriod.refreshToken
            })
            // Set cookies in cookies
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
            })
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
            })

            return res.status(200).json({
                data: user,
                accessToken: accessToken,
                refreshToken: refreshToken,
                status: 'success'
            })
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: error.message, status: 'failed to login' })
        }
    }

    static logout = async (req: Request, res: Response) => {
        //TODO: revoke the token
        return res.status(200).json({ message: 'Logout successfully', status: 'success' })
    }
}
