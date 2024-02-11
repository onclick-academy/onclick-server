import joi from 'joi'
import { SubCategoryDtoI } from "../../../types/subCategory.interfaces"

export class SubCategoryValidation {
  private static baseSchema = {
    id: joi.string().allow(null),
    categoryId: joi.string().required(),
    name: joi.string().required().min(6).max(255),
    description: joi.string().required().min(6),
    isDeleted: joi.boolean().default(false),
    deletedAt: joi.date().allow(null).default(null)
  }

  static createSubCategory(subCategoryDto: SubCategoryDtoI) {
    return joi.object(this.baseSchema).validateAsync(subCategoryDto)
  }

  static updateSubCategory(subCategoryDto: SubCategoryDtoI) {
    return joi
      .object({ ...this.baseSchema, categoryId: joi.string().required() })
      .fork(['name', 'description', 'isDeleted'], schema => schema.optional()).validateAsync(subCategoryDto)
  }
}
