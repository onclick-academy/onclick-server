import express, { RequestHandler } from 'express'

import { InstructorController } from '../controllers/instructor.controller'

const router = express.Router()

router
    .route('/:instructorId')
    .get(InstructorController.getInstructorById)

router
    .route('/')
    .post(InstructorController.ApplyInstructor)
    .get(InstructorController.gerAllInstructors as unknown as RequestHandler)

router.route('/').get(InstructorController.getAllVerifiedInstructors as unknown as RequestHandler)
router.route('/apply').get(InstructorController.ApplyInstructor)

export default router
