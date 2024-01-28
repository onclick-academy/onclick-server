import joi from 'joi'

export class suspendStateValidation {
  static createSuspendState() {
    const schema = joi.object({
      adminId: joi.string().required(),
      userId: joi.string().required(),
      reason: joi.string().min(20),
      period: joi.date().required(),
      isValid: joi.boolean().default(false)
    })
    return schema
  }

  static updateSuspendState() {
    const schema = joi.object({
      adminId: joi.string().required(),
      userId: joi.string().required(),
      reason: joi.string().min(20),
      period: joi.date(),
      isValid: joi.boolean()
    })
    return schema
  }
}
