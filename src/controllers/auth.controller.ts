import joi  from 'joi'
import prisma from '../models/prisma/prisma-client'
import nodemailer from 'nodemailer'

import { UserDao } from '../models/dao/user.dao'
import { RegisterDto as UserDto }  from '../models/dto/register.dto'
import { registerValidation } from '../middlewares/validation/auth/register.auth.validation'
import { createToken } from '../utilities/token'
import { Request, Response } from 'express'
import { LoginValidation } from '../middlewares/validation/auth/login.auth.validation'
import { AuthDao } from '../models/dao/auth.dao'
import { LoginDto } from '../models/dto/login.dto'


export class AuthController {
  static register = async (req: Request, res: Response) => {
    const userDto = new UserDto(req.body)

    const validationResult = await registerValidation.createUser(userDto)
    if (validationResult.error) {
      if (validationResult.error.details && validationResult.error.details.length > 0) {
        console.error(validationResult.error.details[0].message)
        return res.status(400).json({ error: validationResult.error.details[0].message })
      }
      return res.status(400).json({ error: 'Error when creating user' })
    }
    if (req.file) {
      userDto.profilePic = req.file.path
    }

    const userDao = new UserDao()
    try {
      const newUser = await userDao.createUser(userDto)
      const newToken = createToken(newUser, process.env.JWT_SECRET_KEY, { expiresIn: '90d' })

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

  static login = async (req: Request, res: Response) => {
    const loginDto = new LoginDto(req.body)

    const LoginValidationResult = await LoginValidation.validateLoginInput(loginDto)
    if (LoginValidationResult.error) {
      if (LoginValidationResult.error.details && LoginValidationResult.error.details.length > 0) {
        console.error(LoginValidationResult.error.details[0].message)
        return res.status(400).json({ error: LoginValidationResult.error.details[0].message })
      }
      return res.status(400).json({ error: 'Error when validating the login' })
    }

    const authDao = new AuthDao()
    try {
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

  static forgetPassword = async (req: Request, res: Response) => {
    // nodemailer

    // 1. route for forget password
    // dto = new UserDto(req.body)

    const userEmail = req.body.email  // email => html
    const authDao = new AuthDao()

    const schema = joi.object({
      email: joi.string().email().required()
    })

    const validationResult = schema.validate({ email: userEmail })

    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details[0].message })
    }

    try {
      const user = await authDao.getUserByEmail({ email: userEmail })

      if (!user) throw new Error('User not found')

      const secret = process.env.JWT_SECRET + user.password
      const token = createToken({ email: user.email , id: user.id}, secret, { expiresIn: '15m' })

      const resetToken = await prisma.resetToken.create({
        data: {
          token,
          userId: user.id
        }
      })


      const url = `http://localhost:3000/api/v1/auth/password/resetpassword/${token}`

      const transporter = nodemailer.createTransport({
        host: "smtp.forwardemail.net",
        port: 465,
        secure: true,
        auth: {
          user: process.env.APP_EMAIL,
          pass: process.env.APP_PASSWORD,
        },
      });

      const info = await transporter.sendMail({
        from: process.env.APP_EMAIL,
        to: user.email,
        subject: "Reset Password Verification",
        html:` <div>
        <h1>Reset Password</h1>
        <p> dear ${user.username}, You requested to RESET you password if it wasn't you!, please ignore this email,
        otherwise, Click on the link below to reset your password please <br> ${url} <br> ps. this link is VALID for 15m.</p>
        </div>

        `
      });

    }
    catch (error) {
      if (error.message.includes('Email')) {
        return res.status(400).json({ error: error.message })
      }
      return res.status(500).json({ error: error.message })
    }

  }

  static resetPassword = async (req: Request, res: Response) => {
  }
}
