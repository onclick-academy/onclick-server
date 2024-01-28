import joi from 'joi'

// validation of the contactUs

export class contactUsValidation {
  static createContactUs() {
    const schema = joi.object({
      name: joi.string().required().min(6).max(255),
      email: joi.string().required().min(6).max(255),
      phone: joi.string().required().min(6).max(255),
      message: joi.string().required().min(6).max(255),
      isRead: joi.boolean().default(false)
    })
    return schema
  }

  static updateContactUs() {
    const schema = joi.object({
      name: joi.string().min(6).max(255),
      email: joi.string().min(6).max(255),
      phone: joi.string().min(6).max(255),
      message: joi.string().min(6).max(255),
      isRead: joi.boolean()
    })
    return schema
  }
}
