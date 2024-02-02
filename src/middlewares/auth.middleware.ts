import prisma from '../models/prisma/prisma-client'
import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { UserRequest, UserTokenI } from '../../types/user.interface'

export class AuthMiddleware {
  verifyToken = (req: UserRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401).json({ error: 'Access token is required' })

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: UserTokenI) => {
      if (!!err) return res.status(403).json({ error: 'Invalid token with error \n' + err })
      req.user = user
      next()
    })
  }
}
