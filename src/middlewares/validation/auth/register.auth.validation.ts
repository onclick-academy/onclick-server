/// <reference types="../../../../types.d.ts" />
import joi from 'joi'

export class registerValidation {
  private static baseSchema = {
    id: joi.string(),
    fullName: joi.string().required().min(6).max(255),
    username: joi.string().required().min(6).max(255),
    email: joi.string().required().email(),
    bio: joi.string().min(6).max(255).optional(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    passwordConfirm: joi.ref('password'),
    phoneNum: joi.string().required().min(6).max(255),
    profilePic: joi.string().min(6).max(255).optional(),
    birthDate: joi.date().required(),
    role: joi.valid('ADMIN', 'INSTRUCTOR', 'STUDENT').default('STUDENT'),
    isEmailConfirm: joi.boolean().default(false),
    gender: joi.valid('FEMALE', 'MALE').default('MALE')
  }

  static createUser(userDto: UserDtoI) {
    return joi.object(this.baseSchema).validateAsync(userDto)
  }

  static updateUser(userDto: UserDtoI) {
    return joi
      .object(this.baseSchema)
      .fork(Object.keys(this.baseSchema), schema => schema.optional())
      .validateAsync(userDto)
  }
}
