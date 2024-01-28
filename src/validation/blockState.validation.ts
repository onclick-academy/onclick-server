import joi from 'joi'

export class blockStateValidation {
  static createBlockState() {
    const schema = joi.object({
      userId: joi.string().required(),
      adminId: joi.string().required(),
      reason: joi.string().min(20),
      period: joi.date().required(),
      state: joi.boolean().default(false)
    })
    return schema
  }

  static updateBlockState() {
    const schema = joi.object({
      userId: joi.string().required(),
      adminId: joi.string().required(),
      reason: joi.string().min(20),
      period: joi.date(),
      state: joi.boolean()
    })
    return schema
  }
}
