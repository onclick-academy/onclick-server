import joi from 'joi'
import prisma from '../models/prisma/prisma-client'
import nodemailer from 'nodemailer'

import { UserDao } from '../models/dao/user.dao'
import { RegisterDto as UserDto } from '../models/dto/register.dto'
import { registerValidation } from '../middlewares/validation/auth/register.auth.validation'
import { createToken } from '../utilities/token'
import { Request, Response } from 'express'
import { LoginValidation } from '../middlewares/validation/auth/login.auth.validation'
import { AuthDao } from '../models/dao/auth.dao'
import { LoginDto } from '../models/dto/login.dto'

export class AuthController {
  static register = async (req: Request, res: Response) => {
    const userDto = new UserDto(req.body)

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
      const newToken = createToken(newUser, process.env.JWT_SECRET_KEY, { expiresIn: '90d' })

      this.sendConfirmatioEmail(req, res)

      return res.status(200).json({
        data: newUser,
        token: newToken,
        status: 'success'
      })
    } catch (error) {
      if (error.message.includes('Email is already in use') || error.message.includes('Username is not available')) {
        return res.status(400).json({ error: error.message, status: 'failed' })
      }
      return res.status(500).json({ error: error.message, status: 'failed' })
    }
  }

  static sendConfirmatioEmail = async (req: Request, res: Response) => {
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

      const secret = process.env.JWT_SECRET_KEY + user.password
      const token = createToken({ email: user.email, id: user.id }, secret, { expiresIn: '1d' })

      const confirmToken = await prisma.confirmToken.create({
        data: {
          token,
          userId: user.id,
          expiresAt: new Date(Date.now() + 15 * 60 * 1000)
        }
      })

      const url = `http://localhost:3000/api/v1/auth/email/confirmation/${user.id}/${token}`

      const transporter = nodemailer.createTransport({
        auth: {
          user: process.env.APP_EMAIL,
          pass: process.env.APP_PASSWORD
        },
        service: 'gmail'
      })

      const info = await transporter.sendMail({
        from: process.env.APP_EMAIL,
        to: user.email,
        subject: 'Email Confirmation',
        html: ` <div>
          <h1>Email Confirmation</h1>
          <p> dear ${user.username}, You have successfully registered to our platform, but before you can start using it, you need to confirm your email :) if it wasn't you!, please ignore this email,
          <br> Click on the link below to confirm your email please <br> ${url} <br> ps. this link is VALID for 1 Day.</p>
        </div>
        `
      })

      transporter.sendMail(info, (err, data) => {
        if (err) {
          console.log(err)
          return res.status(500).json({ error: err.message })
        } else {
          console.log('email sent')
          return res.status(200).json({ data: 'email sent' })
        }
      })
    } catch (error) {
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
      if (user.confirmToken.expiresAt < new Date()) throw new Error('Token has expired')
      if (user.confirmToken.token !== token) throw new Error('Token is not valid')
      if (user.isEmailConfirm) throw new Error('Email is already confirmed')

      const userDao = new UserDao()
      const updatedUser = await userDao.updateUser({ id: user.id, isEmailConfirm: true })

      return res.status(200).json({ data: updatedUser, status: 'success' })
    } catch (error) {
      return res.status(500).json({ error: error.message, status: 'failed' })
    }
  }

  static login = async (req: Request, res: Response) => {
    const loginDto = new LoginDto(req.body)
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

      const user = await authDao.login(loginDto)
      const newToken = createToken(loginDto, process.env.JWT_SECRET_KEY, { expiresIn: '90d' })

      return res.status(200).json({
        data: user,
        token: newToken,
        status: 'success'
      })
    } catch (error) {
      return res.status(500).json({ error: error.message, status: 'failed to login' })
    }
  }
}
