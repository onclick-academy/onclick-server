import joi from 'joi'

export class instructorValidation {
  private static baseSchema = {
    UserDtoId: joi.string().required(),
    nationalID: joi.string().required(),
    cvLink: joi.string().required(),
    averageRate: joi.number()
  }

  createInstructor() {
    return joi.object(instructorValidation.baseSchema) // can't use this.baseSchema => to check!
  }

  updateInstructor() {
    return joi
      .object({ ...instructorValidation.baseSchema, UserDtoId: joi.string().required() })
      .fork(['nationalID', 'cvLink', 'averageRate'], schema => schema.optional())
  }
}
