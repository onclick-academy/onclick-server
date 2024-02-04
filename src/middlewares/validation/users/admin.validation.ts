import Joi from 'joi'

export class adminValidation {
  private static baseSchema = {
    firstname: Joi.string().min(3).required(),
    lastname: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    passwordConfirm: Joi.ref('password'),
    profilePic: Joi.string(),
    isDeleted: Joi.boolean().default(false)
  }

  static createAdmin() {
    return Joi.object(this.baseSchema)
  }

  static updateAdmin() {
    return Joi.object(this.baseSchema).fork(Object.keys(this.baseSchema), schema => schema.optional())
  }
}
