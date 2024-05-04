import express, { RequestHandler } from 'express'
import { CourseEnrollmentController } from '@controllers/courseEnrollment.controller'

const router = express.Router()

router.route('/').post(CourseEnrollmentController.createEnrollment as unknown as RequestHandler)

router.route('/:courseId').get(CourseEnrollmentController.isUserEnrolled as unknown as RequestHandler)

export default router
