import Joi from 'joi'

export class adminValidation {
  static createAdmin() {
    const schema = Joi.object({
      firstname: Joi.string().min(3).required(),
      lastname: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      passwordConfirm: Joi.ref('password'),
      profilePic: Joi.string(),
      isDeleted: Joi.boolean().default(false)
    })
    return schema
  }

  static updateAdmin() {
    const schema = Joi.object({
      firstname: Joi.string(),
      lastname: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      passwordConfirm: Joi.ref('password'),
      profilePic: Joi.string(),
      isDeleted: Joi.boolean()
    })
    return schema
  }
}

