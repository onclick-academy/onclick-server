import Joi from 'joi'

export class StudentValidation {
  static createUpdateStudent(studentDto: StudentDtoI) {
    const schema = Joi.object({
      userId: Joi.string(),
    })
    return schema.validateAsync(studentDto)
  }
}
