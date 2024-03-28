import express from 'express'
import { NewsController } from '../controllers/news.controller'

const router = express.Router()

router.route('/').post(NewsController.createNews)

router.route('/').get(NewsController.getAllNews)

router
    .route('/:newsId')
    .get(NewsController.getNewsById)
    .put(NewsController.updateNews)
    .delete(NewsController.deleteNews)

export default router
