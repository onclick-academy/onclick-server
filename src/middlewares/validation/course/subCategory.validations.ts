import joi from 'joi'
import { SubCategoryDtoI } from "../../../types/subCategory.interfaces"

export class SubCategoryValidation {
  private static baseSchema = {
    id: joi.string().allow(null),
    categoryId: joi.string().required(),
    name: joi.string().required().min(6).max(255),
    description: joi.string().required().min(6),
    topicIds: joi.array().items(joi.string()).default([]),
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

  static linkTopicsToSubCategory(subCategoryDto: { id: string, topicIds: string[] }) {
    return joi.object({
      id: joi.string().required(),
      topicIds: joi.array().items(joi.string()).required()
    }).validateAsync(subCategoryDto)
  }
}
