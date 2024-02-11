import Joi from 'joi'

export class StudentValidation {
  static createUpdateStudent(studentDto: { userId: string }) {
    const schema = Joi.object({
      userId: Joi.string()
    })
    return schema.validateAsync(studentDto)
  }
}
