import express from 'express'
import { upload } from '../middlewares/upload'
import { AuthController } from '../controllers/auth.controller'

const router = express.Router()

router.route('/register').post(upload.single('profilePic'), AuthController.register)

router.route('/login').post(AuthController.login)

// passwords

router.route('/password/forgetpassword').post(AuthController.forgetPassword)

router.route('/password/resetpassword/:userId/:token').post(AuthController.resetPassword)

export default router
