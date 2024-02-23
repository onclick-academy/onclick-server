import { verifyAdminRole } from '@middlewares/admin.middleware'
import express, { RequestHandler } from 'express'

import { InstructorController } from '../controllers/instructor.controller'
import { AuthMiddleware } from '@middlewares/auth.middleware'

const router = express.Router()

router
    .route('/')
    .post(InstructorController.ApplyInstructor)
    .get(InstructorController.getAllVerifiedInstructors as unknown as RequestHandler)

// to admin route
router
    .route('/:instructorId')
    .get(InstructorController.getInstructorUserById)
    .put(InstructorController.updateInstructor)

router
    .route('/delete/:instructorId')
    .put(InstructorController.softDeleteInstructor)
    .delete(verifyAdminRole, InstructorController.hardDeleteInstructor)

export default router
