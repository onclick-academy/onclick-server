import express, { RequestHandler } from 'express'
import { UserController } from '../controllers/user.controller'
import { AdminController } from '../controllers/admin.controller'
import { InstructorController } from '../controllers/instructor.controller'
import { CourseController } from '@controllers/course.controller'

const router = express.Router()

// user routes
router.route('/users').get(UserController.getAllUsers) // TODO Is that necessary??

// admin routes
router
    .route('/')
    .post(AdminController.createAdmin as unknown as RequestHandler)
    .get(AdminController.getAllAdmins as unknown as RequestHandler)
    .delete(AdminController.deleteAdmin as unknown as RequestHandler)
// ========================================
// instructor routes
router.route('/instructor/approve').post(InstructorController.approveAndCreateInstructor as unknown as RequestHandler)

router.route('/instructor/decline').post(InstructorController.declineInstructor as unknown as RequestHandler)

router.route('/instructor/pending').get(InstructorController.getPendingInstructors as unknown as RequestHandler)

// ========================================
// course routes

router.route('/course/approve/:courseId').put(CourseController.approvecourse as unknown as RequestHandler)

export default router
