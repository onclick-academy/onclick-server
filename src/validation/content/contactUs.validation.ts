import joi from 'joi'

// validation of the contactUs

export class contactUsValidation {

  private static baseSchema = {
    name: joi.string().required().min(6).max(255),
    email: joi.string().required().email(),
    phone: joi.string().required().min(6),
    message: joi.string().required().min(6),
    isRead: joi.boolean().default(false)
  }

  static createContactUs() {
    return joi.object(this.baseSchema)
  }

  static updateContactUs() {
    return joi.object(this.baseSchema).fork(Object.keys(this.baseSchema), schema => schema.optional())
}
}
