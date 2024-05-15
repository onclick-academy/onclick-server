import { expiredPeriod, roles } from '../index'
import { Response, NextFunction, RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { UserRequest, UserTokenI } from 'types/user.interface'
import prisma from '@models/prisma/prisma-client'
import { createToken } from '@utilities/token'

/**
 * Description: This function is used to get user and decoded user
 * cuz we not always we get the rol from request specially when login
 * @param Token
 * @returns
 */
const getUserAndDecodedUser = async (flag: 'access' | 'refresh', token: string) => {
    const decodedUser = jwt.verify(
        token,
        (flag === 'access' ? process.env.JWT_SECRET_KEY : process.env.REFRESH_TOKEN_SECRET) as string
    ) as unknown as UserTokenI
    const userExist = await prisma.user.findFirst({
        where: {
            OR: [
                {
                    id: decodedUser.id
                },
                {
                    username: decodedUser.username
                },
                {
                    email: decodedUser.email
                }
            ]
        }
    })
    if (!userExist) throw new Error('User not found')
    return { decodedUser, userExist }
}
export class AuthMiddleware {
    static verifyToken = (async (req: any, res: Response, next: NextFunction) => {
        let accessToken = req.headers.token || req.cookies.accessToken
        console.log("object token", accessToken)
        accessToken = accessToken.split(' ')[1]
        if (accessToken == null)
            return res.status(401).json({ error: 'Access token is required', redirectUrl: '/api/v1/auth/login' })

        try {
            const user = await getUserAndDecodedUser('access', accessToken)
            req.user = {
                ...user.decodedUser,
                accessToken,
                role: user.userExist.role,
                id: user.userExist.id
            }
            console.log('🚀 ~ AuthMiddleware ~ verifyToken= ~ req.user:', req.user)
            next()
        } catch (error: any) {
            if (error.name === 'TokenExpiredError') {
                try {
                    // @ts-ignore-next

                    let refreshToken = null
                    const authHeader = req.headers.refreshToken
                    if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
                        refreshToken = authHeader.substring(7, authHeader.length) // Extract the token
                    }

                    if (!refreshToken)
                        return res
                            .status(401)
                            .json({ error: 'User has not a refresh token', redirectUrl: '/api/v1/auth/login' })

                    const decodedRefreshToken = await getUserAndDecodedUser('refresh', refreshToken)
                    const newPayload = {
                        ...decodedRefreshToken.decodedUser,
                        role: decodedRefreshToken.userExist.role
                    }

                    const newAccessToken = createToken(newPayload, process.env.JWT_SECRET_KEY, {
                        expiresIn: expiredPeriod.accessToken
                    })
                    const newRefreshToken = createToken(newPayload, process.env.REFRESH_TOKEN_SECRET, {
                        expiresIn: expiredPeriod.refreshToken
                    })

                    req.user = {
                        ...newPayload,
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken
                    }
                    next()
                } catch (err) {
                    console.log(err)
                    return res
                        .status(401)
                        .json({ error: 'Invalid refresh token \n' + err, redirectUrl: '/api/v1/auth/login' })
                }
            } else {
                console.log(error)
                return res.status(401).json({ error: 'Invalid token', redirectUrl: '/api/v1/auth/login' })
            }
        }
    }) as unknown as RequestHandler

    static studentAuthorization = (async (req: any, res: Response, next: NextFunction) => {
        let accessToken = null
        const authHeader = req.headers.token || req.cookies.accessToken

        if (accessToken == null)
            return res.status(401).json({ error: 'Access token is required', redirectUrl: '/api/v1/auth/login' })

        try {
            const decoded = await getUserAndDecodedUser('access', accessToken)
            req.user = {
                ...decoded.decodedUser,
                accessToken,
                role: decoded.userExist.role
            }
            console.log('from student auth', req.user)

            const isSuperAdmin = req.user.role === roles.SUPER_ADMIN
            const isAdminOrStudent = [roles.ADMIN, roles.STUDENT].includes(req.user.role)
            const changingRole = Boolean(req.body.role)

            if (isSuperAdmin || (isAdminOrStudent && !changingRole)) {
                next()
            } else {
                res.status(401).json({ error: 'Unauthorized' })
            }
        } catch (error) {
            console.log(error)
            res.status(401).json({ error: 'Invalid token', redirectUrl: '/api/v1/auth/login' })
        }
    }) as unknown as RequestHandler

    static instructorAuthorization = (async (req: any, res: Response, next: NextFunction) => {
        let accessToken = null
        const authHeader = req.headers.token || req.cookies.accessToken

        if (accessToken == null)
            return res.status(401).json({ error: 'Access token is required', redirectUrl: '/api/v1/auth/login' })

        try {
            const decoded = await getUserAndDecodedUser('access', accessToken)
            req.user = {
                ...decoded.decodedUser,
                accessToken,
                role: decoded.userExist.role
            }
            console.log('from student auth', req.user)

            const isSuperAdmin = req.user.role === roles.SUPER_ADMIN
            const isAdminOrInstructor = [roles.ADMIN, roles.INSTRUCTOR].includes(req.user.role)
            const changingRole = Boolean(req.body.role)

            if (isSuperAdmin || (isAdminOrInstructor && !changingRole)) {
                next()
            } else {
                res.status(401).json({ error: 'Unauthorized' })
            }
        } catch (error) {
            console.log(error)
            res.status(401).json({ error: 'Invalid token', redirectUrl: '/api/v1/auth/login' })
        }
    }) as unknown as RequestHandler

    static checkUserIsDeleted = async (req: UserRequest, res: Response, next: NextFunction) => {
        let accessToken = null
        const authHeader = req.headers.token || req.cookies.accessToken
        try {
            const decodedUser = jwt.verify(accessToken, process.env.JWT_SECRET_KEY as string) as unknown as UserTokenI
            const user = await prisma.user.findUnique({
                where: {
                    id: decodedUser.id
                }
            })

            if (!user) return res.status(404).json({ error: 'User not found' })

            if (user.isDeleted) return res.status(404).json({ error: 'User is deleted' })

            next()
        } catch (error: any) {
            return res.status(401).json({ error: 'Invalid token', redirectUrl: '/api/v1/auth/login' })
        }
    }
}
