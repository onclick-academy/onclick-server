import { expiredPeriod } from './../../index'
import joi from 'joi'
import prisma from '../models/prisma/prisma-client'
import nodemailer from 'nodemailer'

import { UserDao } from '../models/dao/user.dao'
import { RegisterDto } from '../models/dto/register.dto'
import { registerValidation } from '../middlewares/validation/auth/register.auth.validation'
import { createToken } from '../utilities/token'
import { Request, Response } from 'express'
import { LoginValidation } from '../middlewares/validation/auth/login.auth.validation'
import { AuthDao } from '../models/dao/auth.dao'
import { LoginDto } from '../models/dto/login.dto'
import { UserRequest } from '../../types/user.interface'
import  sendEmail  from '../utilities/email'

export class AuthController {
  static register = async (req: Request, res: Response) => {
    const userDto = new RegisterDto(req.body)

    if (req.file) {
      userDto.profilePic = req.file.path
    }

    const userDao = new UserDao()

    try {
      const { error } = await registerValidation.createUser(userDto)

      if (error) {
        if (error.details && error.details.length > 0) {
          console.error(error.details[0].message)
          return res.status(400).json({ error: error.details[0].message })
        }

        return res.status(400).json({ error: 'Error when creating user' })
      }

      const newUser = await userDao.createUser(userDto)
      const accessToken = createToken(newUser, process.env.JWT_SECRET_KEY, { expiresIn: expiredPeriod.accessToken })

      const refreshToken = createToken(newUser, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: expiredPeriod.refreshToken
      })

      this.sendConfirmationEmail(req, res)

      return res.status(200).json({
        data: newUser,
        accessToken: accessToken,
        refreshToken: userDto.isRememberMe ? refreshToken : null,
        status: 'success'
      })
    } catch (error: any) {
      if (error.message.includes('Email is already in use') || error.message.includes('Username is not available')) {
        return res.status(400).json({ error: error.message, status: 'failed' })
      }
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

      const user = await authDao.getUserByEmail({ email: userEmail })

      if (!user) throw new Error('User not found')

      // TODO: utility
      sendEmail(req, res, user, 'Confirm')
  
    } catch (error: any) {
      if (error.message.includes('Email')) {
        return res.status(400).json({ error: error.message })
      }
      return res.status(500).json({ error: error.message })
    }
  }

  static emailConfirmation = async (req: Request, res: Response) => {
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
      if (user.isEmailConfirm) throw new Error('Email is already confirmed')

      const userDao = new UserDao()
      const updatedUser = await userDao.updateUser({ id: user.id, isEmailConfirm: true })

      return res.status(200).json({ data: updatedUser, status: 'success' })
    } catch (error: any) {
      return res.status(500).json({ error: error.message, status: 'failed' })
    }
  }

  static login = async (req: UserRequest, res: Response) => {
    const loginDto = new LoginDto(req.body as unknown as LoginDto)
    const authDao = new AuthDao()
    try {
      const { error } = await LoginValidation.validateLoginInput(loginDto)

      if (error) {
        if (error.details && error.details.length > 0) {
          console.error(error.details[0].message)
          return res.status(400).json({ error: error.details[0].message })
        }
        return res.status(400).json({ error: 'Error when validating the login' })
      }

      const user: loginDtoI | undefined = await authDao.login(loginDto)
      const accessToken = createToken(loginDto, process.env.JWT_SECRET_KEY, { expiresIn: expiredPeriod.accessToken })
      const refreshtoken = createToken(loginDto, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: expiredPeriod.refreshToken
      })

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
