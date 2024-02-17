import joi from 'joi'

export class suspendStateValidation {
    private static baseSchema = {
        id: joi.string().allow(null),
        adminId: joi.string().required(),
        userId: joi.string().required(),
        reason: joi.string().min(20),
        period: joi.date().required(),
        isValid: joi.boolean().default(false)
    }

    static createSuspendState(susspendStateDto: SuspendStateDtoI) {
        return joi.object(this.baseSchema).validateAsync(susspendStateDto)
    }

    static updateSuspendState(susspendStateDto: SuspendStateUpdateI) {
        return joi
            .object({ ...this.baseSchema, userId: joi.string().required(), adminId: joi.string().required() })
            .fork(['reason', 'period', 'isValid'], schema => schema.optional())
            .validateAsync(susspendStateDto)
    }
}
