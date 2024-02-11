import { TopicDao } from "../models/dao/topic.dao";
import { TopicDto } from "../models/dto/topic.dto";
import { TopicValidation } from "../middlewares/validation/course/topic.validation";

import { Request, Response } from 'express'


export class TopicController {

    static createTopic = async (req: Request, res: Response) => {
        const topicDao = new TopicDao()
        const topicDto = new TopicDto(req.body)

        try {
            const { error } = await TopicValidation.createTopic(topicDto)
            if (error) throw new Error(error.details[0].message)

            const newTopic = await topicDao.createTopic(topicDto)

            return res.status(201).json({ message: 'Topic created successfuly', data: newTopic, status: 'success' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }

}