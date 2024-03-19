import Joi from 'joi';

export class LoginValidation {
  private static baseSchema = {
    email: Joi.string().required().email(),
    username: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
  };

  static validateLoginInput(userDto: UserDtoI) {
    return Joi.object(this.baseSchema).validateAsync(userDto);
  }

  // static validateCredentials(email: string, password: string) {
  //   const credentialsSchema = {
  //     email: Joi.string().required().email(),
  //     username: Joi.string().required(),
  //     password: Joi.string().required()
  //   };

  //   return Joi.object(credentialsSchema).validateAsync({ email, password });
  // }
}