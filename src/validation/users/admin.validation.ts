import Joi from 'joi'

//admin validation

export class adminValidation {
  //createAdmin()
  static createAdmin() {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(255).required(),
      coursesapproved: Joi.string(),
      suspended: Joi.boolean().default(false)
    })
    return schema
  }
  //updateAdmin()
  static updateAdmin() {
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().min(6).max(255),
      coursesapproved: Joi.string(),
      suspended: Joi.boolean()
    })
    return schema
  }
}
