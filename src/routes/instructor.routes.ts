import express, { RequestHandler } from 'express'

import { InstructorController } from '../controllers/instructor.controller'

const router = express.Router()

router.route('/:instructorId').get(InstructorController.getInstructorById)

router
    .route('/')
    .post(InstructorController.ApplyInstructor)
    .get(InstructorController.getAllVerifiedInstructors as unknown as RequestHandler)

export default router
