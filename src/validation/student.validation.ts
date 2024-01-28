import Joi from 'joi'

export class studentValidation {

  static createUpdateStudent() {
    const schema = Joi.object({
      userId: Joi.string().required(),
      educationLevel: Joi.valid(
        'ELEMENTARY',
        'MIDDLE',
        'HIGH',
        'COLLEGE',
        'UNIVERSITY',
        'MASTER',
        'PHD')
        .required()
    })
    return schema
  }

}
