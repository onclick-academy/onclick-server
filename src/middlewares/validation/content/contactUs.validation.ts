import joi from 'joi'
// validation of the contactUs

interface ContactUsDtoI {
    id: string
    name: string
    email: string
    message: string
    phone?: string | null
    isRead: boolean
}
export class contactUsValidation {
    private static baseSchema = {
        id: joi.string().optional(),
        name: joi.string().required().min(6).max(255),
        email: joi.string().required().email(),
        phone: joi.string().required().min(6),
        message: joi.string().required().min(6),
        isRead: joi.boolean().default(false)
    }

    static createContactUs(contactUsDto: ContactUsDtoI) {
        return joi.object(this.baseSchema).validateAsync(contactUsDto)
    }

    static updateContactUs(contactUsDto: ContactUsDtoI) {
        return joi
            .object(this.baseSchema)
            .fork(['isRead'], schema => schema.optional())
            .validateAsync(contactUsDto)
    }
}
