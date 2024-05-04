import { RatingDao } from '@models/dao/rating.dao'
import { RatingDto } from '@models/dto/rating.dto'
import { UserRequest } from '../types/user.interface'
import { Response } from 'express'
import { RateValidation } from '@middlewares/validation/rate.validation'
import { CourseIdValidation } from '@utilities/IdValidation/coursePackage.id'
import { InstructorIdValidation } from '@utilities/IdValidation/users.id'

export class RatingController {
    static async createRating(req: UserRequest, res: Response) {
        const ratingDto = new RatingDto(req.body)
        const ratingDao = new RatingDao()

        ratingDto.userId = req.user.id

        if (ratingDto.targetType === 'COURSE') ratingDto.courseId = ratingDto.targetId
        else ratingDto.instructorId = ratingDto.targetId

        try {
            if (ratingDto.targetType === 'COURSE') await CourseIdValidation(ratingDto.courseId)
            else await InstructorIdValidation(ratingDto.instructorId)

            const { error } = await RateValidation.createRate(ratingDto)
            if (error) return res.status(400).json({ message: error.message })

            const rating = await ratingDao.createRating(ratingDto)

            return res.status(201).json({ message: 'Rating created successfully', data: rating, status: 'success' })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message, status: 'fail' })
        }
    }

    static async updateRating(req: UserRequest, res: Response) {
        const ratingDto = new RatingDto(req.body)
        const ratingDao = new RatingDao()
        ratingDto.userId = req.user.id

        if (ratingDto.targetType === 'COURSE') {
            ratingDto.courseId = ratingDto.targetId
        } else {
            ratingDto.instructorId = ratingDto.targetId
        }

        try {
            if (ratingDto.targetType === 'COURSE') await CourseIdValidation(ratingDto.courseId)
            else await InstructorIdValidation(ratingDto.instructorId)

            const { error } = await RateValidation.updateRate(ratingDto)
            if (error) return res.status(400).json({ message: error.message })

            const rating = await ratingDao.updateRating(ratingDto)

            return res.status(200).json({ message: 'Rating updated successfully', data: rating, status: 'success' })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message, status: 'fail' })
        }
    }

    static async deleteRating(req: UserRequest, res: Response) {
        const ratingId = req.body.id
        const ratingDao = new RatingDao()

        try {
            await ratingDao.getRatingById(ratingId)

            const deletedRate = await ratingDao.deleteRating(ratingId)

            return res
                .status(200)
                .json({ message: 'Rating deleted successfully', data: deletedRate, status: 'success' })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message, status: 'fail' })
        }
    }

    static async getRatingById(req: UserRequest, res: Response) {
        const ratingId = req.params.ratingId
        const ratingDao = new RatingDao()

        try {
            const rating = await ratingDao.getRatingById(ratingId)

            return res.status(200).json({ message: 'Rating retrieved successfully', data: rating, status: 'success' })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message, status: 'fail' })
        }
    }

    static async getUserRating(req: UserRequest, res: Response) {
        const userId = req.user.id
        const ratingDao = new RatingDao()

        try {
            const userRating = await ratingDao.getUserRating(userId)

            return res
                .status(200)
                .json({ message: 'Rating retrieved successfully', data: userRating, status: 'success' })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message, status: 'fail' })
        }
    }

    static async getCourseRating(req: UserRequest, res: Response) {
        const courseId = req.params.courseId
        const ratingDao = new RatingDao()

        try {
            await CourseIdValidation(courseId)
            const courseRating = await ratingDao.getCourseRating(courseId)

            const avrgRating = courseRating.reduce((acc, curr) => acc + curr.rate, 0) / courseRating.length

            return res
                .status(200)
                .json({ message: 'Rating retrieved successfully', data: courseRating, avrgRating, status: 'success' })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message, status: 'fail' })
        }
    }

    static async getInstructorRating(req: UserRequest, res: Response) {
        const instructorId = req.params.instructorId
        const ratingDao = new RatingDao()

        try {
            await InstructorIdValidation(instructorId)

            const instructorRating = await ratingDao.getInstructorRating(instructorId)

            const avrgRating = instructorRating.reduce((acc, curr) => acc + curr.rate, 0) / instructorRating.length

            return res
                .status(200)
                .json({
                    message: 'Rating retrieved successfully',
                    data: instructorRating,
                    avrgRating,
                    status: 'success'
                })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message, status: 'fail' })
        }
    }
}
