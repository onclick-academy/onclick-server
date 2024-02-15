import Joi from 'joi'

export class lecturesContentValidation {
    private static baseSchema = {
        id: Joi.string().allow(null),
        order: Joi.number().integer().positive().required(),
        lectureId: Joi.string().required(),
        content: Joi.string().required(),
        isDeleted: Joi.boolean().default(false),
        deletedAt: Joi.date().allow(null)
    }

    static createLecturesContent(lectureContentDto: LectureContentDtoI) {
        return Joi.object(this.baseSchema).validateAsync(lectureContentDto)
    }

    static updateLecturesContent(lectureContentDto: LectureContentUpdateI) {
        return Joi.object({
            ...this.baseSchema,
            order: Joi.number().integer().positive().required()
        })
            .fork(['content', 'isDeleted', 'deletedAt'], schema => schema.optional())
            .validateAsync(lectureContentDto)
    }
}
