import express from 'express'

import { TopicController } from '../controllers/topic.controller'

const router = express.Router()

router
    .route('/')
    .post(TopicController.createTopic)
    .get(TopicController.getAllTopics)

router
    .route('/:topicId')
    .get(TopicController.getTopicById)
    .put(TopicController.updateTopic)
    .delete(TopicController.deleteTopic)

router
    .route('/:topicId/:subCategoryId')
    .get(TopicController.getTopicsBySubCategoryId)

export default router
