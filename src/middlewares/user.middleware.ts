import { Request, Response, NextFunction } from 'express'
import prisma from '@models/prisma/prisma-client'
import { UserDao } from '@dao/user.dao'

export class UserMiddlware {
    static checkIfUserExists = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        next()
    }

    static checkIfUserIsActive = async (req: Request, res: Response, next: NextFunction) => {
        let id: string | undefined
        if (req.params.userId) {
            id = req.params.userId
        } else if (req.body.userId) {
            id = req.body.userId
        }

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        if (user.isDeleted) {
            return res.status(404).json({ error: 'User not found', redirectUrl: '/api/v1/auth/login' })
        }

        if (!user.isAvailable) {
            return res.status(400).json({ error: 'User not Available', redirectUrl: '/api/v1/auth/login' })
        }

        // TODO add route for resend the verification url
        if (!user.isEmailConfirm) {
            return res
                .status(400)
                .json({ error: 'User have not verified his email', redirectUrl: 'api/v1/user/confirmemail/:userId' })
        }

        next()
    }

    /**
     * Delete user after 30 days
     */
    static checkIsDeletedPeriodAvailable = async (req: Request, res: Response, next: NextFunction) => {
        let id: string | undefined
        if (req.params.userId) {
            id = req.params.userId
        } else if (req.body.userId) {
            id = req.body.userId
        }

        try {
            const user = (await prisma.user.findUnique({
                where: {
                    id: id,
                    isDeleted: true
                }
            })) as unknown as { deletedAt: Date }

            if (!user) return res.status(404).json({ error: 'User not found' })

            const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000
            const currentDate = new Date()
            const deletedDate = new Date(user.deletedAt)
            const difference = currentDate.getTime() - deletedDate.getTime()
            if (difference > THIRTY_DAYS) {
                const userDao = new UserDao()
                const deletedUser = await userDao.hardDeleteUser(id)

                console.error('User deleted', deletedUser)
                return res
                    .status(200)
                    .json({ message: 'User deleted successfuly', data: deletedUser, status: 'success' })
            } else {
                return res
                    .status(200)
                    .json({ message: 'User is available for recovery', redirectUrl: '/api/v1/auth/login' })
            }
        } catch (error: any) {
            console.error(error)
            return res.status(500).json({ error: error.message })
        }
    }
}
