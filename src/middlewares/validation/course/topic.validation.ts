import joi from 'joi'

export class TopicValidation {
  private static baseSchema = {
    title: joi.string().required(),
    isDeleted: joi.boolean().default(false),
    deletedAt: joi.date().allow(null),
    courses: joi.array().items(joi.string()).allow(null)
  }

  static createTopic(topicDto: TopicDtoI) {
    return joi.object(this.baseSchema).validateAsync(topicDto)
  }

  static updateTopic() {
    return joi.object(this.baseSchema).fork(['title', 'isDeleted', 'deletedAt'], schema => schema.optional())
  }
}
