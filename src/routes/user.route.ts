import { AuthMiddleware } from '@middlewares/auth.middleware'
import express, { RequestHandler } from 'express'
import { UserController } from '../controllers/user.controller'
import { verifyAdminRole } from '@middlewares/admin.middleware'

const router = express.Router()

router.route('/userinfo').get(UserController.getUserInfo)

router.route('/search').get(UserController.searchUser)

router
    .route('/:userId')
    .get(UserController.getUserById)
    .put(AuthMiddleware.studentAuthorization, UserController.updateUser)

router
    .route('/delete/:userId')
    .put(AuthMiddleware.studentAuthorization, UserController.softDeleteUser)
    .delete(verifyAdminRole, UserController.hardDeleteUser)

router.route('/deactivate/:userId').put(AuthMiddleware.studentAuthorization, UserController.deactivateUser)

export default router
