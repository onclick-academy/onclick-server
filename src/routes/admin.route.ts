import express, { RequestHandler } from 'express'
import { UserController } from '../controllers/user.controller'
import { AuthMiddleware } from '../middlewares/auth.middleware'
import { AdminController } from '../controllers/admin.controller'
import { InstructorController } from '../controllers/instructor.controller'
import { verifyAdminRole } from '@middlewares/admin.middleware'

const router = express.Router()

// user routes
router.route('/users').get(UserController.getAllUsers as unknown as RequestHandler) // TODO Is that necessary??

// admin routes
router
    .route('/')
    .post(AdminController.createAdmin as unknown as RequestHandler)
    .get(AdminController.getAllAdmins as unknown as RequestHandler)

router
    .route('/:adminId')
    .get(AdminController.getAdminById as unknown as RequestHandler)
    .put(AdminController.updateAdmin as unknown as RequestHandler)

router
    .route('/delete/:adminId')
    .put(AdminController.softDeleteAdmin as unknown as RequestHandler)
    .delete(AdminController.hardDeleteAdmin as unknown as RequestHandler)

// ========================================
// instructor routes
router.route('/instructor/approve').post(InstructorController.approveAndCreateInstructor as unknown as RequestHandler)

router.route('/instructor/decline').post(InstructorController.declineInstructor as unknown as RequestHandler)

router.route('/instructor/pending').get(InstructorController.getPendingInstructors as unknown as RequestHandler)

export default router
