import Joi from 'joi'

//Student validation
export class studentValidation {
  //createStudent()
  static createStudent() {
    const schema = Joi.object({
      userId: Joi.string().required(),
      educationLevel: Joi.string().required()
    })
    return schema
  }
  //updateStudent()
  static updateStudent() {
    const schema = Joi.object({
      userId: Joi.string().required(),
      educationLevel: Joi.string().required()
    })
    return schema
  }
}
