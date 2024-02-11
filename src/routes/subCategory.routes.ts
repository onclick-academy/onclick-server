import express from 'express'

import { SubCategoryController } from '@controllers/subCategory.controller'

const router = express.Router()

router
  .route('/:categoryId')
  .post(SubCategoryController.createSubCategory)
  .get(SubCategoryController.getAllSubCategories)

router.route('/category/:categoryId').get(SubCategoryController.getSubCategoriesByCategoryId)

router
  .route('/:subCategoryId')
  .get(SubCategoryController.getSubCategoryById)
  .put(SubCategoryController.updateSubCategory)
  .delete(SubCategoryController.deleteSubCategory)

// get courses by subCategory id

export default router