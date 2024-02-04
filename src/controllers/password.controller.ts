import joi from 'joi'
import prisma from '../models/prisma/prisma-client'
import nodemailer from 'nodemailer'

import { hashPassword } from '../utilities/hash'
import { UserDao } from '../models/dao/user.dao'
import { createToken } from '../utilities/token'
import { Request, Response } from 'express'
import { AuthDao } from '../models/dao/auth.dao'

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
        return res.status(400).json({ error: error.details[0].message })
      }
      const user = await authDao.getUserByEmail({ email: userEmail })

      if (!user) throw new Error('User not found')

      const secret = process.env.JWT_SECRET_KEY + user.password
      const token = createToken({ email: user.email, id: user.id }, secret, { expiresIn: '15m' })

      const resetToken = await prisma.resetToken.create({
        data: {
          token,
          userId: user.id,
          expiresAt: new Date(Date.now() + 15 * 60 * 1000)
        }
      })

      const url = `http://localhost:3000/api/v1/auth/password/resetpassword/${user.id}/${token}`

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
        subject: 'Reset Password Verification',
        html: ` <div>
              <h1>Reset Password</h1>
              <p> dear ${user.username}, You requested to RESET you password if it wasn't you!, please ignore this email,
              otherwise, Click on the link below to reset your password please <br> ${url} <br> ps. this link is VALID for 15m.</p>
            </div>
            `
      })

      transporter.sendMail(info, (err, data) => {
        if (err) {
          console.log(err)
          return res.status(500).json({ error: err.message })
        } else {
          console.log('email sent')
          return res.status(200).json({ data: 'email sent', reset_token: resetToken })
        }
      })
    } catch (error: any) {
      if (error.message.includes('Email')) {
        return res.status(400).json({ error: error.message })
      }
      return res.status(500).json({ error: error.message })
    }
  }

  static resetPassword = async (req: Request, res: Response) => {
    const { password, passwordConfirm } = req.body
    const { userId, token } = req.params
    const hashedPassword = await hashPassword(password)

    if (password !== passwordConfirm) {
      return res.status(400).json({ error: 'Passwords are not the same' })
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
        return res.status(400).json({ error: error.details[0].message })
      }
      const userDao = new UserDao()
      const updatedUser = await userDao.updateUser({ id: user.id, password: hashedPassword })

      if (!updatedUser) throw new Error('Error when updating user')

      const deletedToken = await prisma.resetToken.delete({
        where: {
          id: user.resetToken.id
        }
      })

      return res.status(200).json({ message: 'Password Changed', data: updatedUser, status: 'success', deletedToken })
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

// TODO: maintain for reset password and change password
