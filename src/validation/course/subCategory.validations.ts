import joi from 'joi'

// validation of the subCategory

export class subCategoryValidation {
  static createSubCategory() {
        //  createsubCategory()
    const schema = joi.object({
      categoryId: joi.string().required(),
      name: joi.string().required().min(6).max(255),
      description: joi.string().required().min(6).max(255),
      isDeleted: joi.boolean().default(false)
    })
    return schema
  }

  static updateSubCategory() {
        //updatesubCategory()
    const schema = joi.object({
      categoryId: joi.string(),
      name: joi.string().min(6).max(255),
      description: joi.string().min(6).max(255),
      isDeleted: joi.boolean()
    })
    return schema
  }
}
