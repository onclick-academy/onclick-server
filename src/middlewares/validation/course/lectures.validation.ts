import Joi from 'joi'

export class LectureValidation {
    private static baseSchema = {
        id: Joi.string().allow(null),
        sectionId: Joi.string().required(),
        order: Joi.number().integer().positive().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        videoUrl: Joi.string().required(),
        thumbnail: Joi.string().required(),
        duration: Joi.string().required(),
        isDeleted: Joi.boolean().default(false),
        deletedAt: Joi.date().allow(null)
    }

    static createLecture(lectureDto: LectureDtoI) {
        return Joi.object(this.baseSchema).validateAsync(lectureDto)
    }

    static updateLecture(lectureDto: LectureUpdateI) {
        return Joi.object({
            ...this.baseSchema,
            order: Joi.number().integer().positive().required()
        })
            .fork(['order' ,'title', 'description', 'videoUrl', 'duration' , 'isDeleted', 'deletedAt', 'thumbnail'], schema => schema.optional())
            .validateAsync(lectureDto)
    }
}
