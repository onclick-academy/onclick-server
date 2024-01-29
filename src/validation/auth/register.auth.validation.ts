import joi from 'joi'

export class registerValidation {
  private static baseSchema = {
    fullname: joi.string().required().min(6).max(255),
    username: joi.string().required().min(6).max(255),
    email: joi.string().required().email(),
    bio: joi.string().min(6).max(255).optional(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    passwordConfirm: joi.ref('password'),
    phoneNum: joi.string().required().min(6).max(255),
    profilePic: joi.string().min(6).max(255),
    birthdate: joi.date().required(),
    role: joi.valid('ADMIN', 'INSTRUCTOR', 'STUDENT').default('STUDENT').required(),
    isEmailConfirm: joi.boolean().default(false)
  }

  static createUser() {
    return joi.object(this.baseSchema)
  }

  static updateUser() {
    return joi.object(this.baseSchema).fork(Object.keys(this.baseSchema), schema => schema.optional())
  }
}
