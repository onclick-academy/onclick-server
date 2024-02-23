import joi from 'joi'

export class lectureValidation {
    private static baseSchema = {
        id: joi.string().allow(null),
        courseId: joi.string().required(),
        title: joi.string().required(),
        description: joi.string().required(),
        videoUrl: joi.string().required(),
        duration: joi.string().required(),
        isDeleted: joi.boolean().default(false),
        deletedAt: joi.date().allow(null)
    }

    static createLecture(lectureDto: LectureDtoI) {
        return joi.object(this.baseSchema).validateAsync(lectureDto)
    }

    static updateLecture(lectureDto: LectureUpdateDtoI) {
        return joi
            .object(this.baseSchema)
            .fork(['title', 'description', 'videoUrl', 'duration', 'isDeleted', 'deletedAt'], schema =>
                schema.optional()
            )
            .validateAsync(lectureDto)
    }
}
