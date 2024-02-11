import { CategoryDao } from '../models/dao/category.dao'
import { CategoryDto } from '../models/dto/category.dto'
import { categoryValidation } from '../middlewares/validation/course/category.validation'

import { Request, Response } from 'express'

export class CategoryController {
    static createCategory = async (req: Request, res: Response) => {
        const categoryDao = new CategoryDao()
        const categoryDto = new CategoryDto(req.body)

        try {
            const { error } = await categoryValidation.createCategory(categoryDto)
            if (error) throw new Error(error.details[0].message)
            const newCategory = await categoryDao.createCategory(categoryDto)

            return res
                .status(201)
                .json({ message: 'Category created successfuly', data: newCategory, status: 'success' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }

    static getAllCategories = async (req: any, res: Response) => {
        const categoryDao = new CategoryDao()

        try {
            const categories = await categoryDao.getAllCategories()

            return res
                .status(200)
                .json({ message: 'All Categories retreived successfully', data: categories, status: 'success' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }

    static getCategoryById = async (req: Request, res: Response) => {
        const categoryDao = new CategoryDao()
        const categoryId = req.params.categoryId

        try {
            const category = await categoryDao.getCategoryById(categoryId)

            return res
                .status(200)
                .json({ message: 'Category retreived successfully', data: category, status: 'success' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }

    // static getSubCategoriesByCategoryId = async (req: Request, res: Response) => {
    //     const categoryDao = new CategoryDao()
    //     const categoryId = req.params.categoryId

    //     try {
    //         const subCategories = await categoryDao.getSubCategoriesByCategoryId(categoryId)

    //         return res.status(200).json({ message: 'Sub Categories retreived successfully', data: subCategories, status: 'success' })
    //     } catch (error: any) {
    //         return res.status(400).json({ error: error.message, status: 'failed' })
    //     }
    // }

    static updateCategory = async (req: Request, res: Response) => {
        const categoryDao = new CategoryDao()
        const categoryDto = new CategoryDto(req.body)
        categoryDto.id = req.params.categoryId

        try {
            const { error } = await categoryValidation.updateCategory(categoryDto)
            if (error) throw new Error(error.details[0].message)
            const updatedCategory = await categoryDao.updateCategory(categoryDto)

            return res
                .status(201)
                .json({ message: 'Category updated successfully', data: updatedCategory, status: 'success' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }

    static deleteCategory = async (req: Request, res: Response) => {
        const categoryDao = new CategoryDao()
        const categoryId = req.params.categoryId

        try {
            const deletedCategory = await categoryDao.deleteCategory(categoryId)

            return res
                .status(201)
                .json({ message: 'Category deleted successfully', data: deletedCategory, status: 'success' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }
}
