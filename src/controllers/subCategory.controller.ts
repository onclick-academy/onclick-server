import { SubCategoryDao } from "../models/dao/subCategory.dao";
import { SubCategoryDto } from "../models/dto/subCategory.dto";

import { SubCategoryValidation } from "../middlewares/validation/course/subCategory.validations";

import { Request, Response } from 'express'

export class SubCategoryController {

    static createSubCategory = async (req: Request, res: Response) => {
        const subCategoryDao = new SubCategoryDao()
        const subCategoryDto = new SubCategoryDto(req.body)
        subCategoryDto.categoryId = req.params.categoryId

        try {
            const { error } = await SubCategoryValidation.createSubCategory(subCategoryDto)
            if (error) throw new Error(error.details[0].message)
            const newSubCategory = await subCategoryDao.createSubCategory(subCategoryDto)

            return res.status(201).json({ message: 'SubCategory created successfuly', data: newSubCategory, status: 'success' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }

}