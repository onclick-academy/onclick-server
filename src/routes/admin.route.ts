import express, { RequestHandler } from 'express'
import { UserController } from '../controllers/user.controller'
import { AuthMiddleware } from '../middlewares/auth.middleware'

const router = express.Router()

router
  .route('/users')
  .get(AuthMiddleware.verifyToken as unknown as RequestHandler, UserController.getAllUsers as unknown as RequestHandler)

export default router
