import joi from 'joi'

export class InstructorValidation {
  private static baseSchema = {
    userId: joi.string().required(),
    nationalID: joi.string().required(),
    cvLink: joi.string().required(),
    averageRate: joi.number()
  }

  static createInstructor(instructorDto: InstructorDtoI) {
    return joi.object(this.baseSchema).validateAsync(instructorDto)
  }

  static updateInstructor() {
    return joi
      .object({ ...this.baseSchema, userId: joi.string().required() })
      .fork(['nationalID', 'cvLink', 'averageRate'], schema => schema.optional())
  }
}
