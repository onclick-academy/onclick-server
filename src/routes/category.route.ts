import { AuthMiddleware } from '@middlewares/auth.middleware'
import express, { RequestHandler } from 'express'
import { CategoryController } from '../controllers/category.controller'

const router = express.Router()

router.route('/').post(CategoryController.createCategory).get(CategoryController.getAllCategories)

router
    .route('/:categoryId')
    .get(CategoryController.getCategoryById)
    .put(CategoryController.updateCategory)
    .delete(CategoryController.deleteCategory)

export default router
