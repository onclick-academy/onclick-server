import e from 'express'
import joi from 'joi'

export class instructorValidation {
  createInstructor() {
    const schema = joi.object({
      userId: joi.string().required(),
      nationalID: joi.string().required(),
      cvLink: joi.string().required(),
      averageRate: joi.number()
    })
    return schema
  }

  updateInstructor() {
    const schema = joi.object({
      userId: joi.string(),
      nationalID: joi.string(),
      cvLink: joi.string(),
      averageRate: joi.number()
    })
    return schema
  }
}
