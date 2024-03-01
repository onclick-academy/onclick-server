import express, { RequestHandler } from 'express'
import { upload } from '@middlewares/upload'
import { AuthController } from '@controllers/auth.controller'
import { PasswordController } from '@controllers/password.controller'

const router = express.Router()

router.route('/register').post(upload.single('profilePic'), AuthController.register)

router.route('/login').post(AuthController.login as unknown as RequestHandler)

router.route('/password/forgetpassword').post(PasswordController.forgetPassword)
router.route('/password/verifycode').post(PasswordController.verifyResetCode)
router.route('/password/changepassword/:userId').post(PasswordController.changePassword)
router.route('/password/resetpassword').post(PasswordController.resetPassword)

router.route('/email/user/:uuid').get(AuthController.emailUserConfirmation)

export default router
