/// <reference types="../../../../types.d.ts" />
import joi from 'joi'

export class RegisterValidation {
    private static baseSchema = {
        id: joi.string(),
        firstName: joi.string().required().min(6).max(255),
        lastName: joi.string().required().min(6).max(255),
        username: joi.string().required().min(6).max(255),
        email: joi.string().required().email(),
        bio: joi.string().min(6).max(255).optional(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        passwordConfirm: joi.ref('password'),
        phoneNum: joi.string().required().min(6).max(255),
        profilePic: joi.string().min(6).max(255).optional(),
        birthDate: joi.date().required(),
        role: joi.valid('ADMIN', 'INSTRUCTOR', 'STUDENT', 'SUPER_ADMIN').default('STUDENT'),
        isEmailConfirm: joi.boolean().default(false),
        gender: joi.valid('FEMALE', 'MALE').default('MALE'),
        isDeleted: joi.boolean().default(false),
        isRememberMe: joi.boolean().default(false),
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
