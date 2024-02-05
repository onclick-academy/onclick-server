import express from 'express'

import { SubCategoryController } from '../controllers/subCategory.controller'

const router = express.Router()


router.route('/:categoryId').post( SubCategoryController.createSubCategory)

export default router
