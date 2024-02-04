import express, { RequestHandler } from 'express'
import { upload } from '../middlewares/upload'
import { AuthController } from '../controllers/auth.controller'
import { PasswordController } from '../controllers/password.controller'
import { AuthMiddleware } from '../middlewares/auth.middleware'

const router = express.Router()

router.route('/register').post(upload.single('profilePic'), AuthController.register)

router.route('/login').post(AuthController.login as unknown as RequestHandler)

// passwords

router.route('/password/forgetpassword').post(PasswordController.forgetPassword)

router.route('/password/resetpassword/:userId/:token').post(PasswordController.resetPassword)

router.route('/password/changepassword/:userId').post(PasswordController.changePassword)

// email confirmation

router.route('/email/confirmation/:userId/:token').post(AuthController.emailConfirmation)

export default router
