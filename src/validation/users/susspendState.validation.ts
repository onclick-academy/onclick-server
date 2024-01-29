import joi from 'joi'

export class suspendStateValidation {
  private static baseSchema = {
    adminId: joi.string().required(),
    userId: joi.string().required(),
    reason: joi.string().min(20),
    period: joi.date().required(),
    isValid: joi.boolean().default(false)
  }

  static createSuspendState() {
    return joi.object(this.baseSchema)
  }

  static updateSuspendState() {
    return joi
      .object({ ...this.baseSchema, userId: joi.string().required(), adminId: joi.string().required() })
      .fork(['reason', 'period', 'isValid'], schema => schema.optional())
  }
}
