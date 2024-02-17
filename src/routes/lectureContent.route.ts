import express from 'express';
import { LectureContentController } from '../controllers/lectureContent.controller';

const router = express.Router();

router
    .route('/')
    .post(LectureContentController.createLectureContent)
    .get(LectureContentController.getLectureContentByLectureId)
    .put(LectureContentController.hideLectureContent)

router
    .route('/content')
    .get(LectureContentController.getLectureContentById)
    .put(LectureContentController.updateLectureContent)
    .delete(LectureContentController.deleteLectureContent)

export default router