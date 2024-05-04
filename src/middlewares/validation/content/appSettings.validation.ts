import joi from 'joi'

export class AppSettingsValidation {
    private static baseSchema = {
        id: joi.string().allow(null),
        mainEmail: joi.string().email().required(),
        contactEmail: joi.string().email().required(),
        contactPhone: joi.string().min(10).max(10).required(),
        aboutUs: joi.string().min(20).required(),
        terms: joi.string().min(20).required(),
        privacy: joi.string().min(20).required(),
        logo: joi.string().required(),
        favicon: joi.string().required(),
        coverSlides: joi.array().items(joi.string()).min(1).required(),
        socialMedia: joi
            .object({
                facebook: joi.string().uri().required(),
                twitter: joi.string().uri().required(),
                instagram: joi.string().uri().required(),
                linkedin: joi.string().uri().required()
            })
            .required()
    }

    static createAppSettings(appSettingsDto: AppSettingsDtoI) {
        return joi.object(this.baseSchema).validateAsync(appSettingsDto)
    }

    static updateAppSettings(appSettingsDto: AppSettingsUpdateI) {
        return joi
            .object(this.baseSchema)
            .fork(Object.keys(this.baseSchema), schema => schema.optional())
            .validateAsync(appSettingsDto)
    }
}
