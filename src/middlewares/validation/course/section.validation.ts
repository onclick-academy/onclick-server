import joi from 'joi'

export class SectionValidation {
    private static baseSchema = {
        id: joi.string().allow(null),
        courseId: joi.string().required(),
        content: joi.string().required(),
        fullduration: joi.string().required(),
        isDeleted: joi.boolean().default(false),
        deletedAt: joi.date().allow(null)
    }

    static createSection(lectureDto: SectionDtoI) {
        return joi.object(this.baseSchema).validateAsync(lectureDto)
    }

    static updateSection(lectureDto: SectionUpdateDtoI) {
        return joi
            .object(this.baseSchema)
            .fork(['content', 'fullduration', 'isDeleted', 'deletedAt'], schema =>
                schema.optional()
            )
            .validateAsync(lectureDto)
    }
}
