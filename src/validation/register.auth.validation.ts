import joi from 'joi'

export const registerValidation = joi.object({
  fullname: joi.string().required().min(6).max(255),
  username: joi.string().required().min(6).max(255),
  email: joi.string().required().min(6).max(255).email(),
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  passwordConfirm: joi.ref('password'),
  phoneNum: joi.string().required().min(6).max(255),
  birthdate: joi.date().required(),
  profilePic: joi.string().min(6).max(255),
  role: joi.valid('ADMIN', 'INSTRUCTOR', 'STUDENT').default('STUDENT').required()
})
