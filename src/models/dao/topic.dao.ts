import prisma from '../prisma/prisma-client'

export class TopicDao {
  createTopic = async (topicDto: TopicDtoI) => {
    const newTopic = await prisma.topic.create({
      data: topicDto
    })
    return newTopic
  }

  getAllTopics = async () => {
    const topics = await prisma.topic.findMany({
      where: {
        isDeleted: false
      }
    })
    return topics
  }

  getTopicById = async (topicId: string) => {
    const topic = await prisma.topic.findUnique({
      where: {
        id: topicId,
        isDeleted: false
      }
    })
    return topic
  }

  getTopicBySubCategoryId = async (subCategoryId: string) => {
    const topics = await prisma.topic.findMany({}) // TODO fix schema to include subCategoryId
    return topics
  }

  updateTopic = async (topicDto: GlobalTopicI) => {
    const updatedTopic = await prisma.topic.update({
      where: {
        id: topicDto.id,
        isDeleted: false
      },
      data: topicDto
    })
    return updatedTopic
  }

  deleteTopic = async (topicId: string) => {
    const deletedTopic = await prisma.topic.update({
      where: {
        id: topicId
      },
      data: {
        isDeleted: true,
        deletedAt: new Date()
      }
    })
    return deletedTopic
  }
}
