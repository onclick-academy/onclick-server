import { expiredPeriod } from '../..'
import { Response, NextFunction, RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { UserRequest, UserTokenI } from 'types/user.interface'
import prisma from '@models/prisma/prisma-client'
import { createToken } from '@utilities/token'

export class AuthMiddleware {
    static verifyToken = (async (req: UserRequest, res: Response, next: NextFunction) => {
        // @ts-ignore-next
        const authHeader = req.headers['authorization']
        const accessToken = authHeader?.split(' ')[1]

        if (accessToken == null)
            return res.status(401).json({ error: 'Access token is required', redirectUrl: '/api/v1/auth/login' })

        try {
            const user = jwt.verify(accessToken, process.env.JWT_SECRET_KEY as string) as unknown as UserTokenI
            req.user = user
            next()
        } catch (error: any) {
            if (error.name === 'TokenExpiredError') {
                try {
                    // @ts-ignore-next
                    const refreshToken = req.headers['refresh-token']?.split(' ')[1] as string
                    if (!refreshToken)
                        return res
                            .status(401)
                            .json({ error: 'User has not a refresh token', redirectUrl: '/api/v1/auth/login' })

                    const decodedRefreshToken = jwt.verify(
                        refreshToken,
                        process.env.REFRESH_TOKEN_SECRET as string
                    ) as unknown as UserTokenI
                    const newPayload = {
                        id: decodedRefreshToken.id,
                        username: decodedRefreshToken.username,
                        email: decodedRefreshToken.email,
                        role: decodedRefreshToken.role
                    }

                    const newAccessToken = createToken(newPayload, process.env.JWT_SECRET_KEY, {
                        expiresIn: expiredPeriod.accessToken
                    })

                    const newRefreshToken = createToken(newPayload, process.env.REFRESH_TOKEN_SECRET, {
                        expiresIn: expiredPeriod.refreshToken
                    })

                    req.user = {
                        ...decodedRefreshToken,
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken
                    }
                    next()
                } catch (err) {
                    return res
                        .status(401)
                        .json({ error: 'Invalid refresh token \n' + err, redirectUrl: '/api/v1/auth/login' })
                }
            } else {
                return res.status(401).json({ error: 'Invalid token', redirectUrl: '/api/v1/auth/login' })
            }
        }
    }) as unknown as RequestHandler

    static checkUserIsDeleted = async (req: UserRequest, res: Response, next: NextFunction) => {
        try {
            const decodedUser = jwt.verify(
                // @ts-ignore-next
                req.headers['authorization']?.split(' ')[1] as string,
                process.env.JWT_SECRET_KEY as string
            ) as unknown as UserTokenI
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
