import Joi from 'joi'

export class StudentValidation {
  static createUpdateStudent(studentDto: StudentDtoI) {
    const schema = Joi.object({
      userId: Joi.string(),
      educationLevel: Joi.valid('ELEMENTARY', 'MIDDLE', 'HIGH', 'COLLEGE', 'UNIVERSITY', 'MASTER', 'PHD').required()
    })
    return schema.validateAsync(studentDto)
  }
}
