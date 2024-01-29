import express from 'express'
import { upload } from '../middlewares/upload'
import { UserController } from '../controllers/user.controller'

const router = express.Router()

router.route('/register').post(upload.single('profilePic'), UserController.register)

export default router
