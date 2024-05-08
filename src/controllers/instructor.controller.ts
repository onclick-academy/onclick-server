import { Request, Response } from 'express'
import { UserDao } from '../models/dao/user.dao'
import { UserIdValidation } from '@utilities/IdValidation/users.id'

export class InstructorController {
    static ApplyInstructor = async (req: any, res: Response) => {
        try {
            const userId = req.user.id
            await UserIdValidation(userId)

            const userDao = new UserDao()
            const instructor = await userDao.applyInstructor(userId)

            res.status(201).json({
                message: 'applied to be an Instructor successfuly.',
                data: instructor,
                state: 'success'
            })
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }

    static approveInstructor = async (req: Request, res: Response) => {
        const userDao = new UserDao()

        const { userId } = req.body // TODO - discuss with team

        try {
            await UserIdValidation(userId)
            const instructor = await userDao.approveInstructor(userId)

            res.status(201).json({
                message: 'Instructor created successfully',
                data: instructor,
                state: 'success'
            })
        } catch (error: any) {
            console.log(error)
            res.status(500).json({ error: error.message, status: 'failed' })
        }
    }

    static declineInstructor = async (req: Request, res: Response) => {
        const userDao = new UserDao()

        const { userId } = req.body // TODO - discuss with team

        try {
            await UserIdValidation(userId)
            const instructor = await userDao.declineInstructor(userId)

            res.status(201).json({ message: 'Instructor declined successfully', data: instructor, state: 'success' })
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }

    static getInstructorById = async (req: Request, res: Response) => {
        const userDao = new UserDao()

        const { instructorId } = req.params

        try {
            await UserIdValidation(instructorId)
            const instructor = await userDao.getUserById(instructorId)

            res.status(200).json({
                message: 'Instructor retreived successufuly',
                data: instructor,
                state: 'success'
            })
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }

    static getPendingInstructors = async (req: Request, res: Response) => {
        const userDao = new UserDao()

        try {
            const instructors = await userDao.getPendingInstructors()

            res.status(200).json({
                message: 'Pending Instructors retreived successufuly',
                data: instructors,
                state: 'success'
            })
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }

    static getAllVerifiedInstructors = async (req: Request, res: Response) => {
        const userDao = new UserDao()

        try {
            const instructors = await userDao.getAllInstructors()

            res.status(200).json({
                message: 'All Instructors retreived successufuly',
                data: instructors,
                state: 'success'
            })
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }
}
