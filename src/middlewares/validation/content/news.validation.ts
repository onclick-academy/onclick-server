import joi from 'joi'

export class newsValidation {
    private static baseSchema = {
        id: joi.string().optional(),
        adminId: joi.string().required(),
        title: joi.string().required().min(6).max(255),
        subtitle: joi.string().required().min(6).max(255),
        description: joi.string().required().min(6),
        images: joi.array().items(joi.string()),
        cover: joi.string().required(),
        "deletedAt": joi.date().optional(),
        isDeleted: joi.boolean().default(false),
        isAvailable: joi.boolean().default(true)
    }
    static createNews(newsDto: NewsDtoI) {
        return joi.object(this.baseSchema).validateAsync(newsDto)
    }

    static updateNews(newsDto: NewsDtoI) {
        return joi
            .object({ ...this.baseSchema, adminId: joi.string().required() })
            .fork(['title', 'description', 'images', 'cover', 'isDeleted', 'isAvailable'], schema => schema.optional())
            .validateAsync(newsDto)
    }
}
