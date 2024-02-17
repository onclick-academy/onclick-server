import joi from 'joi'

export class EventsValidation {
    private static baseSchema = {
        id: joi.string().optional(),
        adminId: joi.string().required(),
        title: joi.string().required(),
        subtitle: joi.string().required(),
        description: joi.string().required(),
        images: joi.array().items(joi.string()),
        startDate: joi.date().required(),
        endDate: joi.date().required(),
        isDeleted: joi.boolean().default(false),
        isAvailable: joi.boolean().default(true),
        cover: joi.string().required()
    }

    static createEvents(eventDto: EventDtoI) {
        return joi.object(this.baseSchema).validateAsync(eventDto)
    }

    static updateEvents(eventDto: EventUpdateI) {
        return joi
            .object({
                ...this.baseSchema,
                adminId: joi.string().required()
            })
            .fork(['title', 'description', 'subtitle', 'startDate', 'endDate', 'cover'], schema => schema.optional())
            .validateAsync(eventDto)
    }
}
