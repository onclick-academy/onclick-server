import joi from 'joi'

export class subCategoryValidation {
  static createSubCategory() {
    const schema = joi.object({
      categoryId: joi.string().required(),
      name: joi.string().required().min(6).max(255),
      description: joi.string().required().min(6),
      isDeleted: joi.boolean().default(false)
    })
    return schema
  }

  static updateSubCategory() {
    const schema = joi.object({
      categoryId: joi.string(),
      name: joi.string().min(6).max(255),
      description: joi.string().min(6),
      isDeleted: joi.boolean()
    })
    return schema
  }
}
