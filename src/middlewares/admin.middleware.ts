import { roles } from '../..'
import { UserRequest } from '../types/user.interface'
import { NextFunction, RequestHandler, Response } from 'express'

export const verifyAdminRole = ((req: any, res: Response, next: NextFunction) => {
    const admin = req.user
    console.log(admin)

    if (!(admin.role === roles.ADMIN || admin.role === roles.SUPER_ADMIN)) {
        return res.status(403).json({ message: 'Forbidden' })
    }

    if (req.body.role) {
        if (admin.role !== roles.SUPER_ADMIN) {
            return res.status(401).json({ error: 'Unauthorized' })
        }
    }

    next()
}) as unknown as RequestHandler
