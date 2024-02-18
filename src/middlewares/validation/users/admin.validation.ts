import Joi from 'joi'

interface AdminDtoI {
    id: string | undefined
    firstName: string
    lastName: string
    email: string
    password: string
    profilePic: string
    isDeleted: boolean
    deletedAt: Date
    isEmailConfirm: boolean
}

export class AdminValidation {
    private static baseSchema = {
        id: Joi.string(),
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        passwordConfirm: Joi.ref('password'),
        profilePic: Joi.string(),
        isDeleted: Joi.boolean().default(false),
        deletedAt: Joi.date().default(new Date()),
        isEmailConfirm: Joi.boolean().default(false)
    }

    static createAdmin(adminDto: UserDtoI) {
        return Joi.object(this.baseSchema).validateAsync(adminDto)
    }

    static updateAdmin(adminDto: Partial<UserDtoI>) {
        return Joi.object(this.baseSchema)
            .fork(Object.keys(this.baseSchema), schema => schema.optional())
            .validateAsync(adminDto)
    }
}
