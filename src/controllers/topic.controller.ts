import { TopicDao } from '@models/dao/topic.dao'
import { TopicDto } from '@models/dto/topic.dto'
import { SubCategoryIdValidation, TopicIdValidation } from '@utilities/IdValidation/coursePackage.id'
import { TopicValidation } from '@validation/course/topic.validation'

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
            console.log(error.message)
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }

    static getAllTopics = async (req: Request, res: Response) => {
        const topicDao = new TopicDao()

        try {
            const topics = await topicDao.getAllTopics()

            return res.status(200).json({ data: topics, status: 'success' })
        } catch (error: any) {
            console.log(error.message)
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }

    static getTopicById = async (req: Request, res: Response) => {
        const topicDao = new TopicDao()
        const topicId = req.params.topicId

        try {
            const topic = await topicDao.getTopicById(topicId)

            return res.status(200).json({ data: topic, status: 'success' })
        } catch (error: any) {
            console.log(error.message)
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }

    static getTopicsBySubCategoryId = async (req: Request, res: Response) => {
        const topicDao = new TopicDao()
        const subCategoryId = req.params.subCategoryId //TODO discuss with team

        try {
            await SubCategoryIdValidation(subCategoryId)

            const topics = await topicDao.getTopicsBySubCategoryId(subCategoryId)

            return res.status(200).json({ data: topics, status: 'success' })
        } catch (error: any) {
            console.log(error.message)
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }

    static updateTopic = async (req: Request, res: Response) => {
        const topicDao = new TopicDao()
        const topicDto = new TopicDto(req.body)

        topicDto.id = req.params.topicId

        try {
            await TopicIdValidation(topicDto.id)

            const { error } = await TopicValidation.updateTopic(topicDto)
            if (error) throw new Error(error.details[0].message)

            const updatedTopic = await topicDao.updateTopic(topicDto)

            return res.status(200).json({ message: 'Topic updated successfuly', data: updatedTopic, status: 'success' })
        } catch (error: any) {
            console.log(error.message)
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }

    static deleteTopic = async (req: Request, res: Response) => {
        const topicDao = new TopicDao()
        const topicId = req.params.topicId

        try {
            await TopicIdValidation(topicId)

            const deletedTopic = await topicDao.deleteTopic(topicId)

            return res.status(200).json({ message: 'Topic deleted successfuly', data: deletedTopic, status: 'success' })
        } catch (error: any) {
            console.log(error.message)
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }
}
