import { CourseEnrollmentDao } from '@models/dao/courseEnrollment.dao'
import { CourseEnrollmentDto } from '@models/dto/courseEnrollment.dto'
import { UserRequest } from '../types/user.interface'
import { CourseIdValidation } from '@utilities/IdValidation/coursePackage.id'
import { UserIdValidation } from '@utilities/IdValidation/users.id'
import { Request, Response } from 'express'

export class CourseEnrollmentController {
    static createEnrollment = async (req: UserRequest, res: Response) => {
        const courseEnrollmentDao = new CourseEnrollmentDao()
        const courseEnrollmentDto = new CourseEnrollmentDto(req.body)
        courseEnrollmentDto.userId = req.user.id
        try {
            await CourseIdValidation(courseEnrollmentDto.courseId)
            await UserIdValidation(courseEnrollmentDto.userId)

            const enrollment = await courseEnrollmentDao.createEnrollment(courseEnrollmentDto)
            res.status(200).json({ message: 'Enrollment created', data: enrollment, status: 'success' })
        } catch (error) {
            console.log(error)

            res.status(500).json({ error: error.message })
        }
    }

    static isUserEnrolled = async (req: UserRequest, res: Response) => {
        const courseEnrollmentDao = new CourseEnrollmentDao()
        const courseEnrollmentDto = new CourseEnrollmentDto(req.body)
        courseEnrollmentDto.userId = req.user.id
        courseEnrollmentDto.courseId = req.params.courseId
        try {
            await CourseIdValidation(courseEnrollmentDto.courseId)
            await UserIdValidation(courseEnrollmentDto.userId)

            const enrollment = await courseEnrollmentDao.isUserEnrolled(courseEnrollmentDto)

            if (!enrollment) {
                return res.status(200).json({ message: 'User not enrolled', data: enrollment, status: 'success' })
            }
            res.status(200).json({ message: 'User Enrolled', data: enrollment, status: 'success' })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message })
        }
    }

    static getEnrollmentsByCourseId = async (req: Request, res: Response) => {
        const courseEnrollmentDao = new CourseEnrollmentDao()
        try {
            await CourseIdValidation(req.params.courseId)

            const enrollments = await courseEnrollmentDao.getEnrollmentsByCourseId(req.params.courseId)
            res.status(200).json({ message: 'Enrollments fetched', data: enrollments, status: 'success' })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message })
        }
    }

    static getEnrollmentsByUserId = async (req: UserRequest, res: Response) => {
        const courseEnrollmentDao = new CourseEnrollmentDao()
        try {
            await UserIdValidation(req.user.id)

            const enrollments = await courseEnrollmentDao.getEnrollmentsByUserId(req.user.id)
            res.status(200).json({ message: 'Enrollments fetched', data: enrollments, status: 'success' })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message })
        }
    }
}
