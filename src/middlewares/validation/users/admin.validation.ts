import Joi from 'joi'

export class AdminValidation {
  private static baseSchema = {
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    passwordConfirm: Joi.ref('password'),
    profilePic: Joi.string(),
    isDeleted: Joi.boolean().default(false),
    deletedAt: Joi.date().default(new Date())
  }

  static createAdmin(adminDto: {
    firstName: string
    lastName: string
    email: string
    password: string
    profilePic: string
    isDeleted: boolean
    deletedAt: Date
  }) {
    return Joi.object(this.baseSchema).validateAsync(adminDto)
  }

  static updateAdmin() {
    return Joi.object(this.baseSchema).fork(Object.keys(this.baseSchema), schema => schema.optional())
  }
}
