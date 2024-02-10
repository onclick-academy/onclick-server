import nodemailer from 'nodemailer'
import prisma from '../models/prisma/prisma-client'
import { createToken } from './token'

import { Request, Response } from 'express'

export default async function sendEmail(req: Request, res: Response, user: any, type?: string) {
  try {
    const secret = process.env.JWT_SECRET_KEY
    const token = createToken({ email: user.email, id: user.id }, secret, { expiresIn: '15m' })

    let resetToken = null as any

    if (type === 'Reset') {
      if (user.fullName) {
        resetToken = await prisma.resetToken.create({
          data: {
            token,
            userId: user.id,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000)
          }
        })
      } else {
        resetToken = await prisma.resetToken.create({
          data: {
            token,
            adminId: user.id,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
          }
        })
      }
    }

    let confirmToken = null as any

    if (!type || type === 'Confirm') {
      if (user.fullName) {
        confirmToken = await prisma.confirmToken.create({
          data: {
            token,
            userId: user.id,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000)
          }
        })
      } else {
        confirmToken = await prisma.confirmToken.create({
          data: {
            token,
            adminId: user.id,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
          }
        })
      }
    }

    const url =
      type === 'Confirm'
        ? `http://localhost:3000/api/v1/auth/email/confirmation/${user.id}/${token}`
        : `http://localhost:3000/api/v1/auth/password/resetpassword/${user.id}/${token}`

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
      subject: type === 'Reset' ? 'Reset Password Verification' : 'Email Confirmation',
      html:
        type === 'Reset'
          ? `     <div>
                <h1>Reset Password</h1>
                <p> dear ${
                  user.username ? user.username : user.fullName ? user.fullName : 'ADMIN'
                }, You requested to RESET your password if it wasn't you!, please ignore this email,
                otherwise, Click on the link below to reset your password please <br> ${url} <br> ps. this link is VALID for 15m.</p>
              </div>
              `
          : ` <div>
              <h1>Email Confirmation</h1>
              <p> dear ${
                user.username ? user.username : user.fullName ? user.fullName : 'Admin'
              }, You have successfully registered to our platform, but before you can start using it, you need to confirm your email :) if it wasn't you!, please ignore this email,
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
        return res.status(200).json({ data: 'email sent', reset_token: resetToken, confirm_token: confirmToken })
      }
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
