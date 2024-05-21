import joi from 'joi'

export class blockStateValidation {
    private static baseSchema = {
        userId: joi.string().required(),
        adminId: joi.string().required(),
        reason: joi.string().min(20),
        period: joi.date().required(),
        state: joi.boolean().default(false)
    }

    static createBlockState() {
        return joi.object(this.baseSchema)
    }

    static updateBlockState() {
        return joi
            .object({ ...this.baseSchema, userId: joi.string().required(), adminId: joi.string().required() })
            .fork(['reason', 'period', 'state'], schema => schema.optional())
    }
}
