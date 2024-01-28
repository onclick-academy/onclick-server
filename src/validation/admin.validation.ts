import Joi from 'joi'

//admin validation

export class adminValidation {
  //createAdmin()
  static createAdmin() {
    const schema = Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(255).required(),
      coursesApproved: Joi.string(),
      isDeleted: Joi.boolean()
    })
    return schema
  }
  //updateAdmin()
  static updateAdmin() {
    const schema = Joi.object({
      firstname: Joi.string(),
      lastname: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().min(6).max(255),
      coursesApproved: Joi.string(),
      isDeleted: Joi.boolean()
    })
    return schema
  }
}
