import express from 'express'
import { LectureController } from '../controllers/lecture.controller'

const router = express.Router()

router
    .route('/')
    .post(LectureController.createLecture)
    .get(LectureController.getLecturesBySectionId)
    .put(LectureController.softDeleteLecture)

router
    .route('/lecture')
    .get(LectureController.getLectureById)
    .put(LectureController.updateLecture)
    .delete(LectureController.hardDeleteLecture)

export default router
