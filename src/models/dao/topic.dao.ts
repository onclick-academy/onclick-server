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

    getTopicsBySubCategoryId = async (subCategoryId: string) => {
        const topics = await prisma.$queryRaw`
                SELECT t.id, t.title
                FROM "Topic" AS t
                INNER JOIN "SubCategoryTopic" AS sct ON t.id = sct."topicId"
                INNER JOIN "SubCategory" AS sc ON sct."subCategoryId" = sc.id
                WHERE sc.id = ${subCategoryId}
                
            `
        return topics
    }

    updateTopic = async (topicDto: TopicUpdateI) => {
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
