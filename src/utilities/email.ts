import nodemailer from 'nodemailer'
import prisma from '../models/prisma/prisma-client'
import { createToken } from './token'
import fs from 'fs'
import handlebars from 'handlebars'
import path from 'path'
import redis from '@models/redis'

interface User {
    id: string
    email: string
    fullName?: string
    username?: string
}

async function generateTokenAndURL(user: User, action: 'RESET' | 'CONFIRM') {
    const secret = process.env.JWT_SECRET_KEY as string
    const expiresIn = action === 'RESET' ? '15m' : '24h'
    const expiresAt = new Date(Date.now() + (action === 'RESET' ? 15 * 60 * 1000 : 24 * 60 * 60 * 1000))
    const token = createToken({ email: user.email, id: user.id }, secret, { expiresIn })
    try {
        if (action === 'RESET') {
            const resetTokenData = {
                token,
                expiresAt,
                userId: user.id
            }
            await prisma.resetToken.upsert({
                where: { userId: user.id },
                update: resetTokenData,
                create: resetTokenData
            })
            await redis.set(`reset ${user.id}`, token)
        } else {
            const confirmTokenData = {
                token,
                expiresAt,
                userId: user.id
            }
            await prisma.confirmToken.upsert({
                where: { userId: user.id },
                update: confirmTokenData,
                create: confirmTokenData
            })
            await redis.set(`confirm ${user.id}`, token)
        }
    } catch (error) {
        console.log(`Failed to upsert token:`, error)
        throw new Error(`Failed to handle ${action.toLowerCase()} token.`)
    }

    const urlPath = action === 'RESET' ? 'password/resetpassword' : '/email/user'
    const url = `http://localhost:3000/api/v1/auth/${urlPath}/${user.id}/${token}`

    return url
}

// TODO this is only for both reset and confirm, make it dynamic this is not GOODDD ://
export default async function sendEmail(user: User, action: 'RESET' | 'CONFIRM') {
    try {
        const url = await generateTokenAndURL(user, action)
        const transporter = nodemailer.createTransport({
            auth: {
                user: process.env.APP_EMAIL,
                pass: process.env.APP_PASSWORD
            },
            service: 'gmail'
        })

        const source = fs.readFileSync(
            path.join(__dirname, '..', 'views', `${action === 'RESET' ? 'resetPassword' : 'confirmEmail'}.html`),
            'utf-8'
        )

        const template = handlebars.compile(source)
        const htmlToSend = template({ url, username: user.username || user.fullName })

        const mailOptions = {
            from: process.env.APP_EMAIL,
            to: user.email,
            subject: 'no-reply OnClick Academy',
            html: htmlToSend
        }

        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error('Failed to send email:', error)
    }
}
