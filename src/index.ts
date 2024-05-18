import 'module-alias/register'

import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import createError from 'http-errors'
import express, { NextFunction, Request, Response } from 'express'

import { ROLE } from '@prisma/client'
import { AuthMiddleware } from 'middlewares/auth.middleware'
import { verifyAdminRole } from '@middlewares/admin.middleware'

dotenv.config()

import { hardDeleteUserAfter30Days } from './scripts/cron.op'
import { passToExpressError } from '@utilities/error'

hardDeleteUserAfter30Days.start()

export const expiredPeriod = {
    accessToken: '3d',
    refreshToken: '5d'
}

type Roles = {
    ADMIN: ROLE
    INSTRUCTOR: ROLE
    STUDENT: ROLE
    SUPER_ADMIN: ROLE
}

export const roles: Roles = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    ADMIN: 'ADMIN',
    INSTRUCTOR: 'INSTRUCTOR',
    STUDENT: 'STUDENT'
}

const cookieParser = require('cookie-parser')
export const app = express()

app.use(cookieParser())

const allowedOrigins = ['http://localhost:3001', 'https://onclick-ten.vercel.app']
const corsOptions = {
    origin: function (origin: any, callback: any) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true // Needed because your request includes credentials
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(morgan('dev'))
app.use('/api/v1/auth', require('@routes/auth.route').default)

app.use('/api/v1/news', require('@routes/news.routes').default)

app.use('/api/v1/contactus', require('@routes/contactus.route').default)

app.use('/api', require('@routes/home.route').default)

app.use('/api/v1', require('@routes/__tokenized').default)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    return passToExpressError(err, next)
})

app.use((req, res, next) => {
    next(createError.NotFound())
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`))
