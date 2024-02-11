import  express from "express";

import { TopicController } from "../controllers/topic.controller";

const router = express.Router()

router
    .route('/')
    .post(TopicController.createTopic)


export default router 