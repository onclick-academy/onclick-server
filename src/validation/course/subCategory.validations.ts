import joi from 'joi'

export class subCategoryValidation {
  private static baseSchema = {
    categoryId: joi.string().required(),
    name: joi.string().required().min(6).max(255),
    description: joi.string().required().min(6),
    isDeleted: joi.boolean().default(false)
  }

  static createSubCategory() {
    return joi.object(this.baseSchema)
  }

  static updateSubCategory() {
    return joi
      .object({ ...this.baseSchema, categoryId: joi.string().required() })
      .fork(['name', 'description', 'isDeleted'], schema => schema.optional())
  }
}
