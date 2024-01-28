import Joi from "joi";

//Student validation
export class studentValidation {
//createStudent()
  static createStudent() {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      class: Joi.string().required(),
      suspended: Joi.boolean().default(false)
    })
    return schema
  };
//updateStudent()
  static updateStudent() {
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
      class: Joi.string(),
      suspended: Joi.boolean()
    })
    return schema
  };
}
