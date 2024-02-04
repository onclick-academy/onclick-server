import express from 'express'
import { AuthMiddleware } from '../middlewares/auth.middleware'

const router = express.Router()

router.get(
  '/',
  AuthMiddleware.verifyToken as unknown as express.RequestHandler,
  AuthMiddleware.checkUserIsDeleted as unknown as express.RequestHandler,
  async (req, res, next) => {
    res.send({ message: 'Awesome it works 🐻' })
  }
)

export default router
