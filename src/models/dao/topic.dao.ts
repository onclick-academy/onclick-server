import prisma from "../prisma/prisma-client";

export class TopicDao {
    createTopic = async (topicDto: TopicDtoI) => {
        const newTopic = await prisma.topic.create({
            data: topicDto
        })
        return newTopic
    }
}