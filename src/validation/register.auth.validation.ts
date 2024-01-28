import joi from 'joi'

export class registerValidation {
  static createUser() {
    const schema = joi.object({
      fullname: joi.string().required().min(6).max(255),
      username: joi.string().required().min(6).max(255),
      email: joi.string().required().min(6).max(255).email(),
      bio: joi.string().min(6).max(255),
      password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      passwordConfirm: joi.ref('password'),
      phoneNum: joi.string().required().min(6).max(255),
      profilePic: joi.string().min(6).max(255),
      birthdate: joi.date().required(),
      role: joi.valid('ADMIN', 'INSTRUCTOR', 'STUDENT').default('STUDENT').required(),
      isEmailConfirm: joi.boolean().default(false),
    })

    return schema
  }

  static updateUser() {
    const schema = joi.object({
      fullname: joi.string().min(6).max(255),
      username: joi.string().min(6).max(255),
      email: joi.string().min(6).max(255).email(),
      bio: joi.string().min(6).max(255),
      password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      passwordConfirm: joi.ref('password'),
      phoneNum: joi.string().min(6).max(255),
      birthdate: joi.date(),
      profilePic: joi.string().min(6).max(255),
      role: joi.valid('ADMIN', 'INSTRUCTOR', 'STUDENT'),
      isEmailConfirm: joi.boolean(),
    })

    return schema
  }
}
