import { roles } from '../..'
import { UserRequest } from '../types/user.interface'
import { NextFunction, RequestHandler, Response } from 'express'

export const verifyAdminRole = ((req: UserRequest, res: Response, next: NextFunction) => {
    const admin = req.user
    if (admin.role !== roles.ADMIN || admin.role !== roles.SUPER_ADMIN) {
        return res.status(403).json({ message: 'Unauthorized' })
    }
    next()
}) as unknown as RequestHandler
