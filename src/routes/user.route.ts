import express, { RequestHandler } from 'express'
import { UserController } from '../controllers/user.controller'

const router = express.Router()

router.route('/search').get(UserController.searchUser)

router.route('/:userId').get(UserController.getUserById).put(UserController.updateUser)

router.route('/delete/:userId').put(UserController.softDeleteUser).delete(UserController.hardDeleteUser)

router.route('/deactivate/:userId').put(UserController.deactivateUser)

export default router
