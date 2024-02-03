import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { UserRequest, UserTokenI } from '../../types/user.interface'
import prisma from '../models/prisma/prisma-client'
import { createToken } from '../utilities/token'

export class AuthMiddleware {
  static verifyToken = async (req: UserRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const accessToken = authHeader && authHeader.split(' ')[1]

    if (accessToken == null)
      return res.status(401).json({ error: 'Access token is required', redirectUrl: '/api/v1/auth/login' })

    try {
      jwt.verify(accessToken, process.env.JWT_SECRET_KEY) as UserTokenI

      console.log('request user', req.user)
      next()
    } catch (error) {
      console.log('error name', error.name)
      if (error.name === 'TokenExpiredError') {
        try {
          const refreshToken = req.user?.refreshToken
          if (!refreshToken)
            return res.status(401).json({ error: 'User has not a refresh token', redirectUrl: '/api/v1/auth/login' })

          const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as UserTokenI

          const newAccessToken = createToken(
            {
              id: decodedRefreshToken.id,
              username: decodedRefreshToken.username,
              email: decodedRefreshToken.email,
              role: decodedRefreshToken.role
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '10m' }
          )

          const newRefreshToken = createToken(
            {
              id: decodedRefreshToken.id,
              username: decodedRefreshToken.username,
              email: decodedRefreshToken.email,
              role: decodedRefreshToken.role
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1h' }
          )

          req.user = {
            ...decodedRefreshToken,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
          }
          console.log({ user: req.user })
          next()
        } catch (err) {
          console.log('error', err)
          return res
            .status(401)
            .json({ error: 'Unexpected error at create refresh token \n' + err, redirectUrl: '/api/v1/auth/login' })
        }
      } else {
        return res.status(401).json({ error: 'Invalid token', redirectUrl: '/api/v1/auth/login' })
      }
    }
  }

  static checkUserIsDeleted = async (req: UserRequest, res: Response, next: NextFunction) => {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user?.id
      }
    })

    if (!user) return res.status(404).json({ error: 'User not found' })

    if (user.isDeleted) return res.status(404).json({ error: 'User is deleted' })

    next()
  }
}
