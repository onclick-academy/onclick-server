import 'module-alias/register'

import { AuthMiddleware } from '@middlewares/auth.middleware'
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

app.use('/api', require('@routes/home.route').default)

app.use('/api/v1/admin', require('@routes/admin.route').default)

app.use('/api/v1/auth', require('@routes/auth.route').default)

app.use('/api/v1/users', AuthMiddleware.verifyToken as unknown as RequestHandler, require('@routes/user.route').default)

// category routes
app.use(
    '/api/v1/categories',
    AuthMiddleware.verifyToken as unknown as RequestHandler,
    require('./src/routes/category.route').default
)

// sub-category routes
app.use(
    '/api/v1/subcategories',
    AuthMiddleware.verifyToken as unknown as RequestHandler,
    require('./src/routes/subCategory.routes').default
)

// course routes
app.use(
    '/api/v1/courses',
    AuthMiddleware.verifyToken as unknown as RequestHandler,
    require('./src/routes/course.route').default
)

// instructor routes
app.use(
    '/api/v1/instructors',
    AuthMiddleware.verifyToken as unknown as RequestHandler,
    require('./src/routes/instructor.routes').default
)

// topic routes
app.use(
    '/api/v1/topics',
    AuthMiddleware.verifyToken as unknown as RequestHandler,
    require('./src/routes/topic.routes').default
)

// Notifications route
app.use(
    '/api/v1/notifications',
    AuthMiddleware.verifyToken as unknown as RequestHandler,
    require('@routes/notification.route.ts').default
)

app.use(
    '/api/v1/users',
    AuthMiddleware.verifyToken as unknown as RequestHandler,
    require('./src/routes/user.route').default
)




// wishlist routes
app.use(
    '/api/v1/wishlist',
    AuthMiddleware.verifyToken as unknown as RequestHandler,
    require('./src/routes/wishlist.route').default
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
