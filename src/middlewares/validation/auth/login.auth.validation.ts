import Joi from 'joi'
import { loginDtoI } from '../../../types/user.interface'

export class LoginValidation {
  private static baseSchema = {
    email: Joi.string().email(),
    username: Joi.string(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    isRememberMe: Joi.boolean().default(false)
  }

  static validateLoginInput(userDto: loginDtoI) {
    return Joi.object(this.baseSchema).validateAsync(userDto)
  }
}
