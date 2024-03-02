import 'module-alias/register'

import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import createError from 'http-errors'
import express, { NextFunction, Request, Response } from 'express'

import { ROLE } from '@prisma/client'
import { AuthMiddleware } from 'middlewares/auth.middleware'
import { verifyAdminRole } from '@middlewares/admin.middleware'

import cors from 'cors'
dotenv.config()

import { hardDeleteUserAfter30Days } from './src/scripts/cron.op'

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
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

app.use(
    cors({
        origin: ['http://localhost:3000']
    })
)

app.use(morgan('dev'))
app.use('/api/v1/contactus', require('@routes/contactus.route').default)
app.use('/api', require('@routes/home.route').default)

app.use('/api/v1/admin', AuthMiddleware.verifyToken, verifyAdminRole, require('@routes/admin.route').default)

app.use('/api/v1/auth', require('@routes/auth.route').default)

app.use('/api/v1', require('@routes/__tokenized').default)


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500)
    res.send({
        status: err.status || 500,
        message: err.message
    })
})

app.use((req, res, next) => {
    next(createError.NotFound())
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`))
