import 'module-alias/register'

import { AuthMiddleware } from './src/middlewares/auth.middleware'
import express, { NextFunction, Request, Response, RequestHandler } from 'express'
import createError from 'http-errors'
import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config()

export const expiredPeriod = {
  accessToken: '3d',
  refreshToken: '5d'
}

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use('/api', require('./src/routes/home.route').default)

app.use('/api/v1/admin', require('./src/routes/admin.route').default)

app.use('/api/v1/auth', require('./src/routes/auth.route').default)


// category routes
app.use('/api/v1/categories', require('./src/routes/category.routes').default)

app.use(
  '/api/v1/users',
  AuthMiddleware.verifyToken as unknown as RequestHandler,
  require('./src/routes/user.route').default
)

app.use((req, res, next) => {
  next(createError.NotFound())
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500)
  res.send({
    status: err.status || 500,
    message: err.message
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`))
