import { CategoryDao } from "../models/dao/category.dao";
import { CategoryDto } from "../models/dto/category.dto";
import { categoryValidation } from "../middlewares/validation/course/category.validation"

import { Request, Response } from 'express'

export class CategoryController {

    static createCategory = async (req: Request, res: Response) => {
        const categoryDao = new CategoryDao()
        const categoryDto = new CategoryDto(req.body)

        try {
            const { error } = await categoryValidation.createCategory(categoryDto)
            if (error) throw new Error(error.details[0].message)
            const newCategory = await categoryDao.createCategory(categoryDto)

            return res.status(201).json({ message: 'Category created successfuly', data: newCategory, status: 'success' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }

}