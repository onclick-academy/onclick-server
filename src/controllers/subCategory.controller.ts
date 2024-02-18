import { SubCategoryDao } from '../models/dao/subCategory.dao'
import { SubCategoryDto } from '../models/dto/subcategory.dto'

import { SubCategoryValidation } from '../middlewares/validation/course/subCategory.validations'

import { Request, Response } from 'express'
import { CategoryIdValidation, SubCategoryIdValidation, TopicIdValidation } from '@utilities/IdValidation/coursePackage.id'

export class SubCategoryController {
  static createSubCategory = async (req: Request, res: Response) => {
    const subCategoryDao = new SubCategoryDao()
    const subCategoryDto = new SubCategoryDto(req.body)
    subCategoryDto.categoryId = req.params.categoryId

    try {

      await CategoryIdValidation(subCategoryDto.categoryId)

      const { error } = await SubCategoryValidation.createSubCategory(subCategoryDto)
      if (error) throw new Error(error.details[0].message)
      const newSubCategory = await subCategoryDao.createSubCategory(subCategoryDto)

      return res
        .status(201)
        .json({ message: 'SubCategory created successfuly', data: newSubCategory, status: 'success' })
    } catch (error: any) {
      console.log(error);
      return res.status(400).json({ error: error.message, status: 'failed' })
    }
  }

  static getAllSubCategories = async (req: Request, res: Response) => {
    const subCategoryDao = new SubCategoryDao()

    try {
      const subCategories = await subCategoryDao.getAllSubCategories()

      return res
        .status(200)
        .json({ message: 'All SubCategories retreived successfully', data: subCategories, status: 'success' })
    } catch (error: any) {
      console.log(error);
      return res.status(400).json({ error: error.message, status: 'failed' })
    }
  }

  static getSubCategoryById = async (req: Request, res: Response) => {
    const subCategoryDao = new SubCategoryDao()
    const subCategoryId = req.params.subCategoryId

    console.log('subCategoryId Controller', subCategoryId)

    try {
      const subCategory = await subCategoryDao.getSubCategoryById(subCategoryId)

      return res
        .status(200)
        .json({ message: 'SubCategory retreived successfully', data: subCategory, status: 'success' })
    } catch (error: any) {
      return res.status(400).json({ error: error.message, status: 'failed' })
    }
  }

  static linkTopicsToSubCategory = async (req: Request, res: Response) => {
    const subCategoryDao = new SubCategoryDao()
    const {id, topicIds} = req.body


    try {

      topicIds.forEach(async (topicId: string) => {
        await TopicIdValidation(topicId)
      })

      await SubCategoryIdValidation(id)

      const { error } = await SubCategoryValidation.linkTopicsToSubCategory({id, topicIds})
      if (error) throw new Error(error.details[0].message)
      const newSubCategoryTopics = await subCategoryDao.linkTopicsToSubCategory({id, topicIds})

      return res
        .status(201)
        .json({ message: 'Topics linked to SubCategory successfully', data: newSubCategoryTopics, status: 'success' })
    } catch (error: any) {
      return res.status(400).json({ error: error.message, status: 'failed' })
    }
  }

  static getSubCategoriesByCategoryId = async (req: Request, res: Response) => {
    const subCategoryDao = new SubCategoryDao()
    const categoryId = req.params.categoryId // TODO discuss with team

    // console.log('categoryId Controller', categoryId)
    try {

      await CategoryIdValidation(categoryId)

      const subCategories = await subCategoryDao.getSubCategoryByCategoryId(categoryId)

      return res
        .status(200)
        .json({ message: 'Sub Categories retreived successfully', data: subCategories, status: 'success' })
    } catch (error: any) {
      return res.status(400).json({ error: error.message, status: 'failed' })
    }
  }

  static updateSubCategory = async (req: Request, res: Response) => {
    const subCategoryDao = new SubCategoryDao()
    const subCategoryDto = new SubCategoryDto(req.body)
    subCategoryDto.id = req.params.subCategoryId

    try {

      await SubCategoryIdValidation(subCategoryDto.id)
      // await CategoryIdValidation(subCategoryDto.categoryId)

      const { error } = await SubCategoryValidation.updateSubCategory(subCategoryDto)
      if (error) throw new Error(error.details[0].message)
      const updatedSubCategory = await subCategoryDao.updateSubCategory(subCategoryDto)

      return res
        .status(200)
        .json({ message: 'SubCategory updated successfully', data: updatedSubCategory, status: 'success' })
    } catch (error: any) {
      return res.status(400).json({ error: error.message, status: 'failed' })
    }
  }

  static deleteSubCategory = async (req: Request, res: Response) => {
    const subCategoryDao = new SubCategoryDao()
    const subCategoryId = req.params.subCategoryId

    try {

      await SubCategoryIdValidation(subCategoryId)

      const deletedSubCategory = await subCategoryDao.deleteSubCategory(subCategoryId)

      return res
        .status(200)
        .json({ message: 'SubCategory deleted successfully', data: deletedSubCategory, status: 'success' })
    } catch (error: any) {
      return res.status(400).json({ error: error.message, status: 'failed' })
    }
  }
}
