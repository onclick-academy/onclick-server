/**
 * !UPDATE:
 * !WE will not store vidoe url in database but we can generate it on the fly
 * !and use signed url to access the video !!this is so important!!

 *? Here is what we r make sure of:
 * First when POST || DELETE || PUT:
 * 1. The course exists
 * 2. The user is instructor
 * 2. The course belongs to the instructor
 * 4. The course is not deleted and is approved
 * 5. Have sort of HEADERS validation

 * Second when GET:
 * all of above except the second point
 * also:
 * 1. The user is enrolled in the course
 * 
 */

import { CourseDao } from '@models/dao/course.dao'
import { UserRequest } from 'types/user.interface'
import { Request, Response, NextFunction } from 'express'

export class CourseMiddleware {
    /**
     * Validate all headers (authentication, cloudflare workers)
     */
    static validateHeaders = async (req: Request, res: Response, next: NextFunction) => {
        const accessToken = req.headers['authorization'] || req.cookies['accessToken']
        const cloudflareKey = req.headers['X-Custom-Auth-Key']

        if (!accessToken || !cloudflareKey) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
    }

    /**
     * Validate if the course exists, the user is instructor and is the owner
     * We used this middleware to validate the course before applying any changes to it
     */
    static async validateCourse(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const { courseId } = req.params
            const { id: userId } = req.user

            const course = await CourseDao.getCourseById(courseId)
            if (!course) {
                return res.status(404).json({ message: 'Course not found' })
            }
            const isCourseOwner = course.CourseOwners.some(owner => owner.userId === userId)
            if (!isCourseOwner) {
                return res.status(403).json({ message: 'User is not one of owners' })
            }

            next()
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    /**
     * Validate if the user is enrolled in the course
     * we used this in getting the course details
     */
    static validateEnrollment = async (req: UserRequest, res: Response, next: NextFunction) => {
        try {
            const { courseId } = req.params
            const { id: userId } = req.user
            const course = await CourseDao.getCourseById(courseId)
            if (!course) {
                return res.status(404).json({ message: 'Course not found' })
            }
            const isEnrolled = course.enrollments.some(enrollment => enrollment.userId === userId)
            if (!isEnrolled) {
                return res.status(403).json({ message: 'User is not enrolled in the course' })
            }

            next()
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}
