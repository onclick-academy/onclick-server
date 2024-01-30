import Joi from 'joi'

export class studentValidation {
  static createUpdateStudent() {
    const schema = Joi.object({
      UserDtoId: Joi.string().required(),
      educationLevel: Joi.valid('ELEMENTARY', 'MIDDLE', 'HIGH', 'COLLEGE', 'UNIVERSITY', 'MASTER', 'PHD').required()
    })
    return schema
  }
}
